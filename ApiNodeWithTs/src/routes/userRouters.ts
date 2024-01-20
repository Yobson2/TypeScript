import express, { Request, Response, Router } from 'express';
import userControllers from '../controllers/userControllers';

const router: Router = express.Router();


// Insérer un utilisateur
router.post('/register', userControllers.addUser);

// Connecter un utilisateur
router.post('/login', userControllers.loginUser);

// Profil de l'utilisateur
router.get('/profile', userControllers.userSection);

// Profil de l'utilisateur
router.get('/all', userControllers.userAll);
export default router;
