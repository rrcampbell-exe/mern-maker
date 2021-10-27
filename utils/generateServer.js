const generateServer = () => {
  return `
const express = require('express');
const path = require('path');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// declare startServer function
const startServer = async () => {
  // establish Apollo server with data from ./schemas
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });

  // Initialize server
  await server.start();

  // integrate Apollo server with Express as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log('Use GraphQL at http://localhost:' + PORT + server.graphqlPath);
};

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Initialize server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log('Server is served! Now listening on ' + PORT + '!');
  });
});
  `
}

module.exports = generateServer