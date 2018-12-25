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

  async getItem(id) {
    try {
      return await this.get(`/item/${id}.json`)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  async getUser(id) {
    try {
      return await this.get(`/user/${id}.json`)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  async getStoryIds(type) {
    try {
      return await this.get(`/${type}stories.json`)
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

module.exports = {
  HNClient: new HNClient()
}
