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

  document.getElementById('yil').textContent = new Date().getFullYear();
})();
