import React, { Component } from 'react'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    

    this.handleChange = this.handleChange.bind(this)
    this.handleAddComment = this.handleAddComment.bind(this)

    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleAddComment() {
    CommentActions.addComment(this.state.value)
  }

  <render></render> {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <button className="comment-confirm-btn" onClick={this.handleAddComment()}>评论</button>
      </div>
    )
  }
}

export default CommentForm
