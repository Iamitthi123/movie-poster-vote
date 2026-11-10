const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const args = [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:3000'
];

console.log('Launching Edge headless...');
const edgeProcess = spawn(edgePath, args);

setTimeout(async () => {
  try {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          console.log('Edge pages:', list.map(p => ({ title: p.title, url: p.url })));
        } catch (e) {
          console.log('JSON parse err:', e);
        }
        edgeProcess.kill();
        process.exit(0);
      });
    }).on('error', (err) => {
      console.log('HTTP err:', err.message);
      edgeProcess.kill();
      process.exit(1);
    });
  } catch (err) {
    console.log('Error:', err);
    edgeProcess.kill();
    process.exit(1);
  }
}, 2500);
