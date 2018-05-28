import ReactDOM from 'react-dom'

import getElementBBox from '../utils/getElementBBox'

let optionsBody = null

export const msFieldOptionBodyElement = 'msFieldOptionBody'

export default class OptionsBody {
  constructor() {
    if (!optionsBody) {
      this.init()
    }
    this.portal = null
    this.input = null

  }

  init() {
    if (!optionsBody) {
      optionsBody = document.createElement('div')
      optionsBody.setAttribute('id', msFieldOptionBodyElement)
      document.body.appendChild(optionsBody)
    }
  }

  calculateDimensions = (inputElement) => {
    if (inputElement) {
      const inputDimensions = getElementBBox(inputElement)
      const top = (window.scrollY || document.body.scrollTop) + inputDimensions.top + inputDimensions.height
      return `width: ${inputDimensions.width}px; display: inline-block; top: ${top}px; left: ${inputDimensions.left}px`
    }
    return ''
  }

  updateDimensions = (inputElement) => {
    optionsBody.setAttribute('style', this.calculateDimensions(inputElement))
  }

  renderOptions = (props) => {
    this.portal = ReactDOM.createPortal(
      props.children,
      optionsBody
    )
    return this.portal
  }

  removeOptions = () => {
    this.portal = null
    this.input = null
  }
}
