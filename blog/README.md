## Blog API

This API allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts. The blog posts are stored in a MongoDB database, with each post containing a title and content. The API is built using Express.js and Mongoose for interacting with MongoDB.

## Prerequisites
Node.js: Ensure Node.js is installed on your machine.

MongoDB: You need access to a MongoDB instance (local or cloud).

Environment Variables: A .env file containing your MongoDB connection string should be created at the root of your project.

Environment Variables
Create a .env file in the root of your project with the following content:


        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
        Replace <username>, <password>, <cluster-url>, and <dbname> with your actual MongoDB credentials.

## Installation
Clone the Repository (if applicable):

        git clone <repository-url>
        Navigate to the Project Directory:

cd blog
Install Dependencies:

Run the following command to install the necessary dependencies:

        npm install

This will install the following libraries:

dotenv: For loading environment variables.

express: Web framework for Node.js.

mongoose: MongoDB ODM for Node.js.

body-parser: Middleware for parsing request bodies.

Start the Server:

Run the following command to start the server:

        node app.js

The server will be available at http://localhost:3000.

## API Endpoints

1. Retrieve All Blogs

Endpoint: GET /blogs

Description: Fetches all blogs from the MongoDB database.

Response:

200 OK: Returns a list of blogs.

500 Internal Server Error: If there's an issue with the database query.

Example Response:

        [
            {
                "title": "First Blog",
                "content": "This is the content of the first blog."
            },
            {
                "title": "Second Blog",
                "content": "This is the content of the second blog."
            }
        ]

2. Retrieve a Specific Blog by Title
   
Endpoint: POST /blogs/:blogTitle

Description: Fetches a specific blog by its title.

Path Parameters:

:blogTitle: The title of the blog to retrieve.

Response:
200 OK: Returns the blog with the specified title.

404 Not Found: If the blog with the specified title does 
not exist.

500 Internal Server Error: If there's an issue with the database query.

Example Request:


POST /blogs/First%20Blog

Example Response:

        {
            "title": "First Blog",
            "content": "This is the content of the first blog."
        }

1. Add a New Blog

Endpoint: POST /blogs

Description: Adds a new blog post to the database.

Request Body:

title (string): The title of the blog.

content (string): The content of the blog.

Response:

201 Created: Blog post was successfully created.

400 Bad Request: If the title or content fields are missing.

500 Internal Server Error: If there's an issue with the database insertion.

Example Request:

POST /blogs

Example Request Body:

        {
            "title": "New Blog",
            "content": "This is the content of the new blog."
        }

Example Response:

        {
            "message": "Blog added!",
            "blog": {
                "title": "New Blog",
                "content": "This is the content of the new blog."
            }
        }

4. Delete a Blog by Title

Endpoint: DELETE /blogs

Description: Deletes a blog post by its title.

Request Body:

title (string): The title of the blog to be deleted.

Response:

200 OK: Blog post was successfully deleted.

400 Bad Request: If the title field is missing.

404 Not Found: If no blog post with the specified title exists.

500 Internal Server Error: If there's an issue with the database deletion.

Example Request:

DELETE /blogs

Example Request Body:


        {
            "title": "New Blog"
        }

Example Response:


        {
            "message": "Blog deleted!"
        }

## Error Handling
500 Internal Server Error: Indicates a problem with database operations. Always check the server logs for more details.

400 Bad Request: This occurs when the required fields in the request body are missing or improperly formatted.

404 Not Found: When trying to retrieve or delete a blog by title, this error occurs if the blog doesn't exist.

Technologies Used

 * Node.js: JavaScript runtime environment for server-side development.
  
 * Express.js: Web framework for Node.js.
  
 * MongoDB: NoSQL database used to store blog data.
  
 * Mongoose: ODM library for MongoDB.

 * body-parser: Middleware to handle incoming request bodies.

 * dotenv: Used to load environment variables from a .env file.

## Conclusion

This simple Blog API allows users to create, read, and delete blog posts in a MongoDB database. The implementation includes error handling and validations to ensure robustness. The application can be further expanded by adding update functionality and user authentication to manage access to the API.