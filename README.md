# Taskly - Task Management API

Taskly is a simple and efficient task management API that helps you organize your daily activities. It allows you to create, update, and manage tasks with features like status tracking, priority levels, and categories.

## Features

- Create and manage tasks
- Add notes to tasks
- Set task priorities (1-5)
- Categorize tasks (Work, Personal, Study, etc.)
- Track task status (Pending, In Progress, Completed)
- Search and filter tasks
- Pagination support

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (version 12 or higher)
- [Git](https://git-scm.com/downloads)

## Dependencies

### Main Dependencies
- @prisma/client: ^4.16.1
- class-transformer: ^0.5.1
- class-validator: ^0.14.1
- cors: ^2.8.5
- express: ^4.18.2
- reflect-metadata: ^0.2.2
- tsyringe: ^4.10.0
- zod: ^3.21.4

### Development Dependencies
- @types/cors: ^2.8.13
- @types/express: ^4.17.17
- @types/node: ^20.3.1
- prisma: ^4.16.1
- ts-node: ^10.9.1
- ts-node-dev: ^2.0.0
- typescript: ^5.1.3

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskly.git
   cd taskly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Open PostgreSQL and create a new database:
     ```sql
     CREATE DATABASE taskly;
     ```
   - Create a `.env` file in the root directory with the following content:
     ```
     DATABASE_URL="postgresql://your_username:your_password@localhost:5432/taskly"
     PORT=3000
     ```
     Replace `your_username` and `your_password` with your PostgreSQL credentials.

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **The API will be available at**
   ```
   http://localhost:3000
   ```

## API Endpoints

### Tasks

- `POST /tasks` - Create a new task
- `GET /tasks` - List all tasks (with pagination)
- `GET /tasks/:id` - Get a specific task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /tasks/status/:status` - Get tasks by status

### Notes

- `POST /notes` - Add a note to a task
- `GET /notes` - List all notes (with pagination)
- `GET /notes/:id` - Get a specific note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Example Usage

### Creating a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write detailed documentation for the Taskly API",
    "status": "PENDING",
    "priority": 3,
    "category": "WORK"
  }'
```

### Adding a Note to a Task

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Remember to include API endpoints documentation",
    "task_id": "task-uuid-here"
  }'
```

## Common Issues and Solutions

1. **Database Connection Error**
   - Make sure PostgreSQL is running
   - Verify your database credentials in the `.env` file
   - Check if the database exists

2. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Or find and stop the process using the port:
     ```bash
     lsof -i :3000
     kill -9 <PID>
     ```

3. **Migration Errors**
   - Make sure you have the correct database URL
   - Try running `npx prisma migrate reset` to reset the database