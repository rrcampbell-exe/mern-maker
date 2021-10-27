const generateModelsIndex = () => {
  return `const User = require('./User');

module.exports = { User }  
  `
}

module.exports = generateModelsIndex;