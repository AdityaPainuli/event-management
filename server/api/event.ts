import express from 'express';
import prisma from '../prisma/client';
import { isAdmin } from '../middleware/auth';

const router = express.Router();

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

router.get('/', async (req, res) => {
  const events = await prisma.event.findMany({
    include: {
      performances: true,
    },
  });

  res.json(events);
});


router.get('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { performances: true },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, date, performances } = req.body;

  try {
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: { title, description, date },
    });

    for (const performance of performances) {
      await prisma.performance.upsert({
        where: { id: performance.id || 0 }, 
        create: {
          title: performance.title,
          description: performance.description,
          googleFormUrl: performance.googleFormUrl,
          event: { connect: { id: Number(id) } },
        },
        update: {
          title: performance.title,
          description: performance.description,
          googleFormUrl: performance.googleFormUrl,
        },
      });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update event" });
  }
});




router.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to delete event' });
  }
});


export default router;