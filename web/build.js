import { SveltePlugin } from 'bun-plugin-svelte';
import { copyFile, cp, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = import.meta.dir;
const out = join(root, 'build');

export async function build() {
  await rm(out, { recursive: true, force: true });

  const result = await Bun.build({
    entrypoints: [join(root, 'src/main.js')],
    outdir: out,
    target: 'browser',
    format: 'iife',
    minify: true,
    naming: { entry: 'app.[ext]', asset: '[name].[ext]' },
    loader: { '.webp': 'file', '.woff2': 'file' },
    plugins: [SveltePlugin({ development: false })],
  });

  if (!result.success) {
    for (const log of result.logs) console.error(log);
    throw new Error('Build failed');
  }

  await cp(join(root, 'public'), out, { recursive: true });
  await copyFile(join(root, 'index.html'), join(out, 'index.html'));
  console.log('Built to', out);
}

if (import.meta.main) await build();
