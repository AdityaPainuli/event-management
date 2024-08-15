// src/api/index.ts
import { Router } from 'express';
import authRouter from './auth';
import eventsRouter from './event';

const router = Router();

router.use('/auth', authRouter);
router.use('/events', eventsRouter);

export default router;
