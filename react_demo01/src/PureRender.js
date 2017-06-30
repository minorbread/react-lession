import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


// 组件满足纯函数的条件
class PureRender extends Component {
  constructor(props) {
    super(props)
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return isDeepEqual(this.props, nextProps) && isDeepEqual(this.state, this.nextState)
  }

  function shallowEqual(obj, newObj) {
    if (obj === newObj) {
      return true;
    }

    const objKeys = Object.keys(obj);   
    const newObjKeys = Object.keys(newObj);   
    if (objKey.length !== newObjKeys.length) {
      reutrn false
    }

    return objKeys.every(key => {
      return newObj[key] === obj[key]
    }) 
  }

  render() {
    return <div className={this.props.className} >foo</div>
  }
}

export default PureRender
