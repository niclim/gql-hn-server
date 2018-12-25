const { HNClient } = require('../clients')

class User {
  async getUser(id) {
    try {
      return await HNClient.get(`/user/${id}.json`)
    } catch (e) {
      console.error(e)
      return {}
    }
  }
}

module.exports = User
