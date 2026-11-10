// CineVote Application Controller & UI Logic

// State
const state = {
  currentTab: 'vote', // 'vote', 'leaderboard', 'admin'
  posters: [],
  tournament: null,
  isAnimating: false,
  isSyncing: false,
  studentId: '',
  webhookUrl: ''
};

// ==========================================
// TOAST NOTIFICATIONS (NO alert() ALLOWED)
// ==========================================
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
  },

  show(message, type = 'info', duration = 3800) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    } else {
      iconSvg = `<svg class="w-5 h-5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1 text-sm font-medium text-zinc-100">${message}</div>
      <button class="text-zinc-400 hover:text-zinc-200 transition text-lg leading-none ml-2">&times;</button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.onclick = () => this.dismiss(toast);

    this.container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }
  },

  dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }
};

// ==========================================
// MODAL DIALOGS (NO confirm() ALLOWED)
// ==========================================
const Modal = {
  backdrop: null,
  titleEl: null,
  bodyEl: null,
  cancelBtn: null,
  confirmBtn: null,
  onConfirmCallback: null,

  init() {
    this.backdrop = document.getElementById('global-modal');
    this.titleEl = document.getElementById('modal-title');
    this.bodyEl = document.getElementById('modal-body');
    this.cancelBtn = document.getElementById('modal-cancel-btn');
    this.confirmBtn = document.getElementById('modal-confirm-btn');

    this.cancelBtn.onclick = () => this.close();
    this.backdrop.onclick = (e) => {
      if (e.target === this.backdrop) this.close();
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('active')) {
        this.close();
      }
    });

    this.confirmBtn.onclick = () => {
      const cb = this.onConfirmCallback;
      this.close();
      if (typeof cb === 'function') cb();
    };
  },

  show({ title, bodyHtml, confirmText = 'ตกลง', cancelText = 'ยกเลิก', isDanger = false, onConfirm = null }) {
    if (!this.backdrop) this.init();

    this.titleEl.textContent = title;
    this.bodyEl.innerHTML = bodyHtml;
    this.confirmBtn.textContent = confirmText;
    this.cancelBtn.textContent = cancelText;
    this.onConfirmCallback = onConfirm;

    if (isDanger) {
      this.confirmBtn.className = 'px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-900/30 transition';
    } else {
      this.confirmBtn.className = 'px-5 py-2.5 rounded-xl font-semibold text-sm text-zinc-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/25 transition';
    }

    if (!onConfirm) {
      this.confirmBtn.style.display = 'none';
      this.cancelBtn.textContent = 'ปิด';
    } else {
      this.confirmBtn.style.display = 'inline-flex';
    }

    this.backdrop.classList.add('active');
  },

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('active');
    }
  }
};

// ==========================================
// CONFETTI CELEBRATION
// ==========================================
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 130;
  const colors = ['#f59e0b', '#fbbf24', '#f43f5e', '#38bdf8', '#a855f7', '#10b981', '#ffffff'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 3 - 1.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5
    });
  }

  let animationFrame;
  let startTime = Date.now();

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    if (elapsed < 4000) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

// =======================================================================
// GOOGLE SHEETS API INTEGRATION (APPS SCRIPT CONNECTOR)
// =======================================================================

// วาง Web App URL ที่ได้จากการ Deploy Google Apps Script ที่นี่
// หรือสามารถกรอกผ่านช่อง URL ในแท็บ "จัดการระบบ (Admin)" บนหน้าเว็บก็ได้
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAwnMis40U6KSzjkKOoPJn6Jb0vp3YBtnJSNKv3UO6ZNcc77CnnjajGUn-arDlIVTv/exec";

// Helper function หา Web App URL ที่พร้อมใช้งาน (ตรวจทั้งตัวแปร GOOGLE_SCRIPT_URL และ LocalStorage)
function getActiveGoogleScriptUrl() {
  const storedUrl = StorageService.getWebhookUrl();
  if (storedUrl && storedUrl.trim() && !storedUrl.includes("วางลิงก์")) {
    return storedUrl.trim();
  }
  if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.trim() && !GOOGLE_SCRIPT_URL.includes("วางลิงก์")) {
    return GOOGLE_SCRIPT_URL.trim();
  }
  return storedUrl || GOOGLE_SCRIPT_URL;
}

// 1. ฟังก์ชันส่งผลโหวตสุดท้ายเข้า Google Sheet
async function sendVoteToGoogleSheet(studentId, winnerId, winnerLabel) {
  // รองรับทั้งการเรียกแบบ 3 arguments หรือแบบส่ง object { studentId, winnerId, winnerLabel }
  let sId = studentId;
  let wId = winnerId;
  let wLabel = winnerLabel;

  if (typeof studentId === 'object' && studentId !== null) {
    sId = studentId.studentId;
    wId = studentId.winnerId || studentId.posterCode;
    wLabel = studentId.winnerLabel || studentId.posterLabel;
  }

  const scriptUrl = getActiveGoogleScriptUrl();
  if (!scriptUrl || scriptUrl.includes("วางลิงก์")) {
    console.warn("ยังไม่ได้ตั้งค่า GOOGLE_SCRIPT_URL ระบบบันทึกผลการโหวตไว้ในเครื่อง");
    return { status: "local_only", message: "No script URL configured" };
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    // สำคัญมาก: ต้องใช้ text/plain เพื่อไม่ให้ติด CORS Preflight ของ Google Apps Script
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      studentId: sId,
      winnerId: wId,       // เช่น "P01"
      winnerLabel: wLabel  // เช่น "โปสเตอร์ #1"
    })
  });

  try {
    const result = await response.json();
    return result;
  } catch (err) {
    return { status: "success", note: "Response completed" };
  }
}

// Alias เพื่อให้โค้ดส่วนอื่นที่เรียก sendToGoogleSheet ใช้งานฟังก์ชันเดียวกัน
const sendToGoogleSheet = sendVoteToGoogleSheet;

// 2. ฟังก์ชันดึงผลโหวตทั้งหมดจาก Google Sheet มาสรุป 2 อันดับแรกบนหน้าเว็บ
async function fetchVotesFromGoogleSheet(options = { showNotification: false }) {
  const scriptUrl = getActiveGoogleScriptUrl();
  if (!scriptUrl || scriptUrl.includes("วางลิงก์")) {
    if (options && options.showNotification) {
      Toast.show('กรุณาระบุ Google Apps Script Web App URL ในแท็บจัดการระบบก่อนซิงก์ข้อมูล', 'warning');
    }
    return StorageService.getVotes();
  }

  setSyncButtonState(true);

  try {
    const response = await fetch(scriptUrl, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    // รองรับทั้ง data.votes, data.data หรือ Array
    const voteList = (data && (data.votes || data.data)) ? (data.votes || data.data) : (Array.isArray(data) ? data : []);

    // นำผลโหวตจาก Sheet มาซิงก์เข้า LocalStorage
    const mergedVotes = StorageService.mergeVotesFromGoogleSheet(voteList);

    if (options && options.showNotification) {
      Toast.show(`ซิงก์ข้อมูลจาก Google Sheet สำเร็จ (พบ ${mergedVotes.length} รายการ)`, 'success');
    }

    renderLeaderboard();
    return data.votes || mergedVotes; // ได้ Array ของผลโหวตทั้งหมดมาคำนวณ Top 2
  } catch (err) {
    console.error("Failed to fetch votes from Google Sheet:", err);
    if (options && options.showNotification) {
      Toast.show(`ไม่สามารถดึงข้อมูลจาก Google Sheet ได้: ${err.message || 'CORS / URL Error'} (ใช้ข้อมูลในเครื่องแทน)`, 'error');
    }
    renderLeaderboard();
    return StorageService.getVotes();
  } finally {
    setSyncButtonState(false);
  }
}

function setSyncButtonState(isSyncing) {
  state.isSyncing = isSyncing;
  const syncBtns = document.querySelectorAll('.btn-sync-sheet');
  syncBtns.forEach(btn => {
    if (isSyncing) {
      btn.disabled = true;
      btn.classList.add('opacity-70', 'cursor-not-allowed');
      const icon = btn.querySelector('.sync-icon');
      if (icon) icon.classList.add('animate-spin');
    } else {
      btn.disabled = false;
      btn.classList.remove('opacity-70', 'cursor-not-allowed');
      const icon = btn.querySelector('.sync-icon');
      if (icon) icon.classList.remove('animate-spin');
    }
  });
}

// ==========================================
// LEADERBOARD & TIE-BREAKER LOGIC
// ==========================================
function calculateLeaderboard() {
  const allPosters = state.posters;
  const votes = StorageService.getVotes();

  const scoreMap = {};
  allPosters.forEach(p => {
    scoreMap[p.code] = 0;
  });

  // Tally votes (Each unique student ID has exactly 1 final vote recorded)
  votes.forEach(v => {
    const code = v.posterCode || v.winnerId;
    if (scoreMap.hasOwnProperty(code)) {
      scoreMap[code]++;
    }
  });

  const totalVotes = votes.length;

  // Build sorted array of all 12 posters with scores
  const posterScores = allPosters.map(p => ({
    ...p,
    votes: scoreMap[p.code] || 0,
    percentage: totalVotes > 0 ? Math.round(((scoreMap[p.code] || 0) / totalVotes) * 100) : 0
  })).sort((a, b) => b.votes - a.votes || a.code.localeCompare(b.code));

  // Determine Top 2 according to Tie-Breaker Rules:
  // 1. If no votes: empty top winners
  // 2. If top vote count > 0:
  //    - Check how many posters share highest votes (Rank 1 ties):
  //    - If >= 2 posters tied for 1st place:
  //      Show all tied 1st place posters as Co-Champions (อันดับ 1 ร่วม)
  //      DO NOT pull 2nd place to show!
  //    - If only 1 poster is 1st place:
  //      Show 1st place (อันดับ 1)
  //      Show 2nd place (อันดับ 2) (or co-2nd place if multiple share 2nd highest votes)

  let topWinners = [];
  const maxVotes = posterScores[0] ? posterScores[0].votes : 0;

  if (maxVotes > 0) {
    const tiedRank1 = posterScores.filter(p => p.votes === maxVotes);

    if (tiedRank1.length >= 2) {
      // 2 or more tied for 1st place!
      // Display the tied 1st place posters as winners, do NOT display 2nd place!
      tiedRank1.forEach((p) => {
        topWinners.push({
          poster: p,
          rankNumber: 1,
          rankLabel: 'อันดับ 1 ร่วม (Co-Champion)',
          badgeColor: 'border-amber-400/80 text-amber-300 bg-amber-500/15',
          crownColor: 'text-amber-400'
        });
      });
    } else {
      // Exactly 1 winner in 1st place
      topWinners.push({
        poster: tiedRank1[0],
        rankNumber: 1,
        rankLabel: 'อันดับ 1 (ชนะเลิศ)',
        badgeColor: 'border-amber-400 text-amber-300 bg-amber-500/20',
        crownColor: 'text-amber-400'
      });

      // Find 2nd place
      const remaining = posterScores.slice(1);
      const secondMaxVotes = remaining[0] ? remaining[0].votes : 0;

      if (secondMaxVotes > 0) {
        const tiedRank2 = remaining.filter(p => p.votes === secondMaxVotes);
        if (tiedRank2.length >= 2) {
          tiedRank2.forEach(p => {
            topWinners.push({
              poster: p,
              rankNumber: 2,
              rankLabel: 'อันดับ 2 ร่วม (Co-Runner Up)',
              badgeColor: 'border-zinc-400 text-zinc-300 bg-zinc-600/20',
              crownColor: 'text-zinc-300'
            });
          });
        } else {
          topWinners.push({
            poster: tiedRank2[0],
            rankNumber: 2,
            rankLabel: 'อันดับ 2 (รองชนะเลิศ)',
            badgeColor: 'border-zinc-400 text-zinc-300 bg-zinc-600/20',
            crownColor: 'text-zinc-300'
          });
        }
      }
    }
  }

  return {
    totalVotes,
    topWinners,
    posterScores,
    votes
  };
}

// ==========================================
// CSV EXPORT (UTF-8 BOM FOR EXCEL THAI)
// ==========================================
function downloadVotesCSV() {
  const votes = StorageService.getVotes();
  if (!votes || votes.length === 0) {
    Toast.show('ยังไม่มีข้อมูลการโหวตที่จะดาวน์โหลด', 'warning');
    return;
  }

  const headers = ['วันเวลา (Timestamp)', 'รหัสนักศึกษา (Student ID)', 'รหัสโปสเตอร์ (Poster Code)', 'โปสเตอร์สุดท้ายที่เลือก (Poster Label)'];
  const rows = votes.map(v => [
    `"${v.timestamp || ''}"`,
    `"${v.studentId || ''}"`,
    `"${v.posterCode || v.winnerId || ''}"`,
    `"${v.posterLabel || v.winnerLabel || ''}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `cinevote_results_${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  Toast.show('ส่งออกไฟล์ CSV สำเร็จ (รองรับภาษาไทยใน Excel)', 'success');
}

// ==========================================
// RENDERERS & VIEW CONTROLLERS
// ==========================================

function switchTab(tabName) {
  state.currentTab = tabName;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    const target = btn.getAttribute('data-tab');
    if (target === tabName) {
      btn.classList.add('bg-amber-500/15', 'text-amber-400', 'border-amber-500/40');
      btn.classList.remove('text-zinc-400', 'border-transparent');
    } else {
      btn.classList.remove('bg-amber-500/15', 'text-amber-400', 'border-amber-500/40');
      btn.classList.add('text-zinc-400', 'border-transparent');
    }
  });

  const tabVote = document.getElementById('view-vote');
  const tabLeaderboard = document.getElementById('view-leaderboard');
  const tabAdmin = document.getElementById('view-admin');

  tabVote.classList.toggle('hidden', tabName !== 'vote');
  tabLeaderboard.classList.toggle('hidden', tabName !== 'leaderboard');
  tabAdmin.classList.toggle('hidden', tabName !== 'admin');

  if (tabName === 'leaderboard') {
    // If webhook URL exists, auto-sync in background from Google Sheet for real-time calculation
    if (StorageService.getWebhookUrl()) {
      fetchVotesFromGoogleSheet({ showNotification: false });
    } else {
      renderLeaderboard();
    }
  } else if (tabName === 'admin') {
    renderAdmin();
  }
}

// --- STUDENT ID GATE & TOURNAMENT FLOW ---

function renderVoteGate() {
  const gateEl = document.getElementById('vote-gate-container');
  const matchEl = document.getElementById('vote-match-container');
  const victoryEl = document.getElementById('vote-victory-container');

  gateEl.classList.remove('hidden');
  matchEl.classList.add('hidden');
  victoryEl.classList.add('hidden');

  const studentInput = document.getElementById('student-id-input');
  studentInput.value = '';
  studentInput.focus();

  const noticeEl = document.getElementById('gate-existing-notice');
  noticeEl.classList.add('hidden');

  studentInput.oninput = () => {
    const errorEl = document.getElementById('student-id-error');
    if (errorEl) errorEl.classList.add('hidden');
    studentInput.classList.remove('border-rose-500');

    const val = studentInput.value.trim();
    if (!val) {
      noticeEl.classList.add('hidden');
      return;
    }
    const votes = StorageService.getVotes();
    const existing = votes.find(v => String(v.studentId).toLowerCase() === val.toLowerCase());
    if (existing) {
      noticeEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 font-semibold text-amber-400">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          พบข้อมูลการโหวตเดิม (${existing.posterLabel})
        </span>
        <div class="text-xs text-zinc-400 mt-0.5">หากโหวตใหม่จนจบ ระบบจะบันทึกอัปเดตทับเป็นผลโหวตล่าสุดอัตโนมัติ</div>
      `;
      noticeEl.classList.remove('hidden');
    } else {
      noticeEl.classList.add('hidden');
    }
  };
}

function startTournamentFromGate() {
  const studentInput = document.getElementById('student-id-input');
  const studentId = studentInput.value.trim();

  if (!studentId) {
    Toast.show('กรุณากรอกรหัสนักศึกษาก่อนเริ่มโหวต', 'warning');
    studentInput.classList.add('border-rose-500', 'shake');
    const errorEl = document.getElementById('student-id-error');
    if (errorEl) errorEl.classList.remove('hidden');
    studentInput.focus();
    setTimeout(() => {
      studentInput.classList.remove('shake');
    }, 450);
    return;
  }

  if (state.posters.length !== 12) {
    Toast.show('ระบบต้องการโปสเตอร์ 12 รูป กรุณาตรวจสอบในหน้าแอดมิน', 'error');
    return;
  }

  state.studentId = studentId;

  // Initialize engine
  state.tournament = new TournamentEngine();
  state.tournament.onMatchChange = (matchState) => renderMatch(matchState);
  state.tournament.onCompleted = (result) => handleTournamentCompleted(result);

  state.tournament.start(state.posters, studentId);

  document.getElementById('vote-gate-container').classList.add('hidden');
  document.getElementById('vote-victory-container').classList.add('hidden');
  document.getElementById('vote-match-container').classList.remove('hidden');

  Toast.show(`เริ่มการโหวต 11 แมตช์ สำหรับรหัส: ${studentId}`, 'info');
}

function renderMatch(matchState) {
  document.getElementById('match-number-badge').textContent = `แมตช์ที่ ${matchState.overallMatchNumber} / ${matchState.totalMatches}`;
  document.getElementById('match-round-title').textContent = matchState.roundTitle;
  document.getElementById('match-round-badge').textContent = matchState.roundBadge;
  document.getElementById('match-round-info').textContent = matchState.roundInfo;

  const percent = Math.round(((matchState.overallMatchNumber - 1) / matchState.totalMatches) * 100);
  document.getElementById('match-progress-bar').style.width = `${percent}%`;
  document.getElementById('match-progress-text').textContent = `${percent}%`;

  const byeIndicator = document.getElementById('match-bye-indicator');
  if (matchState.currentRound === 3 && matchState.byePoster) {
    byeIndicator.innerHTML = `
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        ได้บายเข้ารอบชิงชนะเลิศ: <strong>${matchState.byePoster.label}</strong>
      </div>
    `;
    byeIndicator.classList.remove('hidden');
  } else {
    byeIndicator.classList.add('hidden');
  }

  // Left & Right Poster Images (Strictly 2:3 ratio, image-only mode)
  const leftCard = document.getElementById('poster-card-left');
  const rightCard = document.getElementById('poster-card-right');
  const leftImg = document.getElementById('poster-img-left');
  const rightImg = document.getElementById('poster-img-right');
  const leftLabel = document.getElementById('poster-label-left');
  const rightLabel = document.getElementById('poster-label-right');

  leftCard.classList.remove('selected', 'opacity-30', 'scale-95');
  rightCard.classList.remove('selected', 'opacity-30', 'scale-95');

  leftImg.src = matchState.leftPoster.imageUrl;
  leftImg.alt = matchState.leftPoster.label;
  leftLabel.textContent = `${matchState.leftPoster.label}`;

  rightImg.src = matchState.rightPoster.imageUrl;
  rightImg.alt = matchState.rightPoster.label;
  rightLabel.textContent = `${matchState.rightPoster.label}`;

  state.isAnimating = false;
}

function choosePoster(side) {
  if (state.isAnimating || !state.tournament || state.tournament.isCompleted) return;
  state.isAnimating = true;

  const leftCard = document.getElementById('poster-card-left');
  const rightCard = document.getElementById('poster-card-right');

  if (side === 'left') {
    leftCard.classList.add('selected');
    rightCard.classList.add('opacity-30', 'scale-95');
  } else {
    rightCard.classList.add('selected');
    leftCard.classList.add('opacity-30', 'scale-95');
  }

  setTimeout(() => {
    state.tournament.choose(side);
  }, 260);
}

// Victory Screen
async function handleTournamentCompleted({ studentId, champion }) {
  document.getElementById('vote-match-container').classList.add('hidden');
  const victoryEl = document.getElementById('vote-victory-container');
  victoryEl.classList.remove('hidden');

  launchConfetti();

  // Record vote in storage (updates existing if same studentId)
  const { isUpdate, voteRecord } = StorageService.recordVote({
    studentId,
    posterCode: champion.code,
    posterLabel: champion.label
  });

  document.getElementById('victory-student-id').textContent = studentId;
  document.getElementById('victory-poster-img').src = champion.imageUrl;
  document.getElementById('victory-poster-label').textContent = `${champion.label} (${champion.code})`;

  const statusBadge = document.getElementById('victory-update-status');
  if (isUpdate) {
    statusBadge.innerHTML = `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">🔄 อัปเดตทับผลโหวตเดิมของคุณเรียบร้อยแล้ว</span>`;
  } else {
    statusBadge.innerHTML = `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">✅ บันทึกผลโหวตใหม่เรียบร้อยแล้ว</span>`;
  }

  Toast.show(`โหวตสำเร็จ! โปสเตอร์ชนะเลิศของคุณคือ ${champion.label}`, 'success');

  // Background Google Sheets Webhook Sync (POST)
  const webhookUrl = StorageService.getWebhookUrl();
  const syncStatusEl = document.getElementById('victory-webhook-status');

  if (webhookUrl) {
    syncStatusEl.innerHTML = `
      <div class="flex items-center gap-2 text-xs text-zinc-400 mt-2">
        <svg class="animate-spin h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
        กำลังส่งข้อมูลไปบันทึกใน Google Sheet...
      </div>
    `;

    const res = await sendVoteToGoogleSheet(studentId, champion.code, champion.label);

    if (res && (res.status === 'success' || res.status !== 'error')) {
      syncStatusEl.innerHTML = `
        <div class="flex items-center gap-2 text-xs text-emerald-400 mt-2 font-medium">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          บันทึกลง Google Sheet สำเร็จเรียบร้อย
        </div>
      `;
    } else {
      syncStatusEl.innerHTML = `
        <div class="flex items-center gap-2 text-xs text-rose-400 mt-2">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          ส่งเข้า Google Sheet ไม่สำเร็จ (เก็บไว้ในระบบแล้ว)
        </div>
      `;
    }
  } else {
    syncStatusEl.innerHTML = `
      <div class="text-xs text-zinc-500 mt-2">
        (ยังไม่ได้ระบุ Google Apps Script Web App URL บันทึกผลในเบราว์เซอร์)
      </div>
    `;
  }
}

function confirmExitTournament() {
  Modal.show({
    title: 'ออกจากหน้าการโหวต?',
    bodyHtml: '<p class="text-zinc-300">การแข่งขันที่กำลังดำเนินอยู่จะไม่ได้รับการบันทึกจนกว่าคุณจะโหวตจนจบรอบชิงชนะเลิศ</p>',
    confirmText: 'ออกจากหน้านี้',
    cancelText: 'โหวตต่อ',
    isDanger: true,
    onConfirm: () => {
      renderVoteGate();
    }
  });
}

// ==========================================
// RENDER LEADERBOARD (TOP 2 & TIE-BREAKER)
// ==========================================
function renderLeaderboard() {
  const { totalVotes, topWinners, posterScores, votes } = calculateLeaderboard();

  // Summary header metrics
  document.getElementById('stat-total-votes').textContent = `${totalVotes} เสียง`;
  document.getElementById('stat-unique-voters').textContent = `${votes.length} คน`;

  // Sync source indicator
  const webhookUrl = StorageService.getWebhookUrl();
  const syncSourceEl = document.getElementById('leaderboard-source-badge');
  const lastSyncTime = StorageService.getLastSyncTime();

  if (syncSourceEl) {
    if (webhookUrl) {
      syncSourceEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          ซิงก์ข้อมูล Google Sheet ${lastSyncTime ? `(${lastSyncTime})` : ''}
        </span>
      `;
    } else {
      syncSourceEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
          💾 ข้อมูลในเครื่อง (localStorage)
        </span>
      `;
    }
  }

  // Top 2 Cards Container
  const topWinnersContainer = document.getElementById('top-winners-cards');
  topWinnersContainer.innerHTML = '';

  if (totalVotes === 0 || topWinners.length === 0) {
    topWinnersContainer.innerHTML = `
      <div class="col-span-full py-16 px-6 text-center rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-800/60 flex items-center justify-center text-zinc-500">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
        </div>
        <h3 class="text-lg font-semibold text-zinc-300 mb-1">ยังไม่มีข้อมูลการโหวต</h3>
        <p class="text-sm text-zinc-500 mb-6">เริ่มโหวตโปสเตอร์เพื่อดูสรุปผล 2 อันดับแรกและตารางคะแนนรวม</p>
        <div class="flex items-center justify-center gap-3">
          <button onclick="switchTab('vote')" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20 transition">
            🎬 เริ่มโหวตคนแรกเลย
          </button>
          ${webhookUrl ? `
            <button onclick="fetchVotesFromGoogleSheet({ showNotification: true })" class="btn-sync-sheet inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition">
              <svg class="sync-icon w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              ดึงข้อมูลจาก Google Sheet
            </button>
          ` : ''}
        </div>
      </div>
    `;
  } else {
    const hasTiedFirst = topWinners.length >= 2 && topWinners[0].rankNumber === 1 && topWinners[1].rankNumber === 1;

    topWinners.forEach((item) => {
      const p = item.poster;
      const isFirst = item.rankNumber === 1;
      const card = document.createElement('div');
      card.className = `relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border ${isFirst ? 'border-amber-500/60 shadow-xl shadow-amber-500/15' : 'border-zinc-700/60 shadow-lg shadow-black/40'} p-5 flex flex-col md:flex-row gap-5 items-center`;

      card.innerHTML = `
        <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${item.badgeColor}">
          ${item.rankLabel}
        </div>

        <div class="w-36 sm:w-44 aspect-poster shrink-0 rounded-xl overflow-hidden shadow-2xl border border-zinc-700/60 relative group">
          <img src="${p.imageUrl}" alt="${p.label}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <span class="text-xs font-bold text-amber-400">${p.code}</span>
          </div>
        </div>

        <div class="flex-1 text-center md:text-left space-y-3 w-full">
          <div>
            <div class="text-xs uppercase tracking-widest text-zinc-400 mb-1">
              ${isFirst ? '🏆 LEADERBOARD WINNER' : '🥈 RUNNER-UP WINNER'}
            </div>
            <h3 class="text-2xl font-bold text-white tracking-tight">${p.label}</h3>
            <p class="text-xs text-amber-400/80 font-mono mt-0.5">รหัสโปสเตอร์: ${p.code}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
            <div class="bg-zinc-800/40 rounded-xl p-3 border border-zinc-800">
              <div class="text-xs text-zinc-400">คะแนนโหวตสุดท้าย</div>
              <div class="text-2xl font-black text-amber-400 mt-0.5">${p.votes} <span class="text-xs font-normal text-zinc-400">เสียง</span></div>
            </div>
            <div class="bg-zinc-800/40 rounded-xl p-3 border border-zinc-800">
              <div class="text-xs text-zinc-400">สัดส่วนผู้เลือก</div>
              <div class="text-2xl font-black text-white mt-0.5">${p.percentage}%</div>
            </div>
          </div>

          <div class="w-full bg-zinc-800/80 rounded-full h-2.5 overflow-hidden">
            <div class="h-full ${isFirst ? 'bg-gradient-to-r from-amber-500 to-amber-300' : 'bg-gradient-to-r from-zinc-400 to-zinc-200'}" style="width: ${p.percentage}%"></div>
          </div>
        </div>
      `;

      topWinnersContainer.appendChild(card);
    });

    if (hasTiedFirst) {
      const banner = document.createElement('div');
      banner.className = 'col-span-full p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3';
      banner.innerHTML = `
        <svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>
          <strong>กติกาพิเศษคะแนนเท่ากัน:</strong> มีโปสเตอร์ที่ได้คะแนนสูงสุด (อันดับ 1) เท่ากัน ${topWinners.length} รูป ระบบจึงแสดงผู้ชนะอันดับ 1 ร่วมทั้ง ${topWinners.length} รูปนี้ทันที โดยไม่ต้องดึงอันดับ 2 มาแสดง
        </div>
      `;
      topWinnersContainer.prepend(banner);
    }
  }

  // Render Full 12-Item Ranking Table
  const tableBody = document.getElementById('leaderboard-table-body');
  tableBody.innerHTML = '';

  posterScores.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-zinc-800/70 hover:bg-zinc-800/30 transition';

    let rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold bg-zinc-800 text-zinc-300">${idx + 1}</span>`;
    if (idx === 0 && p.votes > 0) {
      rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">🥇</span>`;
    } else if (idx === 1 && p.votes > 0) {
      rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold bg-zinc-400/20 text-zinc-300 border border-zinc-400/40">🥈</span>`;
    } else if (idx === 2 && p.votes > 0) {
      rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold bg-amber-700/20 text-amber-600 border border-amber-700/40">🥉</span>`;
    }

    tr.innerHTML = `
      <td class="py-3 px-4 text-center">${rankBadge}</td>
      <td class="py-3 px-4">
        <div class="w-12 aspect-poster rounded-md overflow-hidden border border-zinc-700 shadow shrink-0">
          <img src="${p.imageUrl}" alt="${p.label}" class="w-full h-full object-cover">
        </div>
      </td>
      <td class="py-3 px-4 font-mono text-amber-400 font-semibold">${p.code}</td>
      <td class="py-3 px-4 font-medium text-white">${p.label}</td>
      <td class="py-3 px-4 text-center font-bold text-amber-300">${p.votes}</td>
      <td class="py-3 px-4 text-center font-mono text-xs text-zinc-400">${p.percentage}%</td>
      <td class="py-3 px-4 w-44">
        <div class="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-amber-500 to-amber-300" style="width: ${p.percentage}%"></div>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // Render Voter History Table
  const historyBody = document.getElementById('voter-history-table-body');
  historyBody.innerHTML = '';

  if (votes.length === 0) {
    historyBody.innerHTML = `
      <tr>
        <td colspan="4" class="py-8 text-center text-zinc-500 text-sm">ยังไม่มีประวัติการโหวต</td>
      </tr>
    `;
  } else {
    [...votes].reverse().forEach(v => {
      const code = v.posterCode || v.winnerId;
      const poster = allPosters.find(p => p.code === code) || { label: v.posterLabel || v.winnerLabel, imageUrl: '' };
      const tr = document.createElement('tr');
      tr.className = 'border-b border-zinc-800/70 hover:bg-zinc-800/30 transition text-sm';

      tr.innerHTML = `
        <td class="py-3 px-4 text-xs font-mono text-zinc-400">${v.timestamp || '-'}</td>
        <td class="py-3 px-4 font-mono font-semibold text-white">${v.studentId}</td>
        <td class="py-3 px-4">
          <div class="flex items-center gap-2.5">
            ${poster.imageUrl ? `<div class="w-8 aspect-poster rounded overflow-hidden border border-zinc-700 shrink-0"><img src="${poster.imageUrl}" class="w-full h-full object-cover"></div>` : ''}
            <div>
              <span class="font-mono text-amber-400 text-xs font-bold">[${code}]</span>
              <span class="text-zinc-200 font-medium ml-1">${v.posterLabel || v.winnerLabel || ''}</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-4 text-right">
          <button data-delete-id="${v.studentId}" class="btn-delete-single px-3 py-1 text-xs rounded-lg text-rose-400 hover:text-white hover:bg-rose-600/30 transition">
            ลบ
          </button>
        </td>
      `;

      const delBtn = tr.querySelector('.btn-delete-single');
      delBtn.onclick = () => {
        Modal.show({
          title: `ลบผลโหวตของรหัส ${v.studentId}?`,
          bodyHtml: `<p class="text-zinc-300">คุณต้องการลบผลการโหวตของรหัสนักศึกษา <strong>${v.studentId}</strong> ใช่หรือไม่?</p>`,
          confirmText: 'ลบผลโหวต',
          cancelText: 'ยกเลิก',
          isDanger: true,
          onConfirm: () => {
            StorageService.deleteVoteByStudentId(v.studentId);
            Toast.show(`ลบผลโหวตรหัส ${v.studentId} สำเร็จ`, 'info');
            renderLeaderboard();
          }
        });
      };

      historyBody.appendChild(tr);
    });
  }
}

function confirmClearAllVotes() {
  const votes = StorageService.getVotes();
  if (votes.length === 0) {
    Toast.show('ไม่มีข้อมูลโหวตให้ล้าง', 'info');
    return;
  }

  Modal.show({
    title: '⚠️ ล้างผลโหวตทั้งหมด?',
    bodyHtml: `
      <p class="text-zinc-300 mb-2">คุณกำลังจะลบประวัติการโหวตของนักศึกษาทั้งหมดจำนวน <strong>${votes.length} รายการ</strong> ในเครื่อง</p>
      <p class="text-rose-400 text-xs">คะแนนและผลสรุปทั้งหมดจะถูกรีเซ็ตเป็นศูนย์ทันที</p>
    `,
    confirmText: 'ยืนยันล้างทั้งหมด',
    cancelText: 'ยกเลิก',
    isDanger: true,
    onConfirm: () => {
      StorageService.clearAllVotes();
      Toast.show('ล้างข้อมูลการโหวตเรียบร้อยแล้ว', 'success');
      renderLeaderboard();
    }
  });
}

// ==========================================
// ADMIN & POSTER MANAGEMENT VIEW
// ==========================================
function renderAdmin() {
  const webhookInput = document.getElementById('admin-webhook-url');
  webhookInput.value = StorageService.getWebhookUrl();

  const grid = document.getElementById('admin-posters-grid');
  grid.innerHTML = '';

  state.posters.forEach((poster) => {
    const card = document.createElement('div');
    card.className = 'bg-zinc-900/80 rounded-2xl border border-zinc-800 p-4 flex flex-col gap-3 hover:border-zinc-700 transition';

    card.innerHTML = `
      <div class="relative w-full aspect-poster rounded-xl overflow-hidden bg-black/50 border border-zinc-800 group shadow-lg">
        <img id="admin-preview-${poster.code}" src="${poster.imageUrl}" alt="${poster.label}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
          <div>
            <span class="inline-block px-2 py-0.5 rounded text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-1">${poster.code}</span>
            <div class="text-sm font-semibold text-white">${poster.label}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 mt-auto">
        <label class="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition">
          <svg class="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          เปลี่ยนไฟล์
          <input type="file" accept="image/*" class="hidden single-file-input" data-code="${poster.code}">
        </label>
        
        <button class="btn-url-input inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition" data-code="${poster.code}">
          <svg class="w-3.5 h-3.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          วางลิงก์
        </button>
      </div>
    `;

    const fileInput = card.querySelector('.single-file-input');
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      Toast.show(`กำลังประมวลผลรูปภาพ ${poster.label}...`, 'info');
      try {
        const compressedDataUrl = await compressAndResizeImage(file);
        await StorageService.updateSinglePoster(poster.code, compressedDataUrl);
        state.posters = await StorageService.getPosters();
        const preview = document.getElementById(`admin-preview-${poster.code}`);
        if (preview) preview.src = compressedDataUrl;
        Toast.show(`อัปเดต ${poster.label} สำเร็จ`, 'success');
      } catch (err) {
        Toast.show('เกิดข้อผิดพลาดในการแปลงรูปภาพ', 'error');
      }
    };

    const urlBtn = card.querySelector('.btn-url-input');
    urlBtn.onclick = () => {
      promptImageUrlModal(poster);
    };

    grid.appendChild(card);
  });
}

function promptImageUrlModal(poster) {
  const bodyHtml = `
    <div class="space-y-4">
      <p class="text-xs text-zinc-400">วาง URL ของรูปภาพสำหรับ <strong>${poster.label} (${poster.code})</strong></p>
      <input type="url" id="modal-image-url-input" placeholder="https://example.com/poster.jpg" value="${poster.imageUrl.startsWith('data:') ? '' : poster.imageUrl}" class="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-amber-400 font-mono">
      <div class="aspect-poster w-32 mx-auto rounded-lg overflow-hidden border border-zinc-700 bg-black/40">
        <img id="modal-image-preview" src="${poster.imageUrl}" class="w-full h-full object-cover">
      </div>
    </div>
  `;

  Modal.show({
    title: `ใส่ Image URL: ${poster.label}`,
    bodyHtml,
    confirmText: 'บันทึกรูปภาพ',
    cancelText: 'ยกเลิก',
    onConfirm: async () => {
      const input = document.getElementById('modal-image-url-input');
      const url = input ? input.value.trim() : '';
      if (!url) {
        Toast.show('ไม่ได้ระบุ URL', 'warning');
        return;
      }
      try {
        await StorageService.updateSinglePoster(poster.code, url);
        state.posters = await StorageService.getPosters();
        renderAdmin();
        Toast.show(`อัปเดต ${poster.label} สำเร็จ`, 'success');
      } catch (e) {
        Toast.show('ไม่สามารถบันทึกรูปภาพได้', 'error');
      }
    }
  });

  setTimeout(() => {
    const input = document.getElementById('modal-image-url-input');
    const preview = document.getElementById('modal-image-preview');
    if (input && preview) {
      input.oninput = () => {
        if (input.value.trim()) {
          preview.src = input.value.trim();
        }
      };
    }
  }, 50);
}

async function handleBulkUpload(files) {
  if (!files || files.length === 0) return;

  const count = Math.min(files.length, 12);
  Toast.show(`กำลังประมวลผลรูปภาพ ${count} รูปพร้อมกัน...`, 'info', 5000);

  try {
    const currentPosters = await StorageService.getPosters();
    for (let i = 0; i < count; i++) {
      const file = files[i];
      const dataUrl = await compressAndResizeImage(file);
      currentPosters[i].imageUrl = dataUrl;
    }

    await StorageService.savePosters(currentPosters);
    state.posters = currentPosters;
    renderAdmin();
    Toast.show(`📁 อัปโหลดสำเร็จ ${count} รูปเรียบร้อยแล้ว`, 'success');
  } catch (err) {
    console.error('Bulk upload error:', err);
    Toast.show('เกิดข้อผิดพลาดในการอัปโหลดหลายรูป', 'error');
  }
}

function confirmResetPosters() {
  Modal.show({
    title: 'รีเซ็ตโปสเตอร์เป็นค่าเริ่มต้น?',
    bodyHtml: '<p class="text-zinc-300">โปสเตอร์ทั้ง 12 รูปจะถูกเปลี่ยนกลับเป็นรูปตัวอย่างภาพยนตร์ SVG แบบ Dark Cinema ดั้งเดิม</p>',
    confirmText: 'รีเซ็ตทั้งหมด',
    cancelText: 'ยกเลิก',
    isDanger: true,
    onConfirm: async () => {
      await StorageService.resetPostersToDefault();
      state.posters = await StorageService.getPosters();
      renderAdmin();
      Toast.show('รีเซ็ตโปสเตอร์ทั้ง 12 รูปกลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว', 'success');
    }
  });
}

function saveWebhookUrl() {
  const input = document.getElementById('admin-webhook-url');
  const url = input.value.trim();
  StorageService.setWebhookUrl(url);
  Toast.show('บันทึก Google Sheet Web App URL สำเร็จ', 'success');
  renderLeaderboard();
}

async function testWebhookConnection() {
  const url = StorageService.getWebhookUrl();
  if (!url) {
    Toast.show('กรุณาระบุ Webhook URL ก่อนทดสอบ', 'warning');
    return;
  }

  Toast.show('กำลังส่งข้อมูลทดสอบไปยัง Google Sheet (POST)...', 'info');

  const postRes = await sendVoteToGoogleSheet('TEST-999', 'P01', 'โปสเตอร์ #1 (ทดสอบการเชื่อมต่อ)');

  if (postRes && (postRes.status === 'success' || postRes.status !== 'error')) {
    Toast.show('✅ ส่งข้อมูลทดสอบ (POST) เข้า Google Sheet สำเร็จ!', 'success', 4000);
    // Also test GET
    setTimeout(async () => {
      Toast.show('กำลังทดสอบดึงข้อมูล (GET) จาก Google Sheet...', 'info');
      await fetchVotesFromGoogleSheet({ showNotification: true });
    }, 1200);
  } else {
    Toast.show('❌ ไม่สามารถเชื่อมต่อ Webhook URL ได้ กรุณาตรวจสอบ URL', 'error', 5000);
  }
}

// Show Google Apps Script Code Modal
function showAppsScriptGuideModal() {
  const scriptCode = `// Google Apps Script สำหรับ CineVote
// รองรับทั้ง POST บันทึกผลโหวต และ GET ดึงข้อมูลผลโหวตทั้งหมดแบบ Real-Time

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var data = [];

    // แถวที่ 0 คือหัวตาราง [วันเวลา, รหัสนักศึกษา, รหัสโปสเตอร์, โปสเตอร์สุดท้ายที่เลือก]
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (row[1]) { // มีรหัสนักศึกษา
        data.push({
          timestamp: row[0] ? String(row[0]) : '',
          studentId: String(row[1]).trim(),
          winnerId: String(row[2]).trim(),
          posterCode: String(row[2]).trim(),
          winnerLabel: String(row[3]).trim(),
          posterLabel: String(row[3]).trim()
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", count: data.length, votes: data, data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // สร้างหัวตารางอัตโนมัติหากชีตยังว่างอยู่
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["วันเวลา (Timestamp)", "รหัสนักศึกษา", "รหัสโปสเตอร์", "โปสเตอร์สุดท้ายที่เลือก"]);
      var headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
    }

    var payload = JSON.parse(e.postData.contents);
    var studentId = String(payload.studentId || "").trim();
    var posterCode = String(payload.winnerId || payload.posterCode || "").trim();
    var posterLabel = String(payload.winnerLabel || payload.posterLabel || "").trim();
    var timestamp = payload.timestamp || Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");

    if (!studentId || !posterCode) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Missing studentId or winnerId" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ตรวจสอบว่ารหัสนักศึกษาเดิมเคยโหวตแล้วหรือไม่ (คอลัมน์ B / index 1)
    // หากมีอยู่แล้ว -> อัปเดตทับแถวเดิมตามกติกา
    var values = sheet.getDataRange().getValues();
    var foundRow = -1;
    for (var i = 1; i < values.length; i++) {
      if (String(values[i][1]).trim().toLowerCase() === studentId.toLowerCase()) {
        foundRow = i + 1; // ลำดับแถวใน Google Sheet เริ่มที่ 1
        break;
      }
    }

    if (foundRow > 0) {
      sheet.getRange(foundRow, 1, 1, 4).setValues([[timestamp, studentId, posterCode, posterLabel]]);
    } else {
      sheet.appendRow([timestamp, studentId, posterCode, posterLabel]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", updated: foundRow > 0, studentId: studentId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

  const bodyHtml = `
    <div class="space-y-4 text-sm text-zinc-300">
      <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
        💡 โค้ดนี้รองรับทั้ง <strong>POST</strong> เพื่อบันทึกผลและอัปเดตทับรหัสเดิม และ <strong>GET</strong> เพื่อให้หน้า Leaderboard ดึงคะแนนมาสรุปผล Top 2 แบบ Real-Time
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-semibold text-zinc-400">โค้ด Google Apps Script (doGet & doPost):</span>
          <button id="btn-copy-script" class="px-2.5 py-1 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-semibold transition">
            📋 คัดลอกโค้ด
          </button>
        </div>
        <pre class="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 font-mono overflow-x-auto max-h-56 leading-relaxed select-all"><code>${scriptCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>

      <div class="space-y-2 text-xs text-zinc-400">
        <div class="font-bold text-zinc-200">📌 ขั้นตอนการติดตั้ง (Deployment):</div>
        <ol class="list-decimal pl-4 space-y-1.5">
          <li>เปิด <a href="https://sheets.new" target="_blank" class="text-amber-400 underline">Google Sheets</a> สร้างสเปรดชีตใหม่</li>
          <li>ไปที่เมนู <strong>ส่วนขยาย (Extensions)</strong> &gt; <strong>Apps Script</strong></li>
          <li>ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดด้านบนนี้ลงไป จากนั้นกด <strong>บันทึก (Save)</strong></li>
          <li>กดปุ่มสีน้ำเงิน <strong>ทำให้ใช้งานได้ (Deploy)</strong> &gt; <strong>การทำให้ใช้งานได้รายการใหม่ (New deployment)</strong></li>
          <li>เลือกประเภท: <strong>เว็บแอปพลิเคชัน (Web app)</strong></li>
          <li>ตั้งค่าสำคัญ:
            <ul class="list-disc pl-4 mt-1 text-zinc-300">
              <li>เรียกใช้ในฐานะ (Execute as): <strong>ฉัน (Me)</strong></li>
              <li>ผู้มีสิทธิ์เข้าถึง (Who has access): <strong>ทุกคน (Anyone)</strong> *(สำคัญมาก!)*</li>
            </ul>
          </li>
          <li>กดปุ่ม <strong>ทำให้ใช้งานได้ (Deploy)</strong> และให้สิทธิ์เข้าถึง (Authorize Access)</li>
          <li>คัดลอก <strong>URL เว็บแอปพลิเคชัน (Web app URL)</strong> มาวางในช่อง Google Sheet URL ในหน้าแอดมิน</li>
        </ol>
      </div>
    </div>
  `;

  Modal.show({
    title: 'คู่มือเชื่อมต่อ Google Sheets API',
    bodyHtml,
    confirmText: '',
    cancelText: 'ปิดหน้านี้',
    onConfirm: null
  });

  setTimeout(() => {
    const copyBtn = document.getElementById('btn-copy-script');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(scriptCode);
        copyBtn.textContent = '✅ คัดลอกแล้ว!';
        setTimeout(() => { copyBtn.textContent = '📋 คัดลอกโค้ด'; }, 2000);
      };
    }
  }, 50);
}

// ==========================================
// KEYBOARD NAVIGATION (← / → ARROWS)
// ==========================================
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const matchContainer = document.getElementById('vote-match-container');
    if (matchContainer && !matchContainer.classList.contains('hidden') && state.tournament && !state.tournament.isCompleted) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        choosePoster('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        choosePoster('right');
      }
    }
  });
}

// ==========================================
// INITIALIZATION
// ==========================================
async function initApp() {
  Toast.init();
  Modal.init();

  state.posters = await StorageService.getPosters();

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => switchTab(btn.getAttribute('data-tab'));
  });

  // Start vote
  document.getElementById('start-vote-btn').onclick = () => startTournamentFromGate();
  document.getElementById('student-id-input').onkeydown = (e) => {
    if (e.key === 'Enter') startTournamentFromGate();
  };

  // Quick sample student ID helper
  const quickSampleBtn = document.getElementById('btn-quick-sample-id');
  if (quickSampleBtn) {
    quickSampleBtn.onclick = () => {
      const input = document.getElementById('student-id-input');
      input.value = '66010001';
      input.dispatchEvent(new Event('input'));
      startTournamentFromGate();
    };
  }

  // Match poster click
  document.getElementById('poster-card-left').onclick = () => choosePoster('left');
  document.getElementById('poster-card-right').onclick = () => choosePoster('right');

  // Keyboard navigation
  setupKeyboardNavigation();

  // Bulk upload
  const bulkInput = document.getElementById('bulk-upload-input');
  bulkInput.onchange = (e) => handleBulkUpload(e.target.files);

  // Admin actions
  document.getElementById('btn-save-webhook').onclick = saveWebhookUrl;
  document.getElementById('btn-test-webhook').onclick = testWebhookConnection;
  document.getElementById('btn-guide-webhook').onclick = showAppsScriptGuideModal;
  document.getElementById('btn-reset-posters').onclick = confirmResetPosters;

  // Sync buttons (Leaderboard & Admin)
  document.querySelectorAll('.btn-sync-sheet').forEach(btn => {
    btn.onclick = () => fetchVotesFromGoogleSheet({ showNotification: true });
  });

  // CSV download buttons
  document.querySelectorAll('.btn-download-csv').forEach(btn => {
    btn.onclick = downloadVotesCSV;
  });

  // Clear votes
  document.getElementById('btn-clear-votes').onclick = confirmClearAllVotes;

  // Victory buttons
  document.getElementById('victory-to-leaderboard-btn').onclick = () => switchTab('leaderboard');
  document.getElementById('victory-revote-btn').onclick = () => renderVoteGate();

  // Exit match button
  document.getElementById('btn-exit-match').onclick = confirmExitTournament;

  // Initial render
  renderVoteGate();
}

window.addEventListener('DOMContentLoaded', initApp);
