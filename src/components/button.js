import React from 'react'
import Button from 'muicss/lib/react/button'
import './button.css'
import './buttonSmall.css'
import './buttonXSmall.css'
import { getClassName, addSizeClasses, initClasses } from './ms'

//import * as jqLite from 'muicss/js/lib/jqLite';
//import * as util from 'muicss/js/lib/util';


export default function _Button (props) {
  let { className, size, ...rest } = props
  let classes = initClasses(className, {})
  addSizeClasses(classes, size)
  return <Button className={getClassName(classes)} {...rest} />
}


// function getOffset(coordinates) {
//   let rect = coordinates.getBoundingClientRect();
//   return { top: rect.top + document.body.scrollTop, left: rect.left };
// }
//
//
// const btnClass = 'mui-btn',
//   btnAttrs = { color: 1, variant: 1, size: 1 };

/**
 * Button element
 * @class
 */
// class Button extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   //let cb = util.callback;
//   //   // this.onMouseDownCB = cb(this, 'onMouseDown');
//   //   // this.onMouseUpCB = cb(this, 'onMouseUp');
//   //   // this.onMouseLeaveCB = cb(this, 'onMouseLeave');
//   //   // this.onTouchStartCB = cb(this, 'onTouchStart');
//   //   // this.onTouchEndCB = cb(this, 'onTouchEnd');
//   // }
//
//   state = {
//     rippleStyle: {},
//     rippleIsVisible: false
//   };
//
//   static defaultProps = {
//     className: '',
//     color: 'default',
//     size: 'default',
//     variant: 'default'
//   };
//
//   componentDidMount() {
//     // disable MUI js
//     let el = this.buttonElRef;
//     el._muiDropdown = true;
//     el._muiRipple = true;
//   }
//
//   onMouseDown = (ev) => {
//     this.showRipple(ev);
//
//     // execute callback
//     const fn = this.props.onMouseDown;
//     fn && fn(ev);
//   }
//
//   onMouseUp = (ev) => {
//     this.hideRipple(ev);
//
//     // execute callback
//     const fn = this.props.onMouseUp;
//     fn && fn(ev);
//   }
//
//   onMouseLeave = (ev) => {
//     this.hideRipple(ev);
//
//     // execute callback
//     const fn = this.props.onMouseLeave;
//     fn && fn(ev);
//   }
//
//   onTouchStart = (ev) => {
//     this.showRipple(ev);
//
//     // execute callback
//     const fn = this.props.onTouchStart;
//     fn && fn(ev);
//   }
//
//   onTouchEnd = (ev) => {
//     this.hideRipple(ev);
//
//     // execute callback
//     const fn = this.props.onTouchEnd;
//     fn && fn(ev);
//   }
//
//   showRipple(ev) {
//     let buttonEl = this.buttonElRef;
//
//     // de-dupe touch events
//     if ('ontouchstart' in buttonEl && ev.type === 'mousedown') return;
//
//     // get (x, y) position of click
//     let offset = getOffset(this.buttonElRef),
//       clickEv;
//
//     if (ev.type === 'touchstart' && ev.touches) clickEv = ev.touches[0];
//     else clickEv = ev;
//
//     // calculate radius
//     let radius = Math.sqrt(offset.width * offset.width +
//       offset.height * offset.height);
//
//     let diameterPx = radius * 2 + 'px';
//
//     // add ripple to state
//     this.setState({
//       rippleStyle: {
//         top: Math.round(clickEv.pageY - offset.top - radius) + 'px',
//         left: Math.round(clickEv.pageX - offset.left - radius) + 'px',
//         width: diameterPx,
//         height: diameterPx
//       },
//       rippleIsVisible: true
//     });
//   }
//
//   hideRipple(ev) {
//     this.setState({ rippleIsVisible: false });
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     let state = this.state,
//       rippleEl = this.rippleElRef;
//
//     // show ripple
//     if (state.rippleIsVisible && !prevState.rippleIsVisible) {
//       rippleEl.classList.remove('mui--is-animating')
//       rippleEl.classList.add('mui--is-visible')
//       //jqLite.removeClass(rippleEl, 'mui--is-animating');
//       //jqLite.addClass(rippleEl, 'mui--is-visible');
//
//       setTimeout(() => {
//         rippleEl.classList.add('mui--is-animating')
//       });
//     }
//
//     // hide ripple
//     if (!state.rippleIsVisible && prevState.rippleIsVisible) {
//       // allow a repaint to occur before removing class so animation shows for
//       // tap events
//       setTimeout(() => {
//         rippleEl.classList.remove('mui--is-visible')
//         //jqLite.removeClass(rippleEl, 'mui--is-visible');
//       });
//     }
//   }
//
//   render() {
//     let cls = btnClass,
//       k,
//       v;
//
//     const { color, size, variant, ...reactProps } = this.props;
//
//     // button attributes
//     for (k in btnAttrs) {
//       v = this.props[k];
//       if (v !== 'default') cls += ' ' + btnClass + '--' + v;
//     }
//
//     return (
//       <button
//         { ...reactProps }
//         ref={el => { this.buttonElRef = el }}
//         className={cls + ' ' + this.props.className}
//         onMouseUp={this.onMouseUp}
//         onMouseDown={this.onMouseDown}
//         onMouseLeave={this.onMouseLeave}
//         onTouchStart={this.onTouchStart}
//         onTouchEnd={this.onTouchEnd}
//       >
//         {this.props.children}
//         <span className="mui-btn__ripple-container">
//           <span
//             ref={el => { this.rippleElRef = el }}
//             className="mui-ripple"
//             style={this.state.rippleStyle}
//           >
//           </span>
//         </span>
//       </button>
//     );
//   }
// }



