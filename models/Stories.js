const { HNClient } = require('../clients')
const { omit } = require('lodash')

class Stories {
  async _getStoryIds(type) {
    try {
      return await HNClient.get(`/${type}stories.json`)
    } catch (e) {
      console.error(e)
      return []
    }
  }

  // Basically the same as Comment.get but want to explicitly split up
  // Since they are treated differntly
  async getStory(id) {
    try {
      return await HNClient.get(`/item/${id}.json`)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  async getStories(type, limit) {
    const ids = await this._getStoryIds(type)
    const stories = ids
      .slice(0, limit)
      .map(id => this.getStory(id).then(x => omit(x, 'kids')))
    return await Promise.all(stories)
  }
}

module.exports = Stories
