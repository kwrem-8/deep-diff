# deep-diff

> Compare two JavaScript objects and get back exactly what changed, where, and how.

![zero dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)
![node](https://img.shields.io/badge/node-%3E%3D14-lightgrey)

Most diffing tools give you a wall of output and make you figure out the rest. `deep-diff` gives you a flat list of plain objects — one entry per change, with a dot-notation path, a type, and the before/after values. That's it. No classes, no symbols, no surprises.

```
npm install @kerem/deep-diff
```

---

## Quick look

```js
const { diff } = require('@kerem/deep-diff')

const before = { name: 'Alice', age: 30, city: 'Ankara' }
const after  = { name: 'Alice', age: 31, city: 'Istanbul', github: 'alice' }

diff(before, after)

// [
//   { path: 'age',    type: 'changed', from: 30,        to: 31          },
//   { path: 'city',   type: 'changed', from: 'Ankara',  to: 'Istanbul'  },
//   { path: 'github', type: 'added',   from: undefined, to: 'alice'     },
// ]
```

Nested keys use dot-notation. Array indices use bracket-notation.

```js
diff(
  { user: { scores: [10, 20] } },
  { user: { scores: [10, 99] } }
)
// [{ path: 'user.scores[1]', type: 'changed', from: 20, to: 99 }]
```

---

## API

### `diff(a, b)`

Returns all differences as a flat array of `DiffEntry` objects.

```js
const { diff } = require('@kerem/deep-diff')

diff(a, b)
```

### `diffBy(a, b, types)`

Same as `diff()` but only returns entries of the given type(s).

```js
const { diffBy } = require('@kerem/deep-diff')

diffBy(a, b, 'added')
diffBy(a, b, ['added', 'changed'])
```

### `diffGrouped(a, b)`

Returns an object with three arrays — one per change type.

```js
const { diffGrouped } = require('@kerem/deep-diff')

const { added, removed, changed } = diffGrouped(a, b)
```

### `isEqual(a, b)`

Returns `true` if the two values are deeply identical.

```js
const { isEqual } = require('@kerem/deep-diff')

isEqual({ x: 1 }, { x: 1 })  // true
isEqual({ x: 1 }, { x: 2 })  // false
```

---

## DiffEntry

Every entry returned by `diff()` has this shape:

| field  | type                                  | notes                            |
| ------ | ------------------------------------- | -------------------------------- |
| `path` | `string`                              | dot/bracket path to the change   |
| `type` | `'added' \| 'removed' \| 'changed'`   | what kind of change it is        |
| `from` | `any`                                 | original value (`undefined` if added)   |
| `to`   | `any`                                 | updated value (`undefined` if removed)  |

---

## Install & run

```bash
# install
npm install @kerem/deep-diff

# run the example
npm run example

# run tests
npm test
```

---

## License

MIT © Kerem
