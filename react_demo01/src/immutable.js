import React, { Component } from 'react'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      data: {
        times: 0
      }
    }
  }

  handleAdd() {
    let data = _.cloneDeep(this.state.data)
    data.times = data.times + 1
    this.setState({ data: data })
    console.log(this.state.data.times)
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      data: Map({
        times: 0
      })
    }
  }

  handleAdd() {
    this.setState({
      ({ data }) => ({
        data: data.update('times', v = v + 1)
      })
    })
    console.log(this.state.data.get('times'))
  }
}

export default App
