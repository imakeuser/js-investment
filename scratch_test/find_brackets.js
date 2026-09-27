const fs = require('fs');

function checkBrackets(filepath) {
  const code = fs.readFileSync(filepath, 'utf8');

  let line = 1;
  let inSingleComment = false;
  let inMultiComment = false;
  let inString = null; // `'`, `"`, or `` ` ``
  let stack = [];

  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const next = code[i + 1];

    if (c === '\n') {
      line++;
      inSingleComment = false;
      continue;
    }

    if (inSingleComment) continue;

    if (inMultiComment) {
      if (c === '*' && next === '/') {
        inMultiComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      if (c === '\\') {
        i++; // skip escaped char
      } else if (c === inString) {
        inString = null;
      }
      continue;
    }

    if (c === '/' && next === '/') {
      inSingleComment = true;
      i++;
      continue;
    }
    if (c === '/' && next === '*') {
      inMultiComment = true;
      i++;
      continue;
    }

    if (c === "'" || c === '"' || c === '`') {
      inString = c;
      continue;
    }

    if (c === '{' || c === '(' || c === '[') {
      stack.push({ c, line, i });
    } else if (c === '}' || c === ')' || c === ']') {
      if (stack.length === 0) {
        console.log(`Unmatched '${c}' at line ${line}`);
        return;
      }
      const top = stack.pop();
      const expected = { '{': '}', '(': ')', '[': ']' }[top.c];
      if (c !== expected) {
        console.log(`Mismatched '${c}' at line ${line}, expected '${expected}' for '${top.c}' opened at line ${top.line}`);
        return;
      }
    }
  }

  if (stack.length > 0) {
    console.log(`Unclosed items remaining (${stack.length}):`);
    stack.forEach(s => console.log(`  '${s.c}' from line ${s.line}`));
  } else {
    console.log('ALL BRACKETS MATCHED PERFECTLY!');
  }
}

checkBrackets('app.js');
