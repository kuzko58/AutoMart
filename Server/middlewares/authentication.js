import jwt from 'jsonwebtoken';

const generateToken = ({
  id, firstName, lastName, email, address, isAdmin, password
}) => new Promise((resolve) => {
  const token = jwt.sign({
    id, email, isAdmin, iss: 'AutoMart',
  }, process.env.secret_key, { expiresIn: '24h' });
  resolve({
    token, id, firstName, lastName, email, address, password
  });
});

const verifyToken = (req, res, next) => {
  const tokenBearer = req.headers.authorization.split(' ')[1];
  const token = req.get('x-access-token') || tokenBearer;
  jwt.verify(token, process.env.secret_key, (err, decoded) => {
    if (err) res.status(403).json(err);
    else {
      req.decoded = decoded;
      next();
    }
  });
};

const identify = (req, res, next) => {
  if (req.decoded.isAdmin) next();
  else res.status(401).send('unauthorized');
};

export default { generateToken, verifyToken, identify };
