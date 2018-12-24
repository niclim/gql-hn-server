module.exports = {
  server: {
    port: process.env.PORT || 4000,
    env: process.env.NODE_ENV || 'development' // development, test, production
  },
  api: {
    base_url: process.env.BASE_URL || 'https://conduit.productionready.io/api'
  }
}
