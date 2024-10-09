import { Router } from 'express';
import { createTimer, getTimers } from '../controllers/timerControllers';

const router = Router();

// Route pour créer un timer
router.post('/timers', createTimer);

// Route pour obtenir tous les timers
router.get('/timers', getTimers);

export default router;
