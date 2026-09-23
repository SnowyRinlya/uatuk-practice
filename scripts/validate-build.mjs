import { readFile } from 'node:fs/promises';

const worker = await readFile('dist/server/index.js', 'utf8');
const manifest = JSON.parse(await readFile('dist/.openai/hosting.json', 'utf8'));

if (!worker.includes('export default') || !worker.includes('async fetch')) {
  throw new Error('Worker entrypoint is missing a callable fetch export.');
}
if (manifest.d1 !== 'DB') throw new Error('D1 binding must be named DB.');
console.log('Worker build and D1 binding validated.');
