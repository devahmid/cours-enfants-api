// controllers/enfantController.ts
import { Request, Response } from 'express';
import { Enfant } from '../models/Enfant';

export const addEnfant = async (req: Request, res: Response) => {
  try {
    const { nom, dateDeNaissance } = req.body;
    const { id } = req.params;
    const enfant = new Enfant({ nom, dateDeNaissance, parentId: id });
    await enfant.save();
    res.status(201).send('Enfant ajouté avec succès.');
  } catch (error) {
    res.status(400).send('Erreur lors de l\'ajout de l\'enfant : ' + (error as Error).message);
  }
};