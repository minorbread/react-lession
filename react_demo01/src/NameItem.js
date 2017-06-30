import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class NameItem extends Component {
  constructor(props) {
    super(props)
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <Item>
        <span>Arcthur</span>   
      </Item>
    )
  }
}

export default NameItem
