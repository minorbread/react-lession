import React from 'react'
import { shallow } from 'enzyme'
import Tab from '../'
import { export } from 'chai'

describe('Tab', () => {
  it('render the tab content', () => {
    const tab = shallow(
      <Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="ui-tabs">
        <TabPane order="0" tab={'Tab 1'}></TabPane>
        <TabPane order="0" tab={'Tab 1'}></TabPane>
        <TabPane order="0" tab={'Tab 1'}></TabPane>
      </Tabs>
    )
  })
})
