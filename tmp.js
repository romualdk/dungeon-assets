const fs = require('fs')

function Circle2 (vertices = 8, radius = 1) {
  let v = []

  for (let i = 0; i < vertices; i++) {
    let angle = i / vertices * Math.PI * 2

    v.push([
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ])
  }

  return v
}

console.log(Circle2())

function Circle (verts, r = 1, d = 1, fill = true) {
  let v = []
  let f = []

  for (let i = 0; i < verts; i++) {
    let angle = i / verts * Math.PI * 2
    v.push([
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      d
    ])
  }

  if (fill) {
    v.push([0, 0, d])

    for (let i = 0; i < verts; i++) {
      f.push([
        verts,
        i,
        (i + 1) % verts
      ])
    }
  }

  return {
    v: v,
    f: f
  }
}

function Cylinder (verts, r = 1, d = 1, fill = true) {
  let obj = Circle(verts, r, d, fill)
  obj.v = obj.v.concat(obj.v.map((e) => [e[0], e[1], -e[2]]))

  if (fill) {
    obj.f = obj.f.concat(obj.f.map((e) => [e[0] + verts + 1, e[1] + verts + 1, e[2] + verts + 1]))
  }

  let n = fill ? 1 : 0

  for (let i = 0; i < verts; i++) {
    obj.f.push([
      i,
      (i + 1) % verts,
      (i + 1) % verts + verts + n,
      i + verts + n
    ])
  }

  return obj
}

function toObj (geometry, precision = 2) {
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

function Coin () {
  return Cylinder(8, 0.2, 0.05)
}

// let objfile = toObj(Coin())
// let objfile = toObj(Circle(8))
let objfile = toObj(Cylinder(8, 1, 1, false))

// console.log(objfile)

fs.writeFileSync('coin-test.obj', objfile)
