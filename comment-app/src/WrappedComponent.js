import React from 'react'

export default(WrapedComponent, name) => {
  class NewComponent extends Component {
    constructor() {
      super()
      this.state = { data: null }
    }

    componentWillMount() {
      let data = localStorage.getItem(name)
      this.setState({ data })
    }

    render() {
      return <WrapedComponent data={this.state.data} />
    }
  }
  return NewComponent
}