let cos = Math.cos
let sin = Math.sin

/**
 * Zero matrix
 * [
 * 0, 0, 0, 0
 * 0, 0, 0, 0
 * 0, 0, 0, 0
 * 0, 0, 0, 0
 * ]
 */
export let zero = () => Array(16).fill(0)

/**
 * Identity matrix
 * [
 * 1, 0, 0, 0
 * 0, 1, 0, 0
 * 0, 0, 1, 0
 * 0, 0, 0, 1
 * ]
 */
export let identity = () => zero().map((v, i) => i % 5 === 0 ? 1 : v)

/**
 * Translation matrix
 * [
 * 1, 0, 0, 0
 * 0, 1, 0, 0
 * 0, 0, 1, 0
 * x, y, z, 1
 * ]
 */
export let translation = (x, y, z) => {
  let m = identity()
  m[12] = x
  m[13] = y
  m[14] = z

  return m
}

/**
 * Scaling matrix
 * [
 * x, 0, 0, 0
 * 0, y, 0, 0
 * 0, 0, z, 0
 * 0, 0, 0, 1
 * ]
 */
export let scaling = (x, y, z) => {
  let m = identity()
  m[0] = x
  m[5] = y
  m[10] = z

  return m
}

/**
 * X Rotation matrix
 * [
 * 1,  0  , 0  , 0
 * 0,  cos, sin, 0
 * 0, -sin, cos, 0
 * 0,  0  , 0  , 1
 * ]
 * @param a angle in radians
 */
export let xRotation = (a) => {
  let m = identity()
  let c = cos(a)
  let s = sin(a)
  m[5] = c
  m[6] = s
  m[9] = -s
  m[10] = c

  return m
}

/**
 * Y Rotation matrix
 * [
 * cos, 0, -sin, 0
 * 0  , 1, 0   , 0
 * sin, 0,  cos, 0
 * 0  , 0, 0   , 1
 * ]
 * @param a angle in radians
 */
export let yRotation = (a) => {
  let m = identity()
  let c = cos(a)
  let s = sin(a)
  m[0] = c
  m[2] = -s
  m[8] = s
  m[10] = c

  return m
}

/**
 * Z Rotation matrix
 * [
 *  cos, sin, 0, 0
 * -sin, cos, 0, 0
 * 0   , 0  , 1, 0
 * 0   , 0  , 0, 1
 * ]
 * @param a angle in radians
 */
export let zRotation = (a) => {
  let m = identity()
  let c = cos(a)
  let s = sin(a)
  m[0] = c
  m[1] = s
  m[4] = -s
  m[5] = c

  return m
}

/**
 * Multiply matrix
 * a = [
 *  5, 2, 6, 1,
 *  0, 6, 2, 0,
 *  3, 8, 1, 4,
 *  1, 8, 5, 6
 * ]
 * b = [
 *  7, 5, 8, 0,
 *  1, 8, 2, 6,
 *  9, 4, 3, 8,
 *  5, 3, 7, 9
 * ]
 * a * b =
 * [
 *  96,  68, 69,  69,
 *  24,  56, 18,  52,
 *  58,  95, 71,  92,
 *  90, 107, 81, 142
 * ]
 */
export let multiply = (a, b) => {
  let o = zero()
  for (let k = 0; k <= 12; k += 4) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0, bc = 0; j < 4; j++, bc += 4) {
        o[k + i] += a[k + j % 4] * b[bc + i % 4]
      }
    }
  }

  return o
}

export let translate = (m, x, y, z) => multiply(m, translation(x, y, z))
export let scale = (m, x, y, z) => multiply(m, scaling(x, y, z))
export let xRotate = (m, a) => multiply(m, xRotation(a))
export let yRotate = (m, a) => multiply(m, yRotation(a))
export let zRotate = (m, a) => multiply(m, zRotation(a))

export let inverse = (m) => {
  let n = [
    [0, 5, 1, 4],
    [0, 6, 2, 4],
    [0, 7, 3, 4],
    [1, 6, 2, 5],
    [1, 7, 3, 5],
    [2, 7, 3, 6]
  ]

  let b = []

  for (let i = 0; i < 12; i++) {
    let x = i < 6 ? 0 : 8
    let j = i % 6
    b[i] = m[x + n[j][0]] * m[x + n[j][1]] - m[x + n[j][2]] * m[x + n[j][3]]
  }

  let det = [1, -1, 1, 1, -1, 1]
    .map((v, i) => v * b[i] * b[11 - i])
    .reduce((a, b) => a + b, 0)

  if (!det) {
    return null
  }

  let t = [
    [5, 11, 6, 10, 1, 7, 9],
    [2, 10, 1, 11, -1, 3, 9],
    [13, 5, 14, 4, 1, 15, 3],
    [10, 4, 9, 5, -1, 11, 3],
    [6, 8, 4, 11, -1, 7, 7],
    [0, 11, 2, 8, 1, 3, 7],
    [14, 2, 12, 5, -1, 15, 1],
    [8, 5, 10, 2, -1, 11, 1],
    [4, 10, 5, 8, 1, 7, 6],
    [1, 8, 0, 10, -1, 3, 6],
    [12, 4, 13, 2, 1, 15, 0],
    [9, 2, 8, 4, -1, 11, 0],
    [5, 7, 4, 9, -1, 6, 6],
    [0, 9, 1, 7, 1, 2, 6],
    [13, 1, 12, 3, -1, 14, 0],
    [8, 3, 9, 1, 1, 10, 0]
  ]

  if (!det) {
    return null
  }

  let o = []

  for (let i in t) {
    let w = t[i]
    o[i] = (m[w[0]] * b[w[1]] - m[w[2]] * b[w[3]] + w[4] * m[w[5]] * b[w[6]]) / det
  }

  return o
}

export let str = (m) => {
  return `[
${m[0]}, ${m[1]}, ${m[2]}, ${m[3]},
${m[4]}, ${m[5]}, ${m[6]}, ${m[7]},
${m[8]}, ${m[9]}, ${m[10]}, ${m[11]},
${m[12]}, ${m[13]}, ${m[14]}, ${m[15]}
]`
}
