import Certificate from '../models/Certificate.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/certificates  (public)
export const listCertificates = asyncHandler(async (req, res) => {
  const items = await Certificate.find().sort({ order: 1, issueDate: -1 });
  res.json(items);
});

// POST /api/certificates  (protected)
export const createCertificate = asyncHandler(async (req, res) => {
  const item = await Certificate.create(req.body);
  res.status(201).json(item);
});

// PUT /api/certificates/:id  (protected)
export const updateCertificate = asyncHandler(async (req, res) => {
  const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Certificate not found');
  }
  res.json(item);
});

// DELETE /api/certificates/:id  (protected)
export const deleteCertificate = asyncHandler(async (req, res) => {
  const item = await Certificate.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Certificate not found');
  }
  res.json({ message: 'Deleted' });
});
