/* global c, requestAnimationFrame */

import { vertexShader, fragmentShader } from './shaders.js'
import { compileShader, createProgram } from './webgl.js'
import { objToPos, objToCol } from './obj.js'
import { degToRad } from './math.js'
import { perspective, yRotation, translate, lookAt, inverse, multiply, zRotation } from './mat4.js'

import { ships, objStrToArr, xMirror } from './ship.js'

let gl = c.getContext('webgl2')
let vs = compileShader(gl, vertexShader, gl.VERTEX_SHADER)
let fs = compileShader(gl, fragmentShader, gl.FRAGMENT_SHADER)
let prg = createProgram(gl, vs, fs)

let aPosition = gl.getAttribLocation(prg, 'a_position')
let aColor = gl.getAttribLocation(prg, 'a_color')
let uMatrix = gl.getUniformLocation(prg, 'u_matrix')

let vao = gl.createVertexArray()
gl.bindVertexArray(vao)
gl.enableVertexAttribArray(aPosition)

let obj = ships[3]

let geometry = objStrToArr(obj)

let positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
setGeometry(gl, geometry)
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0)

let colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
setColors(gl, geometry)
gl.enableVertexAttribArray(aColor)
gl.vertexAttribPointer(aColor, 3, gl.UNSIGNED_BYTE, true, 0, 0)

function getPositions (obj, scale = 1) {
  let obj2 = xMirror(obj)
  obj.v = obj.v.concat(obj2.v)
  obj.f = obj.f.concat(obj2.f)

  let positions = objToPos(obj)

  /*
  for (var ii = 0; ii < positions.length; ii += 3) {
    var vector = transformVector(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1])
    positions[ii + 0] = vector[0]
    positions[ii + 1] = vector[1]
    positions[ii + 2] = vector[2]
  }
  */

  for (var i in positions) {
    positions[i] *= scale
  }

  return positions
}

function setGeometry (gl, obj) {
  let positions = getPositions(obj, 3)

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
}

function setColors (gl, obj) {
  gl.bufferData(gl.ARRAY_BUFFER, objToCol(obj), gl.STATIC_DRAW)
}

var fieldOfViewRadians = degToRad(60)
var cameraAngleRadians = degToRad(30)

var rotationSpeed = 1.2
var then = 0
let anim = 1

let numFs = 10

let shipAngleRadians = []
let shipRotationSpeed = []

for (var i = 0; i < numFs; i++) {
  shipAngleRadians[i] = 0
  shipRotationSpeed[i] = (2 + Math.random() * 10) / 10
}

window.addEventListener('keypress', function () {
  anim = !anim
})

requestAnimationFrame(drawScene)

function drawScene (now) {
  now *= 0.001
  var deltaTime = now - then
  then = now

  if (anim) {
    cameraAngleRadians += rotationSpeed * deltaTime
  }

  var radius = 200

  resizeCanvasToDisplaySize()
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.useProgram(prg)
  gl.bindVertexArray(vao)

  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  var zNear = 1
  var zFar = 2000
  var projectionMatrix = perspective(fieldOfViewRadians, aspect, zNear, zFar)

  var fPosition = [radius, 0, 0]

  var cameraMatrix = yRotation(cameraAngleRadians)
  cameraMatrix = translate(cameraMatrix, 0, 50, radius * 1.5)

  var cameraPosition = [
    cameraMatrix[12],
    cameraMatrix[13],
    cameraMatrix[14]
  ]

  var up = [0, 1, 0]
  cameraMatrix = lookAt(cameraPosition, fPosition, up)
  var viewMatrix = inverse(cameraMatrix)
  var viewProjectionMatrix = multiply(projectionMatrix, viewMatrix)

  for (var ii = 0; ii < numFs; ++ii) {
    shipAngleRadians[ii] += shipRotationSpeed[ii] * deltaTime

    var shipMatrix = zRotation(shipAngleRadians[ii])

    var angle = ii * Math.PI * 2 / numFs

    var x = Math.cos(angle) * radius
    var z = Math.sin(angle) * radius

    var matrix = translate(viewProjectionMatrix, x, 0, z)
    matrix = multiply(matrix, shipMatrix)

    gl.uniformMatrix4fv(uMatrix, false, matrix)
    gl.drawArrays(gl.TRIANGLES, 0, geometry.f.length)
  }

  requestAnimationFrame(drawScene)
}

function resizeCanvasToDisplaySize () {
  var width = gl.canvas.clientWidth
  var height = gl.canvas.clientHeight
  if (gl.canvas.width !== width ||
    gl.canvas.height !== height) {
    gl.canvas.width = width
    gl.canvas.height = height
  }
}
