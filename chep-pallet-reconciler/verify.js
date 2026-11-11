const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('Analyzing chep-pallet-reconciler/index.html...');

// Extract script
const scriptMatches = content.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);
if (!scriptMatches) {
  console.error('FAIL: No <script> tags found!');
  process.exit(1);
}

let scriptCode = '';
scriptMatches.forEach(tag => {
  if (!tag.includes('src=')) {
    const code = tag.replace(/<script[\s\S]*?>/i, '').replace(/<\/script>/i, '');
    scriptCode += code + '\n';
  }
});

// 1. JS Syntax Check
try {
  new Function(scriptCode);
  console.log('PASS: JavaScript syntax is 100% valid!');
} catch (err) {
  console.error('FAIL: JS Syntax Error:', err.message);
  process.exit(1);
}

// 2. DOM ID Consistency Check
const idRegex = /\sid=["']([^"']+)["']/g;
const declaredIds = new Set();
let match;
while ((match = idRegex.exec(content)) !== null) {
  declaredIds.add(match[1]);
}
console.log(`Found ${declaredIds.size} declared DOM IDs.`);

const getElemRegex = /getElementById\(["']([^"']+)["']\)/g;
const queriedIds = new Set();
while ((match = getElemRegex.exec(scriptCode)) !== null) {
  queriedIds.add(match[1]);
}
console.log(`Found ${queriedIds.size} queried getElementById calls.`);

const missing = [];
queriedIds.forEach(id => {
  if (!declaredIds.has(id)) {
    missing.push(id);
  }
});

if (missing.length > 0) {
  console.error('FAIL: Missing DOM IDs found:', missing);
  process.exit(1);
} else {
  console.log(`PASS: 0 missing DOM IDs! All ${queriedIds.size} queried IDs match declared DOM elements.`);
}

console.log('ALL VERIFICATION CHECKS PASSED!');
