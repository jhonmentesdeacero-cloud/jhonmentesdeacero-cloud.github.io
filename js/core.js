/**
 * core.js — Shared across all pages
 * Navbar · Hamburger · Smooth scroll · Scroll-reveal · Ripple
 */

(function () {
  'use strict';

  /* ── Navbar scroll state ────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── Hamburger menu ─────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active nav link on scroll ──────────────────────────── */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks  = Array.from(document.querySelectorAll('.navbar__nav a[href^="#"]'));
  if (sections.length && navLinks.length) {
    const activeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => {
              a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: '-42% 0px -50% 0px' }
    );
    sections.forEach((s) => activeIO.observe(s));
  }

  /* ── Smooth anchor scroll with navbar offset ────────────── */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = (navbar ? navbar.offsetHeight : 0) + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    // Close mobile menu if open
    if (navMenu) {
      navMenu.classList.remove('is-open');
      if (hamburger) {
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ── Scroll-reveal (IntersectionObserver) ───────────────── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';
  const revealEls = Array.from(document.querySelectorAll(revealSelectors));

  if (revealEls.length) {
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
    revealEls.forEach((el) => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-visible');
      } else {
        revealIO.observe(el);
      }
    });
  }

  /* ── Stagger children reveal ────────────────────────────── */
  const staggerParents = Array.from(document.querySelectorAll('[data-stagger]'));
  if (staggerParents.length) {
    const staggerIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const children = Array.from(entry.target.children);
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 70}ms`;
            child.classList.add('reveal');
            // Force reflow then add visible
            requestAnimationFrame(() => {
              requestAnimationFrame(() => child.classList.add('is-visible'));
            });
          });
          staggerIO.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    staggerParents.forEach((el) => staggerIO.observe(el));
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

  /* ── Book 3D tilt on mouse move (hero) ──────────────────── */
  const tiltWrap = document.querySelector('[data-tilt]');
  if (tiltWrap && window.matchMedia('(pointer: fine)').matches) {
    const tiltEl = tiltWrap.querySelector('[data-tilt-target]') || tiltWrap;
    tiltWrap.addEventListener('mousemove', (e) => {
      const rect = tiltWrap.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
      const ry = ((e.clientX - cx) / (rect.width  / 2)) *  6;
      tiltEl.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    tiltWrap.addEventListener('mouseleave', () => {
      tiltEl.style.transform = '';
      tiltEl.style.transition = 'transform 0.55s var(--ease-out)';
      setTimeout(() => { tiltEl.style.transition = ''; }, 600);
    });
  }

})();
