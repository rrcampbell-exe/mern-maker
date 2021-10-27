const generateSeeds = () => {
  return `const faker = require('faker/locale/en_US');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});

  // create data for faked users
  const userData = [];

  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  await User.collection.insertMany(userData);

  console.log('Your seeds have been planted! 🌱');
  process.exit(0);
});  
  `
}

module.exports = generateSeeds;