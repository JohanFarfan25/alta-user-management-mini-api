import { Router } from 'express';
const router = Router();

import UsersController from '../controllers/UsersController.js';

const usersController = new UsersController();

// CRUD Routes
router.post('/users', usersController.addAction); // Creacion de usuario
router.get('/users', usersController.getAllAction); // Obtener todos los usuarios
router.get('/users/:id', usersController.getByIdAction); // Obtener usuario por ID
router.put('/users/:id', usersController.updateAction); // Actualizar usuario por ID
router.delete('/users/:id', usersController.deleteAction); // Eliminar usuario por ID

export default router;