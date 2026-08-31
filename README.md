# ApplyTrack – Job Application Tracker

ApplyTrack is a full-stack web application that helps users manage and track their job applications in one place.

Users can create an account, securely log in, and manage their job applications by adding, editing, deleting, and tracking application statuses.

The application uses **JWT-based authentication**, **PostgreSQL**, and a **React + Node.js** architecture. The complete application can also be run locally using **Docker Compose**.

---

## Features

### Authentication

* User registration and login
* Password hashing using `bcryptjs`
* JWT-based authentication
* Protected API routes using authentication middleware
* User-specific application data

### Job Application Management

* Add job applications
* Edit existing applications
* Delete applications
* View all applications belonging to the logged-in user
* Track application status
* Add notes and application dates

Supported application statuses:

* `Applied`
* `Interview`
* `Rejected`
* `Offer`

### Dashboard

* View all job applications in a table
* Track application status
* Color-coded status badges
* Manage applications from a centralized dashboard

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS v4
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JSON Web Token (`jsonwebtoken`)
* bcryptjs

### Database

* PostgreSQL 15

### Development & Tools

* Docker
* Docker Compose
* Postman / Thunder Client
* DBeaver
* Git & GitHub

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   React + Vite      │
                    │      Port 5173      │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │ Node.js + Express   │
                    │      Port 5000      │
                    └──────────┬──────────┘
                               │
                               │ PostgreSQL
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Port 5432      │
                    └─────────────────────┘
```

When running with Docker Compose, all three services communicate through a dedicated Docker network.

---

## Project Structure

```text
JOBAPPLYTRACK/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── applicationController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── applicationRoutes.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddApplication.jsx
│   │   │   └── EditApplication.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
└── README.md
```

---

## Database Schema

### `users`

| Column       | Type      | Description           |
| ------------ | --------- | --------------------- |
| `id`         | SERIAL    | Primary key           |
| `name`       | VARCHAR   | User name             |
| `email`      | VARCHAR   | Unique email          |
| `password`   | VARCHAR   | Hashed password       |
| `created_at` | TIMESTAMP | Account creation date |

### `applications`

| Column         | Type      | Description                         |
| -------------- | --------- | ----------------------------------- |
| `id`           | SERIAL    | Primary key                         |
| `company`      | VARCHAR   | Company name                        |
| `role`         | VARCHAR   | Job role                            |
| `status`       | VARCHAR   | Application status                  |
| `applied_date` | DATE      | Date the application was submitted  |
| `notes`        | TEXT      | Optional notes                      |
| `user_id`      | INTEGER   | Foreign key referencing `users(id)` |
| `created_at`   | TIMESTAMP | Record creation date                |

### Relationship

```text
users
  │
  │ 1
  │
  │
  │ many
  ▼
applications
```

One user can have multiple job applications.

Applications are associated with their respective users using `user_id`.

---

## API Reference

### Base URL

```text
http://localhost:5000/api
```

### Authentication

| Method | Endpoint         | Description           | Authentication |
| ------ | ---------------- | --------------------- | -------------- |
| POST   | `/auth/register` | Register a new user   | No             |
| POST   | `/auth/login`    | Login and receive JWT | No             |

### Applications

| Method | Endpoint            | Description                         | Authentication |
| ------ | ------------------- | ----------------------------------- | -------------- |
| GET    | `/applications`     | Get applications for logged-in user | Yes            |
| POST   | `/applications`     | Create a new application            | Yes            |
| PUT    | `/applications/:id` | Update an application               | Yes            |
| DELETE | `/applications/:id` | Delete an application               | Yes            |

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Local Development

## Prerequisites

Install the following:

* Node.js
* npm
* PostgreSQL
* Git
* DBeaver (optional)
* Docker Desktop (for Docker setup)

---

## 1. Clone the Repository

```bash
git clone <repo-url>
cd JOBAPPLYTRACK
```

---

## 2. Database Setup

Create a PostgreSQL database named:

```text
applytrack
```

Then create the required tables:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    company VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    status VARCHAR(50) DEFAULT 'Applied',
    applied_date DATE,
    notes TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 3. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=applytrack

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 4. Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# Running with Docker

ApplyTrack can also be run using Docker Compose.

The Docker setup contains three services:

```text
Frontend
   │
   ▼
Backend
   │
   ▼
PostgreSQL
```

### Services

| Service    | Container                | Port   |
| ---------- | ------------------------ | ------ |
| Frontend   | `jobapplytrack-frontend` | `5173` |
| Backend    | `jobapplytrack-backend`  | `5000` |
| PostgreSQL | `jobapplytrack-postgres` | `5432` |

The services communicate through the Docker network:

```text
jobapplytrack-network
```

PostgreSQL data is persisted using the Docker volume:

```text
jobapplytrack-data
```

---

## Start the Application

From the project root:

```bash
docker compose up --build
```

After the containers start:

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:5000
```

### PostgreSQL

```text
localhost:5432
```

---

## Stop the Application

```bash
docker compose down
```

This stops and removes the containers while keeping the PostgreSQL volume.

---

## Remove Containers and Database Data

```bash
docker compose down -v
```

> **Warning:** `-v` removes the PostgreSQL Docker volume and therefore deletes the database data stored in that volume.

---

## Docker Health Check

The PostgreSQL service uses a health check:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 10s
  timeout: 5s
  retries: 5
```

The backend waits for PostgreSQL to become healthy before starting.

This prevents the backend from attempting to connect to PostgreSQL before the database is ready.

---

## Docker Networking

Inside Docker, services communicate using their **service/container names**, rather than `localhost`.

For example:

```text
Backend → postgres:5432
```

rather than:

```text
Backend → localhost:5432
```

This is because `localhost` inside the backend container refers to the backend container itself.

---

# Environment Variables

Environment files contain sensitive configuration and should not be committed to Git.

### Backend

```env
PORT=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
JWT_SECRET=
FRONTEND_URL=
```

### Frontend

```env
VITE_API_URL=
```

Make sure `.env` files are included in `.gitignore`.

---

# Testing

The REST APIs can be tested using:

* Postman
* Thunder Client

Typical authentication flow:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Send JWT with Authorization header
   ↓
Access protected application APIs
```

Example authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Deployment

The application is designed to be deployable using separate services for the frontend, backend, and database.

A planned deployment architecture is:

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Frontend    │
              │     Vercel      │
              └────────┬────────┘
                       │
                       │ HTTPS API
                       ▼
              ┌─────────────────┐
              │     Backend     │
              │     Render      │
              │     Docker      │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   PostgreSQL    │
              │  Managed DB     │
              └─────────────────┘
```

For production deployment:

* Use a managed PostgreSQL database.
* Deploy the backend as a Docker-based web service.
* Deploy the frontend as a production Vite build.
* Configure production environment variables through the hosting providers.
* Configure CORS to allow requests from the deployed frontend.
* Never expose database passwords or JWT secrets in the repository.

---

# Security Considerations

* Passwords are hashed before being stored.
* JWT is used for authenticated API access.
* Protected routes verify authentication tokens.
* Database credentials are stored in environment variables.
* `.env` files are excluded from Git.
* Production secrets should be configured through the hosting platform rather than committed to source control.
* JWT tokens should not be logged in production.

---

# Future Improvements

Planned improvements include:

* Application search and filtering
* Pagination
* Application statistics
* Improved dashboard analytics
* Email reminders for application follow-ups
* Resume management
* Job application deadline tracking
* CI/CD pipeline
* Automated testing

---

# Author

**Abhiraj Das**

GitHub: [github.com/dasabhi22](https://github.com/dasabhi22)
