/* SushiDai - kaydırma animasyonları (GSAP + ScrollTrigger + SplitText) */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);

  var mm = gsap.matchMedia();

  /* Hareket tercihi serbestse: başlık, ayraç, bilgi şeridi, kart girişleri */
  mm.add('(prefers-reduced-motion: no-preference)', function () {

    // Başlık harfleri (yalnız h1/h2), ekranın %85'inde bir kez
    if (typeof SplitText !== 'undefined') {
      gsap.utils.toArray('h1.hero-title, h2.hero-title').forEach(function (title) {
        var played = false;
        SplitText.create(title, {
          type: 'words,chars',
          wordsClass: 'hero-word',
          charsClass: 'hero-char',
          autoSplit: true,
          onSplit: function (self) {
            if (played) return;
            return gsap.from(self.chars, {
              opacity: 0,
              scale: function () { return gsap.utils.random(0.7, 1.3); },
              transformOrigin: 'center center',
              duration: 0.8,
              ease: 'back.out(1.2)',
              stagger: 0.04,
              scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                once: true,
                onEnter: function () { played = true; }
              }
            });
          }
        });
      });
    }

    // İnce ayraç: ortadan iki yana açılır
    gsap.utils.toArray('.divider').forEach(function (divider) {
      gsap.fromTo(divider,
        { scaleX: 0, transformOrigin: 'center center' },
        {
          scaleX: 1, duration: 1.4, ease: 'power4.out',
          scrollTrigger: { trigger: divider, start: 'top 88%', once: true }
        });
    });

    // Hero altındaki bilgi şeridi kaydırınca solar
    var strip = document.querySelector('.info-strip');
    if (strip) {
      gsap.to(strip, {
        opacity: 0, y: 30,
        scrollTrigger: { trigger: document.body, start: 'top -50px', end: '200px top', scrub: 1 }
      });
    }

    // Kartlar girişte aşağıdan belirir
    gsap.utils.toArray('.menu-card, .offer-card').forEach(function (card) {
      gsap.from(card, {
        opacity: 0, y: 35, duration: 0.7, ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    });
  });

  /* "Neden biz": bölüm sabitlenir, kartlar sırayla gelir (yalnız geniş ekran + hareket serbest) */
  mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', function () {
    var section = document.querySelector('.why-us');
    var cards = gsap.utils.toArray('.why-us .service-card');
    if (!section || !cards.length) return;

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.96 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=' + (cards.length * 450),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    cards.forEach(function (card) {
      tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' });
      tl.to({}, { duration: 0.6 });
    });
  });

  /* Yükleme sonrası ve 500ms sonra yeniden hesapla */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  setTimeout(function () { ScrollTrigger.refresh(); }, 500);
})();
