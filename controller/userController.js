import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Checking if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password' });

    // Creating and sending JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'An error occurred while fetching all users' });
  }
};

export const addUser = async (req, res) => {
  const { username, email, password, profilePicture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } = req.body;

  try {
    // Checking if user with same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User with this email already exists' });

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture
    });

    // Saving the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'An error occurred while adding user' });
  }
};

export const viewProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching user profile' });
  }
};

export const editProfile = async (req, res) => {
  const userId = req.userId;
  const { username, email, profilePicture } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Updating user profile
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;

    // Saving updated user profile
    user = await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'An error occurred while updating user profile' });
  }
};
