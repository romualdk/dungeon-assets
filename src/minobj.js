const fs = require('fs')

let argv = process.argv.slice(2)
let filepath = argv[0]

function round (number, precision) {
  let str = parseFloat(number).toFixed(precision).toString()
  str = str.replace('.00', '')
  str = str.replace('0.', '.')
  return str
}

function minobj (objdata, precision = 2) {
  let obj = {
    v: [],
    f: []
  }

  let lines = objdata.split('\n')
  lines.forEach((line) => {
    let type = line[0]

    if (type === 'v') {
      let pts = line.split(' ')
      let x = round(pts[1], precision)
      let y = round(pts[2], precision)
      let z = round(pts[3], precision)

      obj.v.push(x + ' ' + y + ' ' + z)
    } else if (type === 'f') {
      let pts = line.split(' ')
      let a = pts[1]
      let b = pts[2]
      let c = pts[3]

      obj.f.push(a + ' ' + b + ' ' + c)
    }
  })

  return obj
}

function objfile (minobj) {
  let lines = []
  minobj.v.forEach((line) => {
    lines.push('v ' + line)
  })
  minobj.f.forEach((line) => {
    lines.push('f ' + line)
  })

  return lines.join('\n')
}

function minfile (minobj) {
  let txt = 'v' + '\n'
  txt += minobj.v.join('\n') + '\n'
  txt += 'f' + '\n'
  txt += minobj.f.join('\n')
  return txt
}

fs.readFile(filepath, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  let mobj = minobj(data)
  let fileobj = filepath.replace('.obj', '.min.obj')
  let filetxt = filepath.replace('.obj', '.txt')

  fs.writeFileSync(fileobj, objfile(mobj))
  fs.writeFileSync(filetxt, minfile(mobj))
})
