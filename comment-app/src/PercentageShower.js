import React, { Component } from 'react'

class PercentageShower extends Component {

  static defaultProps = {
    numbers: 0
  }

  render () {
    return (
      <div>
       {(this.props.numbers*100).toFixed(2)}%
      </div>
    )
  }
}

export default PercentageShower