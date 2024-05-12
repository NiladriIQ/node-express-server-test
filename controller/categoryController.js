import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching all categories:', error);
        res.status(500).json({ error: 'An error occurred while fetching all categories' });
    }
};

export const addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        // Checking if category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category with this name already exists' });
        }

        // Creating a new category
        const newCategory = new Category({ name });

        // Saving the category to the database
        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'An error occurred while adding category' });
    }
};

export const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
        // Finding the category by categoryId
        let category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Updating category name
        category.name = name || category.name;

        // Saving the updated category
        category = await category.save();

        res.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'An error occurred while updating category' });
    }
};