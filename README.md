# node-express-server-test

This is a RESTful API project built with Node.js, Express.js, and MongoDB. It provides endpoints for user authentication, managing user profiles, categories, questions, and more.

## Requirements
- Node.js
- MongoDB
- npm or yarn

## Getting Started

### Installation

    1. Clone this repository:
        git clone [<repository_url>](https://github.com/NiladriIQ/node-express-server-test)
        cd <project_folder>

    2. Install dependencies: npm install or yarn install

    3. Start the server:
        npm start
        or for development with nodemon: npm run dev


### Environment Variables
Create a `.env` file in the root of the project and add the following variables:
    DB_USERNAME=username
    DB_PASSWORD=abc123
    JWT_SECRET=your_secret_key

## API Endpoints

### Users

- **Login**
  - Method: `POST`
  - URL: `/users/login`
  - Body:
    ```json
    {
      "email": "example@example.com",
      "password": "password"
    }
    ```
- **Get All Users**
  - Method: `GET`
  - URL: `/users`

- **Add User**
  - Method: `POST`
  - URL: `/users/add`
  - Body:
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "password": "password"
    }
    ```
- **View User Profile**
  - Method: `GET`
  - URL: `/users/profile`

- **Edit User Profile**
  - Method: `PUT`
  - URL: `/users/profile`
  - Body: (any of the following)
    ```json
    {
      "username": "new_username",
      "email": "new_email@example.com",
      "profilePicture": "new_profilePicture"
    }
    ```

### Categories

- **Get All Categories**
  - Method: `GET`
  - URL: `/categories`

- **Add Category**
  - Method: `POST`
  - URL: `/categories`
  - Body:
    ```json
    {
      "name": "Category Name"
    }
    ```
- **Update Category**
  - Method: `PUT`
  - URL: `/categories/:categoryId`
  - Body:
    ```json
    {
      "name": "New Category Name"
    }
    ```

### Questions

- **Get Questions by Category**
  - Method: `GET`
  - URL: `/questions/categories/:categoryId/questions`

- **Add Questions in Bulk (CSV Import)**
  - Method: `POST`
  - URL: `/questions/bulk`
  - Body: (form-data with CSV file)
    ```
    file: <your_csv_file>
    ```

## Running Tests

To run tests, you can use the command: npm test