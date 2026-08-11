const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// More robust regex to find the start and end of the function block.
// It matches the function declaration and captures everything up to the matching closing brace.
const startIdx = html.indexOf('function burst(x, y, col) {');
if (startIdx === -1) {
  throw new Error('Could not find burst function in index.html');
}

let openBraces = 0;
let endIdx = -1;
for (let i = startIdx; i < html.length; i++) {
  if (html[i] === '{') openBraces++;
  if (html[i] === '}') {
    openBraces--;
    if (openBraces === 0) {
      endIdx = i;
      break;
    }
  }
}

if (endIdx === -1) {
  throw new Error('Could not find end of burst function in index.html');
}

// Extract body excluding the function signature and the final closing brace
const burstBody = html.substring(startIdx + 'function burst(x, y, col) {'.length, endIdx);


global.particles = [];
// Reconstruct the function
const burst = new Function('x', 'y', 'col', burstBody);

test('burst function tests', async (t) => {
  await t.test('should add between 60 and 100 particles', () => {
    global.particles = []; // reset global
    burst(100, 200, '#ff0000');
    assert.ok(global.particles.length >= 60 && global.particles.length <= 100, `Expected 60-100 particles, got ${global.particles.length}`);
  });

  await t.test('particles should have correct properties', () => {
    global.particles = [];
    burst(100, 200, '#ff0000');
    const p = global.particles[0];
    assert.strictEqual(p.x, 100);
    assert.strictEqual(p.y, 200);
    assert.strictEqual(p.col, '#ff0000');
    assert.strictEqual(p.alpha, 1);
    assert.strictEqual(p.gravity, 0.08);
    assert.ok(p.r >= 1 && p.r <= 3.5);
    assert.ok(p.decay >= 0.012 && p.decay <= 0.027);
  });
});
