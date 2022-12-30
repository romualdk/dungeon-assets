export const octahedron = {
  v: [
    1, 0, 0,
    -1, 0, 0,
    0, 1, 0,
    0, -1, 0,
    0, 0, 1,
    0, 0, -1
  ],
  f: [
    0, 2, 4,
    0, 4, 3,
    0, 3, 5,
    0, 5, 2,
    1, 2, 5,
    1, 5, 3,
    1, 3, 4,
    1, 4, 2
  ]
}

let colors = [
  0, 0, 0,
  255, 0, 0,
  0, 255, 0,
  0, 0, 255,
  255, 255, 0,
  0, 255, 255,
  255, 0, 255,
  255, 255, 255
]

export function objToPos (geom) {
  let s = geom.f.length
  let pos = new Float32Array(s * 3)

  for (let i = 0; i < s; i++) {
    let vi = geom.f[i] * 3
    pos[i * 3] = geom.v[vi]
    pos[i * 3 + 1] = geom.v[vi + 1]
    pos[i * 3 + 2] = geom.v[vi + 2]
  }

  return pos
}

export function objToCol (geom) {
  let s = geom.f.length
  let col = new Uint8Array(s * 3)

  for (let i = 0; i < s; i++) {
    let ci = Math.floor(i / 3)
    col[i * 3] = colors[ci]
    col[i * 3 + 1] = colors[ci + 1]
    col[i * 3 + 2] = colors[ci + 2]
  }

  return col
}
