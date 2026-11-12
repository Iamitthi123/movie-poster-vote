/**
 * MOVIE PORTFOLIO — Main Application Script
 * ---------------------------------------------------------------------------
 * HOW TO ADD A NEW MOVIE:
 * 1. Place a 2:3 poster image inside `assets/posters/`.
 * 2. (Optional) Place a 16:9 teaser thumbnail in `assets/images/` and an MP4
 *    video in `assets/teasers/` (or use a YouTube URL / video ID).
 * 3. Add a new object to the `MOVIES` array below. The Poster Gallery,
 *    Teaser Section, Lightbox, and Featured Project render automatically from
 *    this single list.
 * ---------------------------------------------------------------------------
 */

'use strict';

/**
 * Single source of truth for all movies, posters, and teasers.
 * Set `featured: true` on one item to showcase it in the Featured Project section.
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
    teaserType: 'mp4', // 'mp4' for local video file, or 'youtube' for YouTube embed URL/ID
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
let lightboxState = {
  isOpen: false,
  currentIndex: 0,
  lastTrigger: null
};

/**
 * Safely escape HTML text when inserting into DOM attributes or templates.
 */
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

/**
 * Extract a clean YouTube video ID from either a raw ID or full YouTube URL.
 */
function parseYouTubeId(input) {
  const raw = String(input ?? '').trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return raw;
  }
  try {
    const url = new URL(raw);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').split('/')[0];
    }
    if (url.searchParams.has('v')) {
      return url.searchParams.get('v');
    }
    const parts = url.pathname.split('/').filter(Boolean);
    const embedIdx = parts.indexOf('embed');
    if (embedIdx !== -1 && parts[embedIdx + 1]) {
      return parts[embedIdx + 1];
    }
  } catch {
    // Fall through to raw return
  }
  return raw;
}

/**
 * Compute grid column count for automatic row-based stagger delays.
 */
function getGridColumnCount(gridEl) {
  if (!gridEl) return 1;
  const computed = window.getComputedStyle(gridEl).gridTemplateColumns;
  if (!computed || computed === 'none') return 1;
  const cols = computed.trim().split(/\s+/).length;
  return Math.max(1, cols);
}

/**
 * Assign `--reveal-delay` automatically to unrevealed poster cards per row.
 */
function applyPosterStagger(gridEl) {
  if (!gridEl) return;
  const colCount = getGridColumnCount(gridEl);
  const cards = gridEl.querySelectorAll('.poster-card');
  cards.forEach((card, index) => {
    if (!card.classList.contains('is-visible')) {
      const colIndex = index % colCount;
      card.style.setProperty('--reveal-delay', `${120 + colIndex * 180}ms`);
    }
  });
}

/**
 * Render the 2:3 Poster Gallery grid from MOVIES.
 */
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
            <p class="poster-meta">${escapeHTML(movie.genre)} • ${escapeHTML(movie.year)}</p>
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
    if (Number.isInteger(index)) {
      openLightbox(index, trigger);
    }
  });

  window.addEventListener('resize', () => applyPosterStagger(grid), { passive: true });
}

/**
 * Replace a teaser's thumbnail with a playable <video> or YouTube <iframe> only on click.
 */
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
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
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
    // Fallback if strict autoplay policy blocks unmuted playback on click.
    video.muted = true;
    video.play().catch(() => {});
  });
}

/**
 * Render the 16:9 Official Teasers section with lazy-loaded video players.
 */
function renderTeaserSection(movies) {
  const list = document.getElementById('teaser-list');
  if (!list) return;

  const teasers = movies.filter((movie) => Boolean(movie.teaserPath));
  list.innerHTML = teasers
    .map(
      (movie, index) => {
        const baseDelay = 120 + index * 200;
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
          <button
            type="button"
            class="teaser-play-btn"
            aria-label="เล่นทีเซอร์ ${escapeHTML(movie.title)}"
          >
            <span class="teaser-play-icon" aria-hidden="true"></span>
          </button>
          ${
            movie.teaserDuration
              ? `<span class="teaser-duration-badge">${escapeHTML(movie.teaserDuration)}</span>`
              : ''
          }
        </div>
        <div class="teaser-body">
          <p class="teaser-meta reveal" data-reveal="fade-up" style="--reveal-delay: ${baseDelay + 140}ms">${escapeHTML(movie.genre)} • ${escapeHTML(movie.year)}</p>
          <h3 class="teaser-title reveal" data-reveal="fade-up" style="--reveal-delay: ${baseDelay + 260}ms">${escapeHTML(movie.teaserTitle || movie.title)}</h3>
          <p class="teaser-synopsis reveal" data-reveal="fade-up" style="--reveal-delay: ${baseDelay + 380}ms">${escapeHTML(movie.synopsis)}</p>
        </div>
      </article>
    `;
      }
    )
    .join('');

  list.addEventListener('click', (event) => {
    const playBtn = event.target.closest('.teaser-play-btn');
    if (!playBtn) return;
    const mediaEl = playBtn.closest('.teaser-media');
    if (!mediaEl) return;
    mountTeaserPlayer(mediaEl, mediaEl.dataset.teaserTitle || 'Teaser');
  });
}

/**
 * Render the Featured Project section with sequential synopsis reveal lines.
 */
function renderFeaturedProject(movies, selectedIndex) {
  const container = document.getElementById('featured-project');
  const switcher = document.getElementById('featured-switcher');
  if (!container || movies.length === 0) return;

  const defaultIndex = Math.max(
    0,
    movies.findIndex((movie) => Boolean(movie.featured))
  );
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
        if (Number.isInteger(idx)) {
          renderFeaturedProject(movies, idx);
        }
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
      <p class="featured-synopsis-line reveal" data-reveal="fade-up" style="--reveal-delay: ${
        420 + idx * 160
      }ms">
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

  const metaStartDelay = 420 + lines.length * 160;
  const metaMarkup = metaItems
    .map(
      (item, idx) => `
      <div class="featured-meta-row reveal" data-reveal="fade-up" style="--reveal-delay: ${
        metaStartDelay + idx * 120
      }ms">
        <dt>${escapeHTML(item.label)}</dt>
        <dd>${escapeHTML(item.value)}</dd>
      </div>
    `
    )
    .join('');

  const actionsDelay = metaStartDelay + metaItems.length * 120 + 60;

  container.innerHTML = `
    <div class="featured-poster-reveal reveal" data-reveal="zoom-in">
      <div class="featured-poster-parallax" id="featured-parallax">
        <button
          type="button"
          class="featured-poster-btn"
          id="featured-poster-trigger"
          aria-label="ขยายดูโปสเตอร์ ${escapeHTML(movie.title)}"
        >
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
      <p class="featured-genre-tag reveal" data-reveal="fade-left" style="--reveal-delay: 140ms">
        ${escapeHTML(movie.genre)}
      </p>
      <h3 class="featured-title reveal" data-reveal="fade-left" style="--reveal-delay: 280ms">
        ${escapeHTML(movie.title)}
      </h3>

      <div class="featured-synopsis-group" aria-label="เรื่องย่อภาพยนตร์">
        ${synopsisMarkup}
      </div>

      <dl class="featured-meta-list reveal" data-reveal="fade-up" style="--reveal-delay: ${
        metaStartDelay - 60
      }ms">
        ${metaMarkup}
      </dl>

      <div class="featured-actions reveal" data-reveal="fade-up" style="--reveal-delay: ${actionsDelay}ms">
        <a href="#teasers" class="btn btn-primary">รับชมทีเซอร์</a>
        <button type="button" class="btn btn-ghost" id="featured-zoom-btn">
          ดูโปสเตอร์ขนาดเต็ม
        </button>
      </div>
    </div>
  `;

  const posterBtn = document.getElementById('featured-poster-trigger');
  const zoomBtn = document.getElementById('featured-zoom-btn');
  if (posterBtn) {
    posterBtn.addEventListener('click', () => openLightbox(featuredIndex, posterBtn));
  }
  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => openLightbox(featuredIndex, zoomBtn));
  }

  if (isSwitchAction) {
    const newReveals = container.querySelectorAll('.reveal');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        newReveals.forEach((el) => el.classList.add('is-visible'));
      });
    });
  }
}

/**
 * Reveal all `.reveal` elements immediately (for reduced motion or unsupported browsers).
 */
function revealAllImmediately() {
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('is-visible');
    el.classList.remove('is-animating');
  });
}

/**
 * Initialize IntersectionObserver-based scroll reveal animations (zero scroll listeners).
 */
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
        const target = entry.target;
        target.classList.add('is-animating');
        target.classList.add('is-visible');
        observer.unobserve(target);

        const cleanup = () => {
          target.classList.remove('is-animating');
          target.removeEventListener('transitionend', cleanup);
        };
        target.addEventListener('transitionend', cleanup, { once: true });
        window.setTimeout(cleanup, 2500);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  elements.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      revealObserver.observe(el);
    }
  });
}

/**
 * Initialize subtle GPU parallax for the hero backdrop and featured poster
 * using IntersectionObserver + requestAnimationFrame (no scroll event listeners).
 */
function initParallax() {
  const heroSection = document.getElementById('hero');
  const heroBg = document.getElementById('hero-parallax');
  const featuredSection = document.getElementById('featured');

  if (!heroBg && !featuredSection) return;

  let heroVisible = true;
  let featuredVisible = false;
  let rafId = null;
  let lastScrollY = -1;

  function resetTransforms() {
    if (heroBg) heroBg.style.transform = '';
    const currentFeaturedPoster = document.getElementById('featured-parallax');
    if (currentFeaturedPoster) currentFeaturedPoster.style.transform = '';
  }

  function updateParallaxFrame() {
    rafId = null;
    if (REDUCED_MOTION_QUERY.matches) {
      resetTransforms();
      return;
    }

    const scrollY = window.scrollY;
    if (scrollY !== lastScrollY) {
      lastScrollY = scrollY;
      const vh = window.innerHeight || 800;

      if (heroVisible && heroBg) {
        const heroOffset = Math.max(-24, Math.min(48, scrollY * 0.12));
        heroBg.style.transform = `translate3d(0, ${heroOffset.toFixed(2)}px, 0)`;
      }

      const currentFeaturedPoster = document.getElementById('featured-parallax');
      if (featuredVisible && currentFeaturedPoster && featuredSection) {
        const rect = featuredSection.getBoundingClientRect();
        const centerDelta = rect.top + rect.height * 0.5 - vh * 0.5;
        const posterOffset = Math.max(-22, Math.min(22, centerDelta * -0.045));
        currentFeaturedPoster.style.transform = `translate3d(0, ${posterOffset.toFixed(2)}px, 0)`;
      }
    }

    if (heroVisible || featuredVisible) {
      rafId = window.requestAnimationFrame(updateParallaxFrame);
    }
  }

  function ensureLoop() {
    if (!REDUCED_MOTION_QUERY.matches && (heroVisible || featuredVisible) && rafId === null) {
      rafId = window.requestAnimationFrame(updateParallaxFrame);
    }
  }

  if ('IntersectionObserver' in window) {
    const visObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroSection) {
            heroVisible = entry.isIntersecting;
          }
          if (entry.target === featuredSection) {
            featuredVisible = entry.isIntersecting;
          }
        });
        lastScrollY = -1;
        ensureLoop();
      },
      { threshold: 0 }
    );

    if (heroSection) visObserver.observe(heroSection);
    if (featuredSection) visObserver.observe(featuredSection);
  }

  ensureLoop();
}

/**
 * Initialize sticky header mobile menu and active-section highlight via IntersectionObserver.
 */
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
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!expanded);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        setMenuOpen(false);
      }
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
      if (isMatch) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => navObserver.observe(section));
  }
}

/**
 * Update Lightbox DOM for the active movie index.
 */
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
  if (meta) {
    meta.textContent = `${movie.genre} • ${movie.year}`;
  }
  if (title) {
    title.textContent = movie.englishTitle
      ? `${movie.title} (${movie.englishTitle})`
      : movie.title;
  }
  if (synopsis) {
    synopsis.textContent = movie.synopsis || '';
  }
  if (counter) {
    counter.textContent = `${lightboxState.currentIndex + 1} / ${MOVIES.length}`;
  }
}

let toastTimer = null;

/**
 * Display a brief accessible status toast notification.
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });
  if (toastTimer !== null) {
    window.clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!toast.classList.contains('is-visible')) {
        toast.hidden = true;
      }
    }, 260);
  }, 2400);
}

/**
 * Toggle poster zoom inspection state inside Lightbox.
 */
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

/**
 * Open fullscreen poster Lightbox.
 */
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

  if (closeBtn) {
    closeBtn.focus();
  }
}

/**
 * Close fullscreen poster Lightbox and restore keyboard focus.
 */
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
  lightboxState.currentIndex =
    (lightboxState.currentIndex + delta + MOVIES.length) % MOVIES.length;
  updateLightboxView();
}

/**
 * Initialize accessible Lightbox with keyboard navigation, focus trap, and mobile swipe.
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const zoomBtn = document.getElementById('lightbox-zoom');
  const zoomImg = document.getElementById('lightbox-img');
  const zoomWrap = document.getElementById('lightbox-swipe-area');
  const swipeArea = document.getElementById('lightbox-dialog');

  if (!lightbox) return;

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => stepLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => stepLightbox(1));

  const toggleZoom = () => {
    if (!zoomWrap) return;
    setLightboxZoom(!zoomWrap.classList.contains('is-zoomed'));
  };
  if (zoomBtn) zoomBtn.addEventListener('click', toggleZoom);
  if (zoomImg) zoomImg.addEventListener('click', toggleZoom);

  lightbox.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-lightbox-close')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightboxState.isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepLightbox(-1);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepLightbox(1);
      return;
    }
    if (event.key === 'Tab') {
      const focusable = Array.from(
        lightbox.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Mobile touch swipe support
  if (swipeArea) {
    let touchStartX = 0;
    let touchStartY = 0;

    swipeArea.addEventListener(
      'touchstart',
      (event) => {
        if (event.touches.length !== 1) return;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    swipeArea.addEventListener(
      'touchend',
      (event) => {
        if (!lightboxState.isOpen || event.changedTouches.length !== 1) return;
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          stepLightbox(deltaX < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );
  }
}

/**
 * Subtle atmospheric spotlight following the desktop cursor using transform3d + RAF.
 */
function initCursorSpotlight() {
  const spot = document.getElementById('cursor-spotlight');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!spot || !finePointer.matches || REDUCED_MOTION_QUERY.matches) return;

  let targetX = -999;
  let targetY = -999;
  let rafPending = false;

  function renderSpot() {
    rafPending = false;
    if (REDUCED_MOTION_QUERY.matches) {
      spot.classList.remove('is-active');
      return;
    }
    spot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
  }

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      spot.classList.add('is-active');
      if (!rafPending) {
        rafPending = true;
        window.requestAnimationFrame(renderSpot);
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => {
    spot.classList.remove('is-active');
  });
}

/**
 * Subtle 3D magnetic tilt + specular sheen tracking on poster cards (mouse only).
 */
function initCardTilt() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches || REDUCED_MOTION_QUERY.matches) return;

  document.querySelectorAll('.poster-card').forEach((card) => {
    let rafId = null;
    let latestEvent = null;

    function updateTilt() {
      rafId = null;
      if (!latestEvent || REDUCED_MOTION_QUERY.matches) return;
      const rect = card.getBoundingClientRect();
      const px = (latestEvent.clientX - rect.left) / rect.width;
      const py = (latestEvent.clientY - rect.top) / rect.height;
      const tiltY = (px - 0.5) * 8;
      const tiltX = (0.5 - py) * 8;

      card.classList.add('is-tilting');
      card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    }

    card.addEventListener(
      'pointermove',
      (event) => {
        if (event.pointerType !== 'mouse') return;
        latestEvent = event;
        if (rafId === null) {
          rafId = window.requestAnimationFrame(updateTilt);
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

/**
 * Drifting ambient dust & crimson ember particles on the Hero canvas,
 * paused automatically offscreen via IntersectionObserver.
 */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  const hero = document.getElementById('hero');
  if (!canvas || !hero || REDUCED_MOTION_QUERY.matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const COUNT = 26;
  const particles = Array.from({ length: COUNT }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 1 + Math.random() * 2.1,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: -(0.00025 + Math.random() * 0.00045),
    alpha: 0.18 + Math.random() * 0.32,
    isRed: i % 3 === 0
  }));

  let width = 0;
  let height = 0;
  let visible = true;
  let rafId = null;

  function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width;
    canvas.height = height;
  }

  function tick() {
    rafId = null;
    if (!visible || REDUCED_MOTION_QUERY.matches) return;

    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -0.05) {
        p.y = 1.05;
        p.x = Math.random();
      }
      if (p.x < -0.05) p.x = 1.05;
      if (p.x > 1.05) p.x = -0.05;

      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.isRed
        ? `rgba(210, 58, 58, ${p.alpha})`
        : `rgba(110, 178, 172, ${p.alpha * 0.75})`;
      ctx.fill();
    });

    rafId = window.requestAnimationFrame(tick);
  }

  function startLoop() {
    if (visible && !REDUCED_MOTION_QUERY.matches && rafId === null) {
      rafId = window.requestAnimationFrame(tick);
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        visible = Boolean(entries[0]?.isIntersecting);
        startLoop();
      },
      { threshold: 0 }
    );
    obs.observe(hero);
  }

  startLoop();
}

/**
 * Screening Room / Lights-Off Cinema Mode toggle in header.
 */
function initCinemaMode() {
  const btn = document.getElementById('cinema-mode-btn');
  if (!btn) return;
  const labelEl = btn.querySelector('.cinema-toggle-label');

  btn.addEventListener('click', () => {
    const isCinema = document.documentElement.classList.toggle('cinema-mode');
    btn.setAttribute('aria-pressed', String(isCinema));
    btn.setAttribute(
      'aria-label',
      isCinema ? 'ปิดโหมดโรงภาพยนตร์ (เปิดไฟปกติ)' : 'เปิดโหมดโรงภาพยนตร์ (ปิดไฟรอบข้าง)'
    );
    if (labelEl) {
      labelEl.textContent = isCinema ? 'LIGHTS ON' : 'LIGHTS OFF';
    }
    showToast(isCinema ? 'เปิดโหมดโรงภาพยนตร์ (Cinema Mode)' : 'กลับสู่โหมดแสดงผลปกติ');
  });
}

/**
 * One-click copy contact email button with clipboard fallback.
 */
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

/**
 * Application bootstrap with fallback safety:
 * `js-enabled` is added only inside JS initialization so that if JS fails,
 * all `.reveal` elements stay visible by default.
 */
function initApp() {
  try {
    document.documentElement.classList.add('js-enabled');

    renderPosterGallery(MOVIES);
    renderTeaserSection(MOVIES);
    renderFeaturedProject(MOVIES);

    initNavigation();
    initLightbox();
    initScrollReveal();
    initParallax();
    initCursorSpotlight();
    initCardTilt();
    initHeroParticles();
    initCinemaMode();
    initCopyEmail();

    REDUCED_MOTION_QUERY.addEventListener('change', () => {
      if (REDUCED_MOTION_QUERY.matches) {
        revealAllImmediately();
      }
    });
  } catch (error) {
    console.error('Portfolio initialization failed, showing fallback content:', error);
    document.documentElement.classList.remove('js-enabled');
    revealAllImmediately();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
