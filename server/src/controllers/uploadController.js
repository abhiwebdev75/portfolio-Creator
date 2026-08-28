import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided (field name must be "image")');
  }

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  });

  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
  });
});