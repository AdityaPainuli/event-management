// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    req.userId = decoded.userId;   // Attach userId to the request object
    req.isAdmin = decoded.isAdmin; // Attach isAdmin to the request object

    if (req.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
