const emptyAr = [1,0,1,0,0,0]

const emptyMatrix = [1,0,1,0]

// input string, or element:
// transform: matrix(a, c, b, d, tx, ty)
// transform: translate(tx, ty)
// output:
// [a, c, b, d, tx, ty]
export function getTransformMatrix(s) {

  // take computed style
  if (typeof s != 'string') {
    s = getComputedStyle(s).transform
  }

  // is empty
  if (s === 'none') return emptyAr

  let p1 = s.indexOf("(")
  // transform name
  let trName = s.substring(0, p1)

  // transform values
  let res = s
    .substring(p1+1, s.indexOf(")"))
    .split(',')
    .map( x=> parseInt(x.replace('px','')));

  if (trName.indexOf('matrix') === 0)
  {
    // we are good
  }
  else
  {
    // translate
    res = emptyMatrix.concat(res);
  }

  return res;
}


export function getTranslate(s) {
  return getTransformMatrix(s).slice(4,6).map(x => x||0)
}

export function getTranslatePoint(s) {
  let ar = getTranslate(s)
  return {x:ar[0], y: ar[1]}
}

