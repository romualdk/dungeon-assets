import { extrude } from './3d/extrude.js'
import { circle } from './3d/shapes.js'
import * as fs from 'fs'

function heart (details = 100) {
  var line = []
  for (let i = 0; i <= Math.PI * 2; i += Math.PI * 2 / details) {
    line.push(i)
  }

  var points = line.map(function (t) {
    var x = 16 * Math.pow(Math.sin(t), 3)
    var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    return [x / 13, y / 13, 0]
  })

  return points
}

function rect (width = 1, height = 1) {
  let w = width / 2
  let h = height / 2

  return [[-w, -h, 0], [w, -h, 0], [w, h, 0], [-w, h, 0]]
}

function circle2 (verts = 32, radius = 1) {
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
let obj = extrude(circle(), 0.5, -0.5)
console.log(obj)
let objfile = toObj(obj)

fs.writeFileSync('test2.obj', objfile)
