import React, { Component } from 'react'

class NativeEventDemo extends Component {
  componentDidMount() {
    this.refs.button.addEventListener('click', (e) => {
      this.handleClick(e)
    })
  }

  handleClick(e) {
    console.log(e)
  }

  componentWillUnmount() {
    // 注意事件移除，定时器清理
    this.refs.button.removeEventListen('click')
  }

  render() {
    return (
      <button ref="button" >Test</button>
    )
  }
}


export default NativeEventDemo