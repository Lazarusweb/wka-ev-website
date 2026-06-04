/* =====================================================
   i18n.js — Language switcher
   ===================================================== */

import { TRANSLATIONS } from './translations.js';

const STORAGE_KEY = 'wcea-lang';
const VALID_LANGS = ['en', 'zh', 'de'];

export function getCurrentLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && VALID_LANGS.includes(stored)) return stored;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  if (browser === 'zh') return 'zh';
  if (browser === 'de') return 'de';
  return 'en';
}

export function setLang(lang) {
  if (!VALID_LANGS.includes(lang)) return;

  const body = document.body;

  body.classList.add('lang-transitioning');

  setTimeout(() => {
    const t = TRANSLATIONS[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);

    setTimeout(() => body.classList.remove('lang-transitioning'), 20);
  }, 130);
}

export function init() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  setLang(getCurrentLang());
}
