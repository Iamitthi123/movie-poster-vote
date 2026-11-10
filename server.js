const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Read static assets synchronously at startup so @vercel/nft bundles them into the Lambda
const staticAssets = {
  '/index.html': {
    content: fs.readFileSync(path.join(__dirname, 'index.html')),
    type: 'text/html; charset=utf-8'
  },
  '/css/style.css': {
    content: fs.readFileSync(path.join(__dirname, 'css', 'style.css')),
    type: 'text/css; charset=utf-8'
  },
  '/js/placeholders.js': {
    content: fs.readFileSync(path.join(__dirname, 'js', 'placeholders.js')),
    type: 'application/javascript; charset=utf-8'
  },
  '/js/storage.js': {
    content: fs.readFileSync(path.join(__dirname, 'js', 'storage.js')),
    type: 'application/javascript; charset=utf-8'
  },
  '/js/tournament.js': {
    content: fs.readFileSync(path.join(__dirname, 'js', 'tournament.js')),
    type: 'application/javascript; charset=utf-8'
  },
  '/js/app.js': {
    content: fs.readFileSync(path.join(__dirname, 'js', 'app.js')),
    type: 'application/javascript; charset=utf-8'
  }
};

function handleRequest(req, res) {
  let cleanUrl = (req.url || '/').split('?')[0];

  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // Exact match from memory cache
  const asset = staticAssets[cleanUrl];
  if (asset) {
    res.writeHead(200, {
      'Content-Type': asset.type,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(asset.content);
    return;
  }

  // Fallback to index.html for SPA routes
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  res.end(staticAssets['/index.html'].content);
}

const server = http.createServer(handleRequest);

module.exports = handleRequest;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🎬 CineVote Server running at: http://localhost:${PORT}`);
  });
}
