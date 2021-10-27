const generateSchemasIndex = () => {
  return `const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };
  `
}

module.exports = generateSchemasIndex