import React from 'react'

const Label = p => (<span style={{position:'relative', height:0}}><div style={{position:'absolute',left:-220, textAlign:'right', width:180}}>{p.children}</div></span>)

export default Label
