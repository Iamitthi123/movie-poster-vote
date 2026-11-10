const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const args = [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:3000'
];

console.log('Starting Edge on port 9223...');
const edgeProcess = spawn(edgePath, args);

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  await wait(2500);

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9223/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = targets.find(t => t.url.includes('localhost:3000'));
  if (!page) {
    console.error('Target page not found!');
    edgeProcess.kill();
    process.exit(1);
  }

  console.log('Target page found:', page.title);
  console.log('WebSocket Debug URL:', page.webSocketDebuggerUrl);

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
    if (parsed.method === 'Runtime.consoleAPICalled') {
      console.log(`[Browser Console ${parsed.params.type}]:`, parsed.params.args.map(a => a.value || a.description).join(' '));
    }
    if (parsed.method === 'Runtime.exceptionThrown') {
      console.error('[Browser Exception]:', parsed.params.exceptionDetails);
    }
  });

  ws.addEventListener('open', async () => {
    console.log('Connected to DevTools WebSocket');
    await sendCommand('Runtime.enable');
    await sendCommand('Log.enable');

    // 1. Evaluate whether initApp ran and what state is
    const evalState = await sendCommand('Runtime.evaluate', {
      expression: `({
        statePostersCount: window.state ? window.state.posters.length : null,
        currentTab: window.state ? window.state.currentTab : null,
        modalActive: document.getElementById('global-modal') ? document.getElementById('global-modal').classList.contains('active') : null,
        modalDisplay: document.getElementById('global-modal') ? window.getComputedStyle(document.getElementById('global-modal')).display : null,
        modalPointerEvents: document.getElementById('global-modal') ? window.getComputedStyle(document.getElementById('global-modal')).pointerEvents : null,
        toastCount: document.getElementById('toast-container') ? document.getElementById('toast-container').children.length : null,
        activeSection: document.querySelector('section:not(.hidden)') ? document.querySelector('section:not(.hidden)').id : null,
        inputVal: document.getElementById('student-id-input') ? document.getElementById('student-id-input').value : null,
      })`,
      returnByValue: true
    });

    console.log('\n--- DOM & JS State Check ---');
    console.log(evalState.result.value);

    // 2. Test clicking "เริ่มการแข่งขันโหวต" without student ID
    console.log('\n--- Testing click on start-vote-btn without input ---');
    const clickWithoutInput = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('start-vote-btn');
        btn.click();
        const toasts = Array.from(document.querySelectorAll('.toast')).map(t => t.textContent.trim());
        return { toastCount: toasts.length, toasts };
      })()`,
      returnByValue: true
    });
    console.log('Result after click without student ID:', clickWithoutInput.result.value);

    // 3. Test entering student ID and clicking start
    console.log('\n--- Testing enter student ID and start vote ---');
    const startVote = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const quickBtn = document.getElementById('btn-quick-sample-id');
        if (quickBtn) quickBtn.click();
        return {
          matchContainerHidden: document.getElementById('vote-match-container').classList.contains('hidden'),
          gateContainerHidden: document.getElementById('vote-gate-container').classList.contains('hidden'),
          currentMatchBadge: document.getElementById('match-number-badge').textContent.trim(),
          leftLabel: document.getElementById('poster-label-left').textContent.trim(),
          rightLabel: document.getElementById('poster-label-right').textContent.trim()
        };
      })()`,
      returnByValue: true
    });
    console.log('Result after clicking quick sample ID button:', startVote.result.value);

    // 4. Test switching tabs
    console.log('\n--- Testing tab switching ---');
    const testTabs = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const leaderboardBtn = document.querySelector('.tab-btn[data-tab="leaderboard"]');
        leaderboardBtn.click();
        const lbVisible = !document.getElementById('view-leaderboard').classList.contains('hidden');
        
        const adminBtn = document.querySelector('.tab-btn[data-tab="admin"]');
        adminBtn.click();
        const adminVisible = !document.getElementById('view-admin').classList.contains('hidden');

        return { lbVisible, adminVisible };
      })()`,
      returnByValue: true
    });
    console.log('Tab switching results:', testTabs.result.value);

    ws.close();
    edgeProcess.kill();
    process.exit(0);
  });
}

run().catch(err => {
  console.error(err);
  edgeProcess.kill();
  process.exit(1);
});
