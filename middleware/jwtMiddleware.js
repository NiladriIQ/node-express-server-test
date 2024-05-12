import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
  const excludedRoutes = ['/users/add', '/users/login'];
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null; // Getting token from headers

  if (!token && !excludedRoutes.includes(req.path)) return res.status(401).json({ error: 'No token provided' });

  try {
    if (!excludedRoutes.includes(req.path)) {
      // Verifying token for routes not in excludedRoutes
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // Attaching userId to request object
      req.userId = decodedToken.userId;
    }
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default jwtMiddleware;
