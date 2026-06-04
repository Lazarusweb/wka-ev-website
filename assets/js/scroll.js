/* =====================================================
   scroll.js — Scroll-reveal + active nav + smooth scroll
   ===================================================== */

export function init() {
  initReveal();
  initNavScroll();
  initActiveNav();
  initSmoothScroll();
}

function initReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const stagger = el.dataset.revealStagger;
      if (stagger) el.style.transitionDelay = `${stagger}ms`;
      el.classList.add('is-visible');
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('nav--scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
  );
  observer.observe(hero);
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();

      const navHeight = document.getElementById('main-nav')?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });

      const hamburger = document.querySelector('.nav__hamburger');
      const navLinks = document.querySelector('.nav__links');
      if (hamburger && navLinks) {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      }
    });
  });
}
