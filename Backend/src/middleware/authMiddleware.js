
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
};

exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
