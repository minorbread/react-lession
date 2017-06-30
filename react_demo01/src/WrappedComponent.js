import React, { Component } from 'react'

// control props
const MyContainer = (WrappedComponent) => {
  class extends Component {
    render() {
      const newProps = {
        text: newText
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

// refs
const MyContainer = (WrappedComponent) => {
  class extends Component {
    proc(WrappedComponentInstance) {
      WrappedComponentInstance.method()
    }

    render() {
      const props = Object.assign({}, this.props, {
        ref: this.proc.bind(this)
      })
      return <WrappedComponent {...props} />
    }
  }
} 

// 抽象 state
const MyContainer = (WrappedComponent) => {
  class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }

      this.onNameChange = this.onNameChange.bind(this)
    }

    onNameChange(event) {
      this.setState({
        name: event.target.value
      })
    }

    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange,
        }
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}


// 反向继承

const MyContainer = (WrappedComponent) => {
  class extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}

// 渲染劫持

const MyContainer = (WrappedComponent) => {
  class extends WrappedComponent {
    render() {
      if (this.props.loggedIn) {
        return super.render()
      } else {
        return null
      }
    }
  }
}

const MyContainer = (WrappedComponent) => {
  class extends WrappedComponent{
    render() {
      const elementTree = super.render()
      let newProps = {}
      if (elementTree && elementTree.type === 'input') {
        newProps = { value: 'may the force be with you' }
      }
      const props = Object.assign({}, elementsTree.props, newProps)
      const newElementTree = React.cloneElement(elementTree, props, elementsTree.props.children)
      return newElementTree
    }
  }
}


// 控制state

const Mycontainer = (WrappedComponent) => {
  class extends WrappedComponent {
    render() {
      return (
        <div>
          <h2>HOC Debugger Component</h2>  
          <p>Props</p><pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
          {super.render()}
        </div>
      )
    }
  }
}

// 组件命名

HOC.displayName = `HOC(${getDisplayName(WrappedComponent)})`

// 或者

class HOC extends ... {
  static displayName = `HOC(${getDisplayName(WrappedComponent)})`
  ...
}

// 组件命名
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 组件参数
function HOCFactoryFactory(...params) {
  // 做一些可以改变params的事
  return function HOCFactory(WrappedComponent) {
    return class HOC extends Component {
      render() {
        return <WrappedComponent {...this.props} />
      }
    } 
  }
}

HOCFactoryFactory(params)(WrappedComponent)

// 或者

@HOCFactoryFactory(params)
class WrappedComponent extends React.Component{} 





























































