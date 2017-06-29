import React, { Component } from 'react'

class QrCode extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleClickQr = this.handleClickQr.bind(this)
    
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', (e) => {
      if (e.target && e.target.matches('div.code') ) {
        return
      }

      this.setState({
        active: false
      })
    })
  }

  componentWillUnmount() {
    document.body.removeEventListener('click')
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }

  handleClickQr(e) {
    e.stopPropagation()  
  }

  render() {
    return (
      <div className="qr-wraper">
        <button className="qr" onClick={ this.handleClick }>二维码</button>
        <div className="code" 
             onClick={ this.handleClickQr } 
             style={{ display: this.state.active ? 'block' : 'none' }}
        >
          <img src="http://www.liantu.com/images/2013/weixin.png" alt="error"/>
        </div>
      </div>
    ) 
  } 
}


export default QrCode