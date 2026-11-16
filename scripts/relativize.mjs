// Wandelt alle absoluten Pfade ("/preise", "/_astro/…") in dist-relative in relative Pfade um,
// damit die Seite unter jedem Unterpfad läuft (z. B. GitHub Pages /Eloure/).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative, extname, posix } from 'node:path';

const root = 'dist-relative';

function target(urlPath) {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '');
  if (clean === '') return { file: 'index.html', dir: true, rel: '' };
  if (existsSync(join(root, clean, 'index.html'))) return { file: join(clean, 'index.html'), dir: true, rel: clean };
  if (existsSync(join(root, clean + '.html'))) return { file: clean + '.html', dir: false, rel: clean + '.html' };
  return { file: clean, dir: false, rel: clean };
}

function mapUrl(url, fromFile) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const m = url.match(/^([^?#]*)([?#].*)?$/);
  const t = target(m[1]);
  const fromDir = dirname(relative(root, fromFile));
  let r = posix.relative(fromDir === '.' ? '' : fromDir.split('\\').join('/'), t.rel) || '.';
  if (t.dir) r = r === '.' ? './' : r + '/';
  return r + (m[2] ?? '');
}

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (extname(p) === '.html') {
      let s = readFileSync(p, 'utf8');
      s = s.replace(/(\s(?:href|src|poster|action))="(\/[^"]*)"/g, (_, a, u) => `${a}="${mapUrl(u, p)}"`);
      s = s.replace(/\ssrcset="([^"]*)"/g, (_, v) =>
        ` srcset="${v.split(',').map((part) => part.trim().replace(/^(\S+)/, (u) => mapUrl(u, p))).join(', ')}"`,
      );
      writeFileSync(p, s);
    } else if (extname(p) === '.css') {
      writeFileSync(p, readFileSync(p, 'utf8').replace(/url\(\/_astro\//g, 'url(./'));
    }
  }
}
walk(root);
writeFileSync(join(root, '.nojekyll'), '');
console.log('relativized', root);
