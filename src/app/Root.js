if (process.env.NODE_ENV === 'production') {
  module.exports = require('./containers/Root/prod')
} else {
  module.exports = require('./containers/Root/dev')
}
