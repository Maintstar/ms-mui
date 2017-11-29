import React from 'react'
import './msTreeStructure.css'

export default class MSTreeStructure extends React.Component {
  state = { open: false, value: this.props.value }

  get labelClassName() {
    return 'ms-tree-struct__label ' + (
      this.state.value == null && 'ms-tree-struct__label--float'
    )
  }

  get options() {
    const { idCol = 'id', options, structure } = this.props
    const value = this.state.value || '$root'
    const optionIds = (structure[value] || {}).children || []

    return options.filter((option) => optionIds.includes(option[idCol]))
  }

  get optionsClassName() {
    return 'ms-tree-struct__options ' + (
      this.state.value == null && 'ms-tree-struct__options--top-level'
    )
  }

  get value() {
    const { idCol = 'id', nameCol = 'name', options } = this.props
    const value = this.state.value || '$root'
    const activeOption = options.find((option) => {
      return option[idCol] === value
    })

    return activeOption && activeOption[nameCol]
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value != nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  selectOption = (ev) => {
    this.setState({ value: ev.target.dataset.optionid })
  }

  selectParent = () => {
    this.setState({ value: this.props.structure[this.state.value].parent })
  }

  openOptions = () => {
    this.setState({ open: true })
  }

  closeOptions = () => {
    if (this.props.onChange && this.state.value) {
      this.props.onChange(this.state.value)
    }

    this.setState({ open: false })
  }

  render() {
    const { idCol = 'id', className, label, nameCol = 'name' } = this.props

    return (
      <div
        className={className + ' ms-tree-struct'}
        tabIndex="0"
        onBlur={this.closeOptions}
        onFocus={this.openOptions}
      >
        <label className={this.labelClassName}>{label}</label>
        <span className="ms-tree-struct__value">{this.value}</span>
        {
          this.state.open &&
          <div className="ms-tree-struct__dropdown">
            {
              this.state.value != null &&
              <div className="ms-tree-struct__back" onClick={this.selectParent}>&lt;</div>
            }
            <div className={this.optionsClassName}>
              {
                this.options.map((option) => (
                  <div
                    key={option[idCol]}
                    className="ms-tree-struct__option"
                    onClick={this.selectOption}
                    data-optionid={option[idCol]}
                  >
                    {option[nameCol]}
                  </div>
                ))
              }
            </div>
          </div>
        }
      </div>
    )
  }
}