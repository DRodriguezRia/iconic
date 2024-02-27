"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importa el controlador de autenticación
const auth_controller_1 = require("../controllers/auth.controller");
// Ruta para el registro de usuarios
router.post('/register', auth_controller_1.registerUser);
// Ruta para el inicio de sesión
router.post('/login', auth_controller_1.loginUser);
exports.default = router;
