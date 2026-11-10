// Default 12 High-Aesthetic 2:3 Cinematic Poster SVGs
// Formatted as Data URIs for instant out-of-the-box offline/online use

function createPosterSVG({ code, label, genre, primaryColor, secondaryColor, accentColor, iconSvg, patternSvg }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
    <defs>
      <linearGradient id="bg-${code}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryColor}" />
        <stop offset="50%" stop-color="#0c0d14" />
        <stop offset="100%" stop-color="${secondaryColor}" />
      </linearGradient>
      <radialGradient id="glow-${code}" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.38" />
        <stop offset="70%" stop-color="${accentColor}" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow-${code}">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.7"/>
      </filter>
    </defs>

    <!-- Poster Canvas Background -->
    <rect width="600" height="900" fill="url(#bg-${code})" />
    <rect width="600" height="900" fill="url(#glow-${code})" />

    <!-- Cinematic Vignette & Borders -->
    <rect x="20" y="20" width="560" height="860" fill="none" stroke="${accentColor}" stroke-opacity="0.25" stroke-width="1.5" rx="8" />
    <rect x="28" y="28" width="544" height="844" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" rx="4" />

    <!-- Corner Decorative Accents -->
    <path d="M 20 50 L 50 20 M 550 20 L 580 50 M 20 850 L 50 880 M 550 880 L 580 850" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="2" />
    
    <!-- Top Film Reel / Festival Laurel Emblem -->
    <g transform="translate(300, 95)" text-anchor="middle" fill="${accentColor}">
      <circle cx="0" cy="0" r="28" fill="#12131f" stroke="${accentColor}" stroke-opacity="0.5" stroke-width="1.5" />
      <path d="M -8 -8 L 8 0 L -8 8 Z" fill="${accentColor}" opacity="0.9" />
      <text y="48" font-family="'Kanit', sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#a1a1aa">OFFICIAL SELECTION</text>
    </g>

    <!-- Genre & Cinema Pattern Elements -->
    ${patternSvg}

    <!-- Central Art Icon Emblem -->
    <g transform="translate(300, 420)" filter="url(#shadow-${code})">
      <circle cx="0" cy="0" r="140" fill="#0d0e17" fill-opacity="0.7" stroke="${accentColor}" stroke-width="2" stroke-dasharray="6 4" />
      <circle cx="0" cy="0" r="115" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
      ${iconSvg}
    </g>

    <!-- Lower Poster Title Block -->
    <g transform="translate(300, 680)" text-anchor="middle">
      <!-- Glow underline -->
      <rect x="-180" y="38" width="360" height="2" fill="url(#bg-${code})" />
      <line x1="-100" y1="39" x2="100" y2="39" stroke="${accentColor}" stroke-width="2" stroke-opacity="0.8" />
      
      <!-- Poster Large Code -->
      <text y="20" font-family="'Kanit', sans-serif" font-size="64" font-weight="800" fill="#ffffff" letter-spacing="3" filter="url(#shadow-${code})">${code}</text>
      
      <!-- Label -->
      <text y="80" font-family="'Kanit', sans-serif" font-size="28" font-weight="600" fill="${accentColor}" letter-spacing="2">${label}</text>
      <text y="115" font-family="'Kanit', sans-serif" font-size="14" font-weight="400" fill="#9ca3af" letter-spacing="4">${genre.toUpperCase()}</text>
    </g>

    <!-- Bottom Cinema Credits Style Strip -->
    <g transform="translate(300, 845)" text-anchor="middle" font-family="'Kanit', sans-serif" font-size="9" fill="#71717a" letter-spacing="2">
      <text y="0">CINEMA TOURNAMENT 2026 • DIRECTED BY CINEVOTE • 2:3 RATIO</text>
      <text y="15" fill="#52525b">ORIGINAL MOTION PICTURE EXHIBITION • ALL RIGHTS RESERVED</text>
    </g>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const DEFAULT_POSTERS = [
  {
    id: 1,
    code: 'P01',
    label: 'โปสเตอร์ #1',
    genre: 'Cyberpunk Neon',
    primaryColor: '#1e1b4b',
    secondaryColor: '#082f49',
    accentColor: '#38bdf8',
    patternSvg: `
      <g stroke="#38bdf8" stroke-opacity="0.12" stroke-width="1">
        <line x1="80" y1="200" x2="520" y2="200" />
        <line x1="80" y1="230" x2="520" y2="230" stroke-dasharray="4 8" />
        <polygon points="150,260 450,260 490,560 110,560" fill="none" opacity="0.1" />
      </g>`,
    iconSvg: `
      <path d="M -45,-30 L 45,-30 L 60,30 L -60,30 Z" fill="none" stroke="#38bdf8" stroke-width="4" />
      <circle cx="0" cy="0" r="24" fill="#38bdf8" opacity="0.3" />
      <path d="M -25,0 L 25,0 M 0,-25 L 0,25" stroke="#38bdf8" stroke-width="3" />
      <polygon points="0,-45 40,35 -40,35" fill="none" stroke="#818cf8" stroke-width="2" />
    `
  },
  {
    id: 2,
    code: 'P02',
    label: 'โปสเตอร์ #2',
    genre: 'Golden Vintage Noir',
    primaryColor: '#451a03',
    secondaryColor: '#1c1917',
    accentColor: '#fbbf24',
    patternSvg: `
      <g stroke="#fbbf24" stroke-opacity="0.15" stroke-width="1.2">
        <circle cx="300" cy="420" r="180" fill="none" stroke-dasharray="8 6" />
        <polygon points="300,210 480,420 300,630 120,420" fill="none" />
      </g>`,
    iconSvg: `
      <!-- Art Deco Sunburst & Camera -->
      <circle cx="0" cy="0" r="50" fill="none" stroke="#fbbf24" stroke-width="3" />
      <circle cx="0" cy="0" r="30" fill="#fbbf24" fill-opacity="0.25" stroke="#fbbf24" stroke-width="2" />
      <circle cx="0" cy="0" r="12" fill="#fbbf24" />
      <path d="M -65,0 L 65,0 M 0,-65 L 0,65 M -45,-45 L 45,45 M -45,45 L 45,-45" stroke="#fbbf24" stroke-opacity="0.5" stroke-width="1.5" />
    `
  },
  {
    id: 3,
    code: 'P03',
    label: 'โปสเตอร์ #3',
    genre: 'Deep Space Odyssey',
    primaryColor: '#311042',
    secondaryColor: '#0b0f19',
    accentColor: '#c084fc',
    patternSvg: `
      <g fill="#c084fc" opacity="0.4">
        <circle cx="150" cy="180" r="2" /><circle cx="450" cy="220" r="3" />
        <circle cx="180" cy="300" r="1.5" /><circle cx="420" cy="320" r="2.5" />
        <circle cx="120" cy="550" r="2" /><circle cx="480" cy="540" r="1.5" />
      </g>`,
    iconSvg: `
      <!-- Ringed Planet & Orbit -->
      <circle cx="0" cy="0" r="46" fill="#581c87" stroke="#c084fc" stroke-width="3" />
      <ellipse cx="0" cy="0" rx="95" ry="28" fill="none" stroke="#e879f9" stroke-width="3.5" transform="rotate(-25)" />
      <circle cx="30" cy="-20" r="8" fill="#f0abfc" opacity="0.6" />
    `
  },
  {
    id: 4,
    code: 'P04',
    label: 'โปสเตอร์ #4',
    genre: 'Midnight Thriller',
    primaryColor: '#4c0519',
    secondaryColor: '#09090b',
    accentColor: '#f43f5e',
    patternSvg: `
      <g stroke="#f43f5e" stroke-opacity="0.18">
        <line x1="100" y1="180" x2="500" y2="660" stroke-width="1.5" stroke-dasharray="10 6" />
        <line x1="500" y1="180" x2="100" y2="660" stroke-width="1.5" stroke-dasharray="10 6" />
      </g>`,
    iconSvg: `
      <!-- Blood Moon / Spotlight & Raven/Blade Motif -->
      <circle cx="0" cy="0" r="55" fill="#881337" stroke="#f43f5e" stroke-width="3.5" />
      <path d="M -30,-25 Q 0,-50 30,-25 Q 40,20 0,45 Q -40,20 -30,-25 Z" fill="#f43f5e" fill-opacity="0.3" stroke="#f43f5e" stroke-width="2.5" />
      <circle cx="0" cy="5" r="14" fill="#ffffff" opacity="0.85" />
    `
  },
  {
    id: 5,
    code: 'P05',
    label: 'โปสเตอร์ #5',
    genre: 'Emerald Sci-Fi Mystery',
    primaryColor: '#022c22',
    secondaryColor: '#064e3b',
    accentColor: '#34d399',
    patternSvg: `
      <g stroke="#34d399" stroke-opacity="0.15" stroke-width="1.5">
        <polygon points="300,240 440,330 440,510 300,600 160,510 160,330" fill="none" />
      </g>`,
    iconSvg: `
      <!-- Hexagonal Matrix & Crystal -->
      <polygon points="0,-50 44,-25 44,25 0,50 -44,25 -44,-25" fill="#065f46" stroke="#34d399" stroke-width="3" />
      <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="#34d399" fill-opacity="0.4" />
      <circle cx="0" cy="0" r="6" fill="#a7f3d0" />
    `
  },
  {
    id: 6,
    code: 'P06',
    label: 'โปสเตอร์ #6',
    genre: 'Sunset Horizon Drama',
    primaryColor: '#7c2d12',
    secondaryColor: '#2e1065',
    accentColor: '#fb923c',
    patternSvg: `
      <g stroke="#fb923c" stroke-opacity="0.2">
        <line x1="80" y1="420" x2="520" y2="420" stroke-width="2" />
        <line x1="120" y1="435" x2="480" y2="435" stroke-width="1.5" />
        <line x1="160" y1="448" x2="440" y2="448" stroke-width="1" />
      </g>`,
    iconSvg: `
      <!-- Sinking Sun & Mountain Silhouettes -->
      <path d="M -55,0 A 55,55 0 0,1 55,0 Z" fill="#fb923c" stroke="#fed7aa" stroke-width="2" />
      <polygon points="-60,20 -15,-20 20,20" fill="#431407" opacity="0.9" />
      <polygon points="-10,20 25,-10 60,20" fill="#2e1065" opacity="0.9" />
    `
  },
  {
    id: 7,
    code: 'P07',
    label: 'โปสเตอร์ #7',
    genre: 'Retro Synthwave Arcade',
    primaryColor: '#581c87',
    secondaryColor: '#172554',
    accentColor: '#f472b6',
    patternSvg: `
      <g stroke="#f472b6" stroke-opacity="0.25">
        <line x1="100" y1="450" x2="500" y2="450" stroke-width="2" />
        <line x1="180" y1="450" x2="120" y2="600" stroke-width="1.5" />
        <line x1="260" y1="450" x2="240" y2="600" stroke-width="1.5" />
        <line x1="340" y1="450" x2="360" y2="600" stroke-width="1.5" />
        <line x1="420" y1="450" x2="480" y2="600" stroke-width="1.5" />
      </g>`,
    iconSvg: `
      <!-- Wireframe Neon Sun -->
      <circle cx="0" cy="0" r="50" fill="none" stroke="#f472b6" stroke-width="3" />
      <line x1="-50" y1="5" x2="50" y2="5" stroke="#0f172a" stroke-width="4" />
      <line x1="-48" y1="18" x2="48" y2="18" stroke="#0f172a" stroke-width="5" />
      <line x1="-44" y1="32" x2="44" y2="32" stroke="#0f172a" stroke-width="6" />
      <path d="M -30,-15 L 0,-40 L 30,-15 Z" fill="#38bdf8" opacity="0.7" />
    `
  },
  {
    id: 8,
    code: 'P08',
    label: 'โปสเตอร์ #8',
    genre: 'Oceanic Abyss Exploration',
    primaryColor: '#0c4a6e',
    secondaryColor: '#020617',
    accentColor: '#06b6d4',
    patternSvg: `
      <g stroke="#06b6d4" stroke-opacity="0.18" fill="none">
        <path d="M 100 380 Q 300 340 500 380" stroke-width="2" />
        <path d="M 100 420 Q 300 380 500 420" stroke-width="2" />
        <path d="M 100 460 Q 300 420 500 460" stroke-width="2" />
      </g>`,
    iconSvg: `
      <!-- Nautical Compass & Deep Sea Submarine Beacon -->
      <circle cx="0" cy="0" r="48" fill="#082f49" stroke="#06b6d4" stroke-width="3" />
      <polygon points="0,-42 12,0 0,-8 -12,0" fill="#22d3ee" />
      <polygon points="0,42 12,0 0,8 -12,0" fill="#0e7490" />
      <circle cx="0" cy="0" r="7" fill="#ffffff" />
    `
  },
  {
    id: 9,
    code: 'P09',
    label: 'โปสเตอร์ #9',
    genre: 'Solar Flare Blockbuster',
    primaryColor: '#78350f',
    secondaryColor: '#450a0a',
    accentColor: '#f59e0b',
    patternSvg: `
      <g stroke="#f59e0b" stroke-opacity="0.2">
        <line x1="300" y1="200" x2="300" y2="640" stroke-width="1.5" stroke-dasharray="4 4" />
        <line x1="120" y1="420" x2="480" y2="420" stroke-width="1.5" stroke-dasharray="4 4" />
      </g>`,
    iconSvg: `
      <!-- Explosive Flare Rays & Dynamic Shield -->
      <g stroke="#f59e0b" stroke-width="2.5" opacity="0.6">
        <line x1="0" y1="-70" x2="0" y2="70" />
        <line x1="-70" y1="0" x2="70" y2="0" />
        <line x1="-50" y1="-50" x2="50" y2="50" />
        <line x1="-50" y1="50" x2="50" y2="-50" />
      </g>
      <circle cx="0" cy="0" r="44" fill="#b45309" stroke="#fcd34d" stroke-width="3" />
      <circle cx="0" cy="0" r="22" fill="#fef08a" />
    `
  },
  {
    id: 10,
    code: 'P10',
    label: 'โปสเตอร์ #10',
    genre: 'Monolith Fantasy Epic',
    primaryColor: '#3b0764',
    secondaryColor: '#09090b',
    accentColor: '#a855f7',
    patternSvg: `
      <g stroke="#a855f7" stroke-opacity="0.2" fill="none">
        <circle cx="300" cy="420" r="160" stroke-width="1.5" />
        <polygon points="300,260 438,500 162,500" stroke-width="1.5" />
      </g>`,
    iconSvg: `
      <!-- Ancient Standing Monolith Stone & Runes -->
      <polygon points="-22,-50 22,-50 32,55 -32,55" fill="#1e1b4b" stroke="#a855f7" stroke-width="3" />
      <line x1="0" y1="-35" x2="0" y2="35" stroke="#d8b4fe" stroke-width="3" />
      <circle cx="0" cy="-10" r="10" fill="none" stroke="#d8b4fe" stroke-width="2.5" />
    `
  },
  {
    id: 11,
    code: 'P11',
    label: 'โปสเตอร์ #11',
    genre: 'Minimalist Platinum Art',
    primaryColor: '#18181b',
    secondaryColor: '#27272a',
    accentColor: '#e4e4e7',
    patternSvg: `
      <g stroke="#e4e4e7" stroke-opacity="0.15" fill="none">
        <circle cx="300" cy="420" r="120" stroke-width="1" />
        <rect x="200" y="320" width="200" height="200" stroke-width="1" />
      </g>`,
    iconSvg: `
      <!-- Elegant Geometric Film Frame -->
      <rect x="-42" y="-42" width="84" height="84" fill="none" stroke="#e4e4e7" stroke-width="3" rx="4" />
      <circle cx="0" cy="0" r="24" fill="#3f3f46" stroke="#ffffff" stroke-width="2" />
      <circle cx="0" cy="0" r="8" fill="#e4e4e7" />
    `
  },
  {
    id: 12,
    code: 'P12',
    label: 'โปสเตอร์ #12',
    genre: 'Tokyo Night Metropolis',
    primaryColor: '#701a75',
    secondaryColor: '#1e1b4b',
    accentColor: '#e879f9',
    patternSvg: `
      <g stroke="#e879f9" stroke-opacity="0.18">
        <line x1="120" y1="250" x2="480" y2="250" stroke-width="1.5" />
        <line x1="150" y1="580" x2="450" y2="580" stroke-width="1.5" />
      </g>`,
    iconSvg: `
      <!-- Neon City Skyline & Torii Silhouette -->
      <path d="M -45,-30 L 45,-30 M -55,-15 L 55,-15 M -35,-15 L -35,50 M 35,-15 L 35,50" stroke="#f472b6" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="0" cy="15" r="22" fill="#e879f9" fill-opacity="0.35" stroke="#f472b6" stroke-width="2" />
    `
  }
];

// Generate actual data URLs for all 12 items
const INITIAL_POSTERS = DEFAULT_POSTERS.map(item => ({
  id: item.id,
  code: item.code,
  label: item.label,
  genre: item.genre,
  imageUrl: createPosterSVG(item)
}));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_POSTERS, INITIAL_POSTERS, createPosterSVG };
}
