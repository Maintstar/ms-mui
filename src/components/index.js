import React from 'react'

import './mui.css'
import './mui-btn_small.css'
import './mui-btn_xsmall.css'

import './mui-table.css'
import './mui-table_small.css'
import './mui-table_xsmall.css'

// import _Container from 'muicss/lib/react/container'
// import _Row from 'muicss/lib/react/row'
// import _Col from 'muicss/lib/react/col'
// import _Button from 'muicss/lib/react/button'
// import _Tabs from 'muicss/lib/react/tabs'
// import _Tab from 'muicss/lib/react/tab'
// import _Form from 'muicss/lib/react/form'
// import _Input from 'muicss/lib/react/input'
// import _Select from 'muicss/lib/react/select'
// import _Option from 'muicss/lib/react/option'
// import _Textarea from 'muicss/lib/react/textarea'
// import _Panel from 'muicss/lib/react/panel'
// import _Checkbox from 'muicss/lib/react/checkbox'
// import _Radio from 'muicss/lib/react/radio'
import _MSField from './msField'
import _MSSelect from './msSelect'

// export const Container = _Container
// export const Row = _Row
// export const Col = _Col
// export const Button = _Button
// export const Tabs = _Tabs
// export const Tab = _Tab
// export const Form = _Form
// export const Input = _Input
// export const Select = _Select
// export const Option = _Option
// export const Textarea = _Textarea
// export const Panel = _Panel
// export const Checkbox = _Checkbox
// export const Radio = _Radio
export const MSSelect = _MSSelect
export const MSField = _MSField


export const BlockHeader = (props) => {
  let {className, ...rest} = props
  return (<div className={'block-header ' + className} {...rest}>{props.children}</div>)
}

export const Label = (props) => (<div className="mui-me-label">{props.children}</div>)


