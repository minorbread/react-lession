import React, { Component } from 'react'

const asyncSelectDecorator = WrappedComponent => {
  class AsyncSelectDecorator extends Component {

    componentDidMount() {
      const { url, params } = this.props

      fetch(url, { params }).then(data => {
        this.setState({
          data
        })
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}   
          data={this.state.data}
        />
      )
    }
  } 
  return AsyncSelectDecorator
} 

export default asyncSelectDecorator
