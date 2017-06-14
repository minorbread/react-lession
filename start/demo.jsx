class Computer extends Component {
  
  static defaultProps = {
    status: 'off'
  }

  constructor() {
    super()
    this.state = {
      status: 'off'
    }
  }

  handleClick () {
    this.setState({
      status: this.state.status == 'off' ? 'on' : 'off'
    })
  }

  render () {
    return (
      <div>
        <Screen showContent={this.state.status == 'off' ? '显示器关了' : '显示器亮了'}/>
        <button onClick={this.handleClick.bind(this)}>开关</button>
      </div>
    )
  }
}

class Screen extends Component {

  static defaultProps = {
    showContent: '无内容'
  }

  render () {

    const showContent = this.props.showContent 

    return (
      <div className='screen'>{showContent}</div>
    )
  }
}
