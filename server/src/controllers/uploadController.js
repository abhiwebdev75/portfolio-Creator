import asyncHandler from '../utils/asyncHandler.js';

// POST /api/upload  (protected) — accepts a single "image" file, returns its URL
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided (field name must be "image")');
  }
  // Relative URL so it works through the dev proxy and in production alike
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});
