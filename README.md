# 👁️ EyeCheck API

A REST API built with Node.js, Express.js, and MongoDB for eye vision tests, user authentication, dashboard management, and AI-based prescription recommendations.
## Tech Stack

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
  
#  Installation & Setup Guide

Follow the steps below to run this project on your local machine.

## Prerequisites

Before running the project, make sure the following software is installed:

### 1. Node.js

Download and install Node.js:

https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

### 2. MongoDB

Install MongoDB Community Server:

https://www.mongodb.com/try/download/community

Verify MongoDB is running:

```bash
mongod
```

Or use MongoDB Atlas cloud database.

### 3. Git

Download Git:

https://git-scm.com/downloads

Verify installation:

```bash
git --version
```

### 4. Postman (Optional)

Used for testing APIs.

Download:

https://www.postman.com/downloads/

---

# 📥 Clone Repository

```bash
git clone https://github.com/your-username/opticheck-api.git
cd opticheck-api
```

---

# 📦 Install Dependencies

Install all required packages:

```bash
npm install
```

This command installs all dependencies automatically from the project configuration.

### Main Packages Used

- express
- mongoose
- bcrypt
- jsonwebtoken
- cors
- helmet
- dotenv
- morgan
- swagger-ui-express
- express-validator
- yamljs

Development Packages:

- nodemon
- jest
- supertest
- eslint

---

# ⚙️ Environment Variables

Create a file named:

```text
.env
```

in the root directory.

Copy the following configuration:

```env
MONGO_URI=mongodb://127.0.0.1:27017/opticheck
JWT_SECRET=your_jwt_secret_here
PORT=4000
NODE_ENV=development
```

### If Using MongoDB Atlas

Replace MONGO_URI with your Atlas connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/opticheck
```

---

# ▶️ Run The Project

## Development Mode

```bash
npm run dev
```

This starts the server using Nodemon and automatically reloads when files change.

## Production Mode

```bash
npm start
```

---

# ✅ Successful Startup

If everything is configured correctly, the terminal will show:

```bash
MongoDB connected
Server running on port 4000
```

---

# 🌐 API Base URL

```text
http://localhost:4000
```

Health Check:

```text
http://localhost:4000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# 📖 API Documentation

Swagger documentation is available at:

```text
http://localhost:4000/docs
```

You can test all API endpoints directly from Swagger UI.

---

# 🧪 Testing APIs Using Postman

## Step 1: Start Server

```bash
npm run dev
```

## Step 2: Open Postman

Create a new request.

Base URL:

```text
http://localhost:4000/api/v1
```

---

## Register User

### POST

```http
/api/v1/auth/signup
```

Example Body:

```json
{
  "name": "Amna",
  "email": "amna@example.com",
  "password": "12345678"
}
```

---

## Login User

### POST

```http
/api/v1/auth/login
```

Example Body:

```json
{
  "email": "amna@example.com",
  "password": "12345678"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

Copy the token.

---

## Authorization

For protected routes:

Go to:

```text
Authorization → Bearer Token
```

Paste the JWT token received during login.

---

## Get All Tests

### GET

```http
/api/v1/tests
```

---

## Create New Test

### POST

```http
/api/v1/tests
```

Send required JSON data in the request body.

---

## AI Prescription

### POST

```http
/api/v1/ai
```

Send vision test data and receive AI-generated prescription recommendations.

---

# 📁 Project Structure

```text
eyecheck/
│
├── docs/
│   └── swagger.yaml
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── config/
│   ├── app.js
│   └── server.js
│
├── .env.example
├── pkg.json
└── README.md
```

---

# 🐛 Troubleshooting

## MongoDB Connection Error

Ensure MongoDB service is running and MONGO_URI is correct.

---

## Port Already In Use

Change:

```env
PORT=5000
```

or stop the process using port 4000.

---

## JWT Authentication Error

Make sure:

- JWT_SECRET exists in .env
- Authorization header contains a valid Bearer token

---

# 📜 Available Scripts

Start production server:

```bash
npm start
```

Start development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```
# Author
Amna Shakoor
