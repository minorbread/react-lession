class Input extends Component {

  render () {
    return (
      <div>
        <input value={this.state.number} type='number' onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

class PercentageShower extends Component {

  static defaultProps = {
    number: 0
  }

  render () {
    return (
      <div>
        {this.props.number.toFixed(4) * 100}
      </div>
    )
  }
}

class PercentageApp extends Component {

  constructor() {
    super()
    this.state = {
      number: 0
    }
  }

  handleChange (event) {
    this.setState({
      number: event.target.value
    })
  }

  render () {
    return (
      <div>
        <Input onChange={this.handleChange.bind(this)} />
        <PercentageShower number={this.state.number}/>
      </div>
    )
  }
}
