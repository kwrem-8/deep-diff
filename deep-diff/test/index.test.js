'use strict'

const { diff, diffBy, diffGrouped, isEqual } = require('../src/index')

let passed = 0
let failed = 0

function assert(label, actual, expected) {
  const a = JSON.stringify(actual)
  const e = JSON.stringify(expected)

  if (a === e) {
    console.log(`  ✓ ${label}`)
    passed++
  } else {
    console.error(`  ✗ ${label}`)
    console.error(`    expected: ${e}`)
    console.error(`    received: ${a}`)
    failed++
  }
}

console.log('\ndiff()')

assert(
  'detects a changed primitive',
  diff({ a: 1 }, { a: 2 }),
  [{ path: 'a', type: 'changed', from: 1, to: 2 }]
)

assert(
  'detects an added key',
  diff({}, { city: 'Istanbul' }),
  [{ path: 'city', type: 'added', from: undefined, to: 'Istanbul' }]
)

assert(
  'detects a removed key',
  diff({ city: 'Istanbul' }, {}),
  [{ path: 'city', type: 'removed', from: 'Istanbul', to: undefined }]
)

assert(
  'returns empty array for identical objects',
  diff({ x: 1 }, { x: 1 }),
  []
)

assert(
  'handles nested paths',
  diff({ user: { age: 30 } }, { user: { age: 31 } }),
  [{ path: 'user.age', type: 'changed', from: 30, to: 31 }]
)

assert(
  'handles deeply nested paths',
  diff({ a: { b: { c: 'old' } } }, { a: { b: { c: 'new' } } }),
  [{ path: 'a.b.c', type: 'changed', from: 'old', to: 'new' }]
)

assert(
  'handles array element changes',
  diff({ tags: ['js', 'node'] }, { tags: ['js', 'ts'] }),
  [{ path: 'tags[1]', type: 'changed', from: 'node', to: 'ts' }]
)

assert(
  'handles array length increase',
  diff({ ids: [1, 2] }, { ids: [1, 2, 3] }),
  [{ path: 'ids[2]', type: 'added', from: undefined, to: 3 }]
)

assert(
  'detects type change (object → string)',
  diff({ val: { x: 1 } }, { val: 'hello' }),
  [{ path: 'val', type: 'changed', from: { x: 1 }, to: 'hello' }]
)

assert(
  'handles null values',
  diff({ a: null }, { a: null }),
  []
)

assert(
  'detects null → value',
  diff({ a: null }, { a: 42 }),
  [{ path: 'a', type: 'changed', from: null, to: 42 }]
)

console.log('\ndiffBy()')

const a = { name: 'Alice', age: 30 }
const b = { name: 'Alice', age: 31, city: 'London' }

assert(
  'filters by single type',
  diffBy(a, b, 'added'),
  [{ path: 'city', type: 'added', from: undefined, to: 'London' }]
)

assert(
  'filters by multiple types',
  diffBy(a, b, ['added', 'changed']),
  [
    { path: 'age',  type: 'changed', from: 30, to: 31 },
    { path: 'city', type: 'added',   from: undefined, to: 'London' },
  ]
)

console.log('\ndiffGrouped()')

const grouped = diffGrouped(
  { x: 1, y: 2, z: 3 },
  { x: 1, y: 99, w: 4 }
)

assert('groups added',   grouped.added,   [{ path: 'w', type: 'added',   from: undefined, to: 4 }])
assert('groups removed', grouped.removed, [{ path: 'z', type: 'removed', from: 3, to: undefined }])
assert('groups changed', grouped.changed, [{ path: 'y', type: 'changed', from: 2, to: 99 }])

console.log('\nisEqual()')

assert('returns true for identical flat objects',   isEqual({ a: 1 }, { a: 1 }), true)
assert('returns false for different flat objects',  isEqual({ a: 1 }, { a: 2 }), false)
assert('returns true for identical nested objects', isEqual({ a: { b: 1 } }, { a: { b: 1 } }), true)
assert('returns false when key is added',           isEqual({ a: 1 }, { a: 1, b: 2 }), false)

console.log(`\n${passed + failed} tests — ${passed} passed, ${failed} failed\n`)

if (failed > 0) process.exit(1)
