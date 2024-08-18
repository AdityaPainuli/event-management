import { Router } from 'express';
import authRouter from './auth';
import eventsRouter from './event';
import performanceRouter from './performance';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use("/user",userRouter);
router.use('/events', eventsRouter);
router.use('/performances',performanceRouter);

export default router;
