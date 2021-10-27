const generateTypeDefs = () => {
  return `// import gql function (tagged template)
const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql\`

  type User {
    _id: ID
    username: String
    email: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }

\`;

// export typeDefs
module.exports = typeDefs;
  
  
  `
}

module.exports = generateTypeDefs;