# Blog API

## Purpose

This RESTful API is designed for a blog application, enabling functionalities such as user registration and login, blog posting, editing, deletion, and commenting. It's crafted using modern backend technologies to offer a comprehensive platform for developers and content creators alike.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM for database management)
  - Joi (for request validation)
  - Bcrypt (for password hashing)

## Features

- **User Management**:
  - Register User: Enables new users to sign up.
  - Login User: Allows existing users to log in.
  - Update User: Users can update their profile details.
- **Blog Management**:
  - Add Blog: Users can create new blog posts.
  - Update Blog: Users can modify their existing blog posts.
  - Delete Blog: Users can remove their blog posts.
- **Comment Management**:
  - Add Comment: Users can comment on blog posts.

## API Endpoints

- **User Authentication**:
  - `/auth/user/register` - POST: Register a new user.
  - `/auth/user/login` - POST: Log in an existing user.
  - `/auth/user/update` - PUT: Update a user's profile.
- **Blogs**:
  - `/blog/create` - POST: Create a new blog.
  - `/blog/getById/:id` - GET: Retrieve a blog by ID.
  - `/blog/delete/:user/:id` - DELETE: Delete a blog by user and blog ID.
  - `/blog/update` - PUT: Update a blog.
  - `/blog` - GET: Fetch blogs with filtering and pagination options.
- **Comments**:
  - `/comments/create` - POST: Add a comment to a blog.
- Get HomeData (to get data of all categories "Banner", "Travel", "News", "Sports", "Educative")
  - `application/appData`: Get Endpoint to get home data.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- A MongoDB Atlas account for database management

### Setup Instructions

1. **Clone the Repository**
   - Clone this repo to your local machine using `git clone https://github.com/nakul6686/Blogs-Server.git`.
   
2. **Install Dependencies**
   - Navigate to the cloned repository folder and run `npm install` to install the required dependencies.
   
3. **Set Up MongoDB**
   - Create a database in MongoDB Atlas and obtain your connection string.
   
4. **Environment Variables**
   - In the root of your project, create a `.env` file and include the following:
     ```
     DB_URL_STRING=YourMongoDBConnectionString
     PORT=YourPreferredPortNumber
     ```
   
5. **Start the Server**
   - Execute `npm start` to run the server. The console should display a message indicating that the server is running and connected to MongoDB.

6. **Testing API Endpoints**
   - Use Postman or any other API testing tool to interact with the API endpoints. Ensure you set `Content-Type: application/json` in the headers for requests that require a body payload.

## API Endpoints Overview

Ensure you are sending the `Content-Type: application/json` header with all requests. Note: You can update and delete the blogs or comments only if you have created them.

### User Authentication

- **Register User**
  - Endpoint: `/auth/user/register`
  - Method: POST
  - Description: Register a new user. You can register with or without a user image.
  - Request Body (without image):
    ```json
    {
      "userEmail": "someone@gmail.com",
      "userPassword": "**********",
      "userName": "Nakul Rathore",
      "userNumber": "8899637434"
    }
    ```
  - Request Body (with image):
    ```json
    {
      "userEmail": "someone@gmail.com",
      "userPassword": "**********",
      "userName": "Nakul Rathore",
      "userNumber": "8899637654",
      "userImage": {
        "name": "something.jpg",
        "type": "JPEG/jpg",
        "size": "0.1kb",
        "url": "yourstruly.com"
      }
    }
    ```

- **Login User**
  - Endpoint: `/auth/user/login`
  - Method: POST
  - Description: Log in an existing user.
  - Request Body:
    ```json
    {
      "userEmail": "someone@gmail.com",
      "userPassword": "********"
    }
    ```

- **Update User**
  - Endpoint: `/auth/user/update`
  - Method: PUT
  - Description: Update an existing user's details.
  - Request Body:
    ```json
    {
      "id": "SomeUserId", 
      "currentUserId": "LoggedUserID",
      "userEmail": "namestey@gmail.com",
      "userName": "99 bnmAcraes"
    }
    ```

### Blog Management

- **Create Blog**
  - Endpoint: `/blog/create`
  - Method: POST
  - Description: Create a new blog post.
  - Request Body:
    ```json
    {
      "title": "Sports Event is here",
      "desc": "To handle time series data in Mongoose",
      "user": "LoggedUserId",
      "image": {
        "name": "something.jpg",
        "type": "JPEG/jpg",
        "size": "0.1kb",
        "url": "yourstruly.com"
      },
      "category": "Sports"
    }
    ```

- **Get Blog by ID**
  - Endpoint: `/blog/getById/:id`
  - Method: GET
  - Description: Retrieve a specific blog by its ID. Replace `:id` with the actual blog ID in the URL.

- **Delete Blog**
  - Endpoint: `/blog/delete/:user/:id`
  - Method: DELETE
  - Description: Delete a blog based on the blog ID and the user ID who owns the blog. Replace `:userId` and `:id` with the actual user ID and blog ID.

- **Update Blog**
  - Endpoint: `/blog/update`
  - Method: PUT
  - Description: Update a blog post by its ID.
  - Request Body:
    ```json
    {
      "title": "Updated Title is here yay...",
      "user": "65d3370aacac271f3182bd98",
      "id": "65dc8f81b2edc66d91d93880"
    }
    ```

- **Fetch Blogs with Filters**
  - Endpoint: `/blog?page=1&limit=120&category=Educative&user=65d3370aacac271f3182bd98`
  - Method: GET
  - Description: Fetch blogs with pagination and filtering options.
  - **NOTE** : You can add one more param `searchText` to filter based on blog title. e.g(searchText=above)

### Comment Management

- **Create Comment**
  - Endpoint: `/comments/create`
  - Method: POST
  - Description: Add a comment to a blog.
  - Request Body:
    ```json
    {
      "text": "Blog is gonna here",
      "user": "65d33730acac271f3182bd9b",
      "blog": "65d3370aacac271f3182bd98"
    }
    ```

### Home Data

- **Get Home Data**
  - Endpoint: `/application/appData`
  - Method: GET
  - Description: Fetch home data, including the latest 4 blogs of each category except Banner. Banner will send only one latest blog. Currently, available categories are Educative, News, Banner, Sports, and Travel. Dynamic categories will be supported in future releases.


## Contribution

This project is open to contributions. If you have any suggestions, bug fixes, or enhancements, feel free to open an issue or create a pull request.

## Author Details

This project is authored by Nakul Singh. You can contact the author at css.nakul@gmail.com.

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
