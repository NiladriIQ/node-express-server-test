import express from 'express';
import { addQuestionsBulk, getQuestionsByCategory } from '../controller/questionController.js';

const router = express.Router();

router.get('/categories/:categoryId/questions', getQuestionsByCategory);
router.post('/questions/bulk', addQuestionsBulk);

export default router;