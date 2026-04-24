import { Router } from 'express';
import * as usersController from '../controllers/users.controllers.js';

const router = Router();


router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUserById)

export default router;