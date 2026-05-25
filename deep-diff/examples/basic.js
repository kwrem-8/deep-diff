'use strict'

const { diff, diffBy, diffGrouped, isEqual } = require('../src/index')

const before = {
  name: 'Kerem',
  age: 24,
  address: {
    city: 'Ankara',
    zip: '06000',
  },
  skills: ['JavaScript', 'Node.js'],
}

const after = {
  name: 'Kerem',
  age: 25,
  address: {
    city: 'Istanbul',
    zip: '34000',
  },
  skills: ['JavaScript', 'Node.js', 'React'],
  github: 'github.com/kerem',
}

console.log('─── diff() ───────────────────────────────')
console.log(diff(before, after))

console.log('\n─── diffBy(added) ────────────────────────')
console.log(diffBy(before, after, 'added'))

console.log('\n─── diffBy(changed) ──────────────────────')
console.log(diffBy(before, after, 'changed'))

console.log('\n─── diffGrouped() ────────────────────────')
console.log(diffGrouped(before, after))

console.log('\n─── isEqual() ────────────────────────────')
console.log('same object?',  isEqual(before, before))
console.log('diff objects?', isEqual(before, after))
