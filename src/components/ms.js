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
  let r = {...init}
  if (classNames && typeof(classNames) === 'string') {
    return classNames.split(' ').reduce((a, c) => { a[c] = 1; return a }, r)
  }
  return r
}

const aliases = {
  's': 'small',
  'xs': 'xsmall',
  'n': 'normal',
  'nn': 'none',
  '': ''
}

const heightBySizeMap = {
  '': 32,
  'small': 32,
  'xsmall': 30
}

export function getFieldHeightBySize(size) {
  return heightBySizeMap[aliases[size] || '']
}

export function addSizeClasses(classes, size, prefix = 'ms') {
  let sn = aliases[size] || size
  if (sn) classes[[prefix,sn].join("--")] = 1
  return classes
}

let i, bk, val, baseCls;
export const gridBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
export function addGridClasses(classes, props, changeProps = true) {
  // add mui-col classes
  for (i=gridBreakpoints.length - 1; i > -1; i--) {
    bk = gridBreakpoints[i];
    baseCls = 'mui-col-' + bk;

    // add mui-col-{bk}-{val}
    val = props[bk];
    if (val) {
      classes['mui-col'] = 1;
      classes[baseCls + '-' + val] = 1;
    }

    // add mui-col-{bk}-offset-{val}
    val = props[bk + '-offset'];
    if (val) classes[baseCls + '-offset-' + val] = 1;

    // remove from rest
    if (changeProps) {
      delete props[bk];
      delete props[bk + '-offset'];
    }
  }
  return classes['mui-col'] === 1
}

export function addErrorWarnClasses(classes, error, warning) {
  if (error) classes['ms_error'] = 1
  if (warning) classes['ms_warning'] = 1
  return classes
}

export function getClassName(classes) {
  return Object.keys(classes||{}).join(' ')
}