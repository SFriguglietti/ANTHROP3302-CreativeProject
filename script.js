/* ================================================================
   MEDICAL ANTHROPOLOGY — script.js
   Handles:
     1. Page loader dismissal
     2. Sticky nav visibility + active link highlighting
     3. Mobile hamburger menu
     4. Scroll-reveal animations
     5. Gallery lightbox
================================================================ */

// ── 1. Loader ─────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    // Short delay so the sweep animation finishes
    setTimeout(() => {
      loader.classList.add('done');
      loader.addEventListener('animationend', () => loader.remove(), { once: true });
    }, 300);
  });
}

// ── 2. Sticky Nav + Active Links ──────────────────────────────
function initStickyNav() {
  const hero = document.querySelector('.hero');
  const stickyNav = document.getElementById('sticky-nav');
  const sections = document.querySelectorAll('main section[id]');
  const stickyLinks = document.querySelectorAll('.sticky-nav__links a');

  if (!hero || !stickyNav) return;

  // Show/hide sticky nav based on hero visibility
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      stickyNav.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  heroObserver.observe(hero);

  // Highlight active section in sticky nav
  if (sections.length && stickyLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            stickyLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }
}

// ── 3. Mobile Menu ────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate burger → X
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach((s) => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ── 4. Scroll-Reveal ──────────────────────────────────────────
function initReveal() {
  const targets = document.querySelectorAll([
    '.eyebrow',
    '.intro-layout__head',
    '.intro-layout__body',
    '.stat',
    '.split__media',
    '.split__text',
    '.two-col > div',
    '.wide-fig',
    '.card',
    '.gallery__item',
    '.sources-list',
    '.sec-title--wide',
  ].join(', '));

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards and gallery items
    if (el.matches('.card, .gallery__item, .stat')) {
      el.style.transitionDelay = `${(i % 5) * 0.07}s`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

// ── 5. Lightbox ───────────────────────────────────────────────
function initLightbox() {
  const galleryImgs = document.querySelectorAll('.gallery__item img');
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbCaption   = document.getElementById('lightbox-caption');
  const lbClose     = document.getElementById('lightbox-close');

  if (!lightbox || !galleryImgs.length) return;

  function open(img) {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    const fig = img.closest('figure');
    lbCaption.textContent = fig?.querySelector('figcaption')?.textContent ?? '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryImgs.forEach((img) => img.addEventListener('click', () => open(img)));
  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// ── 6. Smooth scroll (Safari < 15.4 fallback) ────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStickyNav();
  initMobileMenu();
  initReveal();
  initLightbox();
  initSmoothScroll();
});
