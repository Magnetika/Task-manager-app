# Task Manager App

Full-stack task manager application with JWT authentication, an Express backend, a React frontend, SQLite persistence, and Playwright end-to-end tests.

## Features

- User registration and login
- JWT-protected todo API
- Create, list, update, and delete todos
- React client for authentication and todo management
- SQLite database created automatically on first start
- Playwright E2E tests for auth and todo flows

## Tech Stack

- Backend: Node.js, Express, SQLite, JWT, bcrypt
- Frontend: React, axios, react-scripts
- Testing: Playwright

## Project Structure

```text
.
├── client/                       # React frontend
├── db/                           # SQLite setup and database file
├── middleware/                   # Express middleware
├── routes/                       # Auth and todo API routes
├── task-manager-tests/           # Playwright E2E tests
├── server.js                     # Backend entry point
├── package.json                  # Backend scripts and dependencies
└── Task Manager API.postman_collection.json
```

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Clone the repository.

```bash
git clone https://github.com/Magnetika/Task-manager-app.git
cd Task-manager-app
```

2. Install backend dependencies.

```bash
npm install
```

3. Install frontend dependencies.

```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the project root.

```env
JWT_SECRET=your-secret-key
PORT=5000
```

`PORT` is optional. If it is not set, the backend starts on `5000`.

## Running the Application

Start the backend from the project root:

```bash
npm start
```

Start the frontend in a second terminal:

```bash
cd client
npm start
```

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

The frontend API connector is currently configured to call `http://localhost:5000/api`.

## Available Scripts

Backend scripts from the project root:

- `npm start` starts the Express server
- `npm run dev` starts the backend with nodemon

Frontend scripts from `client/`:

- `npm start` starts the React development server
- `npm run build` creates a production build
- `npm test` runs the React test runner

## API Overview

Base API path: `http://localhost:5000/api`

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`

Todos:

- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

Todo endpoints require an `Authorization: Bearer <token>` header.

## Database

The application uses SQLite and creates the required tables automatically. The local database file is stored at `db/database.sqlite` after the first backend startup.

## Testing

Playwright tests are located in `task-manager-tests/`.

To run them locally:

1. Start the backend on port `5000`.
2. Start the frontend on port `3000`.
3. Run:

```bash
npx playwright test
```

The repository also contains a Postman collection: `Task Manager API.postman_collection.json`.

## CI

The repository includes a GitHub Actions workflow under `.github/workflows/ci.yml` for automated install and application checks.

## License

ISC