import { Request, Response } from 'express';
import User from '../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const privateKey : string | undefined = process.env.KEY;

// Insérer un utilisateur
const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Générer un sel sécurisé
    const salt = await bcrypt.genSalt(10);

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const user: User = new User({
      nom: req.body.nom,
      email: req.body.email,
      password: hashedPassword,
      image: req.body.image
    });

    // Enregistrer l'utilisateur dans la base de données
    await user.save();

    console.log('User added successfully!');
    res.status(200).send(user);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
}

//Connect user

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const userDoc: User | null = await User.findOne({ email });
    if (!userDoc) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const passwordMatch: boolean = await bcrypt.compare(password, userDoc.password);

    if (passwordMatch) {
      //logged in
      jwt.sign({ userId: userDoc.id }, privateKey, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json('ok');
      });
    } else {
      res.status(401).json({ message: "Mot de passe incorrect" });
    }

  } catch (error) {
    console.error("Une erreur s'est produite", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const userSection = (req: Request, res: Response): void => {
  const { token } = req.cookies;
  res.json(token);
}

export default {
  addUser,
  loginUser,
  userSection
};
