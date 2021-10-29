
const generateConnection = (response) => {
  // js to format db name based on project name
  dbName = response.title.toLowerCase()
  dbName = dbName.replace(/\s+/g, '-');

  return `const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/${dbName}', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection; 
  `
}

module.exports = generateConnection