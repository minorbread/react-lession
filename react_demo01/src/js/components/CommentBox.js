import React, { Component } from 'react'
import CommentStore from '../stores/CommentStore'
import CommentList from './CommentList'
import CommentForm from './CommentForm'


class CommentBox extends Component {
  constructor(props) {
    super(props)
    
    this._onchange = this._onchange.bind(this)
    this.state = {
      comment: CommentStore.getComment()
    }
  }

  _onchange() {
    this.setState({
      comment: CommentStore.getComment()
    })
  }

  componentDidMount() {
    CommentStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this._onchange)
  }


  render() {
    return (
      <div>
        <CommentList comment={this.state.comment}>   
        <CommentForm>   
      </div>
    )
  }
}

export default CommentBox
