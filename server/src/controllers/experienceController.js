import Experience from '../models/Experience.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/experience  (public)
export const listExperience = asyncHandler(async (req, res) => {
  const items = await Experience.find().sort({ current: -1, startDate: -1 });
  res.json(items);
});

// POST /api/experience  (protected)
export const createExperience = asyncHandler(async (req, res) => {
  const item = await Experience.create(req.body);
  res.status(201).json(item);
});

// PUT /api/experience/:id  (protected)
export const updateExperience = asyncHandler(async (req, res) => {
  const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Experience not found');
  }
  res.json(item);
});

// DELETE /api/experience/:id  (protected)
export const deleteExperience = asyncHandler(async (req, res) => {
  const item = await Experience.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Experience not found');
  }
  res.json({ message: 'Deleted' });
});
