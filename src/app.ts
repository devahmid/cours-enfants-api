// Imports principaux
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Import des middlewares et contrôleurs
import authMiddleware from './middlewares/authMiddleware';
import { loginUser, registerUser } from './controllers/authController';
import { addEnfant } from './controllers/coursController';
import { getLeconsByNiveau, getMatieres, getNiveauxByMatiere } from './controllers/enfantController';
// import { registerUser, loginUser, addEnfant, getMatieres, getNiveauxByMatiere, getLeconsByNiveau } from './controllers';

// Initialisation de l'application
const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI as string, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));
  
// Routes d'authentification
app.post('/auth/register', registerUser);
app.post('/auth/login', async (req, res, next) => {
    try {
      await loginUser(req, res);
    } catch (error) {
      next(error);
    }
  });

// Routes des parents et enfants
app.post('/parents/:id/enfants', authMiddleware, addEnfant);

// Routes des cours
app.get('/matieres', authMiddleware, getMatieres);
app.get('/matieres/:matiereId/niveaux', authMiddleware, getNiveauxByMatiere);
app.get('/niveaux/:niveauId/lecons', authMiddleware, getLeconsByNiveau);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
