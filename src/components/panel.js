import React from 'react';
import './panel.css'
import { initClasses, getClassName } from '../components/ms'


let animateEl = []
let animTimer = null
const classNameAnim1 = "mui-panel--anim1"
const classNameAnim2 = "mui-panel--anim2"

function animate() {

  for (let n of animateEl) {
    n.classList.add(classNameAnim1)
    setTimeout(()=>{
      n.classList.add(classNameAnim2)
      setTimeout(()=>{
        n.classList.remove(classNameAnim1)
        n.classList.remove(classNameAnim2)
        animateEl.length = 0
      },950)
    },0)
  }

  //setTimeout(removeClass)
}

// function removeClass() {
//   let nodes = document.getElementsByClassName(fadeInClassName)
//   for (let n of nodes) {
//     n.classList.remove(fadeInClassName)
//   }
// }

// export default function Panel(props) {
//   let {children, className, fadeIn, ...rest} = props;
//   let cls = initClasses(className, {'mui-panel':1})
//   if (fadeIn) {
//     clearTimeout(classRemoveTimer)
//     classRemoveTimer = setTimeout(removeClass, 100)
//     cls[fadeInClassName] = 1
//   }
//   return (
//     <div { ...rest } className={getClassName(cls)} onClick={()=>{}}>
//       {children}
//     </div>
//   );
// }

export default class Panel extends React.PureComponent {

  constructor(props) {
    super(props)
    this.anim = false
    this.id = Math.random()
  }

  componentWillReceiveProps(props) {
    if (this.props.fadeIn !== props.fadeIn) {
      this.anim = true
    }
  }

  setRef = div => {
    this.div = div
  }

  animate = () => {
    animateEl.push(this.div)
    animate()
  }

  render() {
    let {children, className, fadeIn, ...rest} = this.props;
    let cls = initClasses(className, {'mui-panel':1})
    if (this.anim) {
      this.animate()
      this.anim = false
    }
    return (
      <div { ...rest } ref={ this.setRef } className={ getClassName(cls) }>
        {children}
      </div>
    );
  }
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