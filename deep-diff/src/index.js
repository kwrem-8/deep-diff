'use strict'

function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function isArray(val) {
  return Array.isArray(val)
}

function walk(a, b, path, results) {
  if (isObject(a) && isObject(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])

    for (const key of keys) {
      const childPath = path ? `${path}.${key}` : key
      walk(a[key], b[key], childPath, results)
    }
    return results
  }

  if (isArray(a) && isArray(b)) {
    const len = Math.max(a.length, b.length)

    for (let i = 0; i < len; i++) {
      const childPath = `${path}[${i}]`
      walk(a[i], b[i], childPath, results)
    }
    return results
  }

  if (a === undefined) {
    results.push({ path, type: 'added', from: undefined, to: b })
    return results
  }

  if (b === undefined) {
    results.push({ path, type: 'removed', from: a, to: undefined })
    return results
  }

  if (a !== b) {
    results.push({ path, type: 'changed', from: a, to: b })
  }

  return results
}

function diff(a, b) {
  return walk(a, b, '', []).map(entry => ({
    ...entry,
    path: entry.path.replace(/^\./, ''),
  }))
}

function diffBy(a, b, types) {
  const allowed = Array.isArray(types) ? types : [types]
  return diff(a, b).filter(entry => allowed.includes(entry.type))
}

function isEqual(a, b) {
  return diff(a, b).length === 0
}

function diffGrouped(a, b) {
  const results = diff(a, b)
  return {
    added:   results.filter(e => e.type === 'added'),
    removed: results.filter(e => e.type === 'removed'),
    changed: results.filter(e => e.type === 'changed'),
  }
}

module.exports = { diff, diffBy, diffGrouped, isEqual }
