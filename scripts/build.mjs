import { cp, mkdir, rm } from 'node:fs/promises';

const files = ['index.html', 'app.js', 'styles.css', 'uatuk.css'];
const directories = ['data', 'question-engine'];

await rm('build', { recursive: true, force: true });
await mkdir('build', { recursive: true });

for (const file of files) await cp(file, `build/${file}`);
for (const directory of directories) {
  await cp(directory, `build/${directory}`, { recursive: true });
}
