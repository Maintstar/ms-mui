import './ms_small.css'
import './ms_xsmall.css'
import './ms_message.css'

export function addSizeClassname(classNames, size) {
  if (size === 's') classNames.push('ms_small')
  if (size === 'xs') classNames.push('ms_xsmall')
}

export function addErrorWarnClasses(classNames, error, warning) {
  if (error) classNames.push('ms_error')
  if (warning) classNames.push('ms_warning')
}

// in: [{id:1, name:'asdf', group: 'g1'}...]
// out: {
//   'g1': [
//      {id:1, name:'asdf'}
//   ]
//   ...
// }
export function groupBy(ar, groupCol = "group") {
  if (!ar) return {}
  let g = ar.reduce(function(a, c) {
    let id = c[groupCol]
    if (!a[id]) {
      a[id] = [c]
    }
    else {
      a[id].push(c)
    }
    return a
  }, {})
  return g
}