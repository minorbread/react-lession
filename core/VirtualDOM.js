type ReactNode = ReactElement | ReactFragment | ReactText

type ReactElement = ReactComponentElement | ReacrDOMElement

type ReactDOMElement = {
  type: string,
  props: {
    children: ReactNodeList
    className: string,
    etc.
  },
  key: string | boolean | number | null,
  ref: string | null
}

type ReactComponentElement<TProps> = {
  type: ReactClass<TProps>,
  props: TProps,
  key: string | boolean | number | null,
  ref: string | null
}

type ReactFragment = Array<ReactNode | ReactEmpty>

type ReactNodeList = ReactNode | ReactEmpty

type ReactText = string | number

type ReactEmpty = null | undefined | boolean

// create react node
const Nav, Profile

// input
const app = <Nav color="blue"> <Profile>click</Profile> </Nav>

// output
const app = React.createElement(Nav, {color: "blue"}, React.createElement(Profile, null, "click"))

ReactElement.createElement = function (type, config, children) {
  // init 
  var propName
  var props = {}
  var key = null
  var ref = null
  var self = null
  var source = null

  // 如果存在config，则提取里面的内容
  if (config != null) {
    ref = config.ref === undefined ? null : config.ref
    key = config.key === undefined ? null : '' + config.key
    self = config.__self === undefined ? null : config.__self
    source = config.__source === undefined ? null : config.__source
    // 复制config里的内容到props（如id和className到呢等）
    for(propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName )) {
        props[propName] = config[propName]
      }
    }
  }

  // 处理children，全部挂载到props的children属性上，如果只有一个参数，直接赋值给children否则则合并处理
  var childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    var childrenArray = Array(childrenLength)
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }

  // 如果某额prop为空且存在默认的prop，则将默认prop赋值给当前props
  if (type && type.defaultProps) {
    var defualtProps = type.defaultProps
    for (propName in defaultProps) {
      if (typeof props[propName] === 'undefined') {
        props[propName] = defaultProps[propName]
      }
    }
  }

  // 返回一个RreactElement实例对象
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
}

// instantiateReactComponent

// 初始化组件入口
function instantiateReactComponent(node, parentCompositeType) {
  var instance

  // 空组件 ReactEmptyComponent
  if (node === null || node === false) {
    instance = ReactEmptyComponent.create(instantiateReactComponent)
  }

  if (typeof node === 'object') {
    var element = node
    if (typeof element.type === 'string') {
      // DOM标签 ReactDOMComponent
      instance = ReactNativeComponent.createInternalComponent(element)
    } else if (isInternalComponmentType(element.type)) {
      // 不是字符串表示的自定义组件暂无法使用，此处将不做组件初始化操作
      instance = new element.type(element)
    } else {
      // 自定义组件 ReactCompositeComponent
      instance = new ReactCompositeComponentWrapper();
    } 
  } else if (typeof node === 'string' || typeof node === 'number') {
    // 字符串或数字ReactTextComponent
    instance = ReactNativeComponent.createInstanceForText(node)
  } else {
    // 不做处理
  }

  // 设置实例
  instance.construct(node)
  // 初始化参数
  instance._mountIndex = 0
  instance._mountImage = null

  return instance
}

// ReactDOMTextComponent
var ReactDOMTextComponent = function (text) {
  // 保存但前的字符串
  this._currentElement = text
  this._stringText = '' + text

  // ReacrDOMComponentTree 需要使用的参数
  this._nativeNode = null
  this._nativeParent = null

  // 属性
  this._domID = null
  this._mountIndex = 0
  this._closingComment = null
  this._commentNodes = null
}


Object.assign(ReactDOMTextComponent.prototype, {
  mountComponent: function (transaction, nativeParent, nativeContainerInfo, context) {
    var domID = nativeContainerInfo._idCounter++
    var openingValue = ' react-text: ' + domID + ' '
    var closingValue = ' /react-text '
    this._domID = domID
    this._domID = domID
    this._nativeParent = nativeParent

    // 如果使用createElement创建文本标签，则该文本会带上标签和domID
    if (transaction.useCreateElement) {
      var ownerDocument = nativeContainerInfo._ownerDocument
      var openingComment = ownerDocument.createComment(openingValue)
      var closingComment = ownerDocument.createComment(closingValue)
      var lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment())
      // 开始标签
      DOMLazyTree.queueChild(lazyTree, DOMLazyTree(openingComment))
      // 如果是文本类型，则创建文本节点
      if (this._stringText) {
        DOMLazyTree.queueChild(lazyTree, DOMLazyTree(ownerDocument.createTextNode(this._stringText)))
      }      
      // 结束标签
      DOMLazyTree.queueChild(lazyTree, DOMLazyTree(closingComment))
      ReactDOMComponentTree.precachNode(this, openingComment)
      this._closingComment = closingComment
      return lazyTree
    } else {
      var escapedText = escapeTextContentForBrowser(this._stringText)
      // 静态页面直接返回文本
      if (transaction.renderToStaticMarkup) {
        return escapedText
      }
      // 如果不是通过createElement创建的文本，则将标签和属性注释掉，直接返回文本内容
      return (
        '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->'
      )
    }
  }

  // 更新文本内容
  receiveComponent: function (nextComponent, transaction) {
    if (nextText !== this._currentElement) {
      this._currentElement = nextText
      var nextStringText = '' + nextText
      if (nextStringText !== this._stringText) {
        this._stringText = nextStringText
        var commentNodes = this.getNativeNode()

        DOMChildrenOperations.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText)
      }
    }
  }
})

_createOpenTagMarkupAndPutListeners: function (transaction, props) {
  var ret = '<' + this._currentElement.type
  // 拼凑出属性  
  for (var propKey in props) {
    var propValue = props[propKey]

    if (registrationNameModules.hasOwnProperty(propKey)) {
      // 针对当前的节点添加事件代理
      if (propValue) {
        enqueuePutListener(this, propKey, propValue, transaction)
      }
    } else {
      if (propKey === STYLE) {
        if (propValue) {
          // 合并样式
          propValue = this._previousStyleCopy = Object.assign({}, props.style)
        }
        propValue = CSSPropertyOperations.createMarkupForStyles(propValue, this)        
      }
      // 创建属性标识
      var markup = null
      if (this._tag != null && isCustomComponent(this._tag, props)) {
        markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue)
      }
      if (markup) {
        ret += ' ' + markup
      }
    }
  }

  // 对于静态页面， 不需要设置react-id, 这样可节省大量字节
  if (transaction.renderToStaticMarkup) {
    return ret
  }

  // 设置react-id
  if (!this._nativeParent) {
    ret += ' ' + DOMPropertyOperations.createMarkupForRoot()
  }
  ret += ' ' + DOMPropertyOperations.createMarkupForID(this._domID)

  return ret;
}

_updateDOMProperties: function (lastProps, nextProps, transaction) {
  var propKey
  var styleName
  var styleUpdates

  // 当一个旧的属性不在新的属性集合里时，需要删除
  for (propKey in lastProps) {
    // 如果新属性里有， 或者propKey是在原型上的则直接跳过，这样剩下的都是不在新属性集合里的需要删除
    if (lastProps.hasOwnProperty(propKey)) {
      continue
    }
    // 从DOM上删除不需要的样式
    if (propKey === STYLE) {
      var lastStyle = this._previousStyleCopy
      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          styleUpdates = styleUpdates || {}
          styleUpdates[styleName] = ''
        }
      }
      this._previousStyleCopy = null
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (lastProps[propKey]) {
        // 这里的事件监听的属性需要去掉监听，针对当前的节点取消事件代理
        deleteListener(this, propKey)
      }
    } else if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
      // 从DOM上删除不需要的属性
      DOMPropertyOperations.deleteValueForProperty(getNode(this), propKey)
    }
  }

  // 对于新的属性， 需要写到DOM节点上
  for (propKey in nextProps) {
    var nextProp = nextProps[propKey]
    var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined 

    // 不在新属性中，或与旧属性相同，则跳过
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue
    }

    // 在DOM上写入新样式 更新样式
    if (propKey === STYLE) {
      if (nextProp) {
        nextProp = this._previousStyleCopy = Object.assign({}, nextProp)
      }
      if (lastProp) {
        // 再旧样式中且不在新样式中，清楚该样式
        for (styleName in lastProp) {
          if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName ))) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = ''            
          }
        }
        // 既在旧样式中也在新样式中，且不相同，更新该样式
        for (styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName ]) {
            styleUpdates = styleUpdates || {}             
            styleUpdates[styleName] = nextProp[styleName]
          }
        }
      } else {
        // 不存在旧样式，直接诶写入新样式
        styleUpdates = nextProp
      }
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp) {
        // 添加事件监听属性
        enqueuePutListener(this, propKey, nextProp, transaction)
      } else {
        deleteListener(this, propKey)
      }
      // 添加新的属性，或者式更新旧的同名属性
    } else if (isCustomComponent(this._tag, nextProps)) {
      if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
        // setValueForAttribute更新属性
        DOMPropertyOperations.setValueForAttribute(getNode(this), propKey, nextProp)
      }
    } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
      var node = getNode(this)
      if (nextProp != null) {
        DOMPropertyOperations.setValueForProperty(node, propKey, nextProp)
      } else {
        // 如果更新为null或undefined，则执行删除属性操作
        DOMPropertyOperations.deleteValueForProperty(node, propKey)
      }
    }
    // 如果styleUPDATES不为空，则设置新样式
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(getNode(this), styleUpdates, this)
    }
  }
}



// 更新子节点

_createContentMarkup: function (transaction, props, context) {
  var ret = ''

  // 获取子节点渲染出的内容
  var innerHTML = props.dangerouslySetInnerHTML

  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      ret = innerHTML.__html
    }
  } else {
    var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null
    var childrenToUse = contentToUse != null ? null : props.children

    if (contentToUse != null) {
      ret = escapeTextContentForBrowser(contentToUse)
    } else if (childrenToUse != null) {
      // 对于子节点进行初始化渲染
      var mountImages = this.mountChildren(childrenToUse, transaction, context)

      ret = mountImages.join('')
    }
  } 
  // 是否需要换行
  if (newlineEatingTags[this._tag] && ret.charArt(0) === '\n') {
    return '\n' + ret
  } else {
    return ret
  }
}

_updateDOMChildren: function (lastProps, nextProps, transaction, context) {
  // init
  var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null
  var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null
  var lastHTML = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html
  var nextHTML = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html

  var lastChildren = lastContent != null ? null : lastProps.children
  var nextChildren = nextContent != null ? null : nextProps.children
  var lastHasContentOrHtml = lastContent != null || lastHTML != null
  var nextHasContentOrHtml = nextContent != null || nextHTML != null

  if (lastChildren != null && nextChildren == null) {
    // 旧节点存在，而新节点不在，说明但前节点再更新后被删除了
    this.updateChildren(null, transaction, context)
  } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
    // 说明当前内容在更新后被删除了
    this.updateTextContent('')
  }

  // 新节点存在
  if (nextContent != null) {
    // 更新内容
    if (lastContent !== nextContent) {
      this.updateTextContent('' + nextContent)
    }
  } else if (nextHtml != null) {
    // 更新内容
    if (lastHTML !== nextHtml) {
      this.updateMarkup('' + nextHtml)
    }
  } else if (nextChildren != null) {
    // 更新子节点
    this.updateChildren(nextChildren, transaction, context)
  }
}

unmountComponent: function (safely) {
  this.unmountChildren(safely)
  ReactDOMComponentTree.uncacheNode(this)
  EventPluginHub.deleteAllListeners(this)
  ReactComponentBrowserEnvironment.unmountIDFromEnviroment(this._rootNodeID)
  this._rootNodeID = null
  this._domID = null
  this._wrapperState = null
}

var ReactClass = {
  // 创建自定义组件
  createClass: function (spec) {
    var Constructor = function (props, context, updater) {
      // 自动绑定
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethodas(this)
      }

      this.props = props
      this.context = context
      this.refs = emptyObject
      this.updater = updater || ReactNoopUpdateQueue   
      this.state = null
      // ReactClass没有构造函数，通过getInitalState和componentWillMount来替代
      var initialState = this.getInitialState ? this.getInitialState() : null
      this.state = initialState
    }

    // 原型继承父类
    Constructor.prototype = new ReactClassComponent()
    Constructor.prototype.constructor = Constructor
    Constructor.prototype.__reactAutoBindPairs = []

    // 合并mixin
    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor))

    mixSpecIntoComponent(Constructor, spec)

    // 所有mixin合并后初始化defaultProps 再整个生命周期中，getDefaultProps 只执行一次
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps()
    }
    // 减少查找并设置原型的时间
    for (var methodName in ReactClassInterface) {
      if (!Constructor.proptype[method]) {
        Constructor.proptype[methodName] = null
      }
    }

    return Constructor
  }
}

// mountComponent code


// 当组件挂载时，会分配一个递增编号，表示执行ReactUpdayes时更新组件的顺序
var nextMountID = 1
// 初始化组件，渲染标记，注册事件监听器
mountComponent: function (transaction, nativeParent, nativeContainerInfo, context) {
  // 当前元素对应的上下文
  this._context = context
  this._mountOrder = nextMountID++
  this._nativeParent = nativeParent
  this._nativeContainerInfo = nativeContainerInfo

  var publicProps = this._processProps(this._currentElement.props)
  var publicContext = this._processContext(context)

  var Component = this._currentElement.type

  // 初始化公共类
  var inst = this._constructComponent(publicProps, publicContext)
  var renderedElement

  // 用于判断组件是否为stateless，无状态组件没有状态更新队列，它只专注于渲染
  if (!shouldConstruct(Component) && (inst == null || inst.render == null)) {
    renderedElement = inst
    warnIfInvalidElement(Component, renderedElement)
    inst = new StatelessComponent(Cinponent)
  }
}






















































































