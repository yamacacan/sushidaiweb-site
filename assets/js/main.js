(function () {
  'use strict';

  // Mobil menü
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  }
  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Lightbox
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  document.querySelectorAll('.g-item').forEach(function (el) {
    el.addEventListener('click', function () {
      boxImg.src = el.dataset.full;
      boxImg.alt = el.dataset.alt || '';
      if (box.showModal) box.showModal(); else box.setAttribute('open', '');
    });
  });
  box.addEventListener('click', function () { box.close(); });

  // Menü: aktif kategori vurgusu (JS yoksa tüm kategoriler zaten görünür)
  var chips = document.querySelectorAll('.chips a');
  var cats = document.querySelectorAll('.menu-cat');
  if (chips.length && 'IntersectionObserver' in window) {
    var strip = document.querySelector('.chips');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('active', on);
          if (on) {
            a.setAttribute('aria-current', 'true');
            strip.scrollTo({ left: a.offsetLeft - strip.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' });
          } else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-150px 0px -65% 0px' });
    cats.forEach(function (c) { io.observe(c); });
  }

  document.getElementById('yil').textContent = new Date().getFullYear();
})();
