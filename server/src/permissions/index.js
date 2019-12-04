const { rule, shield, allow } = require('graphql-shield')
const { getUserId } = require('../utils')

const rules = {
  isAuthenticated: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
}

const permissions = shield({
  Query: {
    me: rules.isAuthenticated,
    filterPosts: allow,
    post: allow,
    feed: allow,
  },
  Mutation: {
    createDraft: rules.isAuthenticated,
    deletePost: rules.isAuthenticated,
    publish: rules.isAuthenticated,
    updatePost: allow,
  },
})

module.exports = {
  permissions,
}
