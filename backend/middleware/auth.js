const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.JWTSecret);
    const userIdFromToken = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userIdFromToken) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('Unauthorized request.')
    });
  }
};