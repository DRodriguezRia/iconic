"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Función para registrar un nuevo usuario
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { username, email, password } = req.body;
            // Verificar si el usuario ya existe
            const existingUser = yield user_model_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }
            // Hash de la contraseña
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Crear un nuevo usuario
            const newUser = new user_model_1.default({
                username,
                email,
                password: hashedPassword
            });
            // Guardar el nuevo usuario en la base de datos
            yield newUser.save();
            // Responder con un mensaje de éxito
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        }
        catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error al registrar usuario' });
        }
    });
}
exports.registerUser = registerUser;
// Función para iniciar sesión
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { email, password } = req.body;
            // Buscar al usuario por su correo electrónico
            const user = yield user_model_1.default.findOne({ email });
            // Verificar si el usuario existe
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            // Verificar la contraseña
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            // Autenticación exitosa, responder con algún token JWT u otra forma de autenticación
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    });
}
exports.loginUser = loginUser;
