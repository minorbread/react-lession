import React, { Component } from 'react'

class FormApp extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      age: 18
    }
  }

  handleChange(name, e) {
    const { value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const { name, age } = this.state

    return (
      <div>
        <input value={ name } onChange={ this.handleChange.bind(this, 'name') } />
        <input value={ age } onChange={ this.handleChange.bind(this, 'name') } />   
      </div>
    )
  }
}

export default FormApp
