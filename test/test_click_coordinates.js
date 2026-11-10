const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const args = [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:3000'
];

console.log('Starting Edge on port 9224...');
const edgeProcess = spawn(edgePath, args);

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  await wait(2500);

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9224/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = targets.find(t => t.url.includes('localhost:3000'));
  const ws = new global.WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const callbacks = new Map();

  function sendCommand(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.addEventListener('message', (event) => {
    const parsed = JSON.parse(event.data);
    if (parsed.id && callbacks.has(parsed.id)) {
      callbacks.get(parsed.id)(parsed.result);
      callbacks.delete(parsed.id);
    }
  });

  ws.addEventListener('open', async () => {
    await sendCommand('Runtime.enable');
    await sendCommand('DOM.enable');

    // Check elementFromPoint at center of screen (where student ID input & button are)
    const checkHit = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('start-vote-btn');
        btn.scrollIntoView();
        const rect = btn.getBoundingClientRect();
        const topEl = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
        
        return {
          btnRect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
          topElTag: topEl ? topEl.tagName : null,
          topElId: topEl ? topEl.id : null,
          topElText: topEl ? topEl.textContent.trim().slice(0, 30) : null
        };
      })()`,
      returnByValue: true
    });

    console.log('Hit-testing results at element coordinates:');
    console.log(checkHit.result.value);

    ws.close();
    edgeProcess.kill();
    process.exit(0);
  });
}

run().catch(e => {
  console.error(e);
  edgeProcess.kill();
  process.exit(1);
});
