class MockStore {
  constructor() {
    this.store = {}
  }

  getState() {
    return this.store
  }

  setStore(key, value) {
    this.store[key] = value
  }

  subscribe() {}

  dispatch() {}
}

export default MockStore
