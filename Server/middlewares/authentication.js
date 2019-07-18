import jwt from 'jsonwebtoken';

const generateToken = user => new Promise((resolve) => {
  const payload = {
    id: user.id,
    email: user.email,
    is_admin: user.is_admin,
    iss: 'AutoMart',
  };
  const token = jwt.sign(payload, process.env.secret_key, { expiresIn: '24h' });
  resolve({
    token,
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
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
  if (req.decoded.is_admin) next();
  else res.status(401).send('unauthorized');
};

export default { generateToken, verifyToken, identify };
