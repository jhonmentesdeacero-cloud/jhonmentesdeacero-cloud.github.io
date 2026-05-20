/**
 * core.js — Shared across all pages
 * Smooth scroll · Scroll-reveal · Ripple · Book tilt
 */

(function () {
  'use strict';

  /* ── Smooth anchor scroll with navbar offset ────────────── */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navbar    = document.getElementById('navbar');
    const navMenu   = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    const offset    = navbar ? navbar.offsetHeight + 16 : 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    if (navMenu) {
      navMenu.classList.remove('is-open');
      if (hamburger) {
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ── Scroll-reveal (IntersectionObserver) ───────────────── */
  const revealEls = Array.from(document.querySelectorAll('.reveal, .reveal-left, .reveal-right'));
  if (revealEls.length) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
      );
      revealEls.forEach(el => revealIO.observe(el));
    }
  }

  /* ── Ripple effect on buttons ───────────────────────────── */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    Object.assign(ripple.style, {
      width:  `${size}px`,
      height: `${size}px`,
      left:   `${e.clientX - rect.left  - size / 2}px`,
      top:    `${e.clientY - rect.top   - size / 2}px`,
    });
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });

  /* ── Book 3D tilt on mouse move ─────────────────────────── */
  const tiltWrap = document.querySelector('[data-tilt]');
  if (tiltWrap && window.matchMedia('(pointer: fine)').matches) {
    const tiltEl = tiltWrap.querySelector('[data-tilt-target]') || tiltWrap;
    tiltWrap.addEventListener('mousemove', (e) => {
      const rect = tiltWrap.getBoundingClientRect();
      const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6;
      const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6;
      tiltEl.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    tiltWrap.addEventListener('mouseleave', () => {
      tiltEl.style.transform = '';
      tiltEl.style.transition = 'transform 0.55s var(--ease-out)';
      setTimeout(() => { tiltEl.style.transition = ''; }, 600);
    });
  }

})();
