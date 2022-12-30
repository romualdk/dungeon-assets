import * as fs from 'fs'

function rotate (x, y, angle, cx = 0, cy = 0) {
  let rad = (Math.PI / 180) * angle
  let cos = Math.cos(rad)
  let sin = Math.sin(rad)
  let nx = (cos * (x - cx)) + (sin * (y - cy)) + cx
  let ny = (cos * (y - cy)) - (sin * (x - cx)) + cy
  return [nx, ny]
}

function scale (verts, x, y, z) {
  return verts.map((v) => [v[0] * x, v[1] * y, v[2] * z])
}

function translate (verts, x, y, z) {
  return verts.map((v) => [v[0] + x, v[1] + y, v[2] + z])
}

function Circle (verts = 4, radius = 1) {
  let v = []

  for (let i = 0; i < verts; i++) {
    let angle = i / verts * Math.PI * 2

    v.push([
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ])
  }

  return v
}

function Rect (width, height) {
  let w = width / 2
  let h = height / 2

  return [[-w, -h, 0], [w, -h, 0], [w, h, 0], [-w, h, 0]]
}

function segment (layer, qty) {
  let f = []

  for (let i = 0; i < qty; i++) {
    f.push([
      i + (layer * qty),
      (i + 1) % qty + (layer * qty),
      (i + 1) % qty + qty + (layer * qty),
      i + qty + (layer * qty)
    ])
  }

  return f
}

function closureCube (layer) {
  let n = 4 * layer
  return [n, n + 1, n + 2, n + 3]
}

function closurePyramid (layer, qty, pt) {
  let f = []
  let n = layer * qty

  for (let i = 0; i < qty; i++) {
    f.push([
      n + (i + 1) % qty,
      n + i,
      pt
    ])
  }

  return f
}

function Cube (x = 1, y = 1, z = 1) {
  let r = translate(Rect(x, y), 0, 0, -z / 2)

  return {
    v: r.concat(translate(r, 0, 0, z)),
    f: segment(0, 4).concat([closureCube(0).reverse(), closureCube(1)])
  }
}

function Hedron (verts = 4, radius = 1, h1 = 1, h2 = 1) {
  let v = Circle(verts, radius)
  v.push([0, 0, -h1])
  v.push([0, 0, h2])

  let f = []
  f = f.concat(closurePyramid(0, verts, verts))
  f = f.concat(cw(closurePyramid(0, verts, verts + 1)))

  return {
    v: v,
    f: f
  }
}

function Pyramid (verts = 4, width = 1, height = 1) {
  return Hedron(verts, width / 2, height, 0)
}

function cw(v) {
  return v.map((p) => [p[0], p[2], p[1]])
}

function Cone (verts = 8, radius = 1, height = 1) {
  let c = Circle(verts, radius)
  let v = c.concat(translate(c, 0, 0, height))
  v.push([0, 0, 0])
  v.push([0, 0, height])

  let f = segment(0, verts)
  f = f.concat(closurePyramid(0, verts, verts * 2))
  f = f.concat(cw(closurePyramid(1, verts, (verts * 2) + 1)))

  return {
    v: v,
    f: f
  }
}

function toObj (geometry) {
  let lines = []

  geometry.v.forEach((v) => {
    lines.push('v ' + v.join(' '))
  })

  geometry.f.forEach((f) => {
    f = f.map((i) => i + 1)
    lines.push('f ' + f.join(' '))
  })

  return lines.join('\n')
}

// let obj = Hedron(4, 1, 1, -0.5)
let obj = Hedron()
let objfile = toObj(obj)

fs.writeFileSync('test.obj', objfile)
