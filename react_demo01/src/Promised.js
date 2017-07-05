import React, { Component } from 'react'

function dissoc(obj, prop) {
  let result = {}

  for (let p in obj) {
    if (p !== prop) {
      result[p] = obj[p]
    }
  }

  return result
}

const Promised = (promiseProp, Wrapped) => class extends Component {
  constructor(props) {
    super(props)
    

    this.state = {
      loading: true,
      error: null,
      value: null
    }
  }

  componentDidMount() {
    this.props[promiseProp].then(response => response.json()).then(value => this.setState({loading: false, value})).catch(error => this.setState({loading: false, error}))
  }

  render() {
    if (this.state.loading) {
      return <span>loading...</span>
    } else if (this.state.error !== null) {
      return <span>this.state.error.message</span>
    } else {
      const propsWithoutThePromise = dissoc(this.props, promise)
      return <Wrapped {...propsWithoutThePromise} {...this.state.value} />
    }
  }
}

export default Promised
