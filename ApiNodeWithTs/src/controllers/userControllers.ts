import { Request, Response } from 'express';
import  UserModel from '../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const privateKey: string | undefined = process.env.KEY;

// Insérer un utilisateur
const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Générer un sel sécurisé
    const salt = await bcrypt.genSalt(10);

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const user = new UserModel({
      nom: req.body.nom,
      email: req.body.email,
      password: hashedPassword,
      image: req.body.image,
    });

    // Enregistrer l'utilisateur dans la base de données
    await user.save();

    console.log('User added successfully!');
    res.status(201).json({ user });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
};

//Connect user

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const userDoc = await UserModel.findOne({ email });

    if (!userDoc) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    const passwordMatch: boolean = await bcrypt.compare(password, userDoc.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: userDoc.id }, privateKey || '', {});
      res.cookie('token', token, { httpOnly: true }).json({ message: 'Connecté avec succès' });
    } else {
      res.status(401).json({ message: 'Mot de passe incorrect' });
    }
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    res.status(500).json({ message: 'Erreur de serveur' });
  }
};

const userSection = (req: Request, res: Response): void => {
  const { token } = req.cookies;
  res.json(token);
}

const userAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDocs = await UserModel.find({});
    res.json(userDocs);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs' });
  }
}

const userControllers={
  addUser,
  loginUser,
  userSection,
  userAll
};

export default userControllers;





