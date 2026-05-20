/**
 * components.js — Global navbar & footer
 * Single source of truth: inject, set active link, wire behavior.
 */

(function () {
  'use strict';

  /* ── Templates ─────────────────────────────────────────── */

  const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <div class="navbar__inner">
    <a href="/HTML/home.html" class="navbar__logo">Mentes de <span>Acero</span></a>
    <button class="navbar__hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="navbar__nav" id="navMenu">
      <li><a href="/HTML/home.html">Inicio</a></li>
      <li><a href="/HTML/libro.html">Libro — Mentes de Acero</a></li>
      <li class="navbar__dropdown">
        <a href="/HTML/cursos.html">Cursos ▾</a>
        <div class="navbar__dropdown-menu">
          <a href="/HTML/cursos.html">Mentalidad de Acero</a>
          <a href="/HTML/cursos.html">Proyecto de Vida</a>
        </div>
      </li>
      <li><a href="/HTML/conferencias.html">Conferencias</a></li>
      <li><a href="/HTML/contacto.html">Contacto</a></li>
    </ul>
    <div class="navbar__cta">
      <a href="/HTML/libro.html" class="btn btn--primary btn--sm">Quiero el Libro</a>
    </div>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer class="site-footer">
  <div class="site-footer__inner">
    <div class="site-footer__logo">Mentes de <span>Acero</span></div>
    <p class="site-footer__tagline">Entrenamiento mental real — Forjando guerreros desde 2024</p>
    <div class="site-footer__social">
      <a href="https://www.instagram.com/jhonmoreno_historiasdehonor/" target="_blank" rel="noopener" aria-label="Instagram" class="site-footer__social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        <span>Instagram</span>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61569443999341" target="_blank" rel="noopener" aria-label="Facebook" class="site-footer__social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        <span>Facebook</span>
      </a>
      <a href="https://www.tiktok.com/@jhonmoreno_mentesdeacero" target="_blank" rel="noopener" aria-label="TikTok" class="site-footer__social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
        <span>TikTok</span>
      </a>
      <a href="https://www.youtube.com/channel/UCnsuKOSrz4xl4VxHJsskA2A" target="_blank" rel="noopener" aria-label="YouTube" class="site-footer__social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#020510"/></svg>
        <span>YouTube</span>
      </a>
      <a href="https://www.youtube.com/watch?v=_4_fn7mREr8&list=PLjToxQZFfM2UfllhL2f69yEFeBLbm4ejM" target="_blank" rel="noopener" aria-label="Podcast" class="site-footer__social-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        <span>Podcast</span>
      </a>
    </div>
    <div class="site-footer__legal">
      <a href="/HTML/privacidad.html">Política de Privacidad</a>
      <span class="site-footer__legal-sep">·</span>
      <a href="/HTML/terminos.html">Términos y Condiciones</a>
      <span class="site-footer__legal-sep">·</span>
      <a href="/HTML/contacto.html">Contacto</a>
    </div>
    <p class="site-footer__copy">COPYRIGHT &copy; 2026 MENTES DE ACERO | ALL RIGHTS RESERVED</p>
  </div>
</footer>`;

  /* ── Inject ─────────────────────────────────────────────── */

  const navPlaceholder    = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder)    navPlaceholder.outerHTML    = NAVBAR_HTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

  /* ── Active link (by pathname) ──────────────────────────── */

  const path = window.location.pathname;
  document.querySelectorAll('.navbar__nav a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    link.classList.toggle('is-active', path === href);
  });

  /* ── Navbar scroll state ────────────────────────────────── */

  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger ──────────────────────────────────────────── */

  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (hamburger && navMenu && navbar) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();
