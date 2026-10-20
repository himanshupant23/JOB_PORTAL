# JOB_PORTAL

A scalable backend for a job portal platform built with Node.js, Express.js, and MongoDB. The project supports user authentication, recruiter/company management, job listings, and application workflows for job seekers.

## Overview

JOB_PORTAL is a backend-only project designed to power a modern recruitment platform. It includes APIs for:

- User registration and login
- JWT-based authentication and protected routes
- Company registration and management
- Job posting by recruiters/admin users
- Job search and listing for candidates
- Job application tracking and status updates

This repository currently contains the server-side application logic and database models required for the job portal system.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT (JSON Web Token)
- Cookie-based authentication
- bcryptjs for password hashing
- CORS and dotenv support

## Project Structure

```text
JOB_PORTAL/
├── .gitignore
├── Backend/
│   ├── Routes/
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   ├── controller/
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── isAuthenticated.js
│   ├── models/
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── utils/
│   │   └── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Features

### User Management
- Register new users
- Login with email and password
- Role-based access (`student` or `Recruiter`)
- Logout support
- Profile update with bio, skills, and resume information

### Company Management
- Register a company under a recruiter/admin account
- Retrieve companies for a user
- Fetch a company by ID
- Update company details

### Job Management
- Post a new job listing
- Browse all jobs with keyword search
- Get job details by ID
- Fetch jobs created by a specific admin/recruiter

### Application Flow
- Apply for a job
- Prevent duplicate job applications
- View jobs applied by a logged-in user
- See applicants for a job
- Update application status (`pending`, `accepted`, `rejected`)

## API Highlights

The backend exposes APIs under the following base path:

```text
/api/v1
```

### User Routes
- `POST /api/v1/user/register`
- `POST /api/v1/user/login`
- `GET /api/v1/user/logout`
- `POST /api/v1/user/profile/update`

### Company Routes
- `POST /api/v1/company/register`
- `GET /api/v1/company/get`
- `GET /api/v1/company/get/:id`
- `PUT /api/v1/company/update/:id`

### Job Routes
- `POST /api/v1/job/post`
- `GET /api/v1/job/get`
- `GET /api/v1/job/getadminjobs`
- `GET /api/v1/job/get/:id`

### Application Routes
- `GET /api/v1/application/apply/:id`
- `GET /api/v1/application/get`
- `GET /api/v1/application/:id/applicants`
- `POST /api/v1/application/status/:id/update`

## Environment Variables

Create a `.env` file in the `Backend` directory with the following values:

```env
PORT=3000
SECRET_KEY=your_secret_key_here
mongodb_uri=mongodb://localhost:27017/job_portal
```

> Replace the values with your own secure configuration for production use.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/himanshupant23/JOB_PORTAL.git
cd JOB_PORTAL
```

2. Navigate to the backend folder:

```bash
cd Backend
```

3. Install dependencies:

```bash
npm install
```

4. Set up your environment variables in a `.env` file.

5. Start the server:

```bash
npm run dev
```

The backend will run using the configured port, typically `3000` unless overridden.

## Database Configuration

The project uses MongoDB via Mongoose. Ensure your MongoDB instance is running and the `mongodb_uri` value points to a valid database before starting the server.

## Authentication

Authentication is handled with JWT and stored in cookies. Protected routes use the `isAuthenticated` middleware to validate incoming requests.

## Notes

- This repository currently contains the backend services for the job portal.
- A separate frontend application is not included in this repo.
- The project is intended as a backend foundation for a recruitment or hiring platform.

## License

This project does not currently include a license file. Please check with the repository owner for licensing details.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

## Author

- Himanshu Pant

## Repository

- https://github.com/himanshupant23/JOB_PORTAL
