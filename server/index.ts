import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import mongoose from "mongoose";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const mongoUri = process.env.MONGODB_ATLAS_URI;

if (!mongoUri) {
    console.error('La URI de MongoDB no está definida en las variables de entorno.');
    process.exit(1); // Salir con un código de error
}

mongoose
    .connect(mongoUri)
    .then(() => console.info('Conectado a la base de datos'))
    .catch((error) => console.error('No se pudo conectar a la base de datos', error));

const app = express();
app.post('/login', (req: Request, res: Response) => {
    // Aquí irá la lógica para manejar la solicitud de inicio de sesión
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});




// Obtener la URI de conexión a MongoDB desde las variables de entorno
//const uri = process.env.MONGOBD_ATLAS_URI;

// Crear un cliente de MongoDB
//const client = new MongoClient(uri);

// Función para conectar a la base de datos
//async function connectToDatabase() {
    /*try {
        // Conectar al cliente de MongoDB
        await client.connect();
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}

// Llamar a la función para conectar a la base de datos
connectToDatabase();*/