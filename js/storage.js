// Storage & Data Management Layer
// Handles LocalStorage, IndexedDB fallback, Canvas Image Compression, and Vote State Sync

const STORAGE_KEYS = {
  POSTERS: 'cinevote_posters_v1',
  VOTES: 'cinevote_votes_v1',
  WEBHOOK_URL: 'cinevote_webhook_url_v1',
  LAST_SYNC: 'cinevote_last_sync_v1'
};

// IndexedDB Helper for high-reliability image caching
const DB_NAME = 'CineVoteDB';
const DB_VERSION = 1;
const STORE_NAME = 'posters';

function openIndexedDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'code' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function savePosterToIndexedDB(poster) {
  try {
    const db = await openIndexedDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(poster);
  } catch (e) {
    console.warn('IndexedDB save error:', e);
  }
}

async function loadPostersFromIndexedDB() {
  try {
    const db = await openIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result && req.result.length === 12 ? req.result : null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

// Image compression via HTML5 Canvas (Preserves 2:3 ratio and keeps file < 200KB)
function compressAndResizeImage(file, maxWidth = 700, maxHeight = 1050, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        const ctx = canvas.getContext('2d');

        // Dark cinema background
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, maxWidth, maxHeight);

        // Aspect fill (cover) to match 2:3
        const srcRatio = img.width / img.height;
        const targetRatio = maxWidth / maxHeight;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (srcRatio > targetRatio) {
          drawHeight = maxHeight;
          drawWidth = maxHeight * srcRatio;
          offsetX = (maxWidth - drawWidth) / 2;
        } else {
          drawWidth = maxWidth;
          drawHeight = maxWidth / srcRatio;
          offsetY = (maxHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('ไม่สามารถโหลดไฟล์รูปภาพได้'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('เกิดข้อผิดพลาดในการอ่านไฟล์'));
    reader.readAsDataURL(file);
  });
}

// Storage Manager
const StorageService = {
  // --- Posters ---
  async getPosters() {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.POSTERS);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length === 12) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }

    const idbPosters = await loadPostersFromIndexedDB();
    if (idbPosters && idbPosters.length === 12) {
      return idbPosters.sort((a, b) => a.id - b.id);
    }

    const initial = INITIAL_POSTERS;
    await this.savePosters(initial);
    return initial;
  },

  async savePosters(posters) {
    if (!Array.isArray(posters) || posters.length !== 12) {
      throw new Error('ต้องมีโปสเตอร์ครบ 12 รูป');
    }

    try {
      localStorage.setItem(STORAGE_KEYS.POSTERS, JSON.stringify(posters));
    } catch (e) {
      console.warn('LocalStorage quota exceeded, saving to IndexedDB fallback:', e);
    }

    for (const p of posters) {
      await savePosterToIndexedDB(p);
    }
  },

  async updateSinglePoster(code, imageUrl) {
    const posters = await this.getPosters();
    const target = posters.find(p => p.code === code);
    if (target) {
      target.imageUrl = imageUrl;
      await this.savePosters(posters);
      return target;
    }
    return null;
  },

  async resetPostersToDefault() {
    await this.savePosters(INITIAL_POSTERS);
    return INITIAL_POSTERS;
  },

  // --- Votes & Student ID Gate ---
  getVotes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOTES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load votes:', e);
      return [];
    }
  },

  saveVotes(votes) {
    try {
      localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
    } catch (e) {
      console.error('Failed to save votes:', e);
    }
  },

  /**
   * Records or updates a student's final vote.
   * If studentId already voted, update their record with the newly chosen poster.
   */
  recordVote({ studentId, posterCode, posterLabel, timestamp }) {
    const trimmedId = String(studentId).trim();
    if (!trimmedId) {
      throw new Error('กรุณากรอกรหัสนักศึกษา');
    }

    const votes = this.getVotes();
    const timeStr = timestamp || new Date().toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const existingIndex = votes.findIndex(v => String(v.studentId).trim().toLowerCase() === trimmedId.toLowerCase());
    const voteRecord = {
      timestamp: timeStr,
      studentId: trimmedId,
      posterCode: posterCode || 'P01',
      posterLabel: posterLabel || ''
    };

    let isUpdate = false;
    if (existingIndex >= 0) {
      votes[existingIndex] = voteRecord;
      isUpdate = true;
    } else {
      votes.push(voteRecord);
    }

    this.saveVotes(votes);
    return { isUpdate, voteRecord };
  },

  /**
   * Merge external votes received from Google Sheets (GET request)
   * Respects student ID overwrite rule: keep latest vote per student ID.
   */
  mergeVotesFromGoogleSheet(sheetVotes) {
    if (!Array.isArray(sheetVotes)) return this.getVotes();

    const voteMap = new Map();

    // 1. Load current local votes into map
    const localVotes = this.getVotes();
    localVotes.forEach(v => {
      if (v.studentId) {
        voteMap.set(String(v.studentId).trim().toLowerCase(), v);
      }
    });

    // 2. Overlay / add votes from Google Sheet
    sheetVotes.forEach(sv => {
      const sId = String(sv.studentId || '').trim();
      const pCode = String(sv.winnerId || sv.posterCode || '').trim();
      const pLabel = String(sv.winnerLabel || sv.posterLabel || '').trim();
      const time = String(sv.timestamp || '').trim() || new Date().toLocaleString('th-TH');

      if (sId && pCode) {
        voteMap.set(sId.toLowerCase(), {
          timestamp: time,
          studentId: sId,
          posterCode: pCode,
          posterLabel: pLabel || `โปสเตอร์ #${parseInt(pCode.replace(/\D/g, '') || 1, 10)}`
        });
      }
    });

    const merged = Array.from(voteMap.values());
    this.saveVotes(merged);
    this.setLastSyncTime();
    return merged;
  },

  deleteVoteByStudentId(studentId) {
    const trimmedId = String(studentId).trim().toLowerCase();
    const votes = this.getVotes();
    const filtered = votes.filter(v => String(v.studentId).trim().toLowerCase() !== trimmedId);
    this.saveVotes(filtered);
    return filtered;
  },

  clearAllVotes() {
    this.saveVotes([]);
  },

  // --- Webhook URL ---
  getWebhookUrl() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WEBHOOK_URL) || '';
      if (stored && stored.trim() && !stored.includes("วางลิงก์")) {
        return stored.trim();
      }
      if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("วางลิงก์")) {
        return GOOGLE_SCRIPT_URL.trim();
      }
      return stored || '';
    } catch (e) {
      return '';
    }
  },

  setWebhookUrl(url) {
    try {
      localStorage.setItem(STORAGE_KEYS.WEBHOOK_URL, String(url).trim());
    } catch (e) {
      console.error('Failed to set webhook URL:', e);
    }
  },

  getLastSyncTime() {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || '';
    } catch (e) {
      return '';
    }
  },

  setLastSyncTime() {
    try {
      const now = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, now);
    } catch (e) {}
  }
};

window.StorageService = StorageService;
window.compressAndResizeImage = compressAndResizeImage;
