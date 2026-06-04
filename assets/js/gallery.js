/* =====================================================
   gallery.js — Lightbox with keyboard + touch support
   ===================================================== */

let currentIndex = 0;
let images = [];
let lastFocused = null;

export function init() {
  const items = document.querySelectorAll('.gallery__item');
  if (!items.length) return;

  images = Array.from(items).map(item => ({
    src: item.querySelector('img')?.src ?? '',
    caption: item.querySelector('.gallery__caption')?.textContent ?? ''
  }));

  items.forEach((item, i) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => open(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  document.getElementById('lb-close')?.addEventListener('click', close);
  document.getElementById('lb-prev')?.addEventListener('click', () => navigate(-1));
  document.getElementById('lb-next')?.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  });
}

function open(index) {
  lastFocused = document.activeElement;
  currentIndex = index;
  render();
  const lightbox = document.getElementById('lightbox');
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('lb-close')?.focus();
}

function close() {
  const lightbox = document.getElementById('lightbox');
  lightbox.hidden = true;
  document.body.style.overflow = '';
  lastFocused?.focus();
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + images.length) % images.length;
  render();
}

function render() {
  const img = document.getElementById('lb-img');
  const caption = document.getElementById('lb-caption');
  if (img) img.src = images[currentIndex].src;
  if (caption) caption.textContent = images[currentIndex].caption;
}
