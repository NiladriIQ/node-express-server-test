import Question from "../models/Question.js";
import Category from "../models/Category.js";
import csvParser from "csv-parser";
import fs from 'fs';

export const getQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Checking if category exists
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    // Finding questions by category
    const questions = await Question.find({ categories: categoryId });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions by category:', error);
    res.status(500).json({ error: 'An error occurred while fetching questions by category' });
  }
};

export const addQuestionsBulk = async (req, res) => {
  const { file } = req;

  try {
    const questions = [];
    const categories = {};

    // Reading the CSV file and parseing data
    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on('data', async (row) => {
        // Adding category if it doesn't exist
        const categoryNames = row.categories.split(',');
        for (let categoryName of categoryNames) {
          categoryName = categoryName.trim();
          if (!categories[categoryName]) {
            const category = new Category({ name: categoryName });
            await category.save();
            categories[categoryName] = category._id;
          }
        }

        // Creating question
        const question = new Question({
          content: row.content,
          categories: categoryNames.map(cat => categories[cat.trim()]),
        });
        questions.push(question);
      })
      .on('end', async () => {
        // Inserting questions in bulk
        await Question.insertMany(questions);
        res.json({ message: 'Questions added successfully' });
      });
  } catch (error) {
    console.error('Error adding questions in bulk:', error);
    res.status(500).json({ error: 'An error occurred while adding questions in bulk' });
  }
};

