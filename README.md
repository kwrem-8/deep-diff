# deep-diff

> İki JavaScript nesnesini karşılaştır — neyin değiştiğini, nerede değiştiğini ve nasıl değiştiğini öğren.

![sıfır bağımlılık](https://img.shields.io/badge/bağımlılık-sıfır-brightgreen)
![lisans](https://img.shields.io/badge/lisans-MIT-blue)
![node](https://img.shields.io/badge/node-%3E%3D14-lightgrey)

Çoğu diff aracı seni yığınla çıktıyla baş başa bırakır. `deep-diff` sana düz bir liste döndürür — her değişiklik için bir nesne, dot-notation ile yol, bir tip ve önceki/sonraki değerler. Hepsi bu. Sınıf yok, sembol yok, sürpriz yok.

```
npm install @kerem/deep-diff
```

---

## Hızlı bakış

```js
const { diff } = require('@kerem/deep-diff')

const önce  = { isim: 'Alice', yaş: 30, şehir: 'Ankara' }
const sonra = { isim: 'Alice', yaş: 31, şehir: 'İstanbul', github: 'alice' }

diff(önce, sonra)

// [
//   { path: 'yaş',    type: 'changed', from: 30,        to: 31           },
//   { path: 'şehir',  type: 'changed', from: 'Ankara',  to: 'İstanbul'   },
//   { path: 'github', type: 'added',   from: undefined, to: 'alice'      },
// ]
```

İç içe anahtarlar dot-notation, dizi indeksleri bracket-notation kullanır.

```js
diff(
  { kullanıcı: { puanlar: [10, 20] } },
  { kullanıcı: { puanlar: [10, 99] } }
)
// [{ path: 'kullanıcı.puanlar[1]', type: 'changed', from: 20, to: 99 }]
```

---

## API

### `diff(a, b)`

Tüm farklılıkları `DiffEntry` nesnelerinden oluşan düz bir dizi olarak döndürür.

```js
const { diff } = require('@kerem/deep-diff')

diff(a, b)
```

### `diffBy(a, b, tipler)`

`diff()` ile aynı ama yalnızca belirtilen tipteki girişleri döndürür.

```js
const { diffBy } = require('@kerem/deep-diff')

diffBy(a, b, 'added')
diffBy(a, b, ['added', 'changed'])
```

### `diffGrouped(a, b)`

Her değişiklik tipi için ayrı bir dizi içeren bir nesne döndürür.

```js
const { diffGrouped } = require('@kerem/deep-diff')

const { added, removed, changed } = diffGrouped(a, b)
```

### `isEqual(a, b)`

İki değer derin olarak aynıysa `true` döndürür.

```js
const { isEqual } = require('@kerem/deep-diff')

isEqual({ x: 1 }, { x: 1 })  // true
isEqual({ x: 1 }, { x: 2 })  // false
```

---

## DiffEntry

`diff()` tarafından döndürülen her girişin yapısı şu şekildedir:

| alan   | tip                                   | açıklama                                      |
| ------ | ------------------------------------- | --------------------------------------------- |
| `path` | `string`                              | değişikliğe giden dot/bracket yolu            |
| `type` | `'added' \| 'removed' \| 'changed'`   | değişikliğin türü                             |
| `from` | `any`                                 | orijinal değer (eklendiyse `undefined`)       |
| `to`   | `any`                                 | güncel değer (silindiyse `undefined`)         |

---

## Kurulum ve çalıştırma

```bash
# kur
npm install github:kwrem-8/deep-diff

# örneği çalıştır
npm run example

# testleri çalıştır
npm test
```

---

## Lisans

MIT © Kerem
