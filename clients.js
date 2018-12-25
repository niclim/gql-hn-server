const axios = require('axios')
const hnUrl = require('./config').api.hnUrl

// Really rudimentary response parser
// Should really validate status codes etc
const responseParser = req => req.data

class BaseClient {
  constructor({ url, ...options }) {
    if (!url) {
      throw Error('Must specify a base url')
    }
    this.parser = options.parser || responseParser
    this.baseUrl = url
  }

  async get(path, options) {
    return responseParser(await axios.get(`${this.baseUrl}${path}`, options))
  }
}

class HNClient extends BaseClient {
  constructor(options) {
    super({
      url: hnUrl,
      ...options
    })
  }
}

module.exports = {
  HNClient: new HNClient()
}
