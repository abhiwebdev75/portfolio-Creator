import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Project from './models/Project.js';
import Certificate from './models/Certificate.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sourceBaseUrl = (process.env.PUBLIC_SERVER_URL || '').replace(/\/$/, '');

if (!sourceBaseUrl) {
  throw new Error('PUBLIC_SERVER_URL must be set to the current Render API URL');
}

async function migrateModel(Model, label) {
  const items = await Model.find({ imageUrl: /^\/uploads\// });

  for (const item of items) {
    const sourceUrl = `${sourceBaseUrl}${item.imageUrl}`;
    try {
      const result = await cloudinary.uploader.upload(sourceUrl, {
        folder: 'portfolio',
        resource_type: 'image',
      });

      await Model.updateOne({ _id: item._id }, { $set: { imageUrl: result.secure_url } });
      console.log(`${label}: migrated ${item._id}`);
    } catch (error) {
      console.error(`${label}: skipped ${item._id} (${sourceUrl}) - ${error.message}`);
    }
  }

  console.log(`${label}: ${items.length} image(s) migrated`);
}

try {
  await connectDB();
  await migrateModel(Project, 'Projects');
  await migrateModel(Certificate, 'Certificates');
} finally {
  await mongoose.disconnect();
}