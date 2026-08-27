import { validationResult } from 'express-validator';
import Message from '../models/Message.js';
import asyncHandler from '../utils/asyncHandler.js';

// POST /api/messages  (public) — contact-form submission
export const createMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { name, email, subject, message } = req.body;
  await Message.create({ name, email, subject, message });
  res.status(201).json({ message: 'Thanks! Your message has been sent.' });
});

// GET /api/messages  (protected)
export const listMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// PATCH /api/messages/:id  (protected) — mark read/unread
export const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { read: req.body.read ?? true },
    { new: true }
  );
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json(message);
});

// DELETE /api/messages/:id  (protected)
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json({ message: 'Deleted' });
});
