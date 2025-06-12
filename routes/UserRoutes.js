import { Router } from 'express';
const router = Router();

import UsersController from '../controllers/UsersController.js';

const usersController = new UsersController();

// CRUD Routes
router.post('/users', usersController.addAction); // Creacion de usuario

export default router;