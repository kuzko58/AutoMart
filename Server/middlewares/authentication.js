import jwt from 'jsonwebtoken';

const generateToken = ({
  id, firstName, lastName, email, address, isAdmin, password,
}) => new Promise((resolve) => {
  const token = jwt.sign({
    id, email, isAdmin, iss: 'AutoMart',
  }, process.env.secret_key, { expiresIn: '24h' });
  resolve({
    token, id, firstName, lastName, email, address, password,
  });
});

const verifyToken = (req, res, next) => {
  const token = req.get('x-access-token') || req.get('bearer');
  jwt.verify(token, process.env.secret_key, (err, decoded) => {
    if (err) res.sendStatus(403);
    else {
      req.decoded = decoded;
      next();
    }
  });
};

const identify = (req, res, next) => {
  if (req.decoded.isAdmin) next();
  else res.sendStatus(401);
};

export default { generateToken, verifyToken, identify };
