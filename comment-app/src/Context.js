import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Index extends Component {

  static childContextTypes = {
    themeColor: PropTypes.string
  }

  constructor() {
    super()
    this.state = {
      themeColor: 'red'
    }
  }

  componentWillMount() {
    this.setState({
      themeColor: 'green'
    })
  }

  getChildContext() {
    return {
      themeColor: this.state.themeColor
    }
  }

  render() {
    return (
      <div>
        <Header />   
        <Main />   
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <h2>This is header</h2>
        <Title />
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
    <div>
      <h2>This is main</h2>
      <Content />
    </div>
    )
  }
}

class Title extends Component {

  static contextTypes = {
    themeColor: PropTypes.string
  }

  render() {
    return (
      <h1 style={{ color: this.context.themeColor }}>React book</h1>
    )
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <h2>React context</h2>
      </div>
    )
  }
}


export default Index