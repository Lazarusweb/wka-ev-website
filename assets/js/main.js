/* =====================================================
   main.js — Application entry point
   ===================================================== */

import { init as initI18n }    from './i18n.js';
import { init as initScroll }  from './scroll.js';
import { init as initGallery } from './gallery.js';
import { init as initNav }     from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initI18n();
  initScroll();
  initGallery();
});
