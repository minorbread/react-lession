import { createStore, applyMiddleware, compose } from 'Redux'
import rootReducers from '../reducers'
import DevTools from '../containers/DevTools'

const finalCreateStore = compose(
  // 在开发环境使用middleware
  applyMiddleware(d1, d2, d3)
  // 它会启动redux devtools
  DevTools.instrument()
)(createStore)

let newStore = applyMiddleware(mid1, mid2, mid3. ...)(createStore)(reducer, null)