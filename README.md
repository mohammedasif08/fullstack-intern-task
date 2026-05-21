# TemplateVault

TemplateVault is a full-stack web application where users can explore modern SaaS website templates, create an account, and save their favorite templates.

This project was built as part of a Full Stack Internship Assessment to demonstrate frontend development, backend API development, authentication, and PostgreSQL database integration.

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcryptjs

## Database

- PostgreSQL

---

# Features

- User Registration & Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Browse SaaS Templates
- Search Templates
- Filter Templates by Category
- Save / Remove Favorites
- Protected Favorite Routes
- REST API Integration
- Responsive UI Design

---

# Folder Structure

```bash
fullstack-intern-task/
│
├── client/     # Frontend (React + Vite)
└── server/     # Backend (Node + Express + PostgreSQL)
```

---

# Backend Setup

## 1. Navigate to Server Folder

```bash
cd server
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=templatevault
DB_USER=postgres
DB_PASSWORD=asif***
JWT_SECRET=***
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

---

## 4. Create PostgreSQL Database

Open PostgreSQL or pgAdmin and run:

```sql
CREATE DATABASE templatevault;
```

---

## 5. Seed Database

```bash
npm run seed
```

This will create:

- Database Tables
- Sample Templates
- Demo User

---

## 6. Start Backend Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 1. Navigate to Client Folder

```bash
cd client
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Demo Login

```bash
Email: demo@templatevault.dev
Password: demo1234
```

---

# API Routes

## Authentication Routes

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

---

## Template Routes

- GET `/api/templates`
- GET `/api/templates/:id`

---

## Favorite Routes

- GET `/api/favorites`
- POST `/api/favorites/:templateId`

---

# What I Learned

Through this project, I learned:

- JWT Authentication
- Password Hashing using bcrypt
- PostgreSQL Integration with Sequelize
- REST API Development
- React + Node.js Full Stack Workflow
- Protected Routes
- React Context API State Management

---

# Future Improvements

- Template Preview Pages
- Admin Dashboard
- User Profile Page
- Pagination & Infinite Scroll
- Cloud Image Upload
- Deployment using Render & Vercel

---

# Author

## M. Mohammed Asif

- Email: mohammedasifoffl@gmail.com
- # phone: 9791808932

# fullstack-intern-task

0e94b54ac54e0d2ac2e2e229932f4017a7c39256
