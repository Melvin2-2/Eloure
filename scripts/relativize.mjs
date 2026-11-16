// Wandelt absolute Pfade in dist-preview in relative Pfade um, damit die Vorschau
// unter beliebigen Unterpfaden funktioniert. Nur für die Vorschau, nicht für das Live-Hosting.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = 'dist-preview';
const pages = new Set(readdirSync(root).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')));

function mapUrl(url) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const m = url.match(/^\/([^?#]*)([?#].*)?$/);
  let path = m[1].replace(/\/$/, '');
  const rest = m[2] ?? '';
  if (path === '') return 'index.html' + rest;
  if (pages.has(path)) return `${path}.html${rest}`;
  return path + rest;
}

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (extname(p) === '.html') {
      let s = readFileSync(p, 'utf8');
      s = s.replace(/(\s(?:href|src|poster|action))="(\/[^"]*)"/g, (_, a, u) => `${a}="${mapUrl(u)}"`);
      s = s.replace(/\ssrcset="([^"]*)"/g, (_, v) => ` srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, '$1')}"`);
      s = s.replace(/url\(\/assets\//g, 'url(assets/');
      writeFileSync(p, s);
    } else if (extname(p) === '.css') {
      writeFileSync(p, readFileSync(p, 'utf8').replace(/url\(\/assets\//g, 'url(./'));
    }
  }
}
walk(root);
console.log('relativized', root, [...pages].join(', '));
