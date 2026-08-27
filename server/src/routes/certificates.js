import { Router } from 'express';
import {
  listCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', listCertificates);
router.post('/', protect, createCertificate);
router.put('/:id', protect, updateCertificate);
router.delete('/:id', protect, deleteCertificate);

export default router;
