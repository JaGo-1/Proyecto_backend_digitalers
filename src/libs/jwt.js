const jwt = require("jsonwebtoken");
const dtenv = require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// genera un token JWT a partir de un payload

async function generateJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

module.exports = { generateJWT };
