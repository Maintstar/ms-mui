import Handler from './handler'
import { TouchEvent } from '../events/mouseEvent'
import { getTranslatePoint } from '../../utils/style'
import requestAnimationFrame from '../../utils/requestAnimationFrame'
import { validateRange } from '../../utils/numbers'


let animateX = 0;

/*
control is an object with
getEl,
getPos,
setPos
*/
export default class SwipeHandler extends Handler {

  static defaultProps = {
    options: {
      buffer: 15
    }
  }

  constructor({touchControl, moveControl}, options) {
    super()
    this.options = options || {}
    this.options.buffer = this.options.buffer || 15

    this.touchControl = touchControl
    this.moveControl = moveControl
    this._onDown = this._onDown.bind(this)
    this._onMove = this._onMove.bind(this)
    this._onUp = this._onUp.bind(this)
  }

  addHooks() {
    this.touchControl.addEventListener('touchstart', this._onDown)
  }

  removeHooks() {
    this.touchControl.removeEventListener('touchstart', this._onDown)
  }

  _getPos() {
    return getTranslatePoint(this.moveControl)
  }

  _setPos(p) {
    // requestAnimationFrame(() => {
    //   this.moveControl.style.transform = `translate(${p.x}px,0)`
    // })
    animateX = p.x
    //this.moveControl.style.transform = `translate(${p.x}px,0)`
    requestAnimationFrame(this._setPosAnimated)
  }

  _setPosAnimated = () => {
    this.moveControl.style.transform = `translate(${animateX}px,0)`
  }

  _onDown(e) {
    e.stopPropagation()

    // calculate offset
    let initPos = this._getPos()

    let ev = TouchEvent(e)
    ev.point.subtract(initPos)
    this.start = ev.point.subtract(initPos)
    this.moving = false
    this.movingHorizontal = null

    // move, up handlers
    document.addEventListener('touchmove', this._onMove)
    document.addEventListener('touchend', this._onUp)

    // remove transition
    if (this.moveControl.style.transition) this.moveControl.style.transition = ''
  }

  _onMove(e) {
    e.stopPropagation()
    let ev = TouchEvent(e)
    let p = ev.point
    p.subtractMut(this.start)

    if (this.movingHorizontal == null && (Math.abs(p.x) > 3 || Math.abs(p.y) > 3)) {
      this.movingHorizontal = Math.abs(p.x) > Math.abs(p.y)
    }

    // check buffer
    if (!this.moving && Math.abs(p.x) > this.options.buffer) {
      this.moving = true
    }

    // move
    if (this.moving && this.movingHorizontal) {
      this._setPos(p)
    }
  }

  _onUp(e) {
    e.stopPropagation();

    // move, up handlers
    document.removeEventListener('touchmove', this._onMove)
    document.removeEventListener('touchend', this._onUp)

    // current pos
    let pos = this._getPos();
    let count = this.moveControl.children.length;
    let { width, marginRight, marginLeft } = getComputedStyle(this.moveControl.children[0]);
    let totalWidth = parseInt(width) + parseInt(marginLeft) + parseInt(marginRight)

    let index = Math.round(pos.x / totalWidth)

    pos.x = index * totalWidth

    index = validateRange(index, -(count - 1), 0)

    setIndex(this.moveControl, index, {
      width: totalWidth
    });
  }
}

// receives element to animate
function setIndex(el, index, options) {
  options = options || {}
  let width = index * options.width
  requestAnimationFrame(function() {
    el.style.transform = `translate(${width}px,0)`
    el.style.transition = 'transform 300ms'
  })
}
