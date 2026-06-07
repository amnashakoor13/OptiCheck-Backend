# 👁️ EyeCheck API

A REST API built with Node.js, Express.js, and MongoDB for eye vision tests, user authentication, dashboard management, and AI-based prescription recommendations.

## Requirements

Before running the project, install:

- Node.js
- MongoDB
- Git
- Postman (optional)

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/eyecheck.git
cd eyecheck
```

Install dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the project root:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/eyecheck
JWT_SECRET=your_secret_key
```

## Run Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server will run on:

```text
http://localhost:4000
```

## API Documentation

Swagger Docs:

```text
http://localhost:4000/docs
```

## Testing with Postman

1. Run the server:
   ```bash
   npm run dev
   ```

2. Open Postman.

3. Use Base URL:

   ```text
   http://localhost:4000/api/v1
   ```

4. Register/Login user and get JWT token.

5. Add token in:

   ```text
   Authorization → Bearer Token
   ```

6. Test available endpoints.

## Project Structure

```text
src/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── services/
├── config/
├── app.js
└── server.js
```

## Available Commands

```bash
npm install
npm run dev
npm start
npm test
```

## Author
Amna Shakoor
Developed for the EyeCheck Vision Testing System.
