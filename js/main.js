/**
 * MOVIE PORTFOLIO — Full-Page 6-Act Distributed Scrollytelling Engine
 * ---------------------------------------------------------------------------
 * Distributes CREMA-style scroll-driven animations seamlessly from 0% -> 100%:
 * - Act 1 (#story):   Pouring Crimson Blood into Antique Thai Silver Bowl -> Ghost Emerging
 * - Act 2 (#posters): Floating Ghost + Curved Orbital Text + Opposing-Parallax Poster Gallery
 * - Act 3 (#teasers): Full-Width Glossy Liquid Crimson Blood Pool + Submerged Ghost + Teasers
 * - Act 4 (#featured): Dual-Theme 3D Wrapping Ribbons & Sparks (Horror Crimson <-> War Gold!)
 * - Act 5 (#about):   Editorial Portrait Ken Burns Scroll Zoom + Count-Up Stats + Accent Lines
 * - Act 6 (#contact): Monumental Levitating Ghost Finale + 3D Ribbons beside Contact Card
 *
 * Performance Architecture:
 * - Lenis-style frame-rate-independent smooth wheel momentum scrolling
 * - IntersectionObserver auto-pauses offscreen canvases (only 1 canvas active at a time!)
 * - Zero ctx.filter blur, zero CSS animated blur, zero layout thrash inside RAF
 * ---------------------------------------------------------------------------
 */

'use strict';

const MOVIES = [
  {
    id: 'dont-dare-the-dark',
    theme: 'horror',
    themeLabel: 'CRIMSON HORROR THEME',
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
    ]
  },
  {
    id: 'bloodland',
    theme: 'war',
    themeLabel: 'GOLDEN WAR FLAME THEME',
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
    ],
    featured: true
  }
];

const REDUCED_MOTION_QUERY = window.matchMedia('(prefers-reduced-motion: reduce)');
const FINE_POINTER_QUERY = window.matchMedia('(hover: hover) and (pointer: fine)');
let revealObserver = null;
let toastTimer = null;
let setFeaturedCanvasTheme = () => {};

const lightboxState = {
  isOpen: false,
  currentIndex: 0,
  lastTrigger: null
};

// Shared smoothed pointer state (single global listener for desktop 3D subtle parallax)
const MouseState = {
  x: 0,
  y: 0,
  sx: 0,
  sy: 0,
  init() {
    if (!FINE_POINTER_QUERY.matches) return;
    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType !== 'mouse') return;
        this.x = (e.clientX / (window.innerWidth || 1) - 0.5) * 2;
        this.y = (e.clientY / (window.innerHeight || 1) - 0.5) * 2;
      },
      { passive: true }
    );
  },
  update(dt) {
    const a = 1 - Math.exp(-7.5 * dt);
    this.sx += (this.x - this.sx) * a;
    this.sy += (this.y - this.sy) * a;
  }
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

function lerpRGB(c1, c2, t, alpha) {
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  return alpha === undefined ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
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

/**
 * Shared 3D calligraphic ribbon drawer (used cleanly by both Act 4 Dual-Theme & Act 6 Finale!)
 */
function draw3DOrbitRibbons(ctx, cx, cy, scaleR, reveal, time, layer, palette, isDark) {
  if (reveal <= 0.01) return;

  const configs =
    layer === 'back'
      ? [
          { yOff: -0.34, rx: 1.12, ry: 0.25, tilt: -0.26, width: 15, phase: 0.4, c: palette.dark },
          { yOff: 0.22, rx: 1.2, ry: 0.23, tilt: 0.22, width: 12, phase: 2.3, c: palette.deep }
        ]
      : [
          { yOff: -0.04, rx: 1.05, ry: 0.27, tilt: -0.17, width: 16, phase: 1.2, c: palette.mid },
          { yOff: 0.36, rx: 0.96, ry: 0.22, tilt: 0.16, width: 11, phase: 3.7, c: palette.dark }
        ];

  ctx.save();
  ctx.globalAlpha = reveal * (isDark ? 0.92 : 0.86);

  configs.forEach((cfg) => {
    const centerY = cy + cfg.yOff * scaleR;
    const startAngle = layer === 'back' ? Math.PI * 1.06 : Math.PI * 0.06;
    const endAngle = layer === 'back' ? Math.PI * 1.94 : Math.PI * 0.94;
    const steps = 32;
    const topEdge = [];
    const botEdge = [];
    const cosT = Math.cos(cfg.tilt);
    const sinT = Math.sin(cfg.tilt);

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const theta = lerp(startAngle, endAngle, u) + Math.sin(time * 0.9 + cfg.phase) * 0.08;
      const wobble = Math.sin(u * Math.PI * 2.4 - time * 1.7 + cfg.phase) * 7.5;
      const lx = Math.cos(theta) * scaleR * cfg.rx;
      const ly = Math.sin(theta) * scaleR * cfg.ry + wobble;

      const rx = cx + lx * cosT - ly * sinT;
      const ry = centerY + lx * sinT + ly * cosT;
      const thick = Math.sin(u * Math.PI) * cfg.width * reveal;

      topEdge.push([rx, ry - thick * 0.5]);
      botEdge.push([rx, ry + thick * 0.5]);
    }

    ctx.beginPath();
    ctx.moveTo(topEdge[0][0], topEdge[0][1]);
    for (let i = 1; i < topEdge.length; i++) ctx.lineTo(topEdge[i][0], topEdge[i][1]);
    for (let i = botEdge.length - 1; i >= 0; i--) ctx.lineTo(botEdge[i][0], botEdge[i][1]);
    ctx.closePath();

    const grad = ctx.createLinearGradient(cx - scaleR, centerY, cx + scaleR, centerY);
    grad.addColorStop(0, palette.fadeEdge);
    grad.addColorStop(0.32, cfg.c);
    grad.addColorStop(0.54, palette.bright);
    grad.addColorStop(0.78, cfg.c);
    grad.addColorStop(1, palette.fadeEdge);
    ctx.fillStyle = grad;
    ctx.fill();

    // Specular edge sheen
    ctx.beginPath();
    for (let i = 3; i < topEdge.length - 3; i++) {
      const [x, y] = topEdge[i];
      if (i === 3) ctx.moveTo(x, y + 2);
      else ctx.lineTo(x, y + 2);
    }
    ctx.strokeStyle = palette.specular;
    ctx.lineWidth = 1.35;
    ctx.stroke();
  });

  ctx.restore();
}

/* ==========================================================================
   0. SILKY LENIS-STYLE SMOOTH MOMENTUM MOUSE-WHEEL & ANCHOR SCROLLER
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
    if (!isActive) currentY = window.scrollY || 0;
    targetY = clamp(destY, 0, maxScrollY());
    start();
  }

  function init() {
    if (FINE_POINTER_QUERY.matches) {
      window.addEventListener(
        'wheel',
        (e) => {
          if (REDUCED_MOTION_QUERY.matches || lightboxState.isOpen || e.ctrlKey || e.metaKey) return;
          if (e.target && e.target.closest('.lightbox-figure')) return;

          let dy = e.deltaY;
          if (e.deltaMode === 1) dy *= 34;
          else if (e.deltaMode === 2) dy *= window.innerHeight * 0.85;
          if (Math.abs(dy) < 0.5) return;

          e.preventDefault();
          if (!isActive) currentY = targetY = window.scrollY || 0;
          targetY = clamp(targetY + dy * 0.92, 0, maxScrollY());
          start();
        },
        { passive: false }
      );
    }

    window.addEventListener('mousedown', (e) => {
      if (e.clientX >= document.documentElement.clientWidth - 2) stop();
    }, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) stop();
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetEl = document.querySelector(hash);
      if (!targetEl) return;
      e.preventDefault();
      const dest = hash === '#story' || hash === '#top'
        ? 0
        : targetEl.getBoundingClientRect().top + window.scrollY - 68;
      scrollToY(dest);
    });
  }

  return { init, scrollToY, stop };
})();

/* ==========================================================================
   ACT 1: SMOOTH 3-PHASE HERO SUMMONING (ZERO OVERLAP CHOREOGRAPHY)
   - Phase A (0.00–0.40): Crimson blood pours into antique silver bowl & finishes draining cleanly
   - Phase B (0.34–0.72): Ghost rises out of rippling crimson pool, cleanly masked behind front silver rim
   - Phase C (0.72–1.00): Silver bowl descends DOWNWARD & fades away while Ghost rises unobstructed!
   ========================================================================== */
function initAct1HeroSummoning() {
  const section = document.getElementById('story');
  const stickyEl = document.getElementById('hero-sticky');
  const backCanvas = document.getElementById('hero-canvas-back');
  const midCanvas = document.getElementById('hero-canvas-mid');
  const bowlBack = document.getElementById('hero-bowl-back');
  const bowlFront = document.getElementById('hero-bowl-front');
  const ghostMask = document.getElementById('hero-ghost-mask');
  const ghostRig = document.getElementById('hero-ghost-rig');
  const ghostAura = document.getElementById('hero-ghost-aura');
  const ghostEyes = document.getElementById('hero-ghost-eyes');
  const crimsonHalo = document.getElementById('hero-crimson-halo');
  const scrollCue = document.getElementById('hero-scroll-cue');
  const beats = Array.from(document.querySelectorAll('[data-hero-beat]'));

  if (!section || !stickyEl || !backCanvas || !midCanvas || !ghostRig) return;
  const backCtx = backCanvas.getContext('2d', { alpha: true });
  const midCtx = midCanvas.getContext('2d', { alpha: true });
  if (!backCtx || !midCtx) return;

  let w = 1280, h = 720, dpr = 1;
  let headerOffset = 68, sectionTop = 34, scrollDist = 1100, bowlSizePx = 540;
  let targetP = 0, smoothP = 0, activeBeat = 0;
  let isVisible = true, rafId = null, lastMs = 0;

  const embers = Array.from({ length: 24 }, (_, i) => ({
    x: 0.25 + Math.random() * 0.72,
    y: Math.random(),
    r: 1.2 + Math.random() * 2.2,
    vy: 0.03 + Math.random() * 0.06,
    vx: (Math.random() - 0.5) * 0.025,
    phase: Math.random() * Math.PI * 2,
    bright: i % 3 === 0
  }));

  function resize() {
    const rect = stickyEl.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    backCanvas.width = Math.round(w * dpr);
    backCanvas.height = Math.round(h * dpr);
    midCanvas.width = Math.round(w * dpr);
    midCanvas.height = Math.round(h * dpr);

    headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 68;
    sectionTop = section.getBoundingClientRect().top + window.scrollY;
    scrollDist = Math.max(1, section.offsetHeight - stickyEl.offsetHeight);
    bowlSizePx = bowlBack ? bowlBack.offsetHeight || 520 : 520;
  }

  function updateTarget() {
    const scrolled = (window.scrollY || 0) - (sectionTop - headerOffset);
    targetP = clamp(scrolled / scrollDist, 0, 1);
  }

  function drawHeroStream(ctx, cx, mouthY, bowlScale, bowlAlpha, p, time, isDark) {
    if (bowlAlpha <= 0.01) return;

    ctx.save();
    ctx.globalAlpha = bowlAlpha;

    // 1. Swirling crimson liquid pool scaled accurately to the silver bowl cavity on ALL viewports
    const poolRx = Math.min(bowlSizePx * 0.32, 195) * bowlScale;
    const poolRy = poolRx * 0.45;
    const poolGrad = ctx.createRadialGradient(cx, mouthY + 4, 6, cx, mouthY + 8, poolRx);
    poolGrad.addColorStop(0, '#a8141c');
    poolGrad.addColorStop(0.48, '#6a0a10');
    poolGrad.addColorStop(0.84, '#360407');
    poolGrad.addColorStop(1, 'rgba(28, 3, 5, 0)');
    ctx.beginPath();
    ctx.ellipse(cx, mouthY + 6, poolRx, poolRy, 0, 0, Math.PI * 2);
    ctx.fillStyle = poolGrad;
    ctx.fill();

    // Concentric churning liquid ripples inside the silver bowl
    for (let r = 0; r < 4; r++) {
      const wp = (time * 0.72 + r * 0.25 + p * 2.4) % 1;
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + 5, poolRx * (0.14 + wp * 0.8), poolRy * (0.14 + wp * 0.8), 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 175, 170, ${(1 - wp) * 0.46})`;
      ctx.lineWidth = 1.7;
      ctx.stroke();
    }

    // 2. Falling crimson stream finishes draining cleanly into the bowl BEFORE the Ghost rises!
    const pourDrainT = easeInOutCubic(invLerp(p, 0.20, 0.39));
    const streamAlpha = clamp(1 - invLerp(p, 0.35, 0.41), 0, 1) * bowlAlpha;
    if (streamAlpha > 0.01 && pourDrainT < 0.995) {
      ctx.globalAlpha = streamAlpha;
      const streamEndY = mouthY + 6;
      // Top of stream glides smoothly down into the bowl like finishing a real pour!
      const streamTopY = lerp(-20, streamEndY - 6, pourDrainT);
      const segments = 24;
      const baseWidth = Math.min(bowlSizePx * 0.072, 38) * lerp(1.0, 0.48, pourDrainT);

      function drawRibbon(widthScale, offsetX, fill) {
        ctx.beginPath();
        const leftPts = [];
        const rightPts = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const y = lerp(streamTopY, streamEndY, t);
          const damp = 1 - Math.pow(t, 1.5);
          const sway =
            Math.sin(t * 4.2 - time * 2.8 - p * 12) * (14 * damp * (1 - pourDrainT * 0.6)) +
            Math.cos(t * 2.1 + time * 1.4) * (4.5 * damp);
          const taperTop = pourDrainT > 0.05 ? clamp(t * 3.5, 0.15, 1) : 1;
          const prof = (1.28 - t * 0.48 + Math.pow(t, 5) * 1.05) * baseWidth * widthScale * taperTop;
          const px = cx + sway + offsetX;
          leftPts.push([px - prof * 0.5, y]);
          rightPts.push([px + prof * 0.5, y]);
        }
        ctx.moveTo(leftPts[0][0], leftPts[0][1]);
        for (let i = 1; i < leftPts.length; i++) ctx.lineTo(leftPts[i][0], leftPts[i][1]);
        for (let i = rightPts.length - 1; i >= 0; i--) ctx.lineTo(rightPts[i][0], rightPts[i][1]);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }

      const mistGrad = ctx.createLinearGradient(cx - baseWidth * 1.45, 0, cx + baseWidth * 1.45, 0);
      mistGrad.addColorStop(0, 'rgba(140,18,22,0)');
      mistGrad.addColorStop(0.5, 'rgba(155,22,26,0.24)');
      mistGrad.addColorStop(1, 'rgba(140,18,22,0)');
      drawRibbon(2.2, 0, mistGrad);

      const coreGrad = ctx.createLinearGradient(cx - baseWidth, 0, cx + baseWidth, 0);
      coreGrad.addColorStop(0, '#3a0508');
      coreGrad.addColorStop(0.35, '#8c1118');
      coreGrad.addColorStop(0.58, '#c21e26');
      coreGrad.addColorStop(0.85, '#59080c');
      coreGrad.addColorStop(1, '#260305');
      drawRibbon(1.0, 0, coreGrad);

      const specGrad = ctx.createLinearGradient(cx, streamTopY, cx, streamEndY);
      specGrad.addColorStop(0, 'rgba(255,210,205,0.15)');
      specGrad.addColorStop(0.5, isDark ? 'rgba(255,175,170,0.48)' : 'rgba(255,232,226,0.62)');
      specGrad.addColorStop(1, 'rgba(255,195,190,0.35)');
      drawRibbon(0.24, -baseWidth * 0.14, specGrad);

      const splashGrad = ctx.createRadialGradient(cx, streamEndY, 2, cx, streamEndY, baseWidth * 1.15);
      splashGrad.addColorStop(0, 'rgba(255,210,205,0.55)');
      splashGrad.addColorStop(0.45, 'rgba(178,24,30,0.48)');
      splashGrad.addColorStop(1, 'rgba(120,14,18,0)');
      ctx.beginPath();
      ctx.ellipse(cx, streamEndY, baseWidth * 1.15, baseWidth * 0.44, 0, 0, Math.PI * 2);
      ctx.fillStyle = splashGrad;
      ctx.fill();
    }

    ctx.restore();
  }

  function render(nowMs) {
    rafId = null;
    if (!isVisible || REDUCED_MOTION_QUERY.matches) return;

    if (!lastMs) lastMs = nowMs;
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastMs) / 1000));
    lastMs = nowMs;
    const time = nowMs * 0.001;

    MouseState.update(dt);
    // Extra-silky damped interpolation for buttery cinema scrubbing
    smoothP += (targetP - smoothP) * (1 - Math.exp(-8.5 * dt));
    if (Math.abs(targetP - smoothP) < 0.00004) smoothP = targetP;
    const p = smoothP;

    const isMobile = w <= 900;
    const isDark = document.documentElement.classList.contains('cinema-mode');
    const stageCX = w * (isMobile ? 0.5 : 0.63);
    const stageCY = h * (isMobile ? 0.28 : 0.52);

    const mx = isMobile ? 0 : MouseState.sx * 12;
    const my = isMobile ? 0 : MouseState.sy * 8;
    const mRot = isMobile ? 0 : MouseState.sx * 1.8;

    // Smooth beat transition right as the Ghost starts rising cleanly from the bowl
    const beatIdx = p < 0.38 ? 0 : 1;
    if (beatIdx !== activeBeat) {
      activeBeat = beatIdx;
      beats.forEach((b, i) => {
        b.classList.toggle('is-active', i === beatIdx);
        b.classList.toggle('is-passed', i < beatIdx);
      });
    }
    if (scrollCue) scrollCue.classList.toggle('is-hidden', p > 0.06);

    /* ------------------------------------------------------------------
       PHASE A->B->C BOWL CHOREOGRAPHY (NEVER slides up across Ghost's face!)
       - Phase A–B (0.00–0.72): Sits grounded, gently settles into frame
       - Phase C (0.72–0.96): Smoothly SINKS DOWNWARD & fades away below Ghost!
       ------------------------------------------------------------------ */
    const bowlSettleT = easeInOutSine(invLerp(p, 0.0, 0.45));
    const bowlSinkT = easeInOutCubic(invLerp(p, 0.72, 0.96));
    const bowlStartY = isMobile ? 10 : 76;
    const bowlMidY = isMobile ? 4 : 58;
    const bowlY = lerp(bowlStartY, bowlMidY, bowlSettleT) + bowlSinkT * (h * (isMobile ? 0.24 : 0.34));
    const bowlScale = lerp(1.05, 1.0, bowlSettleT) * lerp(1.0, 0.86, bowlSinkT);
    const bowlRot = lerp(0, -1.5, bowlSettleT) + mRot * 0.35;
    const bowlOp = clamp(1 - easeInOutCubic(invLerp(p, 0.72, 0.93)), 0, 1);

    const bowlTf = `translate3d(calc(-50% + ${(mx * 0.55).toFixed(1)}px), calc(-50% + ${(bowlY + my * 0.4).toFixed(1)}px), 0) scale(${bowlScale.toFixed(4)}) rotate(${bowlRot.toFixed(2)}deg)`;
    if (bowlBack && bowlFront) {
      bowlBack.style.transform = bowlTf;
      bowlBack.style.opacity = bowlOp.toFixed(3);
      bowlFront.style.transform = bowlTf;
      bowlFront.style.opacity = bowlOp.toFixed(3);
    }

    const bowlAnchorY = h * (isMobile ? 0.28 : 0.56);
    const bowlMouthY = bowlAnchorY + bowlY + my * 0.4 - bowlSizePx * 0.045 * bowlScale;

    /* ------------------------------------------------------------------
       PHASE B->C GHOST CHOREOGRAPHY (Hidden during pour -> Emerges cleanly!)
       ------------------------------------------------------------------ */
    const emerge = easeOutCubic(invLerp(p, 0.32, 0.72));
    const handoff = easeInOutCubic(invLerp(p, 0.72, 1.0));

    let ghostY = lerp(isMobile ? 96 : 225, isMobile ? 6 : 26, emerge);
    ghostY = lerp(ghostY, isMobile ? -10 : -8, handoff);
    const levitate = Math.sin(time * 1.9) * (isMobile ? 4.5 : 6.5) * handoff;

    let ghostScale = lerp(isMobile ? 0.54 : 0.46, isMobile ? 0.8 : 0.74, emerge);
    ghostScale = lerp(ghostScale, isMobile ? 0.9 : 0.95, handoff);

    const ghostOp = clamp(invLerp(p, 0.32, 0.48), 0, 1);
    const danceSway = Math.sin(time * 1.45) * 1.35 * emerge;
    const ghostRot = lerp(-2.2, 0.5, emerge) * (1 - handoff) + danceSway + mRot;

    ghostRig.style.transform = `translate3d(calc(-50% + ${mx.toFixed(1)}px), calc(-50% + ${(ghostY + levitate + my).toFixed(1)}px), 0) scale(${ghostScale.toFixed(4)}) rotate(${ghostRot.toFixed(2)}deg)`;
    ghostRig.style.opacity = ghostOp.toFixed(3);

    // Surgical waterline clip: hides cut cleanly behind the curved front engraved silver rim
    // (zero straight line inside the red liquid AND zero skirt poking below the bowl!)
    if (ghostMask) {
      if (bowlOp > 0.02) {
        const bowlClipY = bowlMouthY + bowlSizePx * 0.145 * bowlScale;
        const clipAtBowl = Math.max(0, h - bowlClipY);
        const activeClip = lerp(clipAtBowl, 0, easeInOutCubic(invLerp(p, 0.76, 0.94)));
        ghostMask.style.clipPath = activeClip > 1 ? `inset(0px 0px ${activeClip.toFixed(1)}px 0px)` : 'none';
      } else {
        ghostMask.style.clipPath = 'none';
      }
    }

    const eyePulse = 0.5 + 0.5 * Math.sin(time * 3.1);
    if (ghostEyes) ghostEyes.style.opacity = (emerge * (0.6 + eyePulse * 0.4)).toFixed(3);
    if (ghostAura) ghostAura.style.opacity = (emerge * (isDark ? 0.78 : 0.48)).toFixed(3);
    if (crimsonHalo) crimsonHalo.style.opacity = clamp(0.18 + emerge * 0.38, 0, isDark ? 0.85 : 0.45).toFixed(3);

    // Back Canvas: Ambient Embers + Sacred Occult Circle
    backCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    backCtx.clearRect(0, 0, w, h);

    embers.forEach((em) => {
      em.y -= em.vy * dt;
      em.x += (em.vx + Math.sin(time + em.phase) * 0.008) * dt;
      if (em.y < -0.05) { em.y = 1.05; em.x = 0.25 + Math.random() * 0.7; }
      const alpha = 0.16 + 0.28 * (0.5 + 0.5 * Math.sin(time * 2.2 + em.phase));
      backCtx.beginPath();
      backCtx.arc(em.x * w, em.y * h, em.r, 0, Math.PI * 2);
      backCtx.fillStyle = em.bright
        ? (isDark ? `rgba(235,65,58,${alpha * 1.2})` : `rgba(155,22,24,${alpha})`)
        : (isDark ? `rgba(218,185,130,${alpha * 0.65})` : `rgba(80,68,60,${alpha * 0.4})`);
      backCtx.fill();
    });

    if (emerge > 0.04) {
      const r = Math.min(w * 0.24, 265) * lerp(0.82, 1.06, emerge);
      backCtx.save();
      backCtx.translate(stageCX + mx * 0.4, stageCY + ghostY * 0.25);
      backCtx.rotate(time * 0.2 + p * 2.2);
      backCtx.globalAlpha = emerge * (isDark ? 0.45 : 0.3);
      backCtx.beginPath();
      backCtx.setLineDash([12, 10]);
      backCtx.arc(0, 0, r, 0, Math.PI * 2);
      backCtx.strokeStyle = isDark ? 'rgba(210,52,52,0.65)' : 'rgba(135,24,24,0.55)';
      backCtx.lineWidth = 1.25;
      backCtx.stroke();
      backCtx.restore();
    }

    // Mid Canvas (inside bowl rim): Pouring Crimson Blood Stream + Ripples
    midCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    midCtx.clearRect(0, 0, w, h);
    drawHeroStream(midCtx, stageCX + mx * 0.55, bowlMouthY, bowlScale, bowlOp, p, time, isDark);

    rafId = window.requestAnimationFrame(render);
  }

  function start() {
    if (isVisible && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      lastMs = 0;
      rafId = window.requestAnimationFrame(render);
    }
  }

  resize();
  updateTarget();
  smoothP = targetP;

  window.addEventListener('resize', () => { resize(); updateTarget(); }, { passive: true });
  window.addEventListener('orientationchange', () => {
    window.setTimeout(() => { resize(); updateTarget(); }, 140);
  }, { passive: true });
  window.addEventListener('load', () => { resize(); updateTarget(); }, { once: true });
  window.addEventListener('scroll', updateTarget, { passive: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      isVisible = Boolean(entries[0]?.isIntersecting);
      start();
    }, { threshold: 0 }).observe(section);
  }
  start();
}

/* ==========================================================================
   ACT 2: POSTERS APPARITION + OPPOSING SCROLL PARALLAX + ACT 5 EDITORIAL SCRUB
   (Unified lightweight scroll-scrubbed DOM compositor for Acts 2 & 5!)
   ========================================================================== */
function initScrollScrubbedSections() {
  const postersSection = document.getElementById('posters');
  const apparitionGhost = document.getElementById('apparition-ghost-wrap');
  const apparitionBadge = document.getElementById('apparition-curved-badge');
  const ringOuter = document.getElementById('apparition-ring-outer');
  const ringInner = document.getElementById('apparition-ring-inner');
  const apparitionEyes = document.getElementById('apparition-eyes-glow');

  const aboutSection = document.getElementById('about');
  const aboutImg = document.getElementById('about-portrait-img');
  const accentLines = Array.from(document.querySelectorAll('[data-scroll-line]'));

  let rafId = null;
  let lastMs = 0;
  let isPostersVis = false;
  let isAboutVis = false;

  // Trigger smooth stat count-up once when About stats enter view
  const countEls = Array.from(document.querySelectorAll('[data-count-to]'));
  if ('IntersectionObserver' in window && countEls.length > 0 && !REDUCED_MOTION_QUERY.matches) {
    const countObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const targetVal = Number(el.dataset.countTo) || 2;
        const pad = Number(el.dataset.pad) || 2;
        const startT = performance.now();
        const dur = 750;
        const tickCount = (now) => {
          const u = easeOutCubic(clamp((now - startT) / dur, 0, 1));
          const val = Math.round(lerp(0, targetVal, u));
          el.textContent = String(val).padStart(pad, '0');
          if (u < 1) window.requestAnimationFrame(tickCount);
        };
        window.requestAnimationFrame(tickCount);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    countEls.forEach((el) => countObs.observe(el));
  }

  function updateAccentLines() {
    const vh = window.innerHeight || 800;
    accentLines.forEach((line) => {
      const rect = line.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const progress = easeOutCubic(invLerp(vh - rect.top, 40, vh * 0.55));
        line.style.transform = `scaleX(${lerp(0.22, 1.0, progress).toFixed(3)})`;
      }
    });
  }

  function renderFrame(nowMs) {
    rafId = null;
    if (REDUCED_MOTION_QUERY.matches) return;

    if (!lastMs) lastMs = nowMs;
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastMs) / 1000));
    lastMs = nowMs;
    const time = nowMs * 0.001;
    const vh = window.innerHeight || 800;
    const isDesktop = (window.innerWidth || 1200) > 860;

    MouseState.update(dt);

    // Act 2: Ghost Apparition + Curved Orbital Badge + Opposing Poster Parallax
    if (isPostersVis && postersSection) {
      const rect = postersSection.getBoundingClientRect();
      const prog = invLerp(vh - rect.top, 0, rect.height + vh);

      if (apparitionGhost) {
        const riseY = lerp(52, -36, easeInOutSine(invLerp(prog, 0.0, 0.65)));
        const levitate = Math.sin(time * 1.9) * 7;
        const pointScale = lerp(0.94, 1.04, easeOutCubic(invLerp(prog, 0.08, 0.52)));
        const rot = lerp(-3.0, 2.2, prog) + (isDesktop ? MouseState.sx * 2.0 : 0);
        const mx = isDesktop ? MouseState.sx * 10 : 0;
        const op = clamp(invLerp(prog, 0.02, 0.22), 0.15, 1);
        apparitionGhost.style.transform = `translate3d(${mx.toFixed(1)}px, ${(riseY + levitate).toFixed(1)}px, 0) scale(${pointScale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        apparitionGhost.style.opacity = op.toFixed(3);
      }

      if (apparitionEyes) {
        apparitionEyes.style.opacity = (0.55 + 0.4 * Math.sin(time * 3.0)).toFixed(3);
      }

      if (apparitionBadge) {
        const badgeRot = lerp(-10, 10, prog) + Math.sin(time * 0.85) * 2.0;
        apparitionBadge.style.transform = `translate3d(-50%, -50%, 0) rotate(${badgeRot.toFixed(2)}deg)`;
      }

      if (ringOuter) {
        ringOuter.style.transform = `translate3d(-50%, -50%, 0) rotate(${(time * 10 + prog * 70).toFixed(1)}deg)`;
      }
      if (ringInner) {
        ringInner.style.transform = `translate3d(-50%, -50%, 0) rotate(${(-time * 14 - prog * 95).toFixed(1)}deg)`;
      }

      // Opposing Dual-Column Parallax on Poster Cards (Desktop 2-col)
      if (isDesktop) {
        const cards = postersSection.querySelectorAll('.poster-card');
        const centerOffset = clamp((rect.top + rect.height * 0.55 - vh * 0.5) / vh, -1, 1);
        cards.forEach((card, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          const shiftY = centerOffset * 26 * dir;
          card.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0)`;
        });
      }
    }

    // Act 5: Director Portrait Scroll-Scrubbed Ken Burns Zoom
    if (isAboutVis && aboutSection && aboutImg) {
      const rect = aboutSection.getBoundingClientRect();
      const prog = invLerp(vh - rect.top, 0, rect.height + vh);
      const zoomScale = lerp(1.15, 1.0, easeOutCubic(prog));
      const panY = lerp(-14, 14, prog);
      aboutImg.style.transform = `translate3d(0, ${panY.toFixed(1)}px, 0) scale(${zoomScale.toFixed(4)})`;
    }

    if (isPostersVis || isAboutVis) {
      rafId = window.requestAnimationFrame(renderFrame);
    }
  }

  function ensureLoop() {
    if ((isPostersVis || isAboutVis) && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      lastMs = 0;
      rafId = window.requestAnimationFrame(renderFrame);
    }
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === postersSection) isPostersVis = entry.isIntersecting;
        if (entry.target === aboutSection) isAboutVis = entry.isIntersecting;
      });
      ensureLoop();
    }, { threshold: 0 });
    if (postersSection) obs.observe(postersSection);
    if (aboutSection) obs.observe(aboutSection);
  }

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateAccentLines);
  }, { passive: true });
  updateAccentLines();
}

/* ==========================================================================
   ACT 3: OFFICIAL TEASERS — DIPPED IN CRIMSON BLOOD POOL STAGE
   ========================================================================== */
function initAct3TeasersBloodPool() {
  const section = document.getElementById('teasers');
  const banner = document.getElementById('teaser-blood-stage');
  const backCanvas = document.getElementById('teaser-blood-back');
  const frontCanvas = document.getElementById('teaser-blood-front');
  const ghostMask = document.getElementById('teaser-ghost-mask');
  const ghostRig = document.getElementById('teaser-ghost-rig');
  const ghostEyes = document.getElementById('teaser-eyes-glow');

  if (!section || !banner || !backCanvas || !frontCanvas || !ghostRig) return;
  const backCtx = backCanvas.getContext('2d', { alpha: true });
  const frontCtx = frontCanvas.getContext('2d', { alpha: true });
  if (!backCtx || !frontCtx) return;

  let w = 1280, h = 520, dpr = 1;
  let isVisible = false, rafId = null, lastMs = 0;
  let smoothProg = 0.5, prevProg = 0.5;

  const droplets = Array.from({ length: 14 }, (_, i) => ({
    angle: -Math.PI * 0.86 + (i / 13) * Math.PI * 0.72,
    dist: 0.35 + Math.random() * 0.65,
    size: 2.2 + Math.random() * 4.0,
    phase: Math.random() * Math.PI * 2,
    speed: 0.75 + Math.random() * 0.8
  }));

  function resize() {
    const rect = banner.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    backCanvas.width = Math.round(w * dpr);
    backCanvas.height = Math.round(h * dpr);
    frontCanvas.width = Math.round(w * dpr);
    frontCanvas.height = Math.round(h * dpr);
  }

  function render(nowMs) {
    rafId = null;
    if (!isVisible || REDUCED_MOTION_QUERY.matches) return;

    if (!lastMs) lastMs = nowMs;
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastMs) / 1000));
    lastMs = nowMs;
    const time = nowMs * 0.001;

    const vh = window.innerHeight || 800;
    const rect = banner.getBoundingClientRect();
    const targetProg = invLerp(vh - rect.top, 0, rect.height + vh * 0.85);
    smoothProg += (targetProg - smoothProg) * (1 - Math.exp(-10 * dt));
    const vel = (smoothProg - prevProg) / Math.max(0.016, dt) * 0.016;
    prevProg = smoothProg;

    const isMobile = w <= 860;
    const isDark = document.documentElement.classList.contains('cinema-mode');
    const ghostCX = isMobile ? w * 0.5 : w * 0.69;
    const surfaceY = isMobile ? Math.max(h - 66, h * 0.8) : h * 0.66;

    // Ghost dips deep into the glossy crimson pool and rises dramatically as you scroll!
    const dipArc = Math.sin(clamp(smoothProg, 0, 1) * Math.PI);
    const ghostShiftY = lerp(isMobile ? 46 : 175, isMobile ? -12 : 42, dipArc) + Math.sin(time * 1.8) * (isMobile ? 4.5 : 6);
    const ghostRot = lerp(-3.5, 2.5, smoothProg);
    ghostRig.style.transform = `translate3d(0, ${ghostShiftY.toFixed(1)}px, 0) rotate(${ghostRot.toFixed(2)}deg)`;

    if (ghostEyes) ghostEyes.style.opacity = (0.55 + 0.4 * Math.sin(time * 3.1)).toFixed(3);

    // Clip Ghost lower torso smoothly right at the crimson wave line
    if (ghostMask) {
      const maskRect = ghostMask.getBoundingClientRect();
      const bannerRect = banner.getBoundingClientRect();
      const waterlineInMask = (bannerRect.top + surfaceY + 12) - maskRect.top;
      const clipBot = Math.max(0, maskRect.height - waterlineInMask);
      ghostMask.style.clipPath = `inset(0px 0px ${clipBot.toFixed(1)}px 0px)`;
    }

    // Teaser cards subtle scroll scale-in
    const cards = section.querySelectorAll('.teaser-card');
    cards.forEach((card, i) => {
      const cRect = card.getBoundingClientRect();
      const cp = easeOutCubic(invLerp(vh - cRect.top, -20, vh * 0.52));
      const sc = lerp(0.94, 1.0, cp);
      const ty = lerp(26 + i * 10, 0, cp);
      card.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
    });

    // Draw Back Liquid Horizon
    backCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    backCtx.clearRect(0, 0, w, h);
    const backY = surfaceY - 16;
    const backGrad = backCtx.createLinearGradient(0, backY, 0, h);
    backGrad.addColorStop(0, '#2e0406');
    backGrad.addColorStop(0.5, '#4d080c');
    backGrad.addColorStop(1, '#130203');
    backCtx.beginPath();
    backCtx.moveTo(0, h + 4);
    for (let x = 0; x <= w + 24; x += 24) {
      const wy = Math.sin(x * 0.007 + time * 1.5) * 7 + Math.cos(x * 0.013 - time * 1.1) * 3.5;
      backCtx.lineTo(x, backY + wy);
    }
    backCtx.lineTo(w + 24, h + 4);
    backCtx.closePath();
    backCtx.fillStyle = backGrad;
    backCtx.fill();

    // Draw Front Glossy Liquid Blood Wave + Ripples + Arcing Droplets
    frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    frontCtx.clearRect(0, 0, w, h);

    const waveBoost = 1 + Math.min(Math.abs(vel) * 20, 1.6);
    const pts = [];
    for (let x = 0; x <= w + 18; x += 18) {
      const d = Math.abs(x - ghostCX);
      const ripple = Math.exp(-d / (w * 0.24)) * Math.cos(d * 0.032 - time * 5.0 - smoothProg * 14) * 8 * waveBoost;
      const amb = Math.sin(x * 0.0085 - time * 2.0) * 7.5 + Math.sin(x * 0.018 + time * 1.3) * 3;
      pts.push([x, surfaceY + amb + ripple]);
    }

    const bodyGrad = frontCtx.createLinearGradient(0, surfaceY - 10, 0, h);
    bodyGrad.addColorStop(0, '#7c0f15');
    bodyGrad.addColorStop(0.2, '#54080d');
    bodyGrad.addColorStop(0.65, '#260306');
    bodyGrad.addColorStop(1, '#130203');

    frontCtx.beginPath();
    frontCtx.moveTo(0, h + 6);
    pts.forEach(([x, y]) => frontCtx.lineTo(x, y));
    frontCtx.lineTo(w + 18, h + 6);
    frontCtx.closePath();
    frontCtx.fillStyle = bodyGrad;
    frontCtx.fill();

    // Specular wet glass crest
    frontCtx.beginPath();
    pts.forEach(([x, y], i) => {
      if (i === 0) frontCtx.moveTo(x, y + 1);
      else frontCtx.lineTo(x, y + 1);
    });
    const rimGrad = frontCtx.createLinearGradient(ghostCX - w * 0.32, 0, ghostCX + w * 0.32, 0);
    rimGrad.addColorStop(0, 'rgba(255,160,155,0.06)');
    rimGrad.addColorStop(0.45, isDark ? 'rgba(255,120,120,0.85)' : 'rgba(255,225,220,0.78)');
    rimGrad.addColorStop(1, 'rgba(255,160,155,0.06)');
    frontCtx.strokeStyle = rimGrad;
    frontCtx.lineWidth = 2.4;
    frontCtx.stroke();

    // Concentric elliptical ripples around submerged Ghost
    for (let r = 0; r < 4; r++) {
      const rp = (time * 0.62 + r * 0.25 + smoothProg * 2.4) % 1;
      const rx = 48 + rp * Math.min(w * 0.23, 240);
      const ry = rx * 0.16;
      frontCtx.beginPath();
      frontCtx.ellipse(ghostCX, surfaceY + 12 + rp * 16, rx, ry, 0, 0, Math.PI * 2);
      frontCtx.strokeStyle = `rgba(255, 190, 185, ${(1 - rp) * 0.42})`;
      frontCtx.lineWidth = 1.6 * (1 - rp * 0.45);
      frontCtx.stroke();
    }

    // Glossy splashing crimson droplets
    droplets.forEach((d) => {
      const cyc = (time * d.speed * 0.55 + d.phase) % 1;
      const dx = ghostCX + Math.cos(d.angle) * d.dist * Math.min(w * 0.18, 175) * (0.45 + cyc * 0.8);
      const dy = surfaceY + 4 - Math.sin(cyc * Math.PI) * (48 + d.dist * 68);
      const a = Math.sin(cyc * Math.PI) * 0.8;
      frontCtx.beginPath();
      frontCtx.arc(dx, dy, d.size * (1 - cyc * 0.3), 0, Math.PI * 2);
      frontCtx.fillStyle = `rgba(155, 18, 24, ${a})`;
      frontCtx.fill();
    });

    rafId = window.requestAnimationFrame(render);
  }

  function start() {
    if (isVisible && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      lastMs = 0;
      rafId = window.requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('load', resize, { once: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      isVisible = Boolean(entries[0]?.isIntersecting);
      start();
    }, { threshold: 0 }).observe(section);
  }
}

/* ==========================================================================
   ACT 4: FEATURED PROJECT — BLOODLAND WAR HERO STAGE & DUAL-THEME SPOTLIGHT
   (General & Noble Lady cutout with scroll-scrubbed battle rings, 3D mouse
    parallax, steel blade glint, click-to-ignite battlefield ember bursts,
    and smooth dual-theme morphing: Golden War Flame <-> Crimson Horror!)
   ========================================================================== */
function initAct4FeaturedDualTheme() {
  const section = document.getElementById('featured');
  const backCanvas = document.getElementById('featured-canvas-back');
  const frontCanvas = document.getElementById('featured-canvas-front');
  const warStage = document.getElementById('war-stage');
  const warRig = document.getElementById('war-heroes-rig');
  const warSun = document.getElementById('war-sun-halo');
  const warRingOuter = document.getElementById('war-ring-outer');
  const warRingInner = document.getElementById('war-ring-inner');
  const warBadge = document.getElementById('war-curved-badge');
  const warFrontCanvas = document.getElementById('war-stage-front');

  if (!section || !backCanvas || !frontCanvas) return;

  const backCtx = backCanvas.getContext('2d', { alpha: true });
  const frontCtx = frontCanvas.getContext('2d', { alpha: true });
  const warCtx = warFrontCanvas ? warFrontCanvas.getContext('2d', { alpha: true }) : null;
  if (!backCtx || !frontCtx) return;

  let bw = 1280, bh = 1100, fw = 1200, fh = 600, ww = 540, wh = 540, dpr = 1;
  let warSecCX = 920, warSecCY = 320, warSecR = 230;
  let posterSecCX = 320, posterSecCY = 820;
  let rigBoxX = 50, rigBoxY = 60, rigBoxW = 420, rigBoxH = 426;

  let isVisible = false, rafId = null, lastMs = 0;
  let targetTheme = 1; // 1 = war molten gold (default), 0 = horror crimson
  let smoothTheme = 1;
  let isWarHover = false;
  let hoverBoost = 0;
  let ignitePulse = 0;
  let bladeBurstT = -1; // >= 0..1 while a click-triggered blade sweep runs
  let lastToastAt = 0;

  const burstParticles = [];

  setFeaturedCanvasTheme = (themeName) => {
    targetTheme = themeName === 'war' ? 1 : 0;
    section.dataset.movieTheme = themeName === 'war' ? 'war' : 'horror';
  };

  const sparks = Array.from({ length: 38 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.3 + Math.random() * 2.8,
    vy: 0.04 + Math.random() * 0.09,
    vx: (Math.random() - 0.5) * 0.055,
    phase: Math.random() * Math.PI * 2,
    isHero: i % 2 === 0
  }));

  const fgWarEmbers = Array.from({ length: 12 }, (_, i) => ({
    x: 0.14 + Math.random() * 0.72,
    y: 0.2 + Math.random() * 0.78,
    r: 1.2 + Math.random() * 2.1,
    vy: 0.09 + Math.random() * 0.14,
    vx: 0.02 + (Math.random() - 0.35) * 0.06,
    phase: Math.random() * Math.PI * 2,
    gold: i % 3 !== 0
  }));

  function spawnWarBurst() {
    ignitePulse = 1;
    bladeBurstT = 0;
    const originX = rigBoxX + rigBoxW * 0.52;
    const originY = rigBoxY + rigBoxH * 0.72;
    for (let i = 0; i < 28; i++) {
      const angle = -Math.PI * 0.92 + Math.random() * Math.PI * 0.84 + (Math.random() - 0.5) * 0.45;
      const speed = 95 + Math.random() * 220;
      burstParticles.push({
        x: originX + (Math.random() - 0.5) * rigBoxW * 0.32,
        y: originY + (Math.random() - 0.5) * rigBoxH * 0.22,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 45,
        r: 1.6 + Math.random() * 2.8,
        life: 1,
        decay: 0.75 + Math.random() * 0.7,
        isGold: i % 3 !== 0
      });
    }
  }

  function handleWarStageIgnite() {
    spawnWarBurst();
    const warIdx = MOVIES.findIndex((m) => m.theme === 'war');
    if (warIdx !== -1 && targetTheme < 0.5) {
      renderFeaturedProject(MOVIES, warIdx);
    }
    const now = performance.now();
    if (now - lastToastAt > 2200) {
      lastToastAt = now;
      showToast('จุดประกายเปลวไฟแห่งสมรภูมิ — แผ่นดินเลือด');
    }
  }

  if (warStage) {
    warStage.addEventListener('pointerenter', () => { isWarHover = true; }, { passive: true });
    warStage.addEventListener('pointerleave', () => { isWarHover = false; }, { passive: true });
    warStage.addEventListener('click', handleWarStageIgnite);
    warStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleWarStageIgnite();
      }
    });
  }

  function drawStarGlint(ctx, x, y, radius, alpha, rotRad, coreColor, glowColor) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotRad);
    ctx.globalAlpha = alpha;

    const g = ctx.createRadialGradient(0, 0, 0.5, 0, 0, radius * 1.15);
    g.addColorStop(0, coreColor);
    g.addColorStop(0.35, glowColor);
    g.addColorStop(1, 'rgba(255,210,120,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
    ctx.fill();

    // Crisp 4-point cinema lens star
    ctx.beginPath();
    const spikes = [
      [0, -radius * 1.55], [radius * 0.14, -radius * 0.14],
      [radius * 1.55, 0], [radius * 0.14, radius * 0.14],
      [0, radius * 1.55], [-radius * 0.14, radius * 0.14],
      [-radius * 1.55, 0], [-radius * 0.14, -radius * 0.14]
    ];
    ctx.moveTo(spikes[0][0], spikes[0][1]);
    for (let i = 1; i < spikes.length; i++) ctx.lineTo(spikes[i][0], spikes[i][1]);
    ctx.closePath();
    ctx.fillStyle = coreColor;
    ctx.fill();
    ctx.restore();
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const sRect = section.getBoundingClientRect();
    bw = Math.max(1, Math.round(sRect.width));
    bh = Math.max(1, Math.round(sRect.height));
    backCanvas.width = Math.round(bw * dpr);
    backCanvas.height = Math.round(bh * dpr);

    const shell = frontCanvas.parentElement;
    if (shell) {
      const fRect = shell.getBoundingClientRect();
      fw = Math.max(1, Math.round(fRect.width));
      fh = Math.max(1, Math.round(fRect.height));
      frontCanvas.width = Math.round(fw * dpr);
      frontCanvas.height = Math.round(fh * dpr);

      const isWide = bw > 860;
      posterSecCX = (fRect.left - sRect.left) + (isWide ? fw * 0.22 : fw * 0.5);
      posterSecCY = (fRect.top - sRect.top) + (isWide ? fh * 0.54 : fh * 0.28);
    }

    if (warStage && warFrontCanvas) {
      const wRect = warFrontCanvas.getBoundingClientRect();
      ww = Math.max(1, Math.round(wRect.width));
      wh = Math.max(1, Math.round(wRect.height));
      warFrontCanvas.width = Math.round(ww * dpr);
      warFrontCanvas.height = Math.round(wh * dpr);

      const stRect = warStage.getBoundingClientRect();
      warSecCX = (stRect.left - sRect.left) + stRect.width * 0.5;
      warSecCY = (stRect.top - sRect.top) + stRect.height * 0.54;
      warSecR = Math.min(stRect.width * 0.52, 260);

      if (warRig) {
        const insetX = warStage.clientWidth * 0.1;
        const insetY = warStage.clientHeight * 0.1;
        rigBoxX = warRig.offsetLeft + insetX;
        rigBoxY = warRig.offsetTop + insetY;
        rigBoxW = Math.max(1, warRig.offsetWidth);
        rigBoxH = Math.max(1, warRig.offsetHeight);
      }
    }
  }

  function render(nowMs) {
    rafId = null;
    if (!isVisible || REDUCED_MOTION_QUERY.matches) return;

    if (!lastMs) lastMs = nowMs;
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastMs) / 1000));
    lastMs = nowMs;
    const time = nowMs * 0.001;
    const isDark = document.documentElement.classList.contains('cinema-mode');
    const isDesktop = (window.innerWidth || 1200) > 860;

    MouseState.update(dt);

    // Smoothly morph palette between Crimson Horror (0) and Molten War Gold (1)
    smoothTheme += (targetTheme - smoothTheme) * (1 - Math.exp(-5.5 * dt));
    hoverBoost += ((isWarHover ? 1 : 0) - hoverBoost) * (1 - Math.exp(-6.0 * dt));
    ignitePulse = Math.max(0, ignitePulse - dt * 1.15);
    if (bladeBurstT >= 0) {
      bladeBurstT += dt * 1.65;
      if (bladeBurstT > 1) bladeBurstT = -1;
    }

    const t = smoothTheme;
    const energy = 1 + hoverBoost * 0.35 + ignitePulse * 0.9;

    const palette = {
      deep: lerpRGB([56, 5, 8], [92, 44, 6], t),
      dark: lerpRGB([96, 10, 14], [156, 88, 16], t),
      mid: lerpRGB([148, 18, 24], [208, 134, 28], t),
      bright: lerpRGB([198, 32, 38], [252, 202, 92], t),
      fadeEdge: lerpRGB([55, 5, 8], [98, 54, 10], t, 0.14),
      specular: lerpRGB([255, 195, 190], [255, 246, 204], t, isDark ? 0.58 : 0.68)
    };

    const vh = window.innerHeight || 800;
    const sRect = section.getBoundingClientRect();

    // 1. Scroll-Scrubbed & 3D Parallax Choreography for Bloodland Heroes Stage
    let heroShiftX = 0;
    let heroShiftY = 0;
    if (warStage && warRig) {
      const stRect = warStage.getBoundingClientRect();
      const warProg = invLerp(vh - stRect.top, -40, stRect.height + vh * 0.85);
      const riseY = lerp(42, -16, easeInOutSine(invLerp(warProg, 0.0, 0.78)));
      const breatheY = Math.sin(time * 1.55) * 4.5;
      const heroScale = lerp(0.92, 1.015, easeOutCubic(invLerp(warProg, 0.04, 0.5))) + hoverBoost * 0.025 + ignitePulse * 0.02;

      const mx = isDesktop ? MouseState.sx * (10 + hoverBoost * 6) : 0;
      const my = isDesktop ? MouseState.sy * (6 + hoverBoost * 4) : 0;
      const rotY = isDesktop ? MouseState.sx * (4.2 + hoverBoost * 2.5) : 0;
      const rotX = isDesktop ? -MouseState.sy * (2.6 + hoverBoost * 1.5) : 0;

      heroShiftX = mx;
      heroShiftY = riseY + breatheY + my * 0.6;

      warRig.style.transform = `translate3d(${heroShiftX.toFixed(1)}px, ${heroShiftY.toFixed(1)}px, 0) scale(${heroScale.toFixed(4)}) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;
      warRig.style.opacity = clamp(invLerp(warProg, 0.0, 0.18), 0.2, 1).toFixed(3);

      if (warSun) {
        const sunScale = 1 + hoverBoost * 0.08 + ignitePulse * 0.22 + Math.sin(time * 2.1) * 0.03;
        const sunOp = clamp(0.68 + hoverBoost * 0.2 + ignitePulse * 0.32, 0, 1);
        warSun.style.transform = `translate3d(calc(-50% + ${(-mx * 0.55).toFixed(1)}px), calc(-50% + ${(-my * 0.45).toFixed(1)}px), 0) scale(${sunScale.toFixed(3)})`;
        warSun.style.opacity = sunOp.toFixed(3);
      }

      if (warRingOuter) {
        warRingOuter.style.transform = `translate3d(calc(-50% + ${(-mx * 0.35).toFixed(1)}px), -50%, 0) rotate(${(time * 8 + warProg * 65 + ignitePulse * 18).toFixed(1)}deg)`;
      }
      if (warRingInner) {
        warRingInner.style.transform = `translate3d(calc(-50% + ${(mx * 0.28).toFixed(1)}px), -50%, 0) rotate(${(-time * 12 - warProg * 90 - ignitePulse * 24).toFixed(1)}deg)`;
      }
      if (warBadge) {
        const badgeRot = lerp(-9, 9, warProg) + Math.sin(time * 0.8) * 1.8;
        warBadge.style.transform = `translate3d(-50%, -50%, 0) rotate(${badgeRot.toFixed(2)}deg)`;
      }
    }

    // 2. Subtle scroll-scrubbed parallax on Featured Poster below
    const posterWrap = document.getElementById('featured-parallax');
    if (posterWrap) {
      const delta = clamp((sRect.top + sRect.height * 0.65 - vh * 0.5) / vh, -1, 1);
      posterWrap.style.transform = `translate3d(0, ${(delta * -20).toFixed(1)}px, 0)`;
    }

    // 3. Back Canvas: Dual-Focus Ambient Halos + Rising Battlefield Sparks + Back 3D Ribbons
    backCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    backCtx.clearRect(0, 0, bw, bh);

    // Halo behind Bloodland Heroes Stage (top)
    const warHalo = backCtx.createRadialGradient(warSecCX, warSecCY, 18, warSecCX, warSecCY, warSecR * 1.75);
    warHalo.addColorStop(0, lerpRGB([165, 24, 28], [228, 152, 38], t, (isDark ? 0.26 : 0.14) * energy));
    warHalo.addColorStop(0.55, lerpRGB([120, 14, 18], [185, 92, 20], t, (isDark ? 0.1 : 0.05) * energy));
    warHalo.addColorStop(1, 'rgba(0,0,0,0)');
    backCtx.fillStyle = warHalo;
    backCtx.fillRect(0, 0, bw, bh);

    // Halo behind Spotlight Poster (bottom)
    const posterR = Math.min(bw * (bw > 860 ? 0.21 : 0.4), 245);
    const pHalo = backCtx.createRadialGradient(posterSecCX, posterSecCY, 20, posterSecCX, posterSecCY, posterR * 1.45);
    pHalo.addColorStop(0, lerpRGB([155, 22, 26], [218, 146, 36], t, isDark ? 0.24 : 0.12));
    pHalo.addColorStop(0.55, lerpRGB([120, 14, 18], [180, 96, 20], t, isDark ? 0.09 : 0.04));
    pHalo.addColorStop(1, 'rgba(0,0,0,0)');
    backCtx.fillStyle = pHalo;
    backCtx.fillRect(0, 0, bw, bh);

    // Rising Embers (Fiery Stretched Golden War Sparks in War Mode <-> Eerie Crimson Embers in Horror Mode)
    const speedBoost = lerp(0.85, 1.9, t) * (1 + ignitePulse * 0.85);
    sparks.forEach((sp) => {
      sp.y -= sp.vy * dt * speedBoost;
      sp.x += (sp.vx + Math.sin(time * (1.2 + t) + sp.phase) * 0.022) * dt;
      if (sp.y < -0.04) { sp.y = 1.04; sp.x = Math.random(); }
      if (sp.x < 0) sp.x = 1;
      if (sp.x > 1) sp.x = 0;

      const flick = 0.5 + 0.5 * Math.sin(time * (2.6 + t * 2.2) + sp.phase);
      const alpha = (0.18 + flick * 0.46) * (isDark ? 1.15 : 0.9);
      backCtx.beginPath();
      if (t > 0.45 && sp.isHero) {
        backCtx.ellipse(sp.x * bw, sp.y * bh, sp.r * 0.62, sp.r * 2.25, 0.28, 0, Math.PI * 2);
      } else {
        backCtx.arc(sp.x * bw, sp.y * bh, sp.r, 0, Math.PI * 2);
      }
      backCtx.fillStyle = sp.isHero
        ? lerpRGB([210, 38, 42], [252, 188, 62], t, alpha)
        : lerpRGB([140, 22, 26], [232, 108, 28], t, alpha * 0.82);
      backCtx.fill();
    });

    // Back 3D ribbons wrapping behind BOTH the Bloodland Heroes AND the Spotlight Poster
    draw3DOrbitRibbons(backCtx, warSecCX, warSecCY + 16, warSecR * 0.92, 0.94, time, 'back', palette, isDark);
    draw3DOrbitRibbons(backCtx, posterSecCX, posterSecCY, posterR, 0.9, time + 1.1, 'back', palette, isDark);

    // 4. Dedicated War Heroes Foreground Canvas: 3D Banner Ribbons, Steel Blade Glint & Burst Sparks!
    if (warCtx && ww > 1 && wh > 1) {
      warCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      warCtx.clearRect(0, 0, ww, wh);

      // Sweeping Foreground 3D Molten-Gold / Crimson War-Banner Ribbons anchoring lower mist dissolve
      draw3DOrbitRibbons(
        warCtx,
        ww * 0.5 + heroShiftX * 0.35,
        wh * 0.76 + heroShiftY * 0.25,
        Math.min(ww * 0.38, 225),
        0.92,
        time * 1.08,
        'front',
        palette,
        isDark
      );

      // Steel Blade Glint gliding diagonally down the General's bloody sword!
      const autoCycle = (time % 4.2) / 4.2;
      const autoGlint = autoCycle < 0.28 ? easeInOutSine(autoCycle / 0.28) : -1;
      const activeGlint = bladeBurstT >= 0 ? easeOutCubic(bladeBurstT) : autoGlint;

      if (activeGlint >= 0 && activeGlint <= 1) {
        const bladeStartX = rigBoxX + rigBoxW * 0.375 + heroShiftX;
        const bladeStartY = rigBoxY + rigBoxH * 0.802 + heroShiftY;
        const bladeEndX = rigBoxX + rigBoxW * 0.645 + heroShiftX;
        const bladeEndY = rigBoxY + rigBoxH * 0.916 + heroShiftY;

        const gx = lerp(bladeStartX, bladeEndX, activeGlint);
        const gy = lerp(bladeStartY, bladeEndY, activeGlint);
        const glintEnv = Math.sin(activeGlint * Math.PI);
        const glintAlpha = clamp(glintEnv * (bladeBurstT >= 0 ? 0.98 : 0.82), 0, 1);

        // Diagonal metallic flash streak along the blade edge
        warCtx.save();
        warCtx.globalAlpha = glintAlpha * 0.62;
        const streakGrad = warCtx.createLinearGradient(bladeStartX, bladeStartY, bladeEndX, bladeEndY);
        streakGrad.addColorStop(0, 'rgba(255,245,215,0)');
        streakGrad.addColorStop(clamp(activeGlint - 0.14, 0, 1), 'rgba(255,240,200,0)');
        streakGrad.addColorStop(activeGlint, 'rgba(255,252,240,0.95)');
        streakGrad.addColorStop(clamp(activeGlint + 0.14, 0, 1), 'rgba(255,205,120,0)');
        streakGrad.addColorStop(1, 'rgba(255,245,215,0)');
        warCtx.strokeStyle = streakGrad;
        warCtx.lineWidth = bladeBurstT >= 0 ? 4.2 : 2.8;
        warCtx.lineCap = 'round';
        warCtx.beginPath();
        warCtx.moveTo(bladeStartX, bladeStartY);
        warCtx.lineTo(bladeEndX, bladeEndY);
        warCtx.stroke();
        warCtx.restore();

        drawStarGlint(
          warCtx,
          gx,
          gy,
          (bladeBurstT >= 0 ? 22 : 15) * (0.65 + glintEnv * 0.45),
          glintAlpha,
          0.38 + activeGlint * 0.4,
          'rgba(255, 253, 244, 0.96)',
          lerpRGB([255, 110, 105], [255, 208, 108], t, 0.55)
        );
      }

      // Subtle Golden Armor Medallion Shimmer on Click Ignite
      if (ignitePulse > 0.08) {
        drawStarGlint(
          warCtx,
          rigBoxX + rigBoxW * 0.675 + heroShiftX,
          rigBoxY + rigBoxH * 0.375 + heroShiftY,
          16 * ignitePulse,
          ignitePulse * 0.85,
          time * 1.4,
          'rgba(255, 248, 220, 0.92)',
          'rgba(248, 184, 68, 0.5)'
        );
      }

      // Foreground drifting war embers (in front of General & Lady for 3D depth)
      fgWarEmbers.forEach((em) => {
        em.y -= em.vy * dt * (0.85 + hoverBoost * 0.65 + ignitePulse * 1.2);
        em.x += (em.vx + Math.sin(time * 2.1 + em.phase) * 0.03) * dt;
        if (em.y < 0.04 || em.x > 0.96 || em.x < 0.04) {
          em.y = 0.88 + Math.random() * 0.1;
          em.x = 0.16 + Math.random() * 0.68;
        }
        const fl = 0.45 + 0.55 * Math.sin(time * 3.4 + em.phase);
        const a = (0.28 + fl * 0.52) * (isDark ? 1.05 : 0.88);
        warCtx.beginPath();
        warCtx.ellipse(em.x * ww, em.y * wh, em.r * 0.58, em.r * 2.0, 0.32, 0, Math.PI * 2);
        warCtx.fillStyle = em.gold
          ? lerpRGB([235, 62, 66], [255, 204, 88], t, a)
          : lerpRGB([175, 28, 32], [238, 118, 34], t, a * 0.85);
        warCtx.fill();
      });

      // Interactive Click-Burst Battlefield Sparks
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx * dt;
        bp.y += bp.vy * dt;
        bp.vx *= Math.exp(-1.9 * dt);
        bp.vy += (120 - 180) * dt; // hot embers float upward slightly
        bp.life -= bp.decay * dt;
        if (bp.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }
        const a = clamp(bp.life, 0, 1);
        const angle = Math.atan2(bp.vy, bp.vx);
        warCtx.save();
        warCtx.translate(bp.x, bp.y);
        warCtx.rotate(angle);
        warCtx.beginPath();
        warCtx.ellipse(0, 0, bp.r * (1.8 + a), bp.r * 0.65, 0, 0, Math.PI * 2);
        warCtx.fillStyle = bp.isGold
          ? `rgba(255, 212, 98, ${a})`
          : `rgba(235, 76, 42, ${a * 0.92})`;
        warCtx.fill();
        warCtx.restore();
      }
    }

    // 5. Front Canvas on Spotlight Card Shell: Delicate Foreground 3D Ribbon Crossing Lower Poster Corner
    frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    frontCtx.clearRect(0, 0, fw, fh);
    const isWide = bw > 860;
    const fCX = isWide ? fw * 0.2 : fw * 0.5;
    const fCY = isWide ? fh * 0.6 : Math.min(430, fh * 0.38);
    const fR = isWide ? Math.min(fw * 0.19, 225) : Math.min(fw * 0.46, 175);
    draw3DOrbitRibbons(frontCtx, fCX, fCY, fR, 0.88, time, 'front', palette, isDark);

    rafId = window.requestAnimationFrame(render);
  }

  function start() {
    if (isVisible && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      lastMs = 0;
      rafId = window.requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('load', resize, { once: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      isVisible = Boolean(entries[0]?.isIntersecting);
      if (isVisible) resize();
      start();
    }, { threshold: 0 }).observe(section);
  }
}

/* ==========================================================================
   ACT 6: CONTACT & LEVITATING GHOST FINALE (3D Ribbons + Embers)
   ========================================================================== */
function initAct6ContactFinale() {
  const section = document.getElementById('contact');
  const backCanvas = document.getElementById('finale-canvas-back');
  const frontCanvas = document.getElementById('finale-canvas-front');
  const ghostStage = document.getElementById('finale-ghost-stage');
  const ghostRig = document.getElementById('finale-ghost-rig');
  const ghostEyes = document.getElementById('finale-eyes-glow');

  if (!section || !backCanvas || !frontCanvas || !ghostRig) return;
  const backCtx = backCanvas.getContext('2d', { alpha: true });
  const frontCtx = frontCanvas.getContext('2d', { alpha: true });
  if (!backCtx || !frontCtx) return;

  let w = 1280, h = 680, dpr = 1;
  let stageCX = 920, stageCY = 380;
  let isVisible = false, rafId = null, lastMs = 0;

  const embers = Array.from({ length: 24 }, (_, i) => ({
    x: 0.45 + Math.random() * 0.52,
    y: Math.random(),
    r: 1.2 + Math.random() * 2.4,
    vy: 0.03 + Math.random() * 0.065,
    phase: Math.random() * Math.PI * 2,
    bright: i % 2 === 0
  }));

  function resize() {
    const rect = section.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    backCanvas.width = Math.round(w * dpr);
    backCanvas.height = Math.round(h * dpr);
    frontCanvas.width = Math.round(w * dpr);
    frontCanvas.height = Math.round(h * dpr);

    if (ghostStage) {
      const stRect = ghostStage.getBoundingClientRect();
      stageCX = (stRect.left - rect.left) + stRect.width * 0.5;
      stageCY = (stRect.top - rect.top) + stRect.height * 0.5;
    } else {
      stageCX = w >= 960 ? w * 0.74 : w * 0.5;
      stageCY = w >= 960 ? h * 0.56 : h * 0.74;
    }
  }

  function render(nowMs) {
    rafId = null;
    if (!isVisible || REDUCED_MOTION_QUERY.matches) return;

    if (!lastMs) lastMs = nowMs;
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastMs) / 1000));
    lastMs = nowMs;
    const time = nowMs * 0.001;
    const isDark = document.documentElement.classList.contains('cinema-mode');
    const isWide = w >= 960;

    MouseState.update(dt);

    const vh = window.innerHeight || 800;
    const rect = section.getBoundingClientRect();
    const enterP = easeOutCubic(invLerp(vh - rect.top, 40, vh * 0.72));

    // Gentle weightless levitation + subtle mouse 3D tilt (never overlaps Contact Card on left!)
    const levY = Math.sin(time * 1.65) * 11.5;
    const slideY = lerp(55, 0, enterP);
    const mx = isWide ? MouseState.sx * 10 : 0;
    const rot = (isWide ? MouseState.sx * 2.0 : 0) + Math.sin(time * 1.15) * 1.1;

    ghostRig.style.transform = `translate3d(${mx.toFixed(1)}px, ${(slideY + levY).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
    ghostRig.style.opacity = clamp(0.18 + enterP * 0.82, 0, 1).toFixed(3);
    if (ghostEyes) ghostEyes.style.opacity = (0.55 + 0.4 * Math.sin(time * 3.0)).toFixed(3);

    const gCX = stageCX + mx;
    const gCY = stageCY + levY;
    const rScale = Math.min(w * (isWide ? 0.19 : 0.36), 240);

    const crimsonPalette = {
      deep: '#3b0508',
      dark: '#5c090e',
      mid: '#8f1319',
      bright: '#b81d24',
      fadeEdge: 'rgba(55,5,8,0.18)',
      specular: isDark ? 'rgba(255,175,170,0.45)' : 'rgba(255,225,220,0.55)'
    };

    backCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    backCtx.clearRect(0, 0, w, h);

    embers.forEach((em) => {
      em.y -= em.vy * dt;
      if (em.y < -0.05) { em.y = 1.05; em.x = isWide ? 0.48 + Math.random() * 0.48 : Math.random(); }
      const alpha = (0.15 + 0.32 * (0.5 + 0.5 * Math.sin(time * 2.3 + em.phase))) * enterP;
      backCtx.beginPath();
      backCtx.arc(em.x * w, em.y * h, em.r, 0, Math.PI * 2);
      backCtx.fillStyle = em.bright
        ? (isDark ? `rgba(235,65,58,${alpha * 1.2})` : `rgba(155,22,24,${alpha})`)
        : (isDark ? `rgba(218,185,130,${alpha * 0.65})` : `rgba(80,68,60,${alpha * 0.45})`);
      backCtx.fill();
    });

    draw3DOrbitRibbons(backCtx, gCX, gCY, rScale, enterP * 0.92, time, 'back', crimsonPalette, isDark);

    frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    frontCtx.clearRect(0, 0, w, h);
    draw3DOrbitRibbons(frontCtx, gCX, gCY, rScale, enterP * 0.92, time, 'front', crimsonPalette, isDark);

    rafId = window.requestAnimationFrame(render);
  }

  function start() {
    if (isVisible && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      lastMs = 0;
      rafId = window.requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('load', resize, { once: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      isVisible = Boolean(entries[0]?.isIntersecting);
      if (isVisible) resize();
      start();
    }, { threshold: 0 }).observe(section);
  }
}

/* ==========================================================================
   GLOBAL HEADER PROGRESS BAR (Cached maxScroll — ZERO layout reflow!)
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
  window.addEventListener('resize', () => { recalc(); update(); }, { passive: true });
  window.addEventListener('load', () => { recalc(); update(); }, { once: true });

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
   PORTFOLIO RENDERING: POSTERS, TEASERS, FEATURED SPOTLIGHT
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
      card.style.setProperty('--reveal-delay', `${100 + (index % colCount) * 160}ms`);
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
            ${movie.englishTitle ? `<p class="poster-subtitle-en">${escapeHTML(movie.englishTitle)}</p>` : ''}
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
    .map((movie, index) => `
      <article class="teaser-card reveal" data-reveal="fade-up" style="--reveal-delay: ${80 + index * 160}ms">
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
    `)
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
  const themeBadge = document.getElementById('featured-theme-badge');
  if (!container || movies.length === 0) return;

  const defaultIndex = Math.max(0, movies.findIndex((m) => Boolean(m.featured)));
  const featuredIndex =
    typeof selectedIndex === 'number' && selectedIndex >= 0 && selectedIndex < movies.length
      ? selectedIndex
      : defaultIndex;
  const isSwitchAction = typeof selectedIndex === 'number';
  const movie = movies[featuredIndex];

  // Morph Dual-Theme 3D Ribbons & Sparks Canvas immediately!
  const movieTheme = movie.theme === 'war' ? 'war' : 'horror';
  setFeaturedCanvasTheme(movieTheme);
  if (themeBadge) {
    themeBadge.textContent = movie.themeLabel || (movieTheme === 'war' ? 'GOLDEN WAR FLAME THEME' : 'CRIMSON HORROR THEME');
  }

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

  const lines = Array.isArray(movie.synopsisLines) && movie.synopsisLines.length > 0 ? movie.synopsisLines : [movie.synopsis];
  const synopsisMarkup = lines
    .map(
      (line, idx) => `
      <p class="featured-synopsis-line reveal" data-reveal="fade-up" style="--reveal-delay: ${200 + idx * 110}ms">
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

  const ctaClass = movieTheme === 'war' ? 'pill-btn--gold' : 'pill-btn--crimson';

  container.innerHTML = `
    <div class="featured-poster-reveal reveal" data-reveal="zoom-in">
      <div class="featured-poster-parallax" id="featured-parallax">
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
    </div>

    <div class="featured-details">
      <p class="featured-genre-tag reveal" data-reveal="fade-left" style="--reveal-delay: 80ms">${escapeHTML(movie.genre)}</p>
      <h3 class="featured-title reveal" data-reveal="fade-left" style="--reveal-delay: 150ms">${escapeHTML(movie.title)}</h3>
      <div class="featured-synopsis-group" aria-label="เรื่องย่อภาพยนตร์">${synopsisMarkup}</div>
      <dl class="featured-meta-list reveal" data-reveal="fade-up" style="--reveal-delay: 360ms">${metaMarkup}</dl>
      <div class="featured-actions reveal" data-reveal="fade-up" style="--reveal-delay: 440ms">
        <a href="#teasers" class="pill-btn ${ctaClass}">
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
   SCROLL REVEAL, 6-ACT NAVIGATION & RAIL, LIGHTBOX, CARD TILT & THEME
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
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => {
    if (!el.classList.contains('is-visible')) revealObserver.observe(el);
  });
}

function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const railDots = Array.from(document.querySelectorAll('.page-rail .rail-dot'));
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
    railDots.forEach((dot) => {
      const isMatch = dot.getAttribute('data-section') === sectionId;
      dot.classList.toggle('is-active', isMatch);
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        if ((window.scrollY || 0) < 120) {
          setActiveSection('story');
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-32% 0px -52% 0px', threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
    window.addEventListener(
      'scroll',
      () => {
        if ((window.scrollY || 0) < 120) setActiveSection('story');
      },
      { passive: true }
    );
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

  SmoothScroller.stop();
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
  if (!spot || !FINE_POINTER_QUERY.matches || REDUCED_MOTION_QUERY.matches) return;

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
  if (!FINE_POINTER_QUERY.matches || REDUCED_MOTION_QUERY.matches) return;

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

    MouseState.init();
    SmoothScroller.init();

    // Initialize Act 4 first so setFeaturedCanvasTheme is wired before renderFeaturedProject
    initAct4FeaturedDualTheme();

    renderPosterGallery(MOVIES);
    renderTeaserSection(MOVIES);
    renderFeaturedProject(MOVIES);

    initAct1HeroSummoning();
    initScrollScrubbedSections();
    initAct3TeasersBloodPool();
    initAct6ContactFinale();

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
