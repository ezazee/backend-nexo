import { Router } from 'express';
import { uploadBlob } from '../controller/blob/blobController';

const router = Router();

router.post('/upload', uploadBlob);

export default router;
