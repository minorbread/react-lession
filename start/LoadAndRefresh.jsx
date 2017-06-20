import React, { Component } from 'react'

export default (url) => (WrappedComponent) => {
    class extends Component {

    constructor(props) {
      super(props)
      this.state = { content: '' }
    }

    componentWillMount() {
      this.setState({ content: '数据加载中...' })
      refresh()
    }

    refresh() {
      this.setState({ content: getData(url)})
      
    }

    render() {
      return (
        <WrappedComponent content={this.state.content} refresh={this.refresh.bind(this)} />
      )
    }
  }
}