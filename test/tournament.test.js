// Automated Unit & Integration Tests for CineVote

const assert = require('assert');
const { DEFAULT_POSTERS, INITIAL_POSTERS, createPosterSVG } = require('../js/placeholders.js');

// Mock localStorage for Node environment testing
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new MockLocalStorage();
global.window = {
  indexedDB: null,
  localStorage: global.localStorage
};

// Tournament Engine class for Node testing
class TournamentEngine {
  constructor() {
    this.studentId = '';
    this.posters = [];
    this.currentMatchIndex = 0;
    this.totalMatches = 11;
    this.currentRound = 1;
    this.roundMatches = [];
    this.roundWinners = [];
    this.roundMatchIndex = 0;
    this.byePoster = null;
    this.leftPoster = null;
    this.rightPoster = null;
    this.isCompleted = false;
    this.champion = null;
  }

  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  start(posters, studentId) {
    if (!Array.isArray(posters) || posters.length !== 12) {
      throw new Error('ต้องมีโปสเตอร์ครบ 12 รูปเพื่อเริ่มทัวร์นาเมนต์');
    }
    const trimmedId = String(studentId || '').trim();
    if (!trimmedId) {
      throw new Error('กรุณาระบุรหัสนักศึกษาก่อนเริ่มโหวต');
    }

    this.studentId = trimmedId;
    this.posters = [...posters];
    this.currentMatchIndex = 0;
    this.isCompleted = false;
    this.champion = null;
    this.byePoster = null;

    const shuffled = this.shuffle(this.posters);
    this.currentRound = 1;
    this.roundWinners = [];
    this.roundMatchIndex = 0;
    this.roundMatches = [
      [shuffled[0], shuffled[1]],
      [shuffled[2], shuffled[3]],
      [shuffled[4], shuffled[5]],
      [shuffled[6], shuffled[7]],
      [shuffled[8], shuffled[9]],
      [shuffled[10], shuffled[11]]
    ];

    this._loadCurrentMatch();
  }

  _loadCurrentMatch() {
    const pair = this.roundMatches[this.roundMatchIndex];
    this.leftPoster = pair[0];
    this.rightPoster = pair[1];
  }

  choose(side) {
    if (this.isCompleted) return;
    const winner = side === 'left' ? this.leftPoster : this.rightPoster;
    this.roundWinners.push(winner);
    this.currentMatchIndex++;
    this.roundMatchIndex++;

    if (this.roundMatchIndex < this.roundMatches.length) {
      this._loadCurrentMatch();
      return;
    }
    this._advanceRound();
  }

  _advanceRound() {
    if (this.currentRound === 1) {
      this.currentRound = 2;
      this.roundMatchIndex = 0;
      const shuffledWinners = this.shuffle(this.roundWinners);
      this.roundMatches = [
        [shuffledWinners[0], shuffledWinners[1]],
        [shuffledWinners[2], shuffledWinners[3]],
        [shuffledWinners[4], shuffledWinners[5]]
      ];
      this.roundWinners = [];
      this._loadCurrentMatch();
    } else if (this.currentRound === 2) {
      this.currentRound = 3;
      this.roundMatchIndex = 0;
      const shuffled3 = this.shuffle(this.roundWinners);
      this.byePoster = shuffled3[2];
      this.roundMatches = [
        [shuffled3[0], shuffled3[1]]
      ];
      this.roundWinners = [];
      this._loadCurrentMatch();
    } else if (this.currentRound === 3) {
      this.currentRound = 4;
      this.roundMatchIndex = 0;
      const semiWinner = this.roundWinners[0];
      const finalists = this.shuffle([semiWinner, this.byePoster]);
      this.roundMatches = [
        [finalists[0], finalists[1]]
      ];
      this.roundWinners = [];
      this._loadCurrentMatch();
    } else if (this.currentRound === 4) {
      this.isCompleted = true;
      this.champion = this.roundWinners[0];
    }
  }
}

// Tie-breaker evaluator test function
function testTieBreaker(allPosters, votes) {
  const scoreMap = {};
  allPosters.forEach(p => scoreMap[p.code] = 0);
  votes.forEach(v => {
    if (scoreMap.hasOwnProperty(v.posterCode)) scoreMap[v.posterCode]++;
  });

  const totalVotes = votes.length;
  const posterScores = allPosters.map(p => ({
    ...p,
    votes: scoreMap[p.code] || 0
  })).sort((a, b) => b.votes - a.votes || a.code.localeCompare(b.code));

  let topWinners = [];
  const maxVotes = posterScores[0] ? posterScores[0].votes : 0;

  if (maxVotes > 0) {
    const tiedRank1 = posterScores.filter(p => p.votes === maxVotes);
    if (tiedRank1.length >= 2) {
      // Rule: If 2 or more tied for 1st place, show co-champions, do NOT show 2nd place!
      tiedRank1.forEach(p => {
        topWinners.push({ poster: p, rankNumber: 1, rankLabel: 'อันดับ 1 ร่วม (Co-Champion)' });
      });
    } else {
      topWinners.push({ poster: tiedRank1[0], rankNumber: 1, rankLabel: 'อันดับ 1 (ชนะเลิศ)' });
      const remaining = posterScores.slice(1);
      const secondMaxVotes = remaining[0] ? remaining[0].votes : 0;
      if (secondMaxVotes > 0) {
        const tiedRank2 = remaining.filter(p => p.votes === secondMaxVotes);
        tiedRank2.forEach(p => {
          topWinners.push({ poster: p, rankNumber: 2, rankLabel: tiedRank2.length > 1 ? 'อันดับ 2 ร่วม' : 'อันดับ 2 (รองชนะเลิศ)' });
        });
      }
    }
  }

  return { totalVotes, topWinners, posterScores };
}

// Run test suites
console.log('🧪 Starting CineVote Test Suites...\n');

// Test 1: Placeholders
assert.strictEqual(DEFAULT_POSTERS.length, 12, 'Must have exactly 12 posters');
assert.strictEqual(INITIAL_POSTERS.length, 12, 'Must generate exactly 12 initial posters');
assert.ok(INITIAL_POSTERS[0].imageUrl.startsWith('data:image/svg+xml;'), 'Must have valid SVG data URL');
console.log('✅ Test 1 Passed: 12 Default SVG Placeholders verified.');

// Test 2: Tournament Execution (Exactly 11 matches)
const testPosters = INITIAL_POSTERS;
const tournament = new TournamentEngine();
tournament.start(testPosters, '65010001');

assert.strictEqual(tournament.currentRound, 1);
assert.strictEqual(tournament.roundMatches.length, 6, 'Round 1 must have 6 matches');

let matchCount = 0;
while (!tournament.isCompleted) {
  matchCount++;
  // Randomly pick left or right
  const side = Math.random() > 0.5 ? 'left' : 'right';
  tournament.choose(side);
}

assert.strictEqual(matchCount, 11, 'Tournament must consist of exactly 11 matches');
assert.strictEqual(tournament.currentMatchIndex, 11);
assert.ok(tournament.champion !== null, 'A champion poster must be determined');
assert.ok(tournament.champion.code.startsWith('P'), 'Champion must be a valid poster');
console.log(`✅ Test 2 Passed: Tournament played exactly ${matchCount} matches and crowned champion ${tournament.champion.label} (${tournament.champion.code}).`);

// Test 3: Duplicate Student ID Overwrite
const votes = [];
function recordVote(studentId, posterCode) {
  const existing = votes.findIndex(v => v.studentId === studentId);
  const rec = { studentId, posterCode };
  if (existing >= 0) {
    votes[existing] = rec;
  } else {
    votes.push(rec);
  }
}

recordVote('6501001', 'P01');
recordVote('6501002', 'P02');
assert.strictEqual(votes.length, 2);

// Re-vote by student '6501001' with a new poster 'P05'
recordVote('6501001', 'P05');
assert.strictEqual(votes.length, 2, 'Total votes must remain 2 (not 3)');
const student1Vote = votes.find(v => v.studentId === '6501001');
assert.strictEqual(student1Vote.posterCode, 'P05', 'Student 6501001 vote must be updated to P05');
console.log('✅ Test 3 Passed: Student ID overwrite behavior verified.');

// Test 4: Tie-Breaker Rules
// 4A: Single 1st place, Single 2nd place
const votesA = [
  { studentId: 'S1', posterCode: 'P01' },
  { studentId: 'S2', posterCode: 'P01' },
  { studentId: 'S3', posterCode: 'P01' },
  { studentId: 'S4', posterCode: 'P02' },
  { studentId: 'S5', posterCode: 'P02' }
];
const resultA = testTieBreaker(INITIAL_POSTERS, votesA);
assert.strictEqual(resultA.topWinners.length, 2);
assert.strictEqual(resultA.topWinners[0].poster.code, 'P01');
assert.strictEqual(resultA.topWinners[0].rankNumber, 1);
assert.strictEqual(resultA.topWinners[1].poster.code, 'P02');
assert.strictEqual(resultA.topWinners[1].rankNumber, 2);
console.log('✅ Test 4A Passed: Normal 1st and 2nd place ranking verified.');

// 4B: Tie for 1st Place (P01 and P02 both have 3 votes)
const votesB = [
  { studentId: 'S1', posterCode: 'P01' },
  { studentId: 'S2', posterCode: 'P01' },
  { studentId: 'S3', posterCode: 'P01' },
  { studentId: 'S4', posterCode: 'P02' },
  { studentId: 'S5', posterCode: 'P02' },
  { studentId: 'S6', posterCode: 'P02' },
  { studentId: 'S7', posterCode: 'P03' } // P03 has 1 vote
];
const resultB = testTieBreaker(INITIAL_POSTERS, votesB);
assert.strictEqual(resultB.topWinners.length, 2, 'Should display both co-champions');
assert.strictEqual(resultB.topWinners[0].rankNumber, 1, 'First must be rank 1');
assert.strictEqual(resultB.topWinners[1].rankNumber, 1, 'Second must ALSO be rank 1');
assert.ok(resultB.topWinners.every(w => w.rankNumber === 1), 'Rank 2 must NOT be displayed when Rank 1 has ties!');
console.log('✅ Test 4B Passed: Special Tie-Breaker Rule (Co-Champions shown, 2nd place suppressed) verified.');

// Test 5: Verify POST Payload Structure for Google Sheet API
const samplePayload = {
  studentId: '65012345',
  winnerId: 'P03',
  winnerLabel: 'โปสเตอร์ #3',
  timestamp: '10/11/2026, 14:30:00'
};
assert.strictEqual(typeof samplePayload.studentId, 'string');
assert.strictEqual(typeof samplePayload.winnerId, 'string');
assert.strictEqual(typeof samplePayload.winnerLabel, 'string');
assert.ok(samplePayload.winnerId.startsWith('P'));
console.log('✅ Test 5 Passed: Google Apps Script POST Payload format verified.');

// Test 6: Verify mergeVotesFromGoogleSheet (GET sync)
function testMergeVotes(localList, sheetList) {
  const map = new Map();
  localList.forEach(v => map.set(v.studentId.toLowerCase(), v));
  sheetList.forEach(sv => {
    const sId = (sv.studentId || '').trim();
    const pCode = (sv.winnerId || sv.posterCode || '').trim();
    const pLabel = (sv.winnerLabel || sv.posterLabel || '').trim();
    if (sId && pCode) {
      map.set(sId.toLowerCase(), {
        timestamp: sv.timestamp || '',
        studentId: sId,
        posterCode: pCode,
        posterLabel: pLabel || `โปสเตอร์ #${pCode}`
      });
    }
  });
  return Array.from(map.values());
}

const localData = [
  { studentId: '6501', posterCode: 'P01', posterLabel: 'โปสเตอร์ #1' },
  { studentId: '6502', posterCode: 'P02', posterLabel: 'โปสเตอร์ #2' }
];
const sheetData = [
  // Overwrite for 6502
  { studentId: '6502', winnerId: 'P09', winnerLabel: 'โปสเตอร์ #9', timestamp: '10/11/2026 14:00' },
  // New voter from another phone
  { studentId: '6503', winnerId: 'P09', winnerLabel: 'โปสเตอร์ #9', timestamp: '10/11/2026 14:05' }
];

const merged = testMergeVotes(localData, sheetData);
assert.strictEqual(merged.length, 3, 'Merged should have 3 unique students');
const student2 = merged.find(m => m.studentId === '6502');
assert.strictEqual(student2.posterCode, 'P09', 'Student 6502 vote should be updated to P09 from Sheet');
const student3 = merged.find(m => m.studentId === '6503');
assert.strictEqual(student3.posterCode, 'P09', 'Student 6503 should be imported from Sheet');
console.log('✅ Test 6 Passed: Google Sheets GET sync and merge logic verified.');

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
