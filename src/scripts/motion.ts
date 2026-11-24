// Scroll-Dynamik mit GSAP + ScrollTrigger.
// Prinzip: Elemente blenden einmal ein und bleiben stehen. Dazu wenige,
// gezielte Scroll-Effekte (Parallaxe, wachsende Bilder, wandernde Typo).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showAll() {
  root.classList.remove('motion');
  root.classList.add('no-motion');
}

if (reduce) {
  showAll();
} else {
  try {
    gsap.registerPlugin(ScrollTrigger);
    init();
  } catch (e) {
    showAll();
  }
}

function init() {
  const ease = 'power3.out';

  // 1) Einblenden von unten (bleibt stehen)
  ScrollTrigger.batch('.reveal, [data-anim="up"]', {
    start: 'top 97%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease,
        stagger: 0.09,
      }),
  });

  // 1b) Sanft: Bilder/Elemente blenden ein, das Motiv setzt sich leicht (Startseite)
  ScrollTrigger.batch('[data-anim="soft"]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => {
      gsap.to(els, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', stagger: 0.12 });
      els.forEach((el) => {
        const img = (el as HTMLElement).querySelector('img');
        if (img) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 2.2, ease: 'power2.out' });
      });
    },
  });

  // 1c) Leichtes Einschieben von links/rechts
  ScrollTrigger.batch('[data-slide]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, x: 0, duration: 1.4, ease: 'power2.out', stagger: 0.1 }),
  });

  // 2) Headlines zeilenweise aus einer Maske
  gsap.utils.toArray<HTMLElement>('[data-anim="lines"]').forEach((el) => {
    gsap.to(el.querySelectorAll('.line > span'), {
      y: 0,
      duration: 1.25,
      ease: 'power4.out',
      stagger: 0.1,
      delay: Number(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // 3) Bilder öffnen sich (Clip) und das Motiv zoomt sanft zurück
  gsap.utils.toArray<HTMLElement>('.reveal-img, [data-anim="img"]').forEach((el) => {
    const img = el.querySelector('img, video');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0 0% 0)', duration: 1.4, ease: 'power3.inOut' });
    if (img) tl.from(img, { scale: 1.18, duration: 1.8, ease: 'power3.out' }, 0);
  });

  // 4) Parallaxe (scrub)
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 12);
    gsap.fromTo(
      el,
      { yPercent: -amt / 2 },
      {
        yPercent: amt / 2,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // 5) Wandernde Typografie über Bildern (scrub)
  gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
    const d = Number(el.dataset.drift || 8);
    gsap.fromTo(
      el,
      { xPercent: d },
      { xPercent: -d, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  // 6) Fixierte Section: Bild wächst von gerahmt zu randlos
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-expand]').forEach((sec) => {
      const frame = sec.querySelector<HTMLElement>('[data-expand-frame]');
      const text = sec.querySelectorAll<HTMLElement>('[data-expand-text]');
      if (!frame) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top top', end: '+=120%', scrub: 0.6, pin: true },
      });
      tl.fromTo(frame, { clipPath: 'inset(16% 22% 16% 22%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' })
        .fromTo(frame.querySelector('img'), { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
        .fromTo(text, { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' }, 0.45);
    });
  });
  mm.add('(max-width: 899px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-expand-text]').forEach((t) => gsap.set(t, { opacity: 1, y: 0 }));
  });

  // 6a) Unterseiten-Hero: Bild öffnet sich beim Scrollen bis an die Ränder
  gsap.utils.toArray<HTMLElement>('[data-hero-frame]').forEach((f) => {
    const img = f.querySelector('img');
    const st = { trigger: f, start: 'top 95%', end: 'top 10%', scrub: 0.6 };
    gsap.fromTo(f, { clipPath: 'inset(0% 5% 0% 5%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: st });
    if (img) gsap.fromTo(img, { scale: 1.14 }, { scale: 1, ease: 'none', scrollTrigger: { ...st } });
  });

  // 6a2) Passepartout-Hero: Rahmen öffnet sich beim Scrollen, Bild zoomt zurück
  gsap.utils.toArray<HTMLElement>('[data-ph-frame]').forEach((sec) => {
    const el = sec.querySelector<HTMLElement>('[data-ph-frame-img]');
    if (!el) return;
    const from = getComputedStyle(el).clipPath;
    const st = { trigger: sec, start: 'top top', end: 'bottom 30%', scrub: 0.6 };
    gsap.fromTo(el, { clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px)', ease: 'none', scrollTrigger: st });
    const img = el.querySelector('img');
    if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { ...st } });
  });

  // 6a2b) Kantige Form: schräge Kante richtet sich auf, Neon-Rahmen verformt sich
  gsap.utils.toArray<HTMLElement>('[data-ph-shape]').forEach((sec) => {
    const form = sec.querySelector<HTMLElement>('[data-ph-shape-form]');
    const img = sec.querySelector<HTMLElement>('[data-ph-shape-img]');
    const line = sec.querySelector<SVGPolygonElement>('[data-ph-shape-line]');
    const st = { trigger: sec, start: 'top top', end: 'bottom top', scrub: 0.8 };
    if (img) gsap.fromTo(img, { scale: 1.1, yPercent: 0 }, { scale: 1, yPercent: 8, ease: 'none', scrollTrigger: st });
    // Rahmen weitet sich gleichmässig bis an die Bildkanten und wird leiser
    if (line) {
      gsap.fromTo(
        line,
        { attr: { points: '5,7 95,7 95,93 5,93' } },
        { attr: { points: '1.5,2 98.5,2 98.5,98 1.5,98' }, opacity: 0.3, ease: 'none', scrollTrigger: { ...st } },
      );
    }
    // Eckwinkel: kommen beim Scrollen von den Bildkanten nach innen und blenden ein
    const corners = sec.querySelector<SVGPathElement>('[data-ph-corners]');
    if (corners) {
      const to = corners.getAttribute('d')!;
      gsap.fromTo(
        corners,
        { attr: { d: corners.dataset.from! }, opacity: 0 },
        { attr: { d: to }, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: sec, start: 'top top', end: '+=38%', scrub: 0.6 } },
      );
    }
    if (form && window.matchMedia('(min-width: 1000px)').matches) {
      gsap.fromTo(
        form,
        { clipPath: 'polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)', yPercent: 0 },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', yPercent: -18, ease: 'none', scrollTrigger: { ...st } },
      );
    }
  });

  // 6a2c) Vorhang: Inhalt schiebt sich über den Hero, das Bild wird unscharf und tritt zurück
  mm.add('(min-width: 1000px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-curtain]').forEach((sec) => {
      const next = sec.nextElementSibling as HTMLElement | null;
      const img = sec.querySelector<HTMLElement>('.sh-img');
      if (!next || !img) return;
      const st = { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true };
      gsap.fromTo(img, { filter: 'blur(0px) brightness(1)' }, { filter: 'blur(12px) brightness(0.45)', ease: 'none', scrollTrigger: st });
      gsap.fromTo(
        sec.querySelectorAll('.sh-title, [data-ph-shape-form] > *'),
        { opacity: 1 },
        { opacity: 0, ease: 'none', scrollTrigger: { ...st, end: 'top 45%' } },
      );
    });

    // Signet: der untere Neon-Bogen gleitet unter den oberen Bogen und schliesst die Form
    gsap.utils.toArray<HTMLElement>('[data-ph-signet]').forEach((sec) => {
      const u = sec.querySelector<HTMLElement>('.sg-signet');
      const arch = sec.querySelector<HTMLElement>('[data-sg-arch]');
      const img = sec.querySelector<HTMLElement>('[data-ph-shape-img]');
      const st = { trigger: sec, start: 'top top', end: 'bottom 20%', scrub: 0.8 };
      if (u) gsap.fromTo(u, { xPercent: 0 }, { xPercent: 50, ease: 'none', scrollTrigger: st });
      if (arch) gsap.fromTo(arch, { yPercent: 0 }, { yPercent: -6, ease: 'none', scrollTrigger: { ...st } });
      if (img) gsap.fromTo(img, { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { ...st } });
    });
  });

  // 6a3) Versetztes Detailbild schwebt schneller als der Rest
  gsap.utils.toArray<HTMLElement>('[data-drift-y]').forEach((el) => {
    const d = Number(el.dataset.driftY || -15);
    gsap.fromTo(el, { yPercent: 0 }, { yPercent: d, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top top', end: 'bottom top', scrub: true } });
  });

  // 6b) Ruhepunkt: Raum öffnet sich, Detailbilder ziehen weg, Wort + Karte kommen
  mm.add('(min-width: 900px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-calm]').forEach((sec) => {
      const frame = sec.querySelector<HTMLElement>('[data-calm-frame]');
      if (!frame) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top top', end: '+=140%', scrub: 0.8, pin: true },
      });
      tl.fromTo(frame, { clipPath: 'inset(18% 30% 18% 30%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 })
        .fromTo(frame.querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'none', duration: 1 }, 0);
      sec.querySelectorAll<HTMLElement>('[data-calm-side]').forEach((s) => {
        const dir = Number(s.dataset.calmSide);
        tl.fromTo(s, { x: 0, yPercent: 0 }, { x: dir * window.innerWidth * 0.22, yPercent: -90, opacity: 0, ease: 'power1.in', duration: 0.9 }, 0);
      });
      tl.fromTo(sec.querySelector('[data-calm-word]'), { opacity: 0, yPercent: 40, scale: 0.92 }, { opacity: 1, yPercent: 0, scale: 1, ease: 'power2.out', duration: 0.5, transformOrigin: 'left bottom' }, 0.55)
        .fromTo(sec.querySelector('[data-calm-card]'), { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 0.75);
    });
  });

  // Hero-Video: falls Autoplay blockiert wurde, beim ersten Scroll/Tap erneut starten
  document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach((v) => {
    const play = () => v.paused && v.play().catch(() => {});
    play();
    ['touchstart', 'scroll', 'click'].forEach((ev) => window.addEventListener(ev, play, { once: true, passive: true }));
  });

  // 7) Zahlen hochzählen
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    });
  });

  // 8) Ablauf: mitlaufendes Bild wechselt mit dem aktiven Schritt
  document.querySelectorAll<HTMLElement>('[data-steps]').forEach((sec) => {
    const items = [...sec.querySelectorAll<HTMLElement>('[data-step-item]')];
    const imgs = [...sec.querySelectorAll<HTMLElement>('[data-step-img]')];
    const nums = [...sec.querySelectorAll<HTMLElement>('[data-step-num]')];
    items.forEach((it, i) =>
      ScrollTrigger.create({
        trigger: it,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => {
          if (!self.isActive) return;
          items.forEach((x, j) => x.classList.toggle('is-active', j === i));
          imgs.forEach((x, j) => x.classList.toggle('is-active', j === i));
          nums.forEach((x, j) => x.classList.toggle('is-active', j === i));
        },
      }),
    );
  });

  // Sicherheitsnetz: falls etwas nicht getriggert wurde, nach dem Laden sichtbar machen
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

// Header: transparent über dunklem Hero, fest beim Scrollen
// und blendet sich beim Runterscrollen aus, beim Hochscrollen wieder ein
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = window.scrollY;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  if (header && !header.classList.contains('menu-open')) {
    const down = y > lastY + 4;
    const up = y < lastY - 4;
    if (down && y > 160) header.classList.add('is-hidden');
    else if (up || y <= 160) header.classList.remove('is-hidden');
  }
  if (Math.abs(y - lastY) > 4) lastY = y;
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Horizontale Galerie mit Pfeilen
document.querySelectorAll<HTMLElement>('[data-rail]').forEach((rail) => {
  const track = rail.querySelector<HTMLElement>('[data-rail-track]')!;
  rail.querySelectorAll<HTMLButtonElement>('[data-rail-btn]').forEach((b) =>
    b.addEventListener('click', () => {
      const dir = b.dataset.railBtn === 'next' ? 1 : -1;
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
    }),
  );
});
