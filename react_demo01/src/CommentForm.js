import React, { Component } from 'react'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: ''
    }
  }
  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange} ></textarea>
        <button className="comment-confirm-btn" onClick={this.props.onSubmitComment.bind(this, this.state.value)}>评论</button>
      </div>
    )
  }
}

export default CommentForm
