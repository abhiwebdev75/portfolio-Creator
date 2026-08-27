import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Require a valid Bearer JWT. Attaches the authenticated user to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized: no token provided');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401);
    throw new Error('Not authorized: invalid or expired token');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401);
    throw new Error('Not authorized: user no longer exists');
  }

  req.user = user;
  next();
});
