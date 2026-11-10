const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function handleRequest(req, res) {
  let cleanUrl = req.url.split('?')[0];

  if (cleanUrl.startsWith('/api/check')) {
    const testUrl = req.url.replace('/api/check', '') || '/css/style.css';
    const testClean = testUrl.split('?')[0];
    const testRel = testClean.replace(/^\/+/, '');
    const testPath = path.resolve(__dirname, testRel);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      reqUrl: req.url,
      testUrl,
      testPath,
      exists: fs.existsSync(testPath),
      isFile: fs.existsSync(testPath) ? fs.statSync(testPath).isFile() : false,
      filesInCss: fs.existsSync(path.join(__dirname, 'css')) ? fs.readdirSync(path.join(__dirname, 'css')) : [],
      filesInJs: fs.existsSync(path.join(__dirname, 'js')) ? fs.readdirSync(path.join(__dirname, 'js')) : []
    }, null, 2));
    return;
  }

  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // Remove leading slashes to prevent absolute path issues
  const relativePath = cleanUrl.replace(/^\/+/, '');
  const filePath = path.resolve(__dirname, relativePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Fallback to index.html for SPA
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(indexPath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found: ' + cleanUrl);
}

const server = http.createServer(handleRequest);

module.exports = handleRequest;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🎬 CineVote Server running at: http://localhost:${PORT}`);
  });
}
