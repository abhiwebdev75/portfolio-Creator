import rateLimit from 'express-rate-limit';

// Limit login attempts to slow down brute-forcing
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
});

// Limit contact-form submissions to curb spam
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages sent. Please try again later.' },
});
