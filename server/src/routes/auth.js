import { Router } from 'express';
import { body } from 'express-validator';
import { login, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/me', protect, me);

export default router;
