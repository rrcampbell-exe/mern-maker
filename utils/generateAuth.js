const generateAuth = () => {
  return `const jwt = require("jsonwebtoken");

const secret = "8675309didyoueverhearthetragedyofdarthplagueisthewisePLEASEputYOURownSECREThere";
const expiration = "24h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function({ req }) {
    // permits token to be sent via any of the below
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    // separate "Bearer" from the value of the token itself
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }
  
    // if no token has been provided, return request object as is
    if (!token) {
      return req;
    }
  
    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('This token is invalid. You shall not pass.');
    }
  
    // return updated request object
    return req;
  }
};
  `
}

module.exports = generateAuth;