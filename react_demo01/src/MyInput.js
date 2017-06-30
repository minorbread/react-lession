import React, { Component } from 'react'

class MyInput extends Component {
  constructor(props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.update(e.target.value)
  }

  render() {
    return (
      <input onChange={this.handleChange} />      
    )
  }
}

export default MyInput
