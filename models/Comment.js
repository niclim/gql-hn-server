const { HNClient } = require('../clients')

class Comment {
  async getComment(id) {
    return await HNClient.getItem(id)
  }
}

module.exports = Comment
