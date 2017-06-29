import React, { Component } from 'react'

class Radio extends Component {
  constructor(props) {
    super(props)
    
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      radioValue: 'male'
    }
  }

  handleClick(e) {
    this.setState({
      radioValue: e.target.value
    })
  }


  render() {
    const { radioValue } = this.state

    return (
      <div>
        <p>gender:</p>
        <label>
          male:
          <input 
            type="radio" 
            value="male" 
            checked={ radioValue === 'male' }
            onChange={ this.handleClick }
          />
        </label>
        <label>
          female:
          <input 
            type="radio"
            value="female"
            checked={ radioValue === 'female' }
            onChange={ this.handleClick }
          />
        </label>
      </div>
    )
  }
}

export default Radio