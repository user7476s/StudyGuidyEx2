#!/usr/bin/env node
// Verification: counts, id uniqueness, tag validity, hint/explanation presence,
// option count + correctIndex sanity, figure-leak regex, exam1<->exam2 stem overlap.
//
// Reads the .ts files as text (no transpile needed) and extracts the q({...}) blocks
// with a deterministic parser.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

let failed = 0;
function fail(msg) { console.error('  FAIL: ' + msg); failed++; }
function ok(msg) { console.log('  ok: ' + msg); }

function readFile(p) { return fs.readFileSync(p, 'utf8'); }

// --- parser: extract literal property values from q({ ... }) calls -----------
// Supports: id/src/topic/correct (one-line literals), options (single-level array
// of string literals), hint/exp/stem (string literal, possibly multi-line within
// single quotes).
function parseQuestions(src) {
  const out = [];
  // Find each `q({ ... })` block by scanning for `q({` then matching braces.
  const re = /\bq\(\{/g;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index + m[0].length - 1; // pointer at '{'
    let depth = 0;
    let i = start;
    let inStr = null;
    while (i < src.length) {
      const c = src[i];
      if (inStr) {
        if (c === '\\') { i += 2; continue; }
        if (c === inStr) inStr = null;
        i++;
        continue;
      }
      if (c === "'" || c === '"' || c === '`') { inStr = c; i++; continue; }
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
      i++;
    }
    const body = src.slice(start + 1, i - 1);
    out.push(parseObjectBody(body));
  }
  return out;
}

function parseObjectBody(body) {
  // Naive key-walker. Splits into top-level key:value pairs.
  const obj = {};
  let i = 0;
  while (i < body.length) {
    // skip whitespace and commas
    while (i < body.length && /[\s,]/.test(body[i])) i++;
    if (i >= body.length) break;
    if (body[i] === '/' && body[i+1] === '/') {
      while (i < body.length && body[i] !== '\n') i++;
      continue;
    }
    // read key
    const keyStart = i;
    while (i < body.length && /[A-Za-z0-9_]/.test(body[i])) i++;
    const key = body.slice(keyStart, i);
    // skip ws
    while (i < body.length && /\s/.test(body[i])) i++;
    if (body[i] !== ':') break;
    i++;
    while (i < body.length && /\s/.test(body[i])) i++;
    // read value
    const [val, next] = readValue(body, i);
    obj[key] = val;
    i = next;
  }
  return obj;
}

function readValue(s, i) {
  const c = s[i];
  if (c === "'" || c === '"' || c === '`') return readString(s, i);
  if (c === '[') return readArray(s, i);
  if (c === '{') return readObject(s, i);
  // number / true / false / null / identifier — read until comma/newline
  let j = i;
  while (j < s.length && !/[,\n]/.test(s[j])) j++;
  const raw = s.slice(i, j).trim();
  if (raw === 'true') return [true, j];
  if (raw === 'false') return [false, j];
  if (raw === 'null') return [null, j];
  if (/^-?\d+(\.\d+)?$/.test(raw)) return [Number(raw), j];
  return [raw, j];
}

function readString(s, i) {
  const quote = s[i];
  let j = i + 1;
  let out = '';
  while (j < s.length) {
    const c = s[j];
    if (c === '\\') {
      const nx = s[j+1];
      if (nx === 'n') out += '\n';
      else if (nx === 't') out += '\t';
      else if (nx === "'") out += "'";
      else if (nx === '"') out += '"';
      else if (nx === '\\') out += '\\';
      else if (nx === '`') out += '`';
      else out += nx ?? '';
      j += 2;
      continue;
    }
    if (c === quote) { j++; return [out, j]; }
    out += c;
    j++;
  }
  throw new Error('Unterminated string starting at ' + i);
}

function readArray(s, i) {
  // assumes s[i] === '['
  let j = i + 1;
  const arr = [];
  while (j < s.length) {
    while (j < s.length && /[\s,]/.test(s[j])) j++;
    if (s[j] === ']') return [arr, j + 1];
    const [v, next] = readValue(s, j);
    arr.push(v);
    j = next;
  }
  throw new Error('Unterminated array at ' + i);
}

function readObject(s, i) {
  let j = i + 1;
  let depth = 1;
  let inStr = null;
  while (j < s.length && depth > 0) {
    const c = s[j];
    if (inStr) {
      if (c === '\\') { j += 2; continue; }
      if (c === inStr) inStr = null;
      j++;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = c; j++; continue; }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    j++;
  }
  return [s.slice(i, j), j];
}

// --- run -----------------------------------------------------------------------

console.log('Verifying exam1...');
const exam1Src = readFile(path.join(root, 'data', 'exam1.ts'));
const exam1 = parseQuestions(exam1Src);
if (exam1.length === 100) ok('exam1 length = 100');
else fail(`exam1 length = ${exam1.length}, expected 100`);

console.log('Verifying exam2...');
const exam2Src = readFile(path.join(root, 'data', 'exam2.ts'));
const exam2 = parseQuestions(exam2Src);
if (exam2.length === 100) ok('exam2 length = 100');
else fail(`exam2 length = ${exam2.length}, expected 100`);

const all = [...exam1, ...exam2];
const ids = new Set();
for (const q of all) {
  if (!q.id) { fail('missing id on a question'); continue; }
  if (ids.has(q.id)) fail(`duplicate id: ${q.id}`);
  ids.add(q.id);
}
if (ids.size === 200) ok('200 unique ids across both exams');

const validSources = new Set(['iclicker', 'textbook', 'generated']);
for (const q of all) {
  if (!q.src || !validSources.has(q.src)) fail(`${q.id}: invalid source "${q.src}"`);
  if (!q.hint || (typeof q.hint === 'string' && q.hint.trim().length === 0)) fail(`${q.id}: missing/empty hint`);
  if (!q.exp || (typeof q.exp === 'string' && q.exp.trim().length === 0)) fail(`${q.id}: missing/empty explanation`);
  if (!q.stem) fail(`${q.id}: missing stem`);
  if (!Array.isArray(q.options) || (q.options.length !== 4 && q.options.length !== 5)) fail(`${q.id}: option count = ${q.options?.length}`);
  if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= (q.options?.length ?? 0)) fail(`${q.id}: correctIndex ${q.correct} out of range`);
}
ok('per-question structural checks ran');

// Optional rationales: when present, must have same length as options and an
// empty slot at the correct index (the "why this is wrong" doesn't apply there).
for (const q of all) {
  if (q.rationales === undefined) continue;
  if (!Array.isArray(q.rationales)) {
    fail(`${q.id}: rationales must be an array`);
    continue;
  }
  if (q.rationales.length !== q.options.length) {
    fail(`${q.id}: rationales length ${q.rationales.length} != options length ${q.options.length}`);
    continue;
  }
  for (let i = 0; i < q.rationales.length; i++) {
    const r = q.rationales[i];
    if (typeof r !== 'string') {
      fail(`${q.id}: rationales[${i}] not a string`);
      continue;
    }
    if (i === q.correct && r.trim().length !== 0) {
      fail(`${q.id}: rationales[${q.correct}] (correct slot) must be empty, got "${r.slice(0, 30)}"`);
    }
    if (i !== q.correct && r.trim().length === 0) {
      fail(`${q.id}: rationales[${i}] (wrong-option slot) is empty`);
    }
  }
}
const e1WithR = exam1.filter((q) => Array.isArray(q.rationales)).length;
const e2WithR = exam2.filter((q) => Array.isArray(q.rationales)).length;
ok(`rationale coverage: Exam 1 ${e1WithR}/${exam1.length}, Exam 2 ${e2WithR}/${exam2.length}`);

// iClicker items may now appear in either exam (split 9/9 across exams). No exam-membership check.
ok('iclicker items may appear in either exam (no exam-exclusivity rule)');

// Figure-leak regex: if a question has a figure, scan its svg + caption for any of the answer-option's numeric tokens
for (const q of all) {
  if (!q.figure) continue;
  const svg = q.figure?.svg ?? '';
  const cap = q.figure?.caption ?? '';
  const correctOpt = (q.options?.[q.correct] ?? '') + '';
  // Extract numeric tokens (e.g., "3.6", "1.25e-3") from the correct option.
  const numTokens = correctOpt.match(/[-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?/g) ?? [];
  const haystack = (svg + ' ' + cap).toLowerCase();
  for (const tok of numTokens) {
    if (tok.length >= 2 && haystack.includes(tok)) {
      fail(`${q.id}: figure may leak answer numeric "${tok}"`);
    }
  }
}
ok('figure-leak regex pass');

// Stem-overlap check between exams (Jaccard on simple tokenization)
function tokens(s) {
  return new Set(
    String(s)
      .replace(/\\[a-zA-Z]+/g, ' ')        // strip tex commands
      .replace(/[^A-Za-z0-9 ]/g, ' ')
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
}
let overlapFails = 0;
for (const a of exam1) for (const b of exam2) {
  const A = tokens(a.stem), B = tokens(b.stem);
  const inter = [...A].filter((w) => B.has(w)).length;
  const uni = new Set([...A, ...B]).size;
  const jacc = uni === 0 ? 0 : inter / uni;
  if (jacc >= 0.7) {
    fail(`high stem overlap ${a.id} <-> ${b.id}: jaccard=${jacc.toFixed(2)}`);
    overlapFails++;
  }
}
if (overlapFails === 0) ok('no high-overlap stem pairs (Jaccard < 0.7)');

console.log('---');
if (failed) {
  console.error(`FAILED: ${failed} check(s).`);
  process.exit(1);
} else {
  console.log('ALL CHECKS PASSED.');
}
