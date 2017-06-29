import React, { Component } from 'react'

class UnCtrl extends Component {
  constructor(props) {
    super(props)
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      value: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { value } = this.refs.name
    console.log(value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="name" defaultValue="HangZhou"/>
        <button type="submit">Submit</button>
        <input value={this.state.value} onChange={e => {this.setState({value: e.target.value.toUpperCase() })
          }}
        />
        <input
          defaultValue={this.state.value} 
          onChange={e => {
            this.setState({
              value: e.target.value.toUpperCase()
            })
          }}
        />
      </form>
    )
  }
}

export default UnCtrl
