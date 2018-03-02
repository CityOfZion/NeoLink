import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

Object.defineProperty(window.HTMLElement.prototype, 'dataset', {
  writable: true,
  value: {},
})

Object.defineProperty(window.HTMLInputElement.prototype, 'validity', {
  writable: true,
  value: {},
})
