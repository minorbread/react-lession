import React, { Component } from 'react';

class Bind extends Component {
  handleClick(e, arg) {
    console.log(e, arg);
  } 

  render() {
    return (
      <button onClick={ this.handleClick.bind(this, 'test') }>Test</button>
   )
  }
}


/* fail
class Bind extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    console.log(e)
  }


  render() {
    return (
      <button onClick={ this.handleClick('test') } >Test</button>
    )
  }
}*/

/* //fail
class Bind extends Component {
  const handleClick = (e) => {
    console.log(e)
  }

  render() {
    return (
      <button onClick={ this.handleClick } >Test</button>
    )
  }
}*/

/* fail
class Bind extends Component {
  handleClick(e) {
    console.log(e)
  }

  render() {
    return (
      <button onClick={ () => this.handleClick() }>Test</button>
    )
  }

}*/

export default Bind