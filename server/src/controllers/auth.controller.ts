import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

// Función para registrar un nuevo usuario
export async function registerUser(req: Request, res: Response) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Responder con un mensaje de éxito
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
}

// Función para iniciar sesión
export async function loginUser(req: Request, res: Response) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { email, password } = req.body;

        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Autenticación exitosa, responder con algún token JWT u otra forma de autenticación
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

