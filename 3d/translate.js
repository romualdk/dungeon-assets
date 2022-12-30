export function translate (points, x, y, z) {
  return points.map((v) => [v[0] + x, v[1] + y, v[2] + z])
}
