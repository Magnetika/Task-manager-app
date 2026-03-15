# Task Manager App

This is a simple Node.js application for managing tasks (todos) with user authentication.

## Features
- JWT-based user authentication
- Create, read, update, and delete todos
- Organized project structure (routes, middleware, database)

## Project Structure
```
package.json
README.md
server.js
db/
	database.js
middleware/
	authMiddleware.js
routes/
	auth.js
	todos.js
```

## Getting Started
1. **Clone the repository:**
	 ```bash
	 git clone https://github.com/Magnetika/Task-manager-app.git
	 ```
2. **Navigate to the project directory:**
	 ```bash
	 cd Task-manager-app
	 ```
3. **Install dependencies:**
	 ```bash
	 npm install
	 ```

## Running the App
Start the server:
```bash
node server.js
```
The server will start on the default port (check server.js for details).

## API Endpoints
### Authentication
- `POST /auth/login` — User login
- `POST /auth/register` — User registration

### Todos
- `GET /todos` — Get all todos
- `POST /todos` — Create a new todo
- `PUT /todos/:id` — Update a todo
- `DELETE /todos/:id` — Delete a todo

## Dependencies
- express
- jsonwebtoken

## License
MIT