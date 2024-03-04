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

- `/auth/user/register`: POST endpoint to register a new user.
- `/auth/user/login`: POST endpoint to log in an existing user.
- `/auth/user/update`: POST endpoint to update user profile.
- API for Blogs
  - `/blog/create`: Post endpoint to create new blog.
  - `/blog/getbyId/:id`: GET endpoint to get specific blog by id.
  - `/blog/delete/:user/:id`: DELETE endpoint to delete the blog based on userid and id og specific blog.
  - `blog/update`: PUT endpont to update the blog.
  - `blog?page=1&limit=120&category=Educative&userId=65d3370aacac271f3182bd98`: GET endpoint the to get all blogs,to filter and paginate.
- Comments API 
  - `comments/create`: POST endpoint to create
- Get HomeData (to get data of all categories "Banner", "Travel", "News", "Sports", "Educative")
  - `application/appData`: Get Endpoint to get home data.


## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up your MongoDB database in MongoDB Atlas.
4. Create a `.env` file in the root folder.
5. Add the following variables to the `.env` file:
   <div>
   <pre style="background-color: #000000; color: #ffffff; padding: 10px; border-radius: 5px;">
   DB_URL_STRING=YourMongoDBConnectionStringHere
   PORT=YourDesiredPort
   </pre>
   </div>
6. Start the server by running `npm start`.
7. Access the API endpoints using a tool like Postman or integrate them into your frontend application.

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
