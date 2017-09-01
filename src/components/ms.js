import './ms_small.css'
import './ms_xsmall.css'
import './ms_message.css'

// export function addSizeClasses(classNames, size) {
//   if (size === 's') classNames.push('ms_small')
//   if (size === 'xs') classNames.push('ms_xsmall')
// }
//
// export function addErrorWarnClasses(classNames, error, warning) {
//   if (error) classNames.push('ms_error')
//   if (warning) classNames.push('ms_warning')
// }

export function initClasses(classNames, init) {
  if (classNames && typeof(classNames) === 'string')
    return classNames.split(' ').reduce((a,c)=>a[c]=1, init || {})
  return init || {}
}

const aliases = {
  "s": 'small',
  "xs": 'xsmall',
  "n": 'normal'
}

export function addSizeClasses(classes, size, prefix = 'ms') {
  let sn = aliases[size] || size
  classes[prefix + '_' + sn] = 1
  return classes
}

export function addErrorWarnClasses(classNames, error, warning) {
  if (error) classNames['ms_error'] = 1
  if (warning) classNames['ms_warning'] = 1
  return classNames
}

export function getClassName(classNames) {
  return Object.keys(classNames).join(' ')
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