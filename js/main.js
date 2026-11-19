/**
 * MOVIE PORTFOLIO — CREMA-Inspired Horror Scrollytelling & Portfolio Engine
 * ---------------------------------------------------------------------------
 * 1. 5-Stage Smooth Scroll-Scrubbed Ghost Choreography (`initGhostScrollytelling`):
 *    - Stage 1 (0.00–0.22): Crimson blood stream pours into antique Thai silver bowl
 *    - Stage 2 (0.22–0.44): Swirl vortex summoning; Ghost emerges from inside bowl rim
 *    - Stage 3 (0.44–0.64): Opposing parallax — bowl lifts out, full Ghost rises with curved orbital text
 *    - Stage 4 (0.64–0.84): Ghost plunges into glossy liquid crimson blood pool with ripples & splash
 *    - Stage 5 (0.84–1.00): Ghost rises out & levitates framed by 3D wrap-around crimson silk ribbons
 * 2. Complete Movie Portfolio Modules:
 *    - Poster Gallery + 3D Magnetic Tilt + Fullscreen Zoom Lightbox
 *    - Lazy-loaded 16:9 Official Teasers (MP4 / YouTube)
 *    - Featured Project Switcher + About + Copy Email Toast
 *    - LIGHTS OFF / GALLERY LIGHT Theme Toggle
 * ---------------------------------------------------------------------------
 */

'use strict';

/**
 * Single source of truth for all movies, posters, and teasers.
 */
const MOVIES = [
  {
    id: 'dont-dare-the-dark',
    title: 'ผีบอกว่าอย่าหาทำ',
    englishTitle: "DON'T DARE THE DARK",
    genre: 'สยองขวัญ | HORROR',
    year: '2569',
    posterPath: 'assets/posters/messageImage_1794368583295.jpg',
    posterAlt: 'โปสเตอร์ภาพยนตร์ ผีบอกว่าอย่าหาทำ แนวสยองขวัญ ผีนางรำเปื้อนเลือดในบ้านร้างและกลุ่มเพื่อนสี่คน',
    teaserPath: 'assets/teasers/ผีบอกว่าอย่าหาทำ.mp4',
    teaserType: 'mp4',
    teaserThumb: 'assets/images/teaser-01-thumb.jpg',
    teaserDuration: '01:21',
    teaserTitle: 'ผีบอกว่าอย่าหาทำ — Official Teaser',
    studio: 'BLACK MOON PICTURES ร่วมกับ DARK NIGHT STUDIO',
    cast: 'ธนกร วัฒนศิริ, พิมพ์ชนก รัตนาวดี, กิตติพงษ์ ศรีสวัสดิ์, ปวีณ์ณัฐ ชัยมงคล, นัทธมน วงศ์สกุล',
    releaseDate: '12 ธันวาคม 2569 ในโรงภาพยนตร์',
    synopsis:
      'เมื่อกลุ่มเพื่อน 4 คน ตัดสินใจเข้าไปลองของในบ้านร้างกลางหมู่บ้าน พวกเขาคิดว่าทุกอย่างเป็นเพียงเรื่องล้อเล่น... จนกระทั่งมีเสียงปริศนากระซิบเรียกชื่อทีละคน และสิ่งที่พวกเขาปลุกขึ้นมา กลับไม่ยอมให้ใครกลับออกไปอีกเลย',
    synopsisLines: [
      'ตอนแรกก็ไม่เชื่อ... ตอนนี้ไม่กล้ากลับบ้าน',
      'เมื่อกลุ่มเพื่อน 4 คน ตัดสินใจเข้าไปลองของในบ้านร้างกลางหมู่บ้าน พวกเขาคิดว่าทุกอย่างเป็นเพียงเรื่องล้อเล่น...',
      'จนกระทั่งมีเสียงปริศนากระซิบเรียกชื่อทีละคน และสิ่งที่พวกเขาปลุกขึ้นมา กลับไม่ยอมให้ใครกลับออกไปอีกเลย'
    ],
    featured: true
  },
  {
    id: 'bloodland',
    title: 'แผ่นดินเลือด',
    englishTitle: 'BLOODLAND : มหาศึกแห่งแผ่นดิน',
    genre: 'ประวัติศาสตร์ • สงคราม • ดราม่า | HISTORICAL • WAR • DRAMA',
    year: '2026',
    posterPath: 'assets/posters/แผ่นดินเลือด_ มหาศึกแห่งแผ่นดิน.png',
    posterAlt: 'โปสเตอร์ภาพยนตร์ แผ่นดินเลือด แนวประวัติศาสตร์ สงคราม ดราม่า แม่ทัพหนุ่มถือดาบและธงรบท่ามกลางสมรภูมิเพลิง',
    teaserPath: 'assets/teasers/teaser-02-bloodland.mp4',
    teaserType: 'mp4',
    teaserThumb: 'assets/images/teaser-02-thumb.jpg',
    teaserDuration: '00:06',
    teaserTitle: 'แผ่นดินเลือด — Official Teaser',
    studio: 'Heritage Flame Studio',
    cast: 'Chakrit Anon, Veena Ratt, Petch Surin',
    releaseDate: '13 พฤศจิกายน 2026 ในโรงภาพยนตร์',
    synopsis:
      'เมื่อแม่ทัพหนุ่มต้องนำกองทัพปกป้องแผ่นดินจากศัตรูผู้รุกราน เขาต้องเลือกระหว่างหน้าที่ต่อบ้านเมืองกับหญิงที่เขารัก',
    synopsisLines: [
      'เมื่อแม่ทัพหนุ่มต้องนำกองทัพปกป้องแผ่นดินจากศัตรูผู้รุกราน',
      'ท่ามกลางเปลวไฟสงครามและชะตากรรมของอาณาจักรที่กำลังสั่นคลอน',
      'เขาต้องเลือกระหว่างหน้าที่ต่อบ้านเมืองกับหญิงที่เขารัก'
    ]
  }
];

const REDUCED_MOTION_QUERY = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver = null;
let toastTimer = null;
const lightboxState = {
  isOpen: false,
  currentIndex: 0,
  lastTrigger: null
};

/* ==========================================================================
   MATH & UTILITY HELPERS
   ========================================================================== */
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function invLerp(v, start, end) {
  if (end === start) return 0;
  return clamp((v - start) / (end - start), 0, 1);
}

function easeOutCubic(t) {
  const u = 1 - clamp(t, 0, 1);
  return 1 - u * u * u;
}

function easeInOutCubic(t) {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutSine(t) {
  return -(Math.cos(Math.PI * clamp(t, 0, 1)) - 1) / 2;
}

function safeAssetUrl(pathStr) {
  return encodeURI(String(pathStr ?? ''));
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseYouTubeId(input) {
  const raw = String(input ?? '').trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '').split('/')[0];
    if (url.searchParams.has('v')) return url.searchParams.get('v');
    const parts = url.pathname.split('/').filter(Boolean);
    const embedIdx = parts.indexOf('embed');
    if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1];
  } catch {
    // fallback
  }
  return raw;
}

/* ==========================================================================
   0. SILKY LENIS-STYLE SMOOTH MOMENTUM MOUSE-WHEEL & ANCHOR SCROLLER
   Eliminates choppy Windows discrete wheel steps (100px–120px jumps) using
   frame-rate-independent exponential damping (60Hz / 120Hz / 144Hz identical).
   ========================================================================== */
const SmoothScroller = (() => {
  let targetY = window.scrollY || 0;
  let currentY = window.scrollY || 0;
  let rafId = null;
  let lastTime = 0;
  let isActive = false;

  function maxScrollY() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function step(now) {
    if (!lastTime) lastTime = now;
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    // Frame-rate-independent exponential smoothing (butter-smooth at 60–240Hz)
    const alpha = 1 - Math.exp(-10.5 * dt);
    currentY += (targetY - currentY) * alpha;

    if (Math.abs(targetY - currentY) < 0.45) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isActive = false;
      rafId = null;
      lastTime = 0;
      return;
    }

    window.scrollTo(0, currentY);
    rafId = window.requestAnimationFrame(step);
  }

  function start() {
    if (rafId === null) {
      isActive = true;
      lastTime = 0;
      rafId = window.requestAnimationFrame(step);
    }
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    isActive = false;
    lastTime = 0;
    currentY = targetY = window.scrollY || 0;
  }

  function scrollToY(destY) {
    if (REDUCED_MOTION_QUERY.matches) {
      window.scrollTo(0, clamp(destY, 0, maxScrollY()));
      return;
    }
    if (!isActive) {
      currentY = window.scrollY || 0;
    }
    targetY = clamp(destY, 0, maxScrollY());
    start();
  }

  function init() {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    window.addEventListener(
      'wheel',
      (e) => {
        if (REDUCED_MOTION_QUERY.matches || lightboxState.isOpen || e.ctrlKey || e.metaKey) return;
        if (e.target && e.target.closest('.lightbox-figure')) return;

        // Normalize wheel delta across mice & trackpads
        let dy = e.deltaY;
        if (e.deltaMode === 1) dy *= 34;
        else if (e.deltaMode === 2) dy *= window.innerHeight * 0.85;

        // Ignore tiny horizontal-only gestures
        if (Math.abs(dy) < 0.5) return;

        e.preventDefault();
        if (!isActive) {
          currentY = targetY = window.scrollY || 0;
        }
        targetY = clamp(targetY + dy * 0.92, 0, maxScrollY());
        start();
      },
      { passive: false }
    );

    // Sync immediately if user drags scrollbar, presses keyboard keys, or touches screen
    window.addEventListener('mousedown', (e) => {
      if (e.clientX >= document.documentElement.clientWidth - 2) stop();
    }, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        stop();
      }
    });

    // Smooth-glide all same-page anchor links (#posters, #teasers, #story, etc.)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetEl = document.querySelector(hash);
      if (!targetEl) return;
      e.preventDefault();
      const headerH = 68;
      const dest = hash === '#story' || hash === '#top'
        ? 0
        : targetEl.getBoundingClientRect().top + window.scrollY - headerH;
      scrollToY(dest);
    });
  }

  return { init, scrollToY, stop };
})();

/* ==========================================================================
   1. CREMA-STYLE 5-STAGE SCROLL-DRIVEN GHOST CHOREOGRAPHY ENGINE
   ========================================================================== */
function initGhostScrollytelling() {
  const showcase = document.getElementById('story');
  const stickyEl = document.getElementById('scrolly-sticky');
  const backCanvas = document.getElementById('scrolly-canvas-back');
  const midCanvas = document.getElementById('scrolly-canvas-mid');
  const frontCanvas = document.getElementById('scrolly-canvas-front');
  const bowlBack = document.getElementById('prop-bowl-back');
  const bowlFront = document.getElementById('prop-bowl-front');
  const ghostMask = document.getElementById('prop-ghost-mask');
  const ghostRig = document.getElementById('prop-ghost-rig');
  const ghostAura = document.getElementById('prop-ghost-aura');
  const ghostEyes = document.getElementById('prop-ghost-eyes-glow');
  const curvedBadge = document.getElementById('prop-curved-badge');
  const crimsonHalo = document.getElementById('stage-crimson-halo');
  const scrollCue = document.getElementById('scrolly-cue');
  const chapters = Array.from(document.querySelectorAll('.story-chapter'));
  const railDots = Array.from(document.querySelectorAll('.rail-dot'));
  const chapterTriggers = Array.from(document.querySelectorAll('[data-scroll-chapter]'));

  if (!showcase || !stickyEl || !backCanvas || !midCanvas || !frontCanvas || !ghostRig) return;

  const backCtx = backCanvas.getContext('2d', { alpha: true });
  const midCtx = midCanvas.getContext('2d', { alpha: true });
  const frontCtx = frontCanvas.getContext('2d', { alpha: true });
  if (!backCtx || !midCtx || !frontCtx) return;

  // Chapter normalized anchors for click-to-jump
  const CHAPTER_ANCHORS = [0.02, 0.29, 0.53, 0.74, 0.94];
  const CHAPTER_BOUNDS = [0.21, 0.43, 0.64, 0.84, 1.01];

  // Cached layout geometry (recomputed ONLY on resize — ZERO layout reflow in RAF!)
  let stageW = 1280;
  let stageH = 720;
  let dpr = 1;
  let cachedHeaderOffset = 68;
  let cachedShowcaseTop = 34;
  let cachedScrollableDist = 3000;
  let cachedBowlSizePx = 540;
  let midHasContent = true;
  let frontHasContent = true;
  let lastFrameMs = 0;

  let targetP = 0;
  let smoothP = 0;
  let prevSmoothP = 0;
  let activeChapterIdx = 0;
  let mouseX = 0;
  let mouseY = 0;
  let smoothMouseX = 0;
  let smoothMouseY = 0;
  let isStageVisible = true;
  let rafId = null;

  // Persistent ember / crimson droplet particle pools
  const embers = Array.from({ length: 28 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.2 + Math.random() * 2.4,
    speedY: 0.03 + Math.random() * 0.065,
    drift: (Math.random() - 0.5) * 0.035,
    phase: Math.random() * Math.PI * 2,
    bright: i % 3 === 0
  }));

  const splashDroplets = Array.from({ length: 16 }, (_, i) => ({
    angle: -Math.PI * 0.88 + (i / 15) * Math.PI * 0.76,
    dist: 0.35 + Math.random() * 0.65,
    size: 2.2 + Math.random() * 4.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.8 + Math.random() * 0.85
  }));

  function resizeStage() {
    const rect = stickyEl.getBoundingClientRect();
    stageW = Math.max(1, Math.round(rect.width));
    stageH = Math.max(1, Math.round(rect.height));
    // Smart DPR cap <= 1.5 saves 44% GPU fillrate with crisp fluid rendering
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    backCanvas.width = Math.round(stageW * dpr);
    backCanvas.height = Math.round(stageH * dpr);
    midCanvas.width = Math.round(stageW * dpr);
    midCanvas.height = Math.round(stageH * dpr);
    frontCanvas.width = Math.round(stageW * dpr);
    frontCanvas.height = Math.round(stageH * dpr);

    cachedHeaderOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 68;
    cachedShowcaseTop = showcase.getBoundingClientRect().top + window.scrollY;
    cachedScrollableDist = Math.max(1, showcase.offsetHeight - (window.innerHeight - cachedHeaderOffset));
    cachedBowlSizePx = bowlBack ? bowlBack.offsetHeight || 520 : 520;
    midHasContent = true;
    frontHasContent = true;
  }

  function computeTargetScrollProgress() {
    // Pure arithmetic — ZERO DOM layout reflow during scroll!
    const scrolled = (window.scrollY || 0) - (cachedShowcaseTop - cachedHeaderOffset);
    targetP = clamp(scrolled / cachedScrollableDist, 0, 1);
  }

  function jumpToChapter(idx) {
    const clampedIdx = clamp(idx, 0, CHAPTER_ANCHORS.length - 1);
    const destY = cachedShowcaseTop - cachedHeaderOffset + CHAPTER_ANCHORS[clampedIdx] * cachedScrollableDist;
    SmoothScroller.scrollToY(Math.max(0, destY));
  }

  chapterTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-scroll-chapter'));
      if (Number.isInteger(idx)) jumpToChapter(idx);
    });
  });

  // Mouse parallax tracking (desktop fine pointer)
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (finePointer.matches) {
    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType !== 'mouse') return;
        mouseX = (e.clientX / (window.innerWidth || 1) - 0.5) * 2;
        mouseY = (e.clientY / (window.innerHeight || 1) - 0.5) * 2;
      },
      { passive: true }
    );
  }

  function updateChapterUI(p) {
    let idx = 0;
    for (let i = 0; i < CHAPTER_BOUNDS.length; i++) {
      if (p < CHAPTER_BOUNDS[i]) {
        idx = i;
        break;
      }
      idx = CHAPTER_BOUNDS.length - 1;
    }

    if (idx !== activeChapterIdx) {
      activeChapterIdx = idx;
      chapters.forEach((ch, i) => {
        ch.classList.toggle('is-active', i === idx);
        ch.classList.toggle('is-passed', i < idx);
      });
      railDots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === idx);
      });
    }

    if (scrollCue) {
      scrollCue.classList.toggle('is-hidden', p > 0.045);
    }
  }

  /* ------------------------------------------------------------------------
     CANVAS DRAWING ROUTINES (60FPS FLUID, VORTEX, BLOOD POOL & 3D RIBBONS)
     ------------------------------------------------------------------------ */

  /**
   * Stage 1 & 2: Glossy pouring crimson blood & mist stream into the antique bowl
   */
  function drawPouringStream(ctx, cx, bowlMouthY, p, time, isDark) {
    const enterT = easeOutCubic(invLerp(p, 0.0, 0.06));
    const exitT = 1 - easeInOutCubic(invLerp(p, 0.34, 0.48));
    const alpha = Math.max(0.85, enterT) * exitT;
    if (alpha <= 0.01) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    // Stream descends smoothly from top (y = -20) directly into bowl interior liquid center
    const streamTopY = -20;
    const streamEndY = bowlMouthY + 6;
    const segments = 28;
    const baseWidth = Math.min(stageW * 0.035, 38) * lerp(1.0, 0.62, invLerp(p, 0.2, 0.44));

    // Swirling glossy crimson blood pool INSIDE the antique silver bowl cavity
    const poolRx = Math.min(stageW * 0.145, 196);
    const poolRy = poolRx * 0.46;
    const poolGrad = ctx.createRadialGradient(cx, bowlMouthY + 4, 8, cx, bowlMouthY + 8, poolRx);
    poolGrad.addColorStop(0, '#a8141c');
    poolGrad.addColorStop(0.48, '#6a0a10');
    poolGrad.addColorStop(0.84, '#360407');
    poolGrad.addColorStop(1, 'rgba(28, 3, 5, 0)');
    ctx.beginPath();
    ctx.ellipse(cx, bowlMouthY + 6, poolRx, poolRy, 0, 0, Math.PI * 2);
    ctx.fillStyle = poolGrad;
    ctx.fill();

    // Concentric churning liquid ripples inside the silver bowl (strongest in Stage 2)
    const churnIntensity = 0.55 + 0.45 * easeInOutSine(invLerp(p, 0.12, 0.36));
    for (let r = 0; r < 4; r++) {
      const wavePhase = ((time * 0.72 + r * 0.25 + p * 3.0) % 1);
      const rx = poolRx * (0.14 + wavePhase * 0.8);
      const ry = poolRy * (0.14 + wavePhase * 0.8);
      ctx.beginPath();
      ctx.ellipse(cx, bowlMouthY + 5, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 175, 170, ${(1 - wavePhase) * 0.48 * churnIntensity})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    // Helper to build undulating viscous ribbon polygon (ZERO ctx.filter blur -> 100x faster!)
    function drawRibbonLayer(widthScale, offsetX, fillStyle) {
      ctx.beginPath();

      const leftPts = [];
      const rightPts = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const y = lerp(streamTopY, streamEndY, t);
        // Sinuous pouring curve converging dead-center into the bowl interior!
        const damp = 1 - Math.pow(t, 1.5);
        const sway =
          Math.sin(t * 4.2 - time * 2.8 - p * 18) * (15 * damp) +
          Math.cos(t * 2.1 + time * 1.4) * (5 * damp);
        // Taper wider at top, slender mid-stream, glossy splash flare at impact point inside bowl
        const profile = (1.3 - t * 0.5 + Math.pow(t, 5) * 1.1) * baseWidth * widthScale;
        const px = cx + sway + offsetX;
        leftPts.push([px - profile * 0.5, y]);
        rightPts.push([px + profile * 0.5, y]);
      }

      ctx.moveTo(leftPts[0][0], leftPts[0][1]);
      for (let i = 1; i < leftPts.length; i++) {
        ctx.lineTo(leftPts[i][0], leftPts[i][1]);
      }
      for (let i = rightPts.length - 1; i >= 0; i--) {
        ctx.lineTo(rightPts[i][0], rightPts[i][1]);
      }
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    // Soft eerie crimson mist halo using pure horizontal multi-stop gradient (0ms blur cost!)
    const mistGrad = ctx.createLinearGradient(cx - baseWidth * 1.45, 0, cx + baseWidth * 1.45, 0);
    mistGrad.addColorStop(0, 'rgba(140, 18, 22, 0)');
    mistGrad.addColorStop(0.28, 'rgba(145, 20, 24, 0.14)');
    mistGrad.addColorStop(0.5, 'rgba(155, 22, 26, 0.26)');
    mistGrad.addColorStop(0.72, 'rgba(145, 20, 24, 0.14)');
    mistGrad.addColorStop(1, 'rgba(140, 18, 22, 0)');
    drawRibbonLayer(2.25, 0, mistGrad);

    // Core viscous deep blood stream
    const coreGrad = ctx.createLinearGradient(cx - baseWidth, 0, cx + baseWidth, 0);
    coreGrad.addColorStop(0, '#3a0508');
    coreGrad.addColorStop(0.35, '#8c1118');
    coreGrad.addColorStop(0.58, '#c21e26');
    coreGrad.addColorStop(0.85, '#59080c');
    coreGrad.addColorStop(1, '#260305');
    drawRibbonLayer(1.0, 0, coreGrad);

    // Glossy liquid specular highlight ribbon inside stream
    const specGrad = ctx.createLinearGradient(cx, streamTopY, cx, streamEndY);
    specGrad.addColorStop(0, 'rgba(255, 210, 205, 0.15)');
    specGrad.addColorStop(0.5, isDark ? 'rgba(255, 175, 170, 0.48)' : 'rgba(255, 232, 226, 0.62)');
    specGrad.addColorStop(1, 'rgba(255, 195, 190, 0.35)');
    drawRibbonLayer(0.24, -baseWidth * 0.14, specGrad);

    // Bright glossy splash crown right where stream strikes liquid inside the bowl
    const splashGrad = ctx.createRadialGradient(cx, streamEndY, 2, cx, streamEndY, baseWidth * 1.15);
    splashGrad.addColorStop(0, 'rgba(255, 210, 205, 0.55)');
    splashGrad.addColorStop(0.45, 'rgba(178, 24, 30, 0.48)');
    splashGrad.addColorStop(1, 'rgba(120, 14, 18, 0)');
    ctx.beginPath();
    ctx.ellipse(cx, streamEndY, baseWidth * 1.15, baseWidth * 0.44, 0, 0, Math.PI * 2);
    ctx.fillStyle = splashGrad;
    ctx.fill();

    ctx.restore();
  }

  /**
   * Stage 2–3: Rotating sacred occult mist rings behind the summoning Ghost
   */
  function drawOccultVortex(ctx, cx, cy, p, time, isDark) {
    const fadeIn = easeOutCubic(invLerp(p, 0.18, 0.32));
    const fadeOut = 1 - easeInOutCubic(invLerp(p, 0.52, 0.68));
    const alpha = fadeIn * fadeOut;
    if (alpha <= 0.01) return;

    const radius = Math.min(stageW * 0.255, 285) * lerp(0.84, 1.12, invLerp(p, 0.2, 0.58));

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(time * 0.22 + p * Math.PI * 1.4);
    ctx.globalAlpha = alpha * (isDark ? 0.48 : 0.34);

    // Outer dashed sacred circle
    ctx.beginPath();
    ctx.setLineDash([12, 10]);
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(210, 52, 52, 0.65)' : 'rgba(135, 24, 24, 0.55)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    // Inner counter-rotating fine gold/crimson ring
    ctx.rotate(-time * 0.48 - p * Math.PI * 2.1);
    ctx.setLineDash([4, 14]);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.82, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(204, 166, 108, 0.55)' : 'rgba(140, 106, 56, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Soft swirling crimson mist arcs
    ctx.setLineDash([]);
    for (let i = 0; i < 3; i++) {
      const a0 = (i * Math.PI * 2) / 3;
      ctx.beginPath();
      ctx.arc(0, 0, radius * (0.65 + i * 0.14), a0, a0 + Math.PI * 0.72);
      ctx.strokeStyle = 'rgba(155, 22, 26, 0.32)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Stage 4: Glossy Liquid Crimson Blood Pool (Replaces Chocolate Dip Pool in clip 00:04–00:05)
   * Returns exact waterline Y coordinate so the Ghost clips seamlessly beneath the liquid!
   */
  function getBloodPoolState(p) {
    const rise = easeInOutCubic(invLerp(p, 0.60, 0.72));
    const recede = easeInOutCubic(invLerp(p, 0.82, 0.93));
    const level = clamp(rise - recede, 0, 1);
    // Pool surface rises from 108% height up to 72% height on desktop (leaving clean contrast under Chapter 04)
    const peakSurfaceRatio = stageW <= 900 ? 0.57 : 0.72;
    const surfaceY = lerp(stageH * 1.08, stageH * peakSurfaceRatio, level);
    return { level, surfaceY };
  }

  function drawBloodPoolBack(ctx, poolState, p, time) {
    if (poolState.level <= 0.005) return;
    const { level, surfaceY } = poolState;

    ctx.save();
    ctx.globalAlpha = clamp(level * 1.4, 0, 1);

    // Back horizon of the crimson pool (slightly higher behind the Ghost for 3D depth)
    const backY = surfaceY - 18 * level;
    const grad = ctx.createLinearGradient(0, backY, 0, stageH);
    grad.addColorStop(0, '#2b0406');
    grad.addColorStop(0.35, '#4d080c');
    grad.addColorStop(1, '#120203');

    ctx.beginPath();
    ctx.moveTo(0, stageH);
    for (let x = 0; x <= stageW; x += 24) {
      const w =
        Math.sin(x * 0.0065 + time * 1.6 + p * 8) * 7 * level +
        Math.cos(x * 0.012 - time * 1.1) * 4 * level;
      ctx.lineTo(x, backY + w);
    }
    ctx.lineTo(stageW, stageH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawBloodPoolFront(ctx, cx, poolState, p, velocity, time, isDark) {
    if (poolState.level <= 0.005) return;
    const { level, surfaceY } = poolState;

    ctx.save();
    ctx.globalAlpha = clamp(level * 1.35, 0, 1);

    // Undulating foreground glossy crimson liquid mass
    const waveBoost = 1 + Math.min(Math.abs(velocity) * 24, 1.8);
    const wavePts = [];
    const step = 18;
    for (let x = 0; x <= stageW + step; x += step) {
      const distFromGhost = Math.abs(x - cx);
      const dipRipple =
        Math.exp(-distFromGhost / (stageW * 0.24)) *
        Math.cos(distFromGhost * 0.032 - time * 5.2 - p * 30) *
        9 *
        level *
        waveBoost;
      const ambientWave =
        Math.sin(x * 0.0085 - time * 2.1 + p * 12) * 8 * level +
        Math.sin(x * 0.019 + time * 1.4) * 3.5 * level;
      wavePts.push([x, surfaceY + ambientWave + dipRipple]);
    }

    // Main glossy crimson-obsidian liquid fill
    const bodyGrad = ctx.createLinearGradient(0, surfaceY - 10, 0, stageH);
    bodyGrad.addColorStop(0, '#780e14');
    bodyGrad.addColorStop(0.14, '#56080d');
    bodyGrad.addColorStop(0.45, '#2f0407');
    bodyGrad.addColorStop(1, '#110203');

    ctx.beginPath();
    ctx.moveTo(0, stageH + 10);
    wavePts.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.lineTo(stageW + step, stageH + 10);
    ctx.closePath();
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Specular wet rim crest along the wave line (chocolate/blood glass sheen!)
    ctx.beginPath();
    wavePts.forEach(([x, y], i) => {
      if (i === 0) ctx.moveTo(x, y + 1);
      else ctx.lineTo(x, y + 1);
    });
    const rimGrad = ctx.createLinearGradient(cx - stageW * 0.35, 0, cx + stageW * 0.35, 0);
    rimGrad.addColorStop(0, 'rgba(255, 160, 155, 0.05)');
    rimGrad.addColorStop(0.35, 'rgba(255, 190, 185, 0.55)');
    rimGrad.addColorStop(0.5, isDark ? 'rgba(255, 110, 110, 0.85)' : 'rgba(255, 225, 220, 0.78)');
    rimGrad.addColorStop(0.65, 'rgba(255, 190, 185, 0.5)');
    rimGrad.addColorStop(1, 'rgba(255, 160, 155, 0.05)');
    ctx.strokeStyle = rimGrad;
    ctx.lineWidth = 2.6;
    ctx.stroke();

    // Concentric glossy elliptical splash ripples right around the submerged Ghost
    const dipActivity = Math.sin(invLerp(p, 0.64, 0.88) * Math.PI);
    for (let r = 0; r < 4; r++) {
      const rp = (time * 0.65 + r * 0.25 + p * 4.5) % 1;
      const rx = (52 + rp * Math.min(stageW * 0.26, 260)) * level;
      const ry = rx * 0.16;
      ctx.beginPath();
      ctx.ellipse(cx, surfaceY + 12 + rp * 18, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 185, 180, ${(1 - rp) * 0.42 * dipActivity})`;
      ctx.lineWidth = 1.8 * (1 - rp * 0.5);
      ctx.stroke();
    }

    // Subtle horizontal wet specular reflection bands across pool surface
    for (let s = 0; s < 3; s++) {
      const sy = surfaceY + 34 + s * 34;
      if (sy > stageH) continue;
      const sw = (stageW * 0.18 - s * 28) * level;
      const sx = cx + Math.sin(time * 0.9 + s * 2.1) * 35;
      const sGrad = ctx.createLinearGradient(sx - sw, sy, sx + sw, sy);
      sGrad.addColorStop(0, 'rgba(255, 165, 160, 0)');
      sGrad.addColorStop(0.5, `rgba(255, 170, 165, ${0.14 - s * 0.03})`);
      sGrad.addColorStop(1, 'rgba(255, 165, 160, 0)');
      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.ellipse(sx, sy, Math.max(10, sw), 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dynamic splashing crimson droplets arcing upward during the dip
    if (dipActivity > 0.08) {
      splashDroplets.forEach((d) => {
        const cycle = (time * d.speed * 0.55 + d.phase) % 1;
        const spread = d.dist * Math.min(stageW * 0.19, 195);
        const dx = cx + Math.cos(d.angle) * spread * (0.45 + cycle * 0.85);
        const arcHeight = Math.sin(cycle * Math.PI) * (55 + d.dist * 75) * dipActivity;
        const dy = surfaceY + 4 - arcHeight;
        const dAlpha = Math.sin(cycle * Math.PI) * 0.82 * dipActivity;

        ctx.beginPath();
        ctx.arc(dx, dy, d.size * (1 - cycle * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 18, 24, ${dAlpha})`;
        ctx.fill();

        // Tiny glossy dot highlight
        ctx.beginPath();
        ctx.arc(dx - d.size * 0.28, dy - d.size * 0.28, d.size * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 215, ${dAlpha * 0.7})`;
        ctx.fill();
      });
    }

    ctx.restore();
  }

  /**
   * Stage 5: 3D Depth-Layered Floating Crimson Silk / Blood Ribbons
   * (Replaces the floating chocolate & cream curls orbiting the finished cone in clip 00:06!)
   */
  function drawOrbitingRibbons(ctx, cx, cy, p, time, layer /* 'back' | 'front' */, isDark) {
    const reveal = easeOutCubic(invLerp(p, 0.79, 0.92));
    if (reveal <= 0.01) return;

    const scaleR = Math.min(stageW * 0.255, 295);
    const configs =
      layer === 'back'
        ? [
            { yOff: -0.28, rx: 1.08, ry: 0.26, tilt: -0.26, width: 17, phase: 0.4, color: '#5c090e' },
            { yOff: 0.20, rx: 1.16, ry: 0.24, tilt: 0.22, width: 14, phase: 2.3, color: '#3b0508' }
          ]
        : [
            { yOff: -0.02, rx: 1.04, ry: 0.28, tilt: -0.18, width: 18, phase: 1.2, color: '#8f1319' },
            { yOff: 0.36, rx: 0.96, ry: 0.22, tilt: 0.16, width: 13, phase: 3.7, color: '#690b10' }
          ];

    ctx.save();
    ctx.globalAlpha = reveal * (isDark ? 0.92 : 0.88);

    configs.forEach((cfg) => {
      const centerX = cx;
      const centerY = cy + cfg.yOff * scaleR;
      const startAngle = layer === 'back' ? Math.PI * 1.05 : Math.PI * 0.06;
      const endAngle = layer === 'back' ? Math.PI * 1.95 : Math.PI * 0.94;
      const steps = 36;
      const topEdge = [];
      const botEdge = [];

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const theta = lerp(startAngle, endAngle, u) + Math.sin(time * 0.9 + cfg.phase) * 0.08;
        const wobble = Math.sin(u * Math.PI * 2.5 - time * 1.8 + cfg.phase) * 8;
        const lx = Math.cos(theta) * scaleR * cfg.rx;
        const ly = Math.sin(theta) * scaleR * cfg.ry + wobble;

        // Rotate by tilt
        const cosT = Math.cos(cfg.tilt);
        const sinT = Math.sin(cfg.tilt);
        const rx = centerX + lx * cosT - ly * sinT;
        const ry = centerY + lx * sinT + ly * cosT;

        // Calligraphic taper (pointed ends, lush center)
        const thick = Math.sin(u * Math.PI) * cfg.width * reveal;
        topEdge.push([rx, ry - thick * 0.5]);
        botEdge.push([rx, ry + thick * 0.5]);
      }

      ctx.beginPath();
      ctx.moveTo(topEdge[0][0], topEdge[0][1]);
      for (let i = 1; i < topEdge.length; i++) ctx.lineTo(topEdge[i][0], topEdge[i][1]);
      for (let i = botEdge.length - 1; i >= 0; i--) ctx.lineTo(botEdge[i][0], botEdge[i][1]);
      ctx.closePath();

      const grad = ctx.createLinearGradient(centerX - scaleR, centerY, centerX + scaleR, centerY);
      grad.addColorStop(0, 'rgba(55, 5, 8, 0.25)');
      grad.addColorStop(0.35, cfg.color);
      grad.addColorStop(0.55, '#b51c24');
      grad.addColorStop(0.8, cfg.color);
      grad.addColorStop(1, 'rgba(35, 3, 5, 0.2)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Thin wet specular sheen along ribbon top edge
      ctx.beginPath();
      for (let i = 3; i < topEdge.length - 3; i++) {
        const [x, y] = topEdge[i];
        if (i === 3) ctx.moveTo(x, y + 2);
        else ctx.lineTo(x, y + 2);
      }
      ctx.strokeStyle = isDark ? 'rgba(255, 175, 170, 0.42)' : 'rgba(255, 225, 220, 0.52)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    });

    ctx.restore();
  }

  /**
   * Subtle floating embers & spectral dust particles across the studio stage (dt-normalized)
   */
  function drawAmbientEmbers(ctx, p, time, dt, isDark) {
    const intensity = lerp(0.35, 0.95, p);
    ctx.save();
    embers.forEach((em) => {
      em.y -= em.speedY * dt * (0.7 + intensity * 0.8);
      em.x += (em.drift + Math.sin(time + em.phase) * 0.01) * dt;
      if (em.y < -0.05) {
        em.y = 1.05;
        em.x = 0.25 + Math.random() * 0.72;
      }
      if (em.x < 0) em.x = 1;
      if (em.x > 1) em.x = 0;

      const flicker = 0.5 + 0.5 * Math.sin(time * 2.4 + em.phase);
      const alpha = (0.14 + flicker * 0.34) * intensity;

      ctx.beginPath();
      ctx.arc(em.x * stageW, em.y * stageH, em.r, 0, Math.PI * 2);
      if (em.bright) {
        ctx.fillStyle = isDark
          ? `rgba(235, 65, 58, ${alpha * 1.25})`
          : `rgba(155, 22, 24, ${alpha * 1.05})`;
      } else {
        ctx.fillStyle = isDark
          ? `rgba(218, 185, 130, ${alpha * 0.7})`
          : `rgba(80, 68, 60, ${alpha * 0.45})`;
      }
      ctx.fill();
    });
    ctx.restore();
  }

  /* ------------------------------------------------------------------------
     MAIN 60–144FPS DELTA-TIME ANIMATION LOOP (ZERO LAYOUT THRASH, ZERO BLUR!)
     ------------------------------------------------------------------------ */
  function renderFrame(nowMs) {
    rafId = null;
    if (!isStageVisible || REDUCED_MOTION_QUERY.matches) return;

    if (!lastFrameMs) lastFrameMs = nowMs;
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastFrameMs) / 1000));
    lastFrameMs = nowMs;
    const time = nowMs * 0.001;

    // Frame-rate-independent exponential smoothing (identical liquid butter feel at 60–240Hz!)
    const scrollAlpha = 1 - Math.exp(-12.5 * dt);
    smoothP += (targetP - smoothP) * scrollAlpha;
    if (Math.abs(targetP - smoothP) < 0.00005) smoothP = targetP;
    const velocity = (smoothP - prevSmoothP) / Math.max(0.016, dt) * 0.016;
    prevSmoothP = smoothP;

    const mouseAlpha = 1 - Math.exp(-7.5 * dt);
    smoothMouseX += (mouseX - smoothMouseX) * mouseAlpha;
    smoothMouseY += (mouseY - smoothMouseY) * mouseAlpha;

    const p = smoothP;
    const isMobile = stageW <= 900;
    const isDark = document.documentElement.classList.contains('cinema-mode');
    const stageCenterX = stageW * (isMobile ? 0.5 : 0.63);
    const stageCenterY = stageH * (isMobile ? 0.34 : 0.52);

    // Update active editorial chapter & right-hand rail
    updateChapterUI(p);

    // Subtle mouse 3D tilt offsets (desktop only)
    const mxPx = isMobile ? 0 : smoothMouseX * 14;
    const myPx = isMobile ? 0 : smoothMouseY * 10;
    const mRot = isMobile ? 0 : smoothMouseX * 2.4;

    /* ------------------------------------------------------------------
       A. ANTIQUE THAI SILVER RITUAL BOWL CHOREOGRAPHY (Stages 1 -> 3)
       ------------------------------------------------------------------ */
    const bowlExitT = easeInOutCubic(invLerp(p, 0.37, 0.53));
    const bowlStage2T = easeInOutSine(invLerp(p, 0.16, 0.38));
    const bowlBaseY = isMobile ? 42 : 76;
    const bowlY = lerp(bowlBaseY, bowlBaseY - 22, bowlStage2T) - bowlExitT * (stageH * 0.96);
    const bowlScale = lerp(1.06, 1.0, invLerp(p, 0, 0.2)) * lerp(1.0, 1.06, bowlStage2T) * lerp(1.0, 0.84, bowlExitT);
    const bowlRot = lerp(0, -2.5, bowlStage2T) - bowlExitT * 6 + mRot * 0.45;
    const bowlOpacity = clamp(1 - easeInOutCubic(invLerp(p, 0.42, 0.53)), 0, 1);

    const bowlTransform = `translate3d(calc(-50% + ${(mxPx * 0.55).toFixed(1)}px), calc(-50% + ${(
      bowlY +
      myPx * 0.4
    ).toFixed(1)}px), 0) scale(${bowlScale.toFixed(4)}) rotate(${bowlRot.toFixed(2)}deg)`;

    if (bowlBack && bowlFront) {
      bowlBack.style.transform = bowlTransform;
      bowlBack.style.opacity = bowlOpacity.toFixed(3);
      bowlFront.style.transform = bowlTransform;
      bowlFront.style.opacity = bowlOpacity.toFixed(3);
    }

    // Cached bowl size — ZERO forced layout reflow inside RAF!
    const bowlAnchorY = stageH * (isMobile ? 0.34 : 0.56);
    const bowlMouthY = bowlAnchorY + bowlY + myPx * 0.4 - cachedBowlSizePx * 0.045 * bowlScale;

    /* ------------------------------------------------------------------
       B. GHOST CENTERPIECE CHOREOGRAPHY (Continuous C1 Smooth Across 5 Stages!)
       ------------------------------------------------------------------ */
    const s1 = easeInOutSine(invLerp(p, 0.0, 0.22));
    const s2 = easeInOutCubic(invLerp(p, 0.22, 0.43));
    const s3 = easeInOutCubic(invLerp(p, 0.43, 0.63));
    const s4Dip = easeInOutCubic(invLerp(p, 0.65, 0.78));
    const s5Rise = easeInOutCubic(invLerp(p, 0.80, 0.94));

    const ghostYStart = isMobile ? 76 : 132;
    const ghostYStage1 = isMobile ? 48 : 88;
    const ghostYStage2 = isMobile ? 16 : 26;
    const ghostYStage3 = isMobile ? 8 : 6;
    const ghostYDip = isMobile ? 132 : 258;
    const ghostYFinale = isMobile ? 8 : 8;

    let ghostY = lerp(ghostYStart, ghostYStage1, s1);
    ghostY = lerp(ghostY, ghostYStage2, s2);
    ghostY = lerp(ghostY, ghostYStage3, s3);
    ghostY = lerp(ghostY, ghostYDip, s4Dip);
    ghostY = lerp(ghostY, ghostYFinale, s5Rise);

    const floatWeight = clamp(s3 * (1 - s4Dip * 0.85) + s5Rise, 0, 1);
    const levitateY = Math.sin(time * 1.9) * 8.5 * floatWeight;

    let ghostScale = lerp(0.35, 0.46, s1);
    ghostScale = lerp(ghostScale, 0.66, s2);
    ghostScale = lerp(ghostScale, isMobile ? 0.94 : 1.0, s3);
    ghostScale = lerp(ghostScale, isMobile ? 1.02 : 1.12, s4Dip);
    ghostScale = lerp(ghostScale, isMobile ? 0.96 : 1.04, s5Rise);

    let ghostRot = lerp(-3.5, -1.5, s1);
    ghostRot = lerp(ghostRot, 1.6, s2);
    ghostRot = lerp(ghostRot, -1.2, s3);
    ghostRot = lerp(ghostRot, 3.8, s4Dip);
    ghostRot = lerp(ghostRot, 0, s5Rise);
    ghostRot += Math.sin(time * 1.3) * 0.8 * floatWeight + mRot;

    // Pure GPU opacity + transform3d (ZERO filter: blur re-rasterization!)
    const ghostOpacity = clamp(lerp(0.14, 0.62, s1) + s2 * 0.38, 0, 1);

    ghostRig.style.transform = `translate3d(calc(-50% + ${mxPx.toFixed(1)}px), calc(-50% + ${(
      ghostY +
      levitateY +
      myPx
    ).toFixed(1)}px), 0) scale(${ghostScale.toFixed(4)}) rotate(${ghostRot.toFixed(2)}deg)`;
    ghostRig.style.opacity = ghostOpacity.toFixed(3);

    // Clip Ghost lower body smoothly beneath the animated blood pool waterline during Stage 4!
    const poolState = getBloodPoolState(p);
    if (ghostMask) {
      if (poolState.level > 0.02) {
        const clipBottomPx = Math.max(0, stageH - (poolState.surfaceY + 14));
        ghostMask.style.clipPath = `inset(0px 0px ${clipBottomPx.toFixed(1)}px 0px)`;
      } else {
        ghostMask.style.clipPath = 'none';
      }
    }

    // Ghost Crimson Aura & Pulsing Red Eyes Glow
    const eyePulse = 0.5 + 0.5 * Math.sin(time * 3.1);
    const eyeStrength = clamp(s2 * 0.85 + s5Rise * 0.35, 0, 1) * (0.6 + eyePulse * 0.4);
    if (ghostEyes) ghostEyes.style.opacity = eyeStrength.toFixed(3);
    if (ghostAura) {
      const auraOp = clamp(s2 * 0.45 + s3 * 0.35 + s5Rise * 0.35, 0, isDark ? 1 : 0.65);
      ghostAura.style.opacity = auraOp.toFixed(3);
    }
    if (crimsonHalo) {
      const haloOp = clamp(0.18 + s2 * 0.35 + s4Dip * 0.35, 0, isDark ? 0.92 : 0.48);
      crimsonHalo.style.opacity = haloOp.toFixed(3);
      crimsonHalo.style.transform = `translate3d(-50%, -50%, 0) scale(${(0.88 + s4Dip * 0.25).toFixed(3)})`;
    }

    /* ------------------------------------------------------------------
       C. CURVED ORBITAL TEXT BADGE (Stage 3: Framing cleanly outside crown & shoulders)
       ------------------------------------------------------------------ */
    if (curvedBadge) {
      const badgeIn = easeOutCubic(invLerp(p, 0.44, 0.53));
      const badgeOut = 1 - easeInOutCubic(invLerp(p, 0.60, 0.67));
      const badgeOp = badgeIn * badgeOut;
      const badgeRot = lerp(-8, 8, invLerp(p, 0.44, 0.65)) + Math.sin(time * 0.9) * 2.2;
      const badgeScale = lerp(0.88, 1.0, badgeIn);
      curvedBadge.style.opacity = badgeOp.toFixed(3);
      curvedBadge.style.transform = `translate3d(calc(-50% + ${(mxPx * 0.6).toFixed(
        1
      )}px), calc(-50% + ${(myPx * 0.5).toFixed(1)}px), 0) scale(${badgeScale.toFixed(
        3
      )}) rotate(${badgeRot.toFixed(2)}deg)`;
    }

    /* ------------------------------------------------------------------
       D. SMART LAZY-DRAWN TRIPLE CANVASES (Only draws active stage layers!)
       ------------------------------------------------------------------ */
    backCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    backCtx.clearRect(0, 0, stageW, stageH);

    // Back Canvas (z=1): Embers + Occult Vortex + Blood Pool Back + Stage 5 Back Ribbons
    drawAmbientEmbers(backCtx, p, time, dt, isDark);
    drawOccultVortex(backCtx, stageCenterX + mxPx * 0.4, stageCenterY + ghostY * 0.35, p, time, isDark);
    drawBloodPoolBack(backCtx, poolState, p, time);
    drawOrbitingRibbons(backCtx, stageCenterX + mxPx, stageCenterY + ghostY + levitateY, p, time, 'back', isDark);

    // Mid Canvas (z=2, inside silver bowl): ONLY redraw during Stages 1–2 (p < 0.49)!
    if (p < 0.49) {
      midCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      midCtx.clearRect(0, 0, stageW, stageH);
      drawPouringStream(midCtx, stageCenterX + mxPx * 0.55, bowlMouthY, p, time, isDark);
      midHasContent = true;
    } else if (midHasContent) {
      midCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      midCtx.clearRect(0, 0, stageW, stageH);
      midHasContent = false;
    }

    // Front Canvas (z=5, Blood Pool Foreground + Stage 5 Front Ribbons): ONLY redraw when p > 0.59!
    if (p > 0.59) {
      frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frontCtx.clearRect(0, 0, stageW, stageH);
      drawBloodPoolFront(frontCtx, stageCenterX + mxPx, poolState, p, velocity, time, isDark);
      drawOrbitingRibbons(frontCtx, stageCenterX + mxPx, stageCenterY + ghostY + levitateY, p, time, 'front', isDark);
      frontHasContent = true;
    } else if (frontHasContent) {
      frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frontCtx.clearRect(0, 0, stageW, stageH);
      frontHasContent = false;
    }

    rafId = window.requestAnimationFrame(renderFrame);
  }

  function ensureLoop() {
    if (isStageVisible && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      lastFrameMs = 0;
      rafId = window.requestAnimationFrame(renderFrame);
    }
  }

  resizeStage();
  computeTargetScrollProgress();
  smoothP = targetP;

  window.addEventListener('resize', () => {
    resizeStage();
    computeTargetScrollProgress();
  }, { passive: true });

  window.addEventListener('load', () => {
    resizeStage();
    computeTargetScrollProgress();
  }, { once: true });

  window.addEventListener('scroll', computeTargetScrollProgress, { passive: true });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        isStageVisible = Boolean(entries[0]?.isIntersecting);
        ensureLoop();
      },
      { threshold: 0 }
    );
    obs.observe(showcase);
  }

  ensureLoop();
}

/* ==========================================================================
   2. GLOBAL SCROLL PROGRESS BAR (Cached maxScroll — ZERO layout reflow!)
   ========================================================================== */
function initHeaderProgress() {
  const bar = document.getElementById('header-progress');
  if (!bar) return;

  let cachedMaxScroll = 1;
  const recalc = () => {
    cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const ratio = clamp((window.scrollY || 0) / cachedMaxScroll, 0, 1);
    bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
  };

  recalc();
  window.addEventListener('resize', () => {
    recalc();
    update();
  }, { passive: true });
  window.addEventListener('load', () => {
    recalc();
    update();
  }, { once: true });

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

/* ==========================================================================
   3. POSTER GALLERY + TEASERS + FEATURED SPOTLIGHT
   ========================================================================== */
function getGridColumnCount(gridEl) {
  if (!gridEl) return 1;
  const computed = window.getComputedStyle(gridEl).gridTemplateColumns;
  if (!computed || computed === 'none') return 1;
  return Math.max(1, computed.trim().split(/\s+/).length);
}

function applyPosterStagger(gridEl) {
  if (!gridEl) return;
  const colCount = getGridColumnCount(gridEl);
  gridEl.querySelectorAll('.poster-card').forEach((card, index) => {
    if (!card.classList.contains('is-visible')) {
      const colIndex = index % colCount;
      card.style.setProperty('--reveal-delay', `${100 + colIndex * 160}ms`);
    }
  });
}

function renderPosterGallery(movies) {
  const grid = document.getElementById('poster-grid');
  if (!grid) return;

  grid.innerHTML = movies
    .map(
      (movie, index) => `
      <article class="poster-card reveal" data-reveal="fade-up" data-movie-id="${escapeHTML(movie.id)}">
        <button
          type="button"
          class="poster-trigger"
          data-lightbox-index="${index}"
          aria-label="เปิดดูโปสเตอร์ ${escapeHTML(movie.title)} (${escapeHTML(movie.year)})"
        >
          <div class="poster-media">
            <img
              src="${escapeHTML(safeAssetUrl(movie.posterPath))}"
              alt="${escapeHTML(movie.posterAlt || `โปสเตอร์ภาพยนตร์ ${movie.title}`)}"
              width="800"
              height="1200"
              loading="lazy"
              decoding="async"
              class="poster-img"
            />
          </div>
          <div class="poster-overlay">
            <p class="poster-meta">${escapeHTML(movie.genre)} &bull; ${escapeHTML(movie.year)}</p>
            <h3 class="poster-title">${escapeHTML(movie.title)}</h3>
            ${
              movie.englishTitle
                ? `<p class="poster-subtitle-en">${escapeHTML(movie.englishTitle)}</p>`
                : ''
            }
          </div>
        </button>
      </article>
    `
    )
    .join('');

  applyPosterStagger(grid);

  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-lightbox-index]');
    if (!trigger) return;
    const index = Number(trigger.getAttribute('data-lightbox-index'));
    if (Number.isInteger(index)) openLightbox(index, trigger);
  });

  window.addEventListener('resize', () => applyPosterStagger(grid), { passive: true });
}

function mountTeaserPlayer(mediaEl, title) {
  if (!mediaEl || mediaEl.dataset.loaded === 'true') return;
  const videoType = (mediaEl.dataset.videoType || 'mp4').toLowerCase();
  const videoSrc = mediaEl.dataset.videoSrc || '';
  if (!videoSrc) return;

  mediaEl.dataset.loaded = 'true';
  mediaEl.innerHTML = '';

  if (videoType === 'youtube') {
    const videoId = parseYouTubeId(videoSrc);
    const iframe = document.createElement('iframe');
    iframe.className = 'teaser-iframe-el';
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
    iframe.title = `ตัวอย่างภาพยนตร์ ${title}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    mediaEl.appendChild(iframe);
    return;
  }

  const video = document.createElement('video');
  video.className = 'teaser-video-el';
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.setAttribute('aria-label', `วิดีโอทีเซอร์ ${title}`);

  const source = document.createElement('source');
  source.src = videoSrc;
  source.type = 'video/mp4';
  video.appendChild(source);

  mediaEl.appendChild(video);
  video.play().catch(() => {
    video.muted = true;
    video.play().catch(() => {});
  });
}

function renderTeaserSection(movies) {
  const list = document.getElementById('teaser-list');
  if (!list) return;

  const teasers = movies.filter((movie) => Boolean(movie.teaserPath));
  list.innerHTML = teasers
    .map((movie, index) => {
      const baseDelay = 100 + index * 180;
      return `
      <article class="teaser-card reveal" data-reveal="fade-up" style="--reveal-delay: ${baseDelay}ms">
        <div
          class="teaser-media"
          data-video-type="${escapeHTML(movie.teaserType || 'mp4')}"
          data-video-src="${escapeHTML(safeAssetUrl(movie.teaserPath))}"
          data-teaser-title="${escapeHTML(movie.title)}"
        >
          <img
            src="${escapeHTML(safeAssetUrl(movie.teaserThumb || movie.posterPath))}"
            alt="ภาพปกทีเซอร์ภาพยนตร์ ${escapeHTML(movie.title)}"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            class="teaser-thumb"
          />
          <div class="teaser-scrim" aria-hidden="true"></div>
          <button type="button" class="teaser-play-btn" aria-label="เล่นทีเซอร์ ${escapeHTML(movie.title)}">
            <span class="teaser-play-icon" aria-hidden="true"></span>
          </button>
          ${movie.teaserDuration ? `<span class="teaser-duration-badge">${escapeHTML(movie.teaserDuration)}</span>` : ''}
        </div>
        <div class="teaser-body">
          <p class="teaser-meta">${escapeHTML(movie.genre)} &bull; ${escapeHTML(movie.year)}</p>
          <h3 class="teaser-title">${escapeHTML(movie.teaserTitle || movie.title)}</h3>
          <p class="teaser-synopsis">${escapeHTML(movie.synopsis)}</p>
        </div>
      </article>
      `;
    })
    .join('');

  list.addEventListener('click', (event) => {
    const playBtn = event.target.closest('.teaser-play-btn');
    if (!playBtn) return;
    const mediaEl = playBtn.closest('.teaser-media');
    if (!mediaEl) return;
    mountTeaserPlayer(mediaEl, mediaEl.dataset.teaserTitle || 'Teaser');
  });
}

function renderFeaturedProject(movies, selectedIndex) {
  const container = document.getElementById('featured-project');
  const switcher = document.getElementById('featured-switcher');
  if (!container || movies.length === 0) return;

  const defaultIndex = Math.max(0, movies.findIndex((m) => Boolean(m.featured)));
  const featuredIndex =
    typeof selectedIndex === 'number' && selectedIndex >= 0 && selectedIndex < movies.length
      ? selectedIndex
      : defaultIndex;
  const isSwitchAction = typeof selectedIndex === 'number';
  const movie = movies[featuredIndex];

  if (switcher) {
    switcher.innerHTML = movies
      .map(
        (item, idx) => `
        <button
          type="button"
          role="tab"
          aria-selected="${idx === featuredIndex}"
          class="featured-tab${idx === featuredIndex ? ' is-active' : ''}"
          data-featured-index="${idx}"
        >
          0${idx + 1} / ${escapeHTML(item.title)}
        </button>
      `
      )
      .join('');

    if (!switcher.dataset.bound) {
      switcher.dataset.bound = 'true';
      switcher.addEventListener('click', (event) => {
        const tab = event.target.closest('[data-featured-index]');
        if (!tab) return;
        const idx = Number(tab.getAttribute('data-featured-index'));
        if (Number.isInteger(idx)) renderFeaturedProject(movies, idx);
      });
    }
  }

  const lines =
    Array.isArray(movie.synopsisLines) && movie.synopsisLines.length > 0
      ? movie.synopsisLines
      : [movie.synopsis];

  const synopsisMarkup = lines
    .map(
      (line, idx) => `
      <p class="featured-synopsis-line reveal" data-reveal="fade-up" style="--reveal-delay: ${240 + idx * 120}ms">
        ${escapeHTML(line)}
      </p>
    `
    )
    .join('');

  const metaItems = [
    movie.studio ? { label: 'สตูดิโอ / ผู้สร้าง', value: movie.studio } : null,
    movie.cast ? { label: 'นักแสดงนำ', value: movie.cast } : null,
    movie.releaseDate ? { label: 'กำหนดฉาย', value: movie.releaseDate } : null
  ].filter(Boolean);

  const metaMarkup = metaItems
    .map(
      (item) => `
      <div class="featured-meta-row">
        <dt>${escapeHTML(item.label)}</dt>
        <dd>${escapeHTML(item.value)}</dd>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="featured-poster-reveal reveal" data-reveal="zoom-in">
      <button type="button" class="featured-poster-btn" id="featured-poster-trigger" aria-label="ขยายดูโปสเตอร์ ${escapeHTML(movie.title)}">
        <img
          src="${escapeHTML(safeAssetUrl(movie.posterPath))}"
          alt="${escapeHTML(movie.posterAlt || `โปสเตอร์ภาพยนตร์ ${movie.title}`)}"
          width="800"
          height="1200"
          loading="lazy"
          decoding="async"
          class="featured-poster-img"
        />
      </button>
    </div>

    <div class="featured-details">
      <p class="featured-genre-tag reveal" data-reveal="fade-left" style="--reveal-delay: 80ms">${escapeHTML(movie.genre)}</p>
      <h3 class="featured-title reveal" data-reveal="fade-left" style="--reveal-delay: 160ms">${escapeHTML(movie.title)}</h3>
      <div class="featured-synopsis-group" aria-label="เรื่องย่อภาพยนตร์">${synopsisMarkup}</div>
      <dl class="featured-meta-list reveal" data-reveal="fade-up" style="--reveal-delay: 420ms">${metaMarkup}</dl>
      <div class="featured-actions reveal" data-reveal="fade-up" style="--reveal-delay: 500ms">
        <a href="#teasers" class="pill-btn pill-btn--crimson">
          <span>รับชมทีเซอร์</span>
          <span class="pill-btn-icon" aria-hidden="true">&rarr;</span>
        </a>
        <button type="button" class="pill-btn pill-btn--outline" id="featured-zoom-btn">
          ดูโปสเตอร์ขนาดเต็ม
        </button>
      </div>
    </div>
  `;

  const posterBtn = document.getElementById('featured-poster-trigger');
  const zoomBtn = document.getElementById('featured-zoom-btn');
  if (posterBtn) posterBtn.addEventListener('click', () => openLightbox(featuredIndex, posterBtn));
  if (zoomBtn) zoomBtn.addEventListener('click', () => openLightbox(featuredIndex, zoomBtn));

  if (isSwitchAction) {
    const newReveals = container.querySelectorAll('.reveal');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        newReveals.forEach((el) => el.classList.add('is-visible'));
      });
    });
  }
}

/* ==========================================================================
   4. SCROLL REVEAL, NAVIGATION, LIGHTBOX, CARD TILT & THEME MODE
   ========================================================================== */
function revealAllImmediately() {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (elements.length === 0) return;

  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  if (REDUCED_MOTION_QUERY.matches || !('IntersectionObserver' in window)) {
    revealAllImmediately();
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => {
    if (!el.classList.contains('is-visible')) revealObserver.observe(el);
  });
}

function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('main > section[id]'));

  function setMenuOpen(isOpen) {
    if (!toggleBtn || !nav) return;
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'ปิดเมนูนำทาง' : 'เปิดเมนูนำทาง');
    nav.classList.toggle('is-open', isOpen);
  }

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      setMenuOpen(toggleBtn.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenuOpen(false);
        toggleBtn.focus();
      }
    });
  }

  function setActiveSection(sectionId) {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-section') === sectionId;
      link.classList.toggle('is-active', isMatch);
      if (isMatch) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.requestAnimationFrame(() => toast.classList.add('is-visible'));
  if (toastTimer !== null) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!toast.classList.contains('is-visible')) toast.hidden = true;
    }, 260);
  }, 2400);
}

function updateLightboxView() {
  const movie = MOVIES[lightboxState.currentIndex];
  if (!movie) return;

  const img = document.getElementById('lightbox-img');
  const meta = document.getElementById('lightbox-meta');
  const title = document.getElementById('lightbox-title');
  const synopsis = document.getElementById('lightbox-synopsis');
  const counter = document.getElementById('lightbox-counter');

  if (img) {
    img.src = safeAssetUrl(movie.posterPath);
    img.alt = movie.posterAlt || `โปสเตอร์ภาพยนตร์ ${movie.title}`;
  }
  if (meta) meta.textContent = `${movie.genre} • ${movie.year}`;
  if (title) title.textContent = movie.englishTitle ? `${movie.title} (${movie.englishTitle})` : movie.title;
  if (synopsis) synopsis.textContent = movie.synopsis || '';
  if (counter) counter.textContent = `${lightboxState.currentIndex + 1} / ${MOVIES.length}`;
}

function setLightboxZoom(zoomed) {
  const wrap = document.getElementById('lightbox-swipe-area');
  const zoomBtn = document.getElementById('lightbox-zoom');
  if (!wrap) return;
  wrap.classList.toggle('is-zoomed', zoomed);
  if (zoomBtn) {
    zoomBtn.setAttribute('aria-pressed', String(zoomed));
    zoomBtn.textContent = zoomed ? 'ย่อขนาดปกติ (1x)' : 'ขยายดูรายละเอียด (Zoom)';
  }
}

function openLightbox(index, triggerEl) {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  if (!lightbox) return;

  lightboxState.isOpen = true;
  lightboxState.currentIndex = ((index % MOVIES.length) + MOVIES.length) % MOVIES.length;
  lightboxState.lastTrigger = triggerEl || document.activeElement;

  setLightboxZoom(false);
  updateLightboxView();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !lightboxState.isOpen) return;

  setLightboxZoom(false);
  lightbox.hidden = true;
  lightboxState.isOpen = false;
  document.body.style.overflow = '';
  if (lightboxState.lastTrigger && typeof lightboxState.lastTrigger.focus === 'function') {
    lightboxState.lastTrigger.focus();
  }
  lightboxState.lastTrigger = null;
}

function stepLightbox(delta) {
  if (!lightboxState.isOpen) return;
  setLightboxZoom(false);
  lightboxState.currentIndex = (lightboxState.currentIndex + delta + MOVIES.length) % MOVIES.length;
  updateLightboxView();
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const zoomBtn = document.getElementById('lightbox-zoom');
  const zoomImg = document.getElementById('lightbox-img');
  const zoomWrap = document.getElementById('lightbox-swipe-area');
  const swipeArea = document.getElementById('lightbox-dialog');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => stepLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => stepLightbox(1));

  const toggleZoom = () => {
    if (zoomWrap) setLightboxZoom(!zoomWrap.classList.contains('is-zoomed'));
  };
  if (zoomBtn) zoomBtn.addEventListener('click', toggleZoom);
  if (zoomImg) zoomImg.addEventListener('click', toggleZoom);

  lightbox.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-lightbox-close')) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightboxState.isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepLightbox(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepLightbox(1);
    }
  });

  if (swipeArea) {
    let startX = 0;
    let startY = 0;
    swipeArea.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );
    swipeArea.addEventListener(
      'touchend',
      (e) => {
        if (!lightboxState.isOpen || e.changedTouches.length !== 1) return;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          stepLightbox(dx < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );
  }
}

function initCursorSpotlight() {
  const spot = document.getElementById('cursor-spotlight');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!spot || !finePointer.matches || REDUCED_MOTION_QUERY.matches) return;

  let tx = -999;
  let ty = -999;
  let pending = false;

  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX;
      ty = e.clientY;
      spot.classList.add('is-active');
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(() => {
          pending = false;
          spot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        });
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => spot.classList.remove('is-active'));
}

function initCardTilt() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches || REDUCED_MOTION_QUERY.matches) return;

  document.querySelectorAll('.poster-card').forEach((card) => {
    let rafId = null;
    let latestEvent = null;

    card.addEventListener(
      'pointermove',
      (event) => {
        if (event.pointerType !== 'mouse') return;
        latestEvent = event;
        if (rafId === null) {
          rafId = window.requestAnimationFrame(() => {
            rafId = null;
            if (!latestEvent) return;
            const rect = card.getBoundingClientRect();
            const px = (latestEvent.clientX - rect.left) / rect.width;
            const py = (latestEvent.clientY - rect.top) / rect.height;
            card.classList.add('is-tilting');
            card.style.setProperty('--tilt-x', `${((0.5 - py) * 7).toFixed(2)}deg`);
            card.style.setProperty('--tilt-y', `${((px - 0.5) * 7).toFixed(2)}deg`);
          });
        }
      },
      { passive: true }
    );

    card.addEventListener('pointerleave', () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
}

function initCinemaMode() {
  const btn = document.getElementById('cinema-mode-btn');
  if (!btn) return;
  const labelEl = btn.querySelector('.theme-toggle-label');
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  btn.addEventListener('click', () => {
    const isCinema = document.documentElement.classList.toggle('cinema-mode');
    btn.setAttribute('aria-pressed', String(isCinema));
    btn.setAttribute(
      'aria-label',
      isCinema ? 'สลับเป็นโหมดแกลเลอรีสว่าง (Lights On)' : 'สลับเป็นโหมดมืดโรงภาพยนตร์ (Lights Off)'
    );
    if (labelEl) labelEl.textContent = isCinema ? 'LIGHTS ON' : 'LIGHTS OFF';
    if (metaTheme) metaTheme.setAttribute('content', isCinema ? '#0a090c' : '#f3efe7');
    showToast(isCinema ? 'เปิดโหมดมืดโรงภาพยนตร์ (Cinema Dark)' : 'เปิดโหมดแกลเลอรีสว่าง (Gallery Studio)');
  });
}

function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || 'studio@group6.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const tmp = document.createElement('textarea');
        tmp.value = email;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        tmp.remove();
      }
      showToast(`คัดลอกอีเมล ${email} แล้ว`);
    } catch {
      showToast(`อีเมลติดต่อ: ${email}`);
    }
  });
}

/* ==========================================================================
   APP BOOTSTRAP
   ========================================================================== */
function initApp() {
  try {
    document.documentElement.classList.add('js-enabled');

    renderPosterGallery(MOVIES);
    renderTeaserSection(MOVIES);
    renderFeaturedProject(MOVIES);

    SmoothScroller.init();
    initGhostScrollytelling();
    initHeaderProgress();
    initNavigation();
    initLightbox();
    initScrollReveal();
    initCursorSpotlight();
    initCardTilt();
    initCinemaMode();
    initCopyEmail();

    REDUCED_MOTION_QUERY.addEventListener('change', () => {
      if (REDUCED_MOTION_QUERY.matches) revealAllImmediately();
    });
  } catch (error) {
    console.error('Portfolio initialization failed:', error);
    document.documentElement.classList.remove('js-enabled');
    revealAllImmediately();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
