/**
 * Sr. Trufa — Deploy para Vercel
 * ─────────────────────────────────────────────────────────────────
 * COMO USAR:
 *   1. Obtenha um token em: https://vercel.com/account/tokens
 *   2. No terminal (dentro desta pasta cardapio-digital/):
 *        node deploy.mjs SEU_TOKEN_AQUI
 *      ou:
 *        VERCEL_TOKEN=SEU_TOKEN node deploy.mjs
 *
 * REQUISITOS: Node.js 18+
 * ─────────────────────────────────────────────────────────────────
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN   = process.argv[2] ?? process.env.VERCEL_TOKEN;
const TEAM_ID = 'team_fEMN2nH4k8LW4sdx5Vhh3W7G';
const NAME    = 'sr-trufa-catalogo';
const DIST    = join(__dirname, 'dist');

if (!TOKEN) {
  console.error('\n❌ Token Vercel não encontrado!');
  console.error('   Uso: node deploy.mjs SEU_TOKEN');
  console.error('   Token em: https://vercel.com/account/tokens\n');
  process.exit(1);
}

const TEXT_EXTS = new Set(['.html','.css','.js','.mjs','.json','.svg','.txt','.map']);

function readDir(dir, base = dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...readDir(full, base));
    } else {
      const rel = relative(base, full).replace(/\\/g, '/');
      const ext = rel.includes('.') ? '.' + rel.split('.').pop() : '';
      const data = readFileSync(full);
      const isText = TEXT_EXTS.has(ext);
      files.push({ file: rel, data: isText ? data.toString('utf-8') : data.toString('base64'), encoding: isText ? 'utf-8' : 'base64' });
    }
  }
  return files;
}

console.log('\n📦 Lendo dist/...');
const files = readDir(DIST);
files.push({ file: 'vercel.json', data: JSON.stringify({ rewrites: [{ source: '/((?!assets/).*)', destination: '/index.html' }] }), encoding: 'utf-8' });
console.log(`   ${files.length} arquivos.`);

console.log('🚀 Enviando para Vercel...');
const res = await fetch(`https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: NAME, files, projectSettings: { framework: null }, target: 'production' }),
});
const body = await res.json();

if (res.ok) {
  console.log('\n✅ Deploy concluído!');
  console.log(`   🌐 https://${body.url ?? NAME + '.vercel.app'}`);
} else {
  console.error('\n❌ Erro:', JSON.stringify(body, null, 2));
  process.exit(1);
}
