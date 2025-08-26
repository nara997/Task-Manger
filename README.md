Task Manager – MERN Stack Application

A full-stack Task Manager application built with the MERN stack.
Supports secure user authentication with JWT (HttpOnly cookies) and full CRUD for tasks.


Tech Stack

Frontend: React, Vite, React Router, TailwindCSS

Backend: Node.js, Express.js, Mongoose (MongoDB)

Authentication: JWT stored in HttpOnly cookies

Database: MongoDB Atlas (cloud)

Deployment-ready: Docker Compose setup for running frontend + backend in containers (DB hosted on Atlas)


Features
✅ Authentication

Sign up with username, email, and password

Login with email + password

Secure JWT-based authentication (stored in HttpOnly cookies)

Session persistence → stays logged in across refresh using /auth/me

Logout → clears the session cookie

✅ Tasks

Create new task

View all tasks belonging to the logged-in user

Update task (title, description, status)

Delete task

✅ Frontend

Built with React + Tailwind CSS

AuthContext for managing login state

Protected routes (only logged-in users can access tasks)

Modern UI with navbar + task cards


API Endpoints
Authentication

POST /auth/signup → Register new user

POST /auth/login → Login & set cookie

GET /auth/me → Get logged-in user info

POST /auth/logout → Clear cookie

Tasks (Protected)

GET /tasks → Get all tasks for user

POST /tasks → Create new task

PUT /tasks/:id → Update task

DELETE /tasks/:id → Delete task

🔹 Authentication Flow

On signup/login, server issues a JWT stored in a secure HttpOnly cookie.

Browser automatically attaches cookie on requests (fetch(..., { credentials: "include" })).

/auth/me restores session on refresh.

Logout clears the cookie.

🔹 Testing with Postman

POST /auth/signup → Create account

POST /auth/login → Login (check Cookies tab for token)

GET /auth/me → Verify session

POST /tasks → Create a task

GET /tasks → List tasks

PUT /tasks/:id → Update task

DELETE /tasks/:id → Delete task


Folder Structure 

task-manager/
│
├── docker-compose.yml        # Orchestration file (runs frontend + backend + MongoDB together)
│
├── backend/
│   ├── Dockerfile            # Docker instructions for backend
│   ├── package.json          # Backend dependencies & scripts
│   ├── .env                  # Backend environment variables (ignored in Git)
│   ├── .env.example          # Example env file for reference
│   └── src/
│       ├── config/           # Database & app configuration files
│       ├── controllers/      # Auth & Task controllers (business logic)
│       ├── middleware/       # Auth & error-handling middleware
│       ├── models/           # Mongoose models (User, Task)
│       ├── routes/           # API route definitions
│       ├── utils/            # Helper utilities (e.g., asyncHandler)
│       └── server.js         # Backend app entry point
│
├── frontend/
│   ├── Dockerfile            # Docker instructions for frontend
│   ├── package.json          # Frontend dependencies & scripts
│   ├── .env                  # Frontend environment variables (ignored in Git)
│   ├── .env.example          # Example env file for reference
│   ├── public/               # Static assets (favicon, index.html template, etc.)
│   └── src/
│       ├── components/       # Reusable UI components (Navbar, TaskCard, etc.)
│       ├── context/          # React context (AuthContext, providers)
│       ├── pages/            # Page components (Login, Signup, Tasks, CreateTask)
│       ├── routes/           # Route definitions
│       ├── App.jsx           # Root component with routes
│       ├── config.jsx        # API base URL & frontend config
│       ├── main.jsx          # React entry point
│       ├── App.css           # App-wide styles
│       ├── index.css         # Global styles (Tailwind, resets)
│
└── README.md                 # Project documentation


⚡ Setup Instructions
Option 1 – Run Locally (Manual)
<details> <summary>Click to expand</summary>
1. Clone Repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

2. Backend Setup
cd backend
npm install


Copy .env.example to .env and update values (MongoDB Atlas URI, JWT secret, etc.):

cp .env.example .env


Start backend:

npm run dev

3. Frontend Setup
cd ../frontend
npm install


Copy .env.example to .env and update values (API URL):

cp .env.example .env


Start frontend:

npm run dev

4. Access Application

Frontend: http://localhost:5173

Backend API: http://localhost:5000

</details>
Option 2 – Run with Docker (Recommended 🚀)
<details> <summary>Click to expand</summary>
1. Requirements

Docker

Docker Compose

2. Run Application

From the project root, run:

docker-compose up --build


This will:

Start Backend API (Node.js + Express)

Start Frontend (React + Vite)

Connect to MongoDB Atlas (via .env config)

3. Access Application

Frontend: http://localhost:3000

Backend API: http://localhost:5000

4. Stop Containers
docker-compose down



Known Limitations

No refresh tokens → session ends when JWT expires

Only a single user role (no admin vs user separation yet)

No pagination/filters → all tasks load at once


Deliverables

GitHub repository with frontend/ and backend/ folders

Video walkthrough of the application

README with setup instructions, tech stack, and trade-offs


Future Improvements

(Not implemented yet, but considered for real-world use)

Refresh tokens → for long-lived sessions and better security

Pagination & filters → improve performance and user experience for large task lists

File uploads → allow attachments (e.g., documents, images) per task

Role-based access control (RBAC) → separate roles (admin vs user) with different permissions

Modern loading indicators → replace basic loaders with spinners/skeleton screens for smoother UX during API calls