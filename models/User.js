const { HNClient } = require('../clients')

class User {
  async getUser(id) {
    return await HNClient.getUser(id)
  }
}

module.exports = User
