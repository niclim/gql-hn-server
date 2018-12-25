const { HNClient } = require('../clients')
const { omit } = require('lodash')

class Stories {
  async _getStoryIds(type) {
    return await HNClient.getStoryIds(type)
  }

  // Basically the same as Comment.get but want to explicitly split up
  // Since they are treated differntly
  async getStory(id) {
    return await HNClient.getItem(id)
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
