import React from 'react';
import './panel.css'
import { initClasses, getClassName } from '../components/ms'


let classRemoveTimer = null
const fadeInClassName = "mui-panel--fadein"

function removeClass() {
  let nodes = document.getElementsByClassName(fadeInClassName)
  for (let n of nodes) {
    n.classList.remove(fadeInClassName)
  }
}

export default function Panel(props) {
  let {children, className, fadeIn, ...rest} = props;
  let cls = initClasses(className, {'mui-panel':1})
  if (fadeIn) {
    clearTimeout(classRemoveTimer)
    classRemoveTimer = setTimeout(removeClass, 300)
    cls[fadeInClassName] = 1
  }
  return (
    <div { ...rest } className={getClassName(cls)} onClick={()=>{}}>
      {children}
    </div>
  );
}


// export default function Panel(props) {
//   let {children, className, ...rest} = props;
//   className = className ? 'mui-panel ' + className : 'mui-panel'
//   return (
//     <div { ...rest } className={className}>
//       {children}
//     </div>
//   );
// }