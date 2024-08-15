// src/api/events.ts
import express from 'express';
import prisma from '../prisma/client';
import { isAdmin } from '../middleware/auth';

const router = express.Router();

// Create Event
router.post('/', isAdmin, async (req, res) => {
  const { title, description, date, performances } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        performances: {
          create: performances,
        },
        //@ts-ignore
        createdById: req.userId,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creating event' });
  }
});

// Get Events 
// todo - add a middlware checking for an actual account
router.get('/', async (req, res) => {
  const events = await prisma.event.findMany({
    include: {
      performances: true,
    },
  });

  res.json(events);
});

export default router;
