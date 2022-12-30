export function compileShader (gl, src, type) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  /*
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!success) {
    throw ('could not compile shader:' + gl.getShaderInfoLog(shader))
  }
  */
  return shader
}

export function createProgram (gl, vs, fs) {
  var program = gl.createProgram()

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)

  gl.linkProgram(program)
  /*
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
      // something went wrong with the link; get the error
      throw ("program failed to link:" + gl.getProgramInfoLog(program));
  }
  */
  return program
}

/**
 * @param {*} c canvas
 * @param {*} m multiplier
 */
export function resizeCanvasToDisplaySize (c, m = 1) {
  const w = c.clientWidth * m | 0
  const h = c.clientHeight * m | 0
  if (c.width !== w || c.height !== h) {
    c.width = w
    c.height = h
    return true
  }
  return false
}
