import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';

const assetPaths = [
  'index.html', 'app.js', 'styles.css', 'uatuk.css',
  'data/exams.js', 'question-engine/schema.js',
  'question-engine/profiles.js', 'question-engine/exam-generator.js'
];

const assets = {};
for (const path of assetPaths) assets[`/${path}`] = await readFile(path, 'utf8');

const moduleFiles = (await readdir('question-bank/modules')).filter(name => name.endsWith('.json')).sort();
const questions = [];
const ids = new Set();
for (const file of moduleFiles) {
  const records = JSON.parse(await readFile(`question-bank/modules/${file}`, 'utf8'));
  if (!Array.isArray(records)) throw new Error(`${file} must contain an array.`);
  for (const question of records) {
    if (!question.id || !question.exam || !question.module || !Array.isArray(question.options)) {
      throw new Error(`${file} contains an invalid question record.`);
    }
    if (ids.has(question.id)) throw new Error(`Duplicate question id: ${question.id}`);
    ids.add(question.id);
    questions.push(question);
  }
}
assets['/data/questions-bundle.js'] = `(function(){const UATUK=window.UATUK=window.UATUK||{};const records=${JSON.stringify(questions)};UATUK.questions=UATUK.questionSchema.validate(records.map(UATUK.questionSchema.normalise));})();`;

const runtime = await readFile('worker/runtime.js', 'utf8');
const worker = runtime.replace('__EMBEDDED_ASSETS__', JSON.stringify(assets));

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', worker);
await writeFile('dist/.openai/hosting.json', await readFile('.openai/hosting.json'));
