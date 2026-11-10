// 12-Item Tournament Engine (1v1 Knockout - Exactly 11 Matches)
// Round 1: 12 -> 6 (6 matches)
// Round 2: 6 -> 3 (3 matches)
// Semi-Final: 3 -> 2 (1 match, 1 gets a bye into the final)
// Final: 2 -> 1 (1 match between semi-final winner and bye poster)
// Total matches = 6 + 3 + 1 + 1 = 11 matches!

class TournamentEngine {
  constructor() {
    this.studentId = '';
    this.posters = [];
    this.currentMatchIndex = 0; // 0 to 10 (total 11 matches)
    this.totalMatches = 11;

    // Round tracking
    this.currentRound = 1; // 1, 2, 3 (Semi), 4 (Final)
    this.roundMatches = []; // Array of pairs in current round: [[pA, pB], ...]
    this.roundWinners = []; // Winners of current round
    this.roundMatchIndex = 0; // Match index inside current round
    
    // Bye tracking for Round 3
    this.byePoster = null;

    // Current active pair
    this.leftPoster = null;
    this.rightPoster = null;

    // Completed state
    this.isCompleted = false;
    this.champion = null;

    // Listeners
    this.onMatchChange = null;
    this.onCompleted = null;
  }

  // Fisher-Yates array shuffle
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

    // 1. Randomize all 12 posters
    const shuffled = this.shuffle(this.posters);

    // 2. Prepare Round 1: 6 matches (12 -> 6)
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

    if (this.onMatchChange) {
      this.onMatchChange(this.getMatchState());
    }
  }

  choose(side) {
    if (this.isCompleted) return;

    const winner = side === 'left' ? this.leftPoster : this.rightPoster;
    const loser = side === 'left' ? this.rightPoster : this.leftPoster;

    this.roundWinners.push(winner);
    this.currentMatchIndex++;
    this.roundMatchIndex++;

    // Check if current round has more matches
    if (this.roundMatchIndex < this.roundMatches.length) {
      // Next match in same round
      this._loadCurrentMatch();
      return;
    }

    // Round ended, advance to next round!
    this._advanceRound();
  }

  _advanceRound() {
    if (this.currentRound === 1) {
      // Round 1 ended: 6 winners advancing to Round 2 (6 -> 3)
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
      // Round 2 ended: 3 winners advancing to Round 3 (Semi-Final: 3 -> 2)
      // Pick 1 to get a BYE into the final!
      this.currentRound = 3;
      this.roundMatchIndex = 0;
      const shuffled3 = this.shuffle(this.roundWinners);
      this.byePoster = shuffled3[2]; // Gets the bye!
      this.roundMatches = [
        [shuffled3[0], shuffled3[1]]
      ];
      this.roundWinners = [];
      this._loadCurrentMatch();
    } else if (this.currentRound === 3) {
      // Round 3 (Semi-Final) ended: 1 winner from match + 1 bye poster = 2 finalists!
      this.currentRound = 4; // Final
      this.roundMatchIndex = 0;
      const semiWinner = this.roundWinners[0];
      const finalists = this.shuffle([semiWinner, this.byePoster]);
      this.roundMatches = [
        [finalists[0], finalists[1]]
      ];
      this.roundWinners = [];
      this._loadCurrentMatch();
    } else if (this.currentRound === 4) {
      // Round 4 (Final) ended! Champion selected!
      this.isCompleted = true;
      this.champion = this.roundWinners[0];

      if (this.onCompleted) {
        this.onCompleted({
          studentId: this.studentId,
          champion: this.champion
        });
      }
    }
  }

  getRoundLabel() {
    switch (this.currentRound) {
      case 1:
        return {
          title: 'รอบที่ 1 (รอบ 12 รูป)',
          badge: 'Round 1 / 6 Matches',
          info: 'คัดเลือก 6 รูปที่ดีที่สุด'
        };
      case 2:
        return {
          title: 'รอบที่ 2 (รอบ 6 รูป)',
          badge: 'Round 2 / 3 Matches',
          info: 'คัดเลือก 3 รูปเข้าสู่รอบรองชนะเลิศ'
        };
      case 3:
        return {
          title: 'รอบรองชนะเลิศ (Semi-Final)',
          badge: 'Semi-Final',
          info: `ดวล 1 คู่ (มี 1 รูปได้รับสิทธิ์บายเข้าชิงอัตโนมัติ: ${this.byePoster ? this.byePoster.label : ''})`
        };
      case 4:
        return {
          title: 'รอบชิงชนะเลิศ (The Grand Final)',
          badge: 'Final Match',
          info: 'ตัดสินโปสเตอร์ที่ชนะเลิศเพียง 1 รูป!'
        };
      default:
        return { title: '', badge: '', info: '' };
    }
  }

  getMatchState() {
    const roundInfo = this.getRoundLabel();
    const overallMatchNumber = this.currentMatchIndex + 1;
    const progressPercent = Math.min(100, Math.round(((overallMatchNumber - 1) / this.totalMatches) * 100));

    return {
      currentMatchIndex: this.currentMatchIndex, // 0 to 10
      overallMatchNumber, // 1 to 11
      totalMatches: this.totalMatches, // 11
      progressPercent,
      currentRound: this.currentRound,
      roundTitle: roundInfo.title,
      roundBadge: roundInfo.badge,
      roundInfo: roundInfo.info,
      roundMatchNumber: this.roundMatchIndex + 1,
      totalRoundMatches: this.roundMatches.length,
      leftPoster: this.leftPoster,
      rightPoster: this.rightPoster,
      byePoster: this.byePoster,
      isCompleted: this.isCompleted,
      champion: this.champion,
      studentId: this.studentId
    };
  }
}

window.TournamentEngine = TournamentEngine;
