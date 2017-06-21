import React, { Component, PropTypes } from 'react'
import { connect } from './Connect'

class Header extends Component {

  static propTypes = {
    themeColor: PropTypes.string
  }

  render() {
    return (
      <h1 style={{ color: this.props.themeColor }}>react book</h1>  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

Header = connect(mapStateToProps)(Header)

export default Header