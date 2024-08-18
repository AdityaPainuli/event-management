import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error verifying token or fetching user:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
