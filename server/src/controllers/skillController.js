import Skill from '../models/Skill.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/skills  (public)
export const listSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });
  res.json(skills);
});

// POST /api/skills  (protected)
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(skill);
});

// PUT /api/skills/:id  (protected)
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  res.json(skill);
});

// DELETE /api/skills/:id  (protected)
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  res.json({ message: 'Deleted' });
});
