import { Router } from 'express';
import { createTimer, getTimers } from '../controllers/timerControllers';

const router = Router();

router.post('/timers', createTimer);

router.get('/timers', getTimers);

export default router;
