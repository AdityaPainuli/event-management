import { Router } from 'express';
import { isAdmin } from '../middleware/auth';
import prisma from '../prisma/client';

const router = Router();

router.put('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, formUrl } = req.body;

  try {
    const performance = await prisma.performance.update({
      where: { id: Number(id) },
      data: { title, description, googleFormUrl:formUrl },
    });
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update performance' });
  }
});

router.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.performance.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Performance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete performance' });
  }
});

export default router;
