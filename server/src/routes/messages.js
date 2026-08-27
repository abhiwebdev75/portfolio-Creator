import { Router } from 'express';
import { body } from 'express-validator';
import {
  createMessage,
  listMessages,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters'),
  ],
  createMessage
);

router.get('/', protect, listMessages);
router.patch('/:id', protect, updateMessage);
router.delete('/:id', protect, deleteMessage);

export default router;
