# WoW Loot Manager - Omega Manaforge 11.2

World of Warcraft mythic raid loot yönetimi için basit ve kullanışlı bir web uygulaması.

## Özellikler

- **8 Boss Loot Tablosu**: Her boss için ayrı loot listesi
- **BIS Spec Filtreleme**: Hangi item'ın hangi spec'lere BIS olduğunu görme
- **Dinamik Filtreleme**: Boss, spec ve item tipine göre filtreleme
- **İstatistikler**: Toplam item sayısı, silah/zırh/trinket dağılımı
- **JSON Tabanlı**: Loot verileri `loot-data.json` dosyasından yüklenir
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## Kullanım

1. `index.html` dosyasını web tarayıcısında açın
2. Boss seçimi yaparak belirli bir boss'un lootlarını görün
3. Spec filtresi ile belirli bir spec'in BIS itemlarını filtreleyin
4. Item tipi filtresi ile sadece silah, zırh veya trinketleri görün

## Dosya Yapısı

```
wow-loot-manager/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── script.js           # JavaScript fonksiyonları
├── loot-data.json      # Loot verileri (JSON)
└── README.md           # Bu dosya
```

## Loot Verilerini Düzenleme

`loot-data.json` dosyasını düzenleyerek loot verilerini güncelleyebilirsiniz:

```json
{
  "raidName": "Raid Adı",
  "bosses": {
    "boss1": {
      "name": "Boss Adı",
      "items": [
        {
          "name": "Item Adı",
          "level": 485,
          "type": "weapon|armor|trinket",
          "bisSpecs": ["warrior", "paladin", "death-knight"]
        }
      ]
    }
  }
}
```

### Desteklenen Spec'ler

- warrior
- paladin
- hunter
- rogue
- priest
- shaman
- mage
- warlock
- monk
- druid
- demon-hunter
- death-knight
- evoker
- all (tüm spec'ler için)

### Item Tipleri

- weapon (Silah)
- armor (Zırh)
- trinket (Trinket)

## Teknolojiler

- HTML5
- CSS3 (Modern tasarım, gradient'ler, animasyonlar)
- Vanilla JavaScript (ES6+)
- JSON veri formatı

## Kurulum

1. Dosyaları bilgisayarınıza indirin
2. `index.html` dosyasını web tarayıcısında açın
3. Uygulama otomatik olarak `loot-data.json` dosyasından verileri yükleyecektir

## Özelleştirme

- **Yeni Boss Ekleme**: `loot-data.json` dosyasına yeni boss ekleyin
- **Loot Güncelleme**: Mevcut boss'ların item listesini düzenleyin
- **Tasarım Değişiklikleri**: `styles.css` dosyasını düzenleyin
- **Fonksiyon Ekleme**: `script.js` dosyasına yeni özellikler ekleyin

## Notlar

- Uygulama tamamen client-side çalışır, sunucu gerektirmez
- Veriler tarayıcıda saklanmaz, her sayfa yenilemesinde JSON dosyasından yeniden yüklenir
- Modern web tarayıcıları gerektirir (ES6+ desteği) 