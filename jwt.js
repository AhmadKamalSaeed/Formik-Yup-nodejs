const jwt = require('jsonwebtoken');

let  userData = 100;

const token = jwt.sign(userData, secret);
const decodeToken = jwt.verify(token,secret);
console.log(token, decodeToken)