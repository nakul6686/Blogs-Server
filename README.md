# Blog API

## Purpose

The purpose of this project is to create a RESTful API for a blog application. It provides endpoints for adding, updating, and deleting blogs, registering and logging in users and adding comments to blogs.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)
  - mongoose(for schema Validation)
  - Joi (for request validation)
  - Bcrypt (for password hashing)

## Features

- **User Management**:
  - Register User: Users can register for an account.
  - Login User: Registered users can log in to their accounts.
  - Update User: Logged-in users can update their profile information.
- **Blog Management**:
  - Add Blog: Logged-in users can add new blogs.
  - Update Blog: Logged-in users can update their own blogs.
  - Delete Blog: Logged-in users can delete their own blogs.
- **Comment Management**:
  - Add Comment: Logged-in users can add comments to blogs.

## API Endpoints

- `/api/register`: POST endpoint to register a new user.
- `/api/login`: POST endpoint to log in an existing user.
- `/api/users/:userId`: PUT endpoint to update user profile.
- `/api/blogs`: 
  - POST endpoint to add a new blog.
  - GET endpoint to retrieve all blogs.
- `/api/blogs/:blogId`: 
  - PUT endpoint to update a blog.
  - DELETE endpoint to delete a blog.
- `/api/blogs/:blogId/comments`: 
  - POST endpoint to add a comment to a blog.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up your MongoDB database in MongoDB Atlas.
4. Create a `.env` file in the root folder.
5. Add the following variables to the `.env` file:
   ```code
   DB_URL_STRING=YourMongoDBConnectionStringHere
   PORT=YourDesiredPort

## Contribution

This project is open to contributions. If you have any suggestions, bug fixes, or enhancements, feel free to open an issue or create a pull request.

## Author Details

This project is authored by [Your Name]. You can contact the author at [your-email@example.com].

## Tags

- Backend Development
- Node.js
- Express.js
- MongoDB
- RESTful API

## Disclaimer

This project is for educational purposes only. It is not intended for production use.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to explore and learn from this project. If you have any questions or feedback, don't hesitate to reach out. Happy coding! 🚀
