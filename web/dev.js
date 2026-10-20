import { watch } from 'node:fs';
import { join } from 'node:path';
import { build } from './build.js';

const root = import.meta.dir;
const out = join(root, 'build');
const port = Number(process.env.PORT) || 3000;

let timer;

function rebuild() {
  clearTimeout(timer);
  timer = setTimeout(() => build().catch((err) => console.error(err)), 100);
}

await build();

for (const path of ['src', 'public', 'index.html']) {
  watch(join(root, path), { recursive: true }, rebuild);
}

const server = Bun.serve({
  port,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const file = Bun.file(join(out, pathname === '/' ? 'index.html' : pathname));
    if (!(await file.exists())) return new Response('Not found', { status: 404 });
    return new Response(file);
  },
});

console.log(`Loadingscreen running at ${server.url}`);
