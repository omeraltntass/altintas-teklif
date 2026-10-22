# Altıntaş Teklif — güncellemeler

Bu depo yalnızca Altıntaş Teklif masaüstü programının güncelleme dosyalarını barındırır.
Teklifler, müşteri bilgileri ve diğer veriler burada değildir; onlar programın yanındaki `veri` klasöründe durur.

- `surum.json`: yayındaki son sürüm, sürüm notları ve dosyaların SHA-256 özetleri.
- Program her açılışta `surum.json` dosyasını okur. Daha yeni bir sürüm varsa kullanıcıya sorar,
  dosyaları indirir, özetleri doğrular, verilerin yedeğini alır ve güncellemeyi kurar.
- Güncelleme beğenilmezse programda: Güncelleme > Önceki sürüme dön.
