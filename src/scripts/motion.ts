// Dezente, scroll-basierte Dynamik. Ohne JavaScript ist alles sichtbar.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Einblenden beim Scrollen
const revealEls = document.querySelectorAll<HTMLElement>('.reveal, .reveal-img');
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

// 2) Zahlen hochzählen: <span data-count="34">34</span>
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const countIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      countIO.unobserve(el);
      const to = Number(el.dataset.count);
      if (reduce || !to) continue;
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0';
      requestAnimationFrame(tick);
    }
  },
  { threshold: 0.6 },
);
counters.forEach((el) => countIO.observe(el));

// 3) Text, der sich beim Scrollen „einfärbt“: <p data-words>…</p>
const wordBlocks = document.querySelectorAll<HTMLElement>('[data-words]');
wordBlocks.forEach((block) => {
  if (reduce) return;
  const words = block.textContent!.trim().split(/\s+/);
  block.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
});

// 4) Leichte Parallaxe: <img data-parallax="0.08">
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

// 5) Ablauf mit mitlaufendem Bild: [data-steps] enthält [data-step-item] und [data-step-img]
const stepRoots = [...document.querySelectorAll<HTMLElement>('[data-steps]')];
stepRoots.forEach((root) => {
  const items = [...root.querySelectorAll<HTMLElement>('[data-step-item]')];
  const imgs = [...root.querySelectorAll<HTMLElement>('[data-step-img]')];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const i = items.indexOf(e.target as HTMLElement);
        items.forEach((it, j) => it.classList.toggle('is-active', j === i));
        imgs.forEach((im, j) => im.classList.toggle('is-active', j === i));
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  items.forEach((it) => io.observe(it));
});

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const vh = window.innerHeight;
    if (!reduce) {
      for (const el of parallax) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const f = Number(el.dataset.parallax || 0.08);
        const offset = (r.top + r.height / 2 - vh / 2) * f;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
      }
      wordBlocks.forEach((block) => {
        const r = block.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        const spans = block.querySelectorAll<HTMLElement>('.w');
        const lit = Math.round(p * spans.length);
        spans.forEach((s, i) => s.classList.toggle('on', i < lit));
      });
    }
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// 6) Horizontale Galerie mit Pfeilen
document.querySelectorAll<HTMLElement>('[data-rail]').forEach((rail) => {
  const track = rail.querySelector<HTMLElement>('[data-rail-track]')!;
  rail.querySelectorAll<HTMLButtonElement>('[data-rail-btn]').forEach((b) =>
    b.addEventListener('click', () => {
      const dir = b.dataset.railBtn === 'next' ? 1 : -1;
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
    }),
  );
});
