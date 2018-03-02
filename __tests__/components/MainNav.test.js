import React from 'react'

import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'

import MainNav from '../../src/app/components/MainNav'

test('Menu matches snapshot', () => {
  const tree = shallow(
    <BrowserRouter>
      <MainNav />
    </BrowserRouter>
  )
  expect(tree).toMatchSnapshot()
})
