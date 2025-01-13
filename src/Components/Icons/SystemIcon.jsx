import React from 'react'

const SystemIcon = ({icon ,color}) => {
  return React.cloneElement(icon,{style:{color}})
}
export default SystemIcon