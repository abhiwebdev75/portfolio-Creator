import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

function signToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });
}

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { email, password } = req.body;
  // password has select:false, so ask for it explicitly
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email },
  });
});

// GET /api/auth/me  (protected)
export const me = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.json({ user: { id: _id, name, email } });
});
