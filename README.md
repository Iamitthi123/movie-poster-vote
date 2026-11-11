# MOVIE PORTFOLIO — รวมผลงานโปสเตอร์และทีเซอร์ภาพยนตร์

Single-page dark cinema & horror film portfolio built with **plain HTML5, CSS3, and vanilla JavaScript** (no frameworks, no build step, and no npm dependencies). Features an `IntersectionObserver`-powered scroll reveal system, GPU-only parallax, lazy-loaded 16:9 teasers, and an accessible fullscreen poster lightbox with keyboard and touch-swipe navigation.

## Folder Structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── posters/    # 2:3 portrait movie posters (e.g. 800x1200)
│   ├── teasers/    # Local MP4 teaser videos (16:9)
│   └── images/     # Hero backdrop, creator portrait, and 16:9 teaser thumbnails
└── README.md
```

## How to Run Locally

Because the site uses plain static files, serve the project folder over any local HTTP server:

1. **VS Code Live Server**: Right-click `index.html` and choose **Open with Live Server**.
2. **Node.js** (no install needed):
   ```bash
   npx --yes serve .
   ```
3. **Python**:
   ```bash
   python -m http.server 8080
   ```
Then open the displayed `http://localhost:...` URL in your browser.

## How to Add New Posters & Teasers

All movie data lives in a single array named `MOVIES` at the top of [`js/main.js`](js/main.js). Adding a movie automatically updates the **Poster Gallery**, **Lightbox**, **Teaser Section**, and **Featured Project** (if marked `featured: true`).

### 1. Add a New Poster
1. Place a **2:3 portrait image** (recommended `800×1200` JPG/WebP) inside `assets/posters/`.
2. Append a new entry to `MOVIES` in `js/main.js`:
   ```js
   {
     id: 'my-new-film',
     title: 'ชื่อภาพยนตร์ภาษาไทย',
     englishTitle: 'ENGLISH TITLE',
     genre: 'สยองขวัญ | HORROR',
     year: '2569',
     posterPath: 'assets/posters/my-new-film.jpg',
     posterAlt: 'คำอธิบายภาพโปสเตอร์สำหรับ Accessibility',
     synopsis: 'เรื่องย่อสั้นของภาพยนตร์...'
   }
   ```

### 2. Add a Local MP4 Teaser or YouTube Embed
Include the optional teaser fields on any movie object in `MOVIES`:

- **Local MP4 file** (put your `.mp4` in `assets/teasers/` and a 16:9 thumbnail in `assets/images/`):
  ```js
  teaserPath: 'assets/teasers/my-teaser.mp4',
  teaserType: 'mp4',
  teaserThumb: 'assets/images/my-teaser-thumb.jpg',
  teaserDuration: '00:45',
  teaserTitle: 'ชื่อภาพยนตร์ — Official Teaser'
  ```
- **YouTube embed** (accepts either a YouTube video ID or full YouTube URL; loads only when clicked):
  ```js
  teaserPath: 'https://www.youtube.com/watch?v=VIDEO_ID',
  teaserType: 'youtube',
  teaserThumb: 'assets/images/my-teaser-thumb.jpg',
  teaserDuration: '01:15',
  teaserTitle: 'ชื่อภาพยนตร์ — Official Teaser'
  ```

### 3. Change the Featured Project
Move `featured: true` to whichever movie object in `MOVIES` you want highlighted in the **Featured Project** section (optionally add `studio`, `cast`, `releaseDate`, and `synopsisLines`).
