import React, { Component, PropTypes } from './react'

export connect = (mapStateToProps) => (WrappedComponent) => {

   class Connect extends Component {

    static contextTypes {
      store: PropTypes.object
    }

    render() {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      return <WrappedComponent {...stateProps} />  
    }

  }

  return Connect
  
}