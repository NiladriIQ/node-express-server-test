import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import userRoutes from './routes/user.js';
import categoryRoutes from './routes/category.js';
import questionRoutes from './routes/question.js';
import errorHandler from './middleware/errorHandler.js';
import jwtMiddleware from './middleware/jwtMiddleware.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// MongoDB Connection
Connection(username, password);

// Middleware
app.use(errorHandler);
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwtMiddleware);

// Routes
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/questions', questionRoutes);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
