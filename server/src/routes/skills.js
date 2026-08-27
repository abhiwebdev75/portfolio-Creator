import { Router } from 'express';
import {
  listSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', listSkills);
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
