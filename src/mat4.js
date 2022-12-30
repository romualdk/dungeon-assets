
export function perspective (fov, aspect, near, far) {
  var f = Math.tan(Math.PI * 0.5 - 0.5 * fov)
  var inv = 1.0 / (near - far) // range inverted

  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * inv, -1,
    0, 0, near * far * inv * 2, 0
  ]
}

export function projection (width, height, depth) {
  // Note: This matrix flips the Y axis so 0 is at the top.
  return [
    2 / width, 0, 0, 0,
    0, -2 / height, 0, 0,
    0, 0, 2 / depth, 0,
    -1, 1, 0, 1
  ]
}

export function multiply (a, b) {
  var a00 = a[0 * 4 + 0]
  var a01 = a[0 * 4 + 1]
  var a02 = a[0 * 4 + 2]
  var a03 = a[0 * 4 + 3]
  var a10 = a[1 * 4 + 0]
  var a11 = a[1 * 4 + 1]
  var a12 = a[1 * 4 + 2]
  var a13 = a[1 * 4 + 3]
  var a20 = a[2 * 4 + 0]
  var a21 = a[2 * 4 + 1]
  var a22 = a[2 * 4 + 2]
  var a23 = a[2 * 4 + 3]
  var a30 = a[3 * 4 + 0]
  var a31 = a[3 * 4 + 1]
  var a32 = a[3 * 4 + 2]
  var a33 = a[3 * 4 + 3]
  var b00 = b[0 * 4 + 0]
  var b01 = b[0 * 4 + 1]
  var b02 = b[0 * 4 + 2]
  var b03 = b[0 * 4 + 3]
  var b10 = b[1 * 4 + 0]
  var b11 = b[1 * 4 + 1]
  var b12 = b[1 * 4 + 2]
  var b13 = b[1 * 4 + 3]
  var b20 = b[2 * 4 + 0]
  var b21 = b[2 * 4 + 1]
  var b22 = b[2 * 4 + 2]
  var b23 = b[2 * 4 + 3]
  var b30 = b[3 * 4 + 0]
  var b31 = b[3 * 4 + 1]
  var b32 = b[3 * 4 + 2]
  var b33 = b[3 * 4 + 3]

  return [
    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
  ]
}

export function translation (x, y, z) {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]
}

// angle in radians
export function xRotation (angle) {
  var c = Math.cos(angle)
  var s = Math.sin(angle)

  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ]
}

// angle in radians
export function yRotation (angle) {
  var c = Math.cos(angle)
  var s = Math.sin(angle)

  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ]
}

// angle in radians
export function zRotation (angle) {
  var c = Math.cos(angle)
  var s = Math.sin(angle)

  return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
}

export function scaling (x, y, z) {
  return [
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  ]
}

export function translate (m, x, y, z) {
  return multiply(m, translation(x, y, z))
}

export function xRotate (m, angle) {
  return multiply(m, xRotation(angle))
}

export function yRotate (m, angle) {
  return multiply(m, yRotation(angle))
}

export function zRotate (m, angle) {
  return multiply(m, zRotation(angle))
}

export function scale (m, x, y, z) {
  return multiply(m, scaling(x, y, z))
}

export function inverse (m) {
  var m00 = m[0 * 4 + 0]
  var m01 = m[0 * 4 + 1]
  var m02 = m[0 * 4 + 2]
  var m03 = m[0 * 4 + 3]
  var m10 = m[1 * 4 + 0]
  var m11 = m[1 * 4 + 1]
  var m12 = m[1 * 4 + 2]
  var m13 = m[1 * 4 + 3]
  var m20 = m[2 * 4 + 0]
  var m21 = m[2 * 4 + 1]
  var m22 = m[2 * 4 + 2]
  var m23 = m[2 * 4 + 3]
  var m30 = m[3 * 4 + 0]
  var m31 = m[3 * 4 + 1]
  var m32 = m[3 * 4 + 2]
  var m33 = m[3 * 4 + 3]
  var tmp0 = m22 * m33
  var tmp1 = m32 * m23
  var tmp2 = m12 * m33
  var tmp3 = m32 * m13
  var tmp4 = m12 * m23
  var tmp5 = m22 * m13
  var tmp6 = m02 * m33
  var tmp7 = m32 * m03
  var tmp8 = m02 * m23
  var tmp9 = m22 * m03
  var tmp10 = m02 * m13
  var tmp11 = m12 * m03
  var tmp12 = m20 * m31
  var tmp13 = m30 * m21
  var tmp14 = m10 * m31
  var tmp15 = m30 * m11
  var tmp16 = m10 * m21
  var tmp17 = m20 * m11
  var tmp18 = m00 * m31
  var tmp19 = m30 * m01
  var tmp20 = m00 * m21
  var tmp21 = m20 * m01
  var tmp22 = m00 * m11
  var tmp23 = m10 * m01

  var t0 = (tmp0 * m11 + tmp3 * m21 + tmp4 * m31) -
            (tmp1 * m11 + tmp2 * m21 + tmp5 * m31)
  var t1 = (tmp1 * m01 + tmp6 * m21 + tmp9 * m31) -
            (tmp0 * m01 + tmp7 * m21 + tmp8 * m31)
  var t2 = (tmp2 * m01 + tmp7 * m11 + tmp10 * m31) -
            (tmp3 * m01 + tmp6 * m11 + tmp11 * m31)
  var t3 = (tmp5 * m01 + tmp8 * m11 + tmp11 * m21) -
            (tmp4 * m01 + tmp9 * m11 + tmp10 * m21)

  var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3)

  return [
    d * t0,
    d * t1,
    d * t2,
    d * t3,
    d * ((tmp1 * m10 + tmp2 * m20 + tmp5 * m30) -
          (tmp0 * m10 + tmp3 * m20 + tmp4 * m30)),
    d * ((tmp0 * m00 + tmp7 * m20 + tmp8 * m30) -
          (tmp1 * m00 + tmp6 * m20 + tmp9 * m30)),
    d * ((tmp3 * m00 + tmp6 * m10 + tmp11 * m30) -
          (tmp2 * m00 + tmp7 * m10 + tmp10 * m30)),
    d * ((tmp4 * m00 + tmp9 * m10 + tmp10 * m20) -
          (tmp5 * m00 + tmp8 * m10 + tmp11 * m20)),
    d * ((tmp12 * m13 + tmp15 * m23 + tmp16 * m33) -
          (tmp13 * m13 + tmp14 * m23 + tmp17 * m33)),
    d * ((tmp13 * m03 + tmp18 * m23 + tmp21 * m33) -
          (tmp12 * m03 + tmp19 * m23 + tmp20 * m33)),
    d * ((tmp14 * m03 + tmp19 * m13 + tmp22 * m33) -
          (tmp15 * m03 + tmp18 * m13 + tmp23 * m33)),
    d * ((tmp17 * m03 + tmp20 * m13 + tmp23 * m23) -
          (tmp16 * m03 + tmp21 * m13 + tmp22 * m23)),
    d * ((tmp14 * m22 + tmp17 * m32 + tmp13 * m12) -
          (tmp16 * m32 + tmp12 * m12 + tmp15 * m22)),
    d * ((tmp20 * m32 + tmp12 * m02 + tmp19 * m22) -
          (tmp18 * m22 + tmp21 * m32 + tmp13 * m02)),
    d * ((tmp18 * m12 + tmp23 * m32 + tmp15 * m02) -
          (tmp22 * m32 + tmp14 * m02 + tmp19 * m12)),
    d * ((tmp22 * m22 + tmp16 * m02 + tmp21 * m12) -
          (tmp20 * m12 + tmp23 * m22 + tmp17 * m02))
  ]
}

export let inverseOld = (a) => {
  let a00 = a[0]
  let a01 = a[1]
  let a02 = a[2]
  let a03 = a[3]
  let a10 = a[4]
  let a11 = a[5]
  let a12 = a[6]
  let a13 = a[7]
  let a20 = a[8]
  let a21 = a[9]
  let a22 = a[10]
  let a23 = a[11]
  let a30 = a[12]
  let a31 = a[13]
  let a32 = a[14]
  let a33 = a[15]

  let b00 = a00 * a11 - a01 * a10
  let b01 = a00 * a12 - a02 * a10
  let b02 = a00 * a13 - a03 * a10
  let b03 = a01 * a12 - a02 * a11
  let b04 = a01 * a13 - a03 * a11
  let b05 = a02 * a13 - a03 * a12

  let b06 = a20 * a31 - a21 * a30
  let b07 = a20 * a32 - a22 * a30
  let b08 = a20 * a33 - a23 * a30
  let b09 = a21 * a32 - a22 * a31
  let b10 = a21 * a33 - a23 * a31
  let b11 = a22 * a33 - a23 * a32

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

  if (!det) {
    return null
  }

  det = 1.0 / det

  let o = []

  o[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det
  o[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det
  o[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det
  o[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det
  o[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det
  o[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det
  o[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det
  o[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det
  o[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det
  o[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det
  o[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det
  o[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det
  o[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det
  o[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det
  o[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det
  o[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det

  return o
}

export function cross (a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ]
}

export function subtractVectors (a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

export function normalize (v) {
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
  // make sure we don't divide by 0.
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length]
  } else {
    return [0, 0, 0]
  }
}

export function lookAt (pos, target, up) {
  var zAxis = normalize(subtractVectors(pos, target))
  var xAxis = normalize(cross(up, zAxis))
  var yAxis = normalize(cross(zAxis, xAxis))

  return [
    xAxis[0], xAxis[1], xAxis[2], 0,
    yAxis[0], yAxis[1], yAxis[2], 0,
    zAxis[0], zAxis[1], zAxis[2], 0,
    pos[0],
    pos[1],
    pos[2],
    1
  ]
}

export function transformVector (m, v) {
  var dst = []
  for (var i = 0; i < 4; ++i) {
    dst[i] = 0.0
    for (var j = 0; j < 4; ++j) {
      dst[i] += v[j] * m[j * 4 + i]
    }
  }
  return dst
}
