import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

// Field name must be "image"
router.post('/', protect, upload.single('image'), uploadImage);

export default router;
