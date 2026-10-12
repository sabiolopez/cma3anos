import { cp, mkdir, rm, readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
const html = await readFile('primeira-visao/index.html', 'utf8');
for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(match[1]);
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await cp('primeira-visao/index.html', 'dist/index.html');
await cp('primeira-visao/assets', 'dist/assets', { recursive: true, filter: path => !path.endsWith('.txt') });
console.log('Site estático gerado em dist/. JavaScript validado.');
