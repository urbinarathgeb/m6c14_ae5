import { Router } from 'express';
import * as usersController from '../controllers/users.controllers.js';
import * as val from '../middlewares/userValidation.middleware.js';

const router = Router();


router.get('/', usersController.getUsers)
router.get('/:id', val.validateId, usersController.getUserById)
router.post('/', [val.validateRequiredFields, val.validateEmail, val.validateActive], usersController.createUser)
router.delete('/:id', val.validateId, usersController.deleteUserById)
router.put('/:id', [val.validateId, val.validateRequiredFields,  val.validateEmail, val.validateActive], usersController.updateUserById)

export default router;