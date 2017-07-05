import React, { Component } from 'react'

class CommentListContainer extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loading: true,
      error: null,
      value: null
    }
  }

  componentDidMount() {
    this.props.promise.then(response => response.json()).then(value => setState({loading: false, error})).catch(error => this.setState({loading: false, error}))
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span> 
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>
    } else {
      const list = this.state.value.commentList;

      return (
        <CommentList comments={list}>
      )

    }
  }
}

class CommentListContainer extends Component {
  render() {
    return <CommentList data={data} /> 
  }
}

module.export = Promised('comments', CommentListContainer)

ReactDOM.render(<CommentListContainer comments={fetch('/api/response.json')} />, document.getElementId('root'))

export default CommentListContainer
