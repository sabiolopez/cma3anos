import { createServer } from 'node:http';
import { appendFile, mkdtemp, readFile } from 'node:fs/promises';
import { resolve, extname, join, sep } from 'node:path';

import { tmpdir } from 'node:os';
import sheetsHandler, { handleInterest } from '../api/interesse.mjs';

const useSheets = Boolean(process.env.CMA_SHEETS_ID);
const previewFile = useSheets ? null : join(await mkdtemp(join(tmpdir(), 'cma-interesse-')), 'respostas.jsonl');
const root = resolve('primeira-visao');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/api/interesse') {
      const reply = {
        setHeader: (name, value) => res.setHeader(name, value),
        status(code) { res.statusCode = code; return this; },
        json(value) {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(value));
        },
      };
      if (req.method === 'POST') {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 4096) return reply.status(413).json({ error: 'Envio muito grande.' });
        }
        try { req.body = JSON.parse(body); }
        catch { return reply.status(400).json({ error: 'Envio inválido.' }); }
      }
      if (useSheets) return await sheetsHandler(req, reply);
      return await handleInterest(req, reply, async row => {
        await appendFile(previewFile, JSON.stringify(row) + '\n', { mode: 0o600 });
        return row;
      });
    }
    if (pathname === '/interesse') { res.writeHead(308, { Location: '/interesse/' }).end(); return; }
    const file = resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    if (useSheets && pathname === '/interesse/') {
      res.end(data.toString().replace('O cadastro fica neste computador.', 'O cadastro vai para a planilha do CMA.'));
      return;
    }
    res.end(data);
  } catch { res.writeHead(404).end('Arquivo não encontrado'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => {
  console.log(`Formulário de teste em http://localhost:${port}/interesse/`);
  console.log(useSheets ? 'Destino: Google Sheets' : `Respostas locais: ${previewFile}`);
});
