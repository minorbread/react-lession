export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    childeren: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  } 

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return (
      <div>{ this.props.children }</div>
    )
  }
}