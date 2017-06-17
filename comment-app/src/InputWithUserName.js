import WrappedComponent from './WrappedComponent'
import wrapWithAjaxData from './wrapWithAjaxData'

class InputWithUserName extends Component {
  render() {
    return <input value={this.props.data} /> 
  }
}

InputWithUserName = wrapWithAjaxData(InputWithUserName)
InputWithUserName = WrappedComponent(InputWithUserName, 'username')

export default InputWithUserName

