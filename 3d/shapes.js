const PI2 = Math.PI * 2

function range (start, end, step) {
  let r = []
  for (let i = start; i <= end; i += step) {
    r.push(i)
  }

  return r
}

export function circle (vertices = 32, radius = 1) {
  let line = range(0, PI2, PI2 / vertices)
  return line.map(angle => [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0])
}
