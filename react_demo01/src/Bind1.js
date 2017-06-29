import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this)
  }


  render() {
    return (
      <button onClick={this.handleClick} >test</button>
    )
  }
}