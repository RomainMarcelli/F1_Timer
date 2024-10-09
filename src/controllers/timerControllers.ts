import { Request, Response } from 'express';
import { Timer } from '../models/Timer';
import { Types } from 'mongoose'; 

// Créer un nouveau timer 
export const createTimer = async (req: Request, res: Response) => {
  const { timer } = req.body;

  try {
    const fakeUserId = new Types.ObjectId(); 

    const newTimer = new Timer({
      userId: fakeUserId,
      timer
    });

    await newTimer.save();
    res.status(201).json({ message: 'Timer created successfully', timer: newTimer });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};

// Obtenir tous les timers
export const getTimers = async (_req: Request, res: Response) => {
  try {
    const timers = await Timer.find();
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};
