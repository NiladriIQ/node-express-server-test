import express from 'express';
import { addCategory, getAllCategories, updateCategory } from '../controller/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addCategory);
router.put('/:categoryId', updateCategory);

export default router;