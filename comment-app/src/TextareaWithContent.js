import WrappedComponent from './WrappedComponent'

class TextareaWithContent extends Component {
  render() {
    return <textarea value={this.props.data} />
  }
}

TextareaWithContent = WrappedComponent(TextareaWithContent, 'content')

export defalut TextareaWithContent