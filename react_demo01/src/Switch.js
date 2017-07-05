/*import React, { Component } from 'react'
import { spring, Motion } from 'react-motion'

class Switch extends Component {
  constructor(props) {
    super(props)
    
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      open: false
    }
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <Motion style={{x: spring(this.state.open ? 400 : 0)}}>
        {({x}) => 
          <div className="demo">
            <div 
              className="demo-block"            
              onClick={this.handleClick}
              style={{
                transform: `translate3d(${x}px, 0, 0)`
              }}
            />
          </div>
        }
      </Motion>
    )
  } 
}

export default Switch
*/