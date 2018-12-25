module.exports = {
  server: {
    port: process.env.PORT || 4000,
    env: process.env.NODE_ENV || 'development' // development, test, production
  },
  api: {
    hnUrl: process.env.hnUrl || 'https://hacker-news.firebaseio.com/v0/'
  }
}
