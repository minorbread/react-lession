import React, { Component } from 'react'

class Header extends Component {

  constructor() {
    super()
    console.log('construct')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    console.log('render')
    return (
      <div>
        <h1 className="title">Learning React</h1>
      </div>
    )
  }
}

export default Header