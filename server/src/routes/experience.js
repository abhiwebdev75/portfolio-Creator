import { Router } from 'express';
import {
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', listExperience);
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;
