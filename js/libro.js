/**
 * libro.js — Specific to libro.html
 * Testimonials carousel · Price counter animation
 */

(function () {
  'use strict';

  /* ── Testimonials carousel ──────────────────────────────── */
  const track    = document.getElementById('testimonials-track');
  const dotsWrap = document.getElementById('testimonials-dots');
  const prevBtn  = document.getElementById('testimonials-prev');
  const nextBtn  = document.getElementById('testimonials-next');

  if (track) {
    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    const dots   = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.testimonials-dot')) : [];
    let current  = 0;
    let autoplay = null;

    function goTo(index) {
      current = ((index % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    function startAutoplay() { autoplay = setInterval(() => goTo(current + 1), 4500); }
    function resetAutoplay() { clearInterval(autoplay); startAutoplay(); }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); resetAutoplay(); }));

    // Swipe táctil
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const delta = touchX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 38) { goTo(delta > 0 ? current + 1 : current - 1); resetAutoplay(); }
    }, { passive: true });

    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', startAutoplay);

    goTo(0);
    startAutoplay();
  }


  /* ── Price counter animation ────────────────────────────── */
  function animateCounter(el, target, duration) {
    const start     = performance.now();
    const formatted = target.replace(/[^0-9]/g, '');
    const end       = parseInt(formatted, 10);
    const prefix    = target.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix    = target.match(/[^0-9]*$/)?.[0] ?? '';

    function frame(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(end * eased);
      el.textContent = prefix + current.toLocaleString('es-CO') + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counterEls = Array.from(document.querySelectorAll('[data-counter]'));
  if (counterEls.length) {
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el     = entry.target;
          const target = el.dataset.counter;
          animateCounter(el, target, 1200);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counterEls.forEach((el) => {
      if (!el.dataset.counter) el.dataset.counter = el.textContent.trim();
      counterIO.observe(el);
    });
  }

  /* ── Sticky CTA — aparece al salir del hero en mobile ──── */
  const stickyCta  = document.getElementById('stickyCta');
  const heroEl     = document.getElementById('inicio');
  if (stickyCta && heroEl) {
    const onScrollSticky = () => {
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const visible    = heroBottom < 0;
      stickyCta.classList.toggle('is-visible', visible);
      stickyCta.setAttribute('aria-hidden', String(!visible));
    };
    window.addEventListener('scroll', onScrollSticky, { passive: true });
    onScrollSticky();
  }

})();
