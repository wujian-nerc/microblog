import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

// Add user
router.route('/add').post(UserController.addUser);

// Get all user
router.route('/query').get(UserController.getUser);

export default router;
