let appState = {
  title: {
    text: 'React book',
    color: 'red'
  },
  content: {
    text: 'React context',
    color: 'blue'
  }
}


function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) { return }
  console.log('renderTitle')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) { return }
  console.log('renderContent')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

function renderApp (newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) { return }
  console.log('renderApp')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}


function stateChanger(state, action) {

  if (!state) {
    return {
      title: {
        text: 'React book',
        color: 'red'
      },
      content: {
        text: 'React context',
        color: 'blue'
      }
    }
  }

  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_CONTENT_TEXT':
      state.content.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    case 'UPDATE_CONTENT_COLOR':
      state.content.color = action.color
      break
    default:
      return state
  }
}

function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}

function theReducer(state, action) {
  if (!state) {
     return {
       title: {
         text: 'React book',
         color: 'red'
       },
       content: {
         text: 'React context',
         color: 'blue'
       }
     }
   }

   switch(action.type) {
     case 'UPDATE_TITLE_TEXT':
       return {
         ...state,
         title: {
           ...state.title,
           text: action.text
         }
       }
     case 'UPDATE_CONTENT_TEXT':
       state.content.text = action.text
       break
     case 'UPDATE_TITLE_COLOR':
       return {
         ...state,
         title: {
           ...state.title,
           color: action.color
         }
       }
     case 'UPDATE_CONTENT_COLOR':
       state.content.color = action.color
       break
     default:
       return state
   }
}

function themeReducer(state, action) {
  if (!state) {
    return {
      themeName: 'Red Theme',
      themeColor: 'red'
    }
  }

  switch(action.type) {
    case 'UPDATE_THEME_NAME':
      return { ...state, themeName: action.themeName }
      break;
    case 'UPDATE_THEME_COLOR':
      return { ...state, themeColor: action.themeColor }
      break;
    default:
      return state
  }
}


const store = createStore(theReducer)
let oldState = store.getState()

store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})
renderApp(store.getState()) 

store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'changeTitleText' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'green' })


