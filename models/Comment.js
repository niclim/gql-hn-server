const { HNClient } = require('../clients')

class Comment {
  async getComment(id) {
    try {
      return await HNClient.get(`/item/${id}.json`)
    } catch (e) {
      console.error(e)
      return {}
    }
  }
}

module.exports = Comment
