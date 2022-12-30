export const ships = [
  {
    v:
`1 2 0
7 1 0
2 1 7
0 5 0
0 2 0
0 0 1
0 3 2
0 1 13
0 3 6`,
    f:
`1 5 4
7 3 2
3 7 9
3 6 2
1 7 2
8 3 9
6 3 8
6 1 2
7 1 4
6 5 1`
  },
  {
    v:
`2 2 1
7 1 0
2 1 7
2 4 0
0 2 0
0 0 1
0 3 2
9 1 3
0 4 6
0 2 12
0 1 12
1 1 12`,
    f:
`7 3 8
3 7 9
3 6 8
8 2 1
11 12 10
6 3 11
6 1 2
5 7 4
6 5 1
1 5 4
7 1 4
7 8 1
9 10 12
8 6 2
9 12 3
12 11 3`
  },
  {
    v:
`3 2 0
2 1 7
0 3 0
0 0 1
0 4 6
9 1 3
0 0 10
3 3 9
10 2 11
4 3 17
0 3 8`,
    f:
`2 4 6
11 7 2
4 2 7
4 1 6
5 1 3
4 3 1
5 6 1
2 8 5
8 9 6
8 2 10
9 10 2
5 8 6
2 6 9
9 8 10
2 5 11`
  },
  {
    v:
`3 2 2
0 3 0
0 0 1
0 4 6
6 1 0
5 2 8
0 1 15
0 2 15
1 1 15`,
    f:
`9 5 6
6 8 9
9 3 5
3 1 5
4 1 2
3 2 1
8 7 9
9 7 3
4 6 1
4 8 6
6 5 1`
  }
]

function changeFaceVertexOrder (f) {
  let l = f.length / 3
  let out = []

  for (let i = 0; i < l; i++) {
    let ii = i * 3
    out[ii] = f[ii + 2]
    out[ii + 1] = f[ii + 1]
    out[ii + 2] = f[ii]
  }

  return out
}

export function xMirror (obj) {
  let out = {
    v: [...obj.v],
    f: [...obj.f]
  }

  let nv = out.v.length / 3
  for (let i = 0; i < nv; i++) {
    out.v[i * 3] *= -1
  }

  for (let i in out.f) {
    out.f[i] += nv
  }
  out.f = changeFaceVertexOrder(out.f)

  return out
}

export function objStrToArr (obj) {
  let res = {
    v: obj.v.split(/\s+/),
    f: obj.f.split(/\s+/)
  }

  for (let i in res.v) {
    res.v[i] *= 1
  }

  for (let i in res.f) {
    res.f[i] *= 1
    res.f[i] -= 1
  }

  return res
}
