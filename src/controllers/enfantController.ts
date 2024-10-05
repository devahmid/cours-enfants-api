// controllers/coursController.ts
import { Request, Response } from 'express';
import { Matiere } from '../models/Matiere';
import { Niveau } from '../models/Niveau';
import { Lecon } from '../models/Lecon';

export const getMatieres = async (req: Request, res: Response) => {
  try {
    const matieres = await Matiere.find();
    res.send(matieres);
  } catch (error) {
    res.status(400).send('Erreur lors de la récupération des matières : ' + (error as Error).message);
  }
};

export const getNiveauxByMatiere = async (req: Request, res: Response) => {
  try {
    const { matiereId } = req.params;
    const niveaux = await Niveau.find({ matiereId });
    res.send(niveaux);
  } catch (error) {
    res.status(400).send('Erreur lors de la récupération des niveaux : ' + (error as Error).message);
  }
};

export const getLeconsByNiveau = async (req: Request, res: Response) => {
  try {
    const { niveauId } = req.params;
    const lecons = await Lecon.find({ niveauId });
    res.send(lecons);
  } catch (error) {
    res.status(400).send('Erreur lors de la récupération des leçons : ' + (error as Error).message);
  }
};