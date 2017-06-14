import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

// class Header extends Component {
//   render () {
//     return (
//       <div>
//         <h1>React 小书</h1>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Header />,
//   document.getElementById('root')
// )
// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'

// class Header extends Component {
//   render () {
//     return (
//       <div>
//         <h1 className='title'>React 小书</h1>
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <Header />,
//   document.getElementById('root')
// )
