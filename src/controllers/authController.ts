// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/user';
// import { User, IUser } from '../models/user';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = new User({ nom, prenom, email, motDePasse: hashedPassword, typeUtilisateur: 'parent' });
    await user.save();
    res.status(201).send('Utilisateur enregistré avec succès.');
  } catch (error) {
    res.status(400).send('Erreur lors de l\'inscription : ' + (error as Error).message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email }) as IUser;
    if (!user) return res.status(400).send('Email ou mot de passe incorrect.');

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) return res.status(400).send('Email ou mot de passe incorrect.');

    const token = jwt.sign({ _id: user._id, typeUtilisateur: user.typeUtilisateur }, process.env.JWT_SECRET as string);
    res.send({ token });
  } catch (error) {
    res.status(400).send('Erreur lors de la connexion : ' + (error as Error).message);
  }
};
