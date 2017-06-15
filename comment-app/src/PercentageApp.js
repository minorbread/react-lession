import React, { Component } from 'react'
import Input from './Input'
import PercentageShower from './PercentageShower'

class PercentageApp extends Component {

  static defaultProps = {
    numbers: 0
  }

  constructor() {
    super()
    this.state = {
      numbers: 0
    }
  }

  handleChange (e) {
    this.setState({
      numbers: e.target.value
    })
  }

  render () {
    return (
      <div>
        <Input handleChange={this.handleChange.bind(this)}/>
        <PercentageShower numbers={this.state.numbers}/>
      </div>
    )
  }
}

export default PercentageApp 