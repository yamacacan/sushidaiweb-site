/* SushiDai - arayüz: header, çekmece menü, hero slider, lightbox, menü çipleri */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Header ve yukarı çık butonu */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('active', y > 350);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  }

  /* Sağdan kayan çekmece menü */
  var toggle = document.querySelector('.menu-toggle');
  var drawer = document.getElementById('drawer');
  var backdrop = document.querySelector('.drawer-backdrop');
  var closeBtn = drawer ? drawer.querySelector('.drawer-close') : null;

  if (toggle && drawer && backdrop && closeBtn) {
    var setDrawer = function (open) {
      drawer.classList.toggle('open', open);
      backdrop.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
      drawer.setAttribute('aria-modal', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) closeBtn.focus();
    };
    var closeDrawer = function (returnFocus) {
      if (!drawer.classList.contains('open')) return;
      setDrawer(false);
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () { setDrawer(true); });
    closeBtn.addEventListener('click', function () { closeDrawer(true); });
    backdrop.addEventListener('click', function () { closeDrawer(true); });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeDrawer(false);
    });
    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('open')) return;
      if (e.key === 'Escape') { closeDrawer(true); return; }
      if (e.key !== 'Tab') return;
      var items = drawer.querySelectorAll('a[href], button');
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.matchMedia('(min-width: 992px)').addEventListener('change', function (e) {
      if (e.matches) closeDrawer(false);
    });
  }

  /* Hero slider (Swiper, fade) */
  if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    var reduced = reduceMotion.matches;
    new Swiper('.hero-swiper', {
      loop: true,
      speed: reduced ? 0 : 1200,
      autoplay: reduced ? false : { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      a11y: {
        prevSlideMessage: 'Önceki slayt',
        nextSlideMessage: 'Sonraki slayt',
        paginationBulletMessage: 'Slayt {{index}}'
      }
    });
  }

  /* Lightbox */
  var box = document.getElementById('lightbox');
  var boxImg = box ? box.querySelector('img') : null;
  if (box && boxImg) {
    document.querySelectorAll('.gallery-item').forEach(function (el) {
      el.addEventListener('click', function () {
        boxImg.src = el.dataset.full;
        boxImg.alt = el.dataset.alt || '';
        if (box.showModal) box.showModal(); else box.setAttribute('open', '');
      });
    });
    box.addEventListener('click', function () { box.close(); });
  }

  /* Menü: aktif kategori çipi (JS yoksa tüm kategoriler zaten görünür) */
  var chips = document.querySelectorAll('.chips a');
  var cats = document.querySelectorAll('.menu-cat');
  var strip = document.querySelector('.chips');
  if (chips.length && strip && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('active', on);
          if (on) {
            a.setAttribute('aria-current', 'true');
            strip.scrollTo({
              left: a.offsetLeft - strip.clientWidth / 2 + a.offsetWidth / 2,
              behavior: reduceMotion.matches ? 'auto' : 'smooth'
            });
          } else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-150px 0px -65% 0px' });
    cats.forEach(function (c) { io.observe(c); });
  }

  var yil = document.getElementById('yil');
  if (yil) yil.textContent = new Date().getFullYear();
})();
