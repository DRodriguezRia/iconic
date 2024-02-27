import express, { Request, Response } from 'express';
const router = express.Router();

// Importa el controlador de autenticación
import { registerUser, loginUser } from '../controllers/auth.controller';

// Ruta para el registro de usuarios
router.post('/register', registerUser);

// Ruta para el inicio de sesión
router.post('/login', loginUser);

export default router;
