# sushidaiweb-site

SushiDai Ereğli/Konya tanıtım sitesi.

## Yerel çalıştırma

Kökteki `serve.bat` dosyasına çift tıklayın: `python -m http.server 8000` (Python yoksa `py`) başlatılır ve http://localhost:8000 tarayıcıda açılır. Pencereyi kapatınca sunucu durur.

Alternatif olarak sayfalar `index.html` çift tıklanarak `file://` ile de açılabilir; `assets/js/main.js` içindeki küçük blok yalnızca `file://` altında klasör linklerine `index.html` ekler. Canlıda temiz adresler (`menu/`, `hakkimizda/`, `iletisim/`) aynen kalır. Tüm yollar görelidir, site bir alt yol altında da yayınlanabilir.
