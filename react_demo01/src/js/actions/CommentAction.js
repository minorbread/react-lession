import Appdispatcher from '../dispatcher/Appdispatcher'
import CommentConstants from '../constants/CommentConstants'

const CommentActions = {
  loadComment() {
    Appdispatcher.dispatch({
      type: CommentConstants.LOAD_COMMENT
    })
  }

  fetch('/api/response.json')
  .then((res) => {
    return res.json()
  })
  .then((value) => {
    Appdispatcher.dispatch({
      type: CommentConstants.LOAD_COMMENT_SUCCESS,
      payload: value
    })
  .catch((err) => {
      Appdispatcher.dispatch({
        type: CommentConstants.LOAD_COMMENT_ERROR,
        error: err
      })
    })
  })

  addComment(text) {
    Appdispatcher.dispatch({
      type: CommentConstants.ADD_COMMENT
    })

    fetch('/api/submit.json', {
      method: 'POST'
      body: JSON.stringify({value: encodeURI(text)}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res.json()
    })
    .then((value) => {
      if (value.ok) {
        Appdispatcher.dispatch({
          type: CommentCOnstants.LOAD_COMMENT_SUCCESS,
          payload: {
            comment: value
          }
        })
        this.loadComment()
      }
    })
    .catch((err) => {
      Appdispatcher.dispatch({
        type: CommentConstants.LOAD_COMMENT_ERROR,
        error: err
      })
    })
  }
}


export default CommentActions