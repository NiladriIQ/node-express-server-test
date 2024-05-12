import express from 'express';
import { addUser, editProfile, getAllUsers, login, viewProfile } from '../controller/userController.js';

const router = express.Router();

router.post('/login', login);
router.get('/', getAllUsers);
router.post('/add', addUser);
router.get('/profile', viewProfile);
router.put('/profile', editProfile);

export default router;
