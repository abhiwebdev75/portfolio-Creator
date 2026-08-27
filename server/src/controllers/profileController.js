import Profile from '../models/Profile.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/profile  (public) — returns the single profile, creating a default if needed
export const getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  res.json(profile);
});

// PUT /api/profile  (protected) — upsert the single profile document
export const updateProfile = asyncHandler(async (req, res) => {
  const allowed = [
    'name',
    'headline',
    'bio',
    'location',
    'email',
    'avatarUrl',
    'resumeUrl',
    'socials',
  ];
  const update = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) update[key] = req.body[key];
  }

  const profile = await Profile.findOneAndUpdate({}, update, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  });

  res.json(profile);
});
