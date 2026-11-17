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
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
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
