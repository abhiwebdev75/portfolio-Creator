import { Router } from 'express';

import {
  generateHeroImages,
  selectHeroImage,
} from '../controllers/heroController.js';

import { protect } from '../middleware/auth.js';

import upload from '../middleware/upload.js';

const router = Router();

router.post(
  '/generate',
  protect,
  upload.single('image'),
  generateHeroImages
);

router.post(
  '/select',
  protect,
  selectHeroImage
);

export default router;