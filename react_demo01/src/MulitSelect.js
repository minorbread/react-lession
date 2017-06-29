import React, { Component } from 'react'

class MulitSelect extends Component {
  constructor(props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this)    
    this.state = {
      area: ['BeiJing', 'ShangHai']
    }
  }

  handleChange(e) {
    const { options } = e.target
    const area = Object.keys(options)
                .filter(i => options[i].selected === true)
                .map(i => options[i].value)
    this.setState({
      area
    })
  }

  render() {
    const { area } = this.state

    return (
      <select multiple={true} value={area} onChange={this.handleChange}>
        <option value="BeiJing">北京</option>
        <option value="ShangHai">上海</option>
        <option value="HangZhou">杭州</option>
      </select>
    )
  }
}

export default MulitSelect
