# sushidaiweb-site

SushiDai Ereğli/Konya tanıtım sitesi.

## Yerel çalıştırma

Sayfalar uzantısız klasör adresleriyle çalışır (`menu/`, `hakkimizda/`, `iletisim/`). Dosyayı çift tıklayıp `file://` ile açarsanız klasör linkleri dizin listesi gösterir; bu yüzden yerel sunucu kullanın:

```
python -m http.server 8000
```

Ardından http://localhost:8000/ adresini açın. Tüm yollar görelidir, site bir alt yol altında da yayınlanabilir.
