# Anonymous Messaging App

An anonymous messaging application that allows users to receive messages without revealing the sender's identity. Users can create an account, sign in, share their personal message link, and view messages sent to them through their dashboard.

## Features

- **User authentication:** Sign up and log in to an account.
- **Password security:** Passwords are hashed before being stored.
- **Personal message link:** Authenticated users can retrieve their unique link to share.
- **Anonymous messaging:** Visitors can send messages without creating an account.
- **Message dashboard:** Users can view messages received through their personal link.
- **Protected routes:** Authentication middleware protects private backend endpoints.

## Tech Stack

**Frontend**
- React
- React Router
- JavaScript
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- JWT authentication
- bcrypt for password hashing

**Database**
- MySQL

## Project Structure

```text
Anonymous App/
├── backend/
│   ├── config/
│   ├── src/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

*The structure above is a simplified overview; adjust it if your actual folders differ.*

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MySQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/isaiahshekinah/anonymous-messaging-app.git
cd anonymous-messaging-app
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure the database

Create your MySQL database and tables using the schema required by the application.

Configure your database connection and environment variables to match the backend code. Do not commit real database passwords, JWT secrets, or other credentials to GitHub.

### 4. Start the backend

From the `backend` directory, run the start command defined in `backend/package.json`, for example:

```bash
npm start
```

If your project uses a development script, you may instead use:

```bash
npm run dev
```

### 5. Install frontend dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

Run the development command defined in `frontend/package.json`. For a typical Vite React project:

```bash
npm run dev
```

Open the local URL printed in your terminal.

> **Note:** The commands, database setup, and environment variable names should be confirmed against the current project files before treating these instructions as final.

## API Overview

The backend includes authentication and messaging functionality. The following endpoint descriptions reflect the intended application flow; confirm the exact routes in the current backend source.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/signup` | Register a user |
| POST | `/login` | Authenticate a user |
| GET | `/mylink` | Retrieve the user's personal message link |
| POST | `/message` | Submit an anonymous message |
| GET | `/message` | Retrieve messages for the authenticated user |

Private endpoints require a valid authentication token where implemented.

## Security Considerations

- Never commit `.env` files or real credentials.
- Store passwords as secure hashes rather than plaintext.
- Validate and sanitize incoming data.
- Protect private endpoints with authentication middleware.
- Ensure users can retrieve only messages addressed to their own account.
- Use HTTPS when deploying the application publicly.

## Future Improvements

- Add message deletion.
- Improve loading, error, and empty states.
- Add responsive styling for mobile devices.
- Deploy the frontend and backend.
- Add automated tests and improved input validation.

## Author

**Isaiah Shekinah**

GitHub: [@isaiahshekinah](https://github.com/isaiahshekinah)

---

This project is being developed as part of my journey in software engineering, with a focus on building practical full-stack applications.