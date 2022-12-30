// https://github.com/freeman-lab/extrude
import { triangulate } from './triangulate.js'
import { translate } from './translate.js'

export function extrude (points, top = 1, bottom = 0, closed = true) {
  let v = translate(points, 0, 0, top).concat(translate(points, 0, 0, bottom))

  let f = []
  let t = []
  let b = []
  let n = points.length

  for (let i = 0; i < n; i++) {
    f.push([i, (i + 1) % n, n + (i + 1) % n, n + i])

    if (closed) {
      t.push(i)
      b.push(i + n)
    }
  }

  f.push(t)
  f.push(b)

  return {
    v: v,
    f: triangulate(f)
  }
}
