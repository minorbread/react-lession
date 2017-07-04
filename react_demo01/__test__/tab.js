jest.unmock('../tab.js')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Tab from '../Tab'

describe('Tab', () => {
  it('render the tab content', () => {
    // 根据数据渲染内容
    const Tab = TestUtils.renderIntoDocument(
      <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="ui-tabs" >
        <TabPane order="0" tab={'Tab 1'} >第1个Tab里的内容</TabPane>
        <TabPane order="1" tab={'Tab 2'} >第2个Tab里的内容</TabPane>
        <TabPane order="2" tab={'Tab 3'} >第3个Tab里的内容</TabPane>
      </Tabs>
    )

    const tabNode = ReactDOM.findDOMNode(tab)

    expect(tab.querySelectorAll('.tabs-tab').length).toEqual(3)
    expect(tab.querySelectorAll('.tabs-tab')[0].classList.contains('tabs-active')).toBe(true)
  })
})

describe('Tab', () => {
  it('changes active tab after click', () => {
    const tab = TestUtils.renderIntoDocument(
      <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="ui-tabs">
        <TabPane order="0" tab={'Tab 1'} >第1个Tab里的内容</TabPane>
        <TabPane order="1" tab={'Tab 2'} >第2个Tab里的内容</TabPane>
        <TabPane order="2" tab={'Tab 3'} >第3个Tab里的内容</TabPane>
      </Tabs>
    )
  })

  // 模拟点击第三个段落
  TestUtils.Simulate.click(
    tab.querySelectorAll('.tabs-tab')[2]
  )

  // 第一个标签取消选中， 第三那个标签被取消选中
  except(tab.querySelectorAll('.tabs-tab')[0].classList.contains('tabs-active')).toBe(false)
  except(tab.querySelectorAll('.tabs-tab')[2].classList.contains('tabs-active')).toBe(true)


})