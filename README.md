# Task Manager App

A simple Node.js application for managing tasks (todos) with authentication.

## Features
- User authentication (JWT-based)
- CRUD operations for todos
- Modular structure (routes, middleware, database)

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

## Setup
1. Clone the repository:
	 ```bash
	 git clone https://github.com/Magnetika/Task-manager-app.git
	 ```
2. Navigate to the project directory:
	 ```bash
	 cd Task-manager-app
	 ```
3. Install dependencies:
	 ```bash
	 npm install
	 ```

## Usage
Start the server:
```bash
node server.js
```

## API Endpoints
- **Authentication**
	- POST /auth/login — User login
	- POST /auth/register — User registration
- **Todos**
	- GET /todos — Get all todos
	- POST /todos — Create a new todo
	- PUT /todos/:id — Update a todo
	- DELETE /todos/:id — Delete a todo

## Dependencies
- express
- jsonwebtoken

## License
MIT