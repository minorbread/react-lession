import React, { Component } from 'react'

class SelectInput extends Component {
  static displayName = 'SelectInput'

  render() {
    const { selectedItem, isActive, onClickHeader, placeholder } = this.props
    const { text } = selectedItem

    return (
      <div>
        <div onClick={onClickHeader}>
          <Input 
            type="text"
            disabled
            value={text}
            placeholder={placeholder}
          />
          <Icon className={isActive} name="angle-down" />
        </div>
      </div>
    )
  }
}

export default SelectInput
