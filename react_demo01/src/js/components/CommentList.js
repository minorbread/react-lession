import React, { Component } from 'react'
import CommentActions from '../actions/CommentActions'


class CommentList extends Component {
  componentWillMount() {
    CommentActions.loadComment()
  }

  render() {
    const list = this.props.comment

    return (
      <ul className="comment-box">
        {list.map(entry, i) => (
          <li className="comment-item" key={`response-${i}`}>
            <p className="comment-item-name">entry.name</p>
            <p className="comment-item-content">entry.content</p>
          </li>
        )}   
      </ul>
    )
  }
}

export default CommentList
