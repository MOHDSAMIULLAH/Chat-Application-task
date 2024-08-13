# User Management System

This is a web application built using the MERN (MySQL, Express, React, Node.js) stack, along with Tailwind CSS for styling. The application allows users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on user accounts. Users can have roles such as Student, Teacher, or Institute.
## Features

- **User Authentication**: 
  - Register, Login, and Logout functionality with JWT authentication.
  
- **User Roles**:
  - Assign roles to users: Student, Teacher, or Institute.
  
- **CRUD Operations**:
  - Create, Read, Update, and Delete users with role-based access.
  

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **HTTP Client**: Axios

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MySQL

### Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```
3. Docker Integration:
    To set up MySQL using Docker, follow these steps:

## **Step-by-Step Guide to Set Up MySQL Using Docker**

### **1. Install Docker**
Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

### **2. Pull the MySQL Docker Image**
Pull the MySQL Docker image from Docker Hub. This image contains the MySQL server that you'll run in a container.

```bash
docker pull mysql:latest
```

### **3. Run a MySQL Container**
Run a new container with the MySQL image. This command will start a MySQL server in a Docker container.

```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_root_password -e MYSQL_DATABASE=user_management -e MYSQL_USER=root -e MYSQL_PASSWORD=user_password -p 3306:3306 -d mysql:latest
```

- **`--name mysql-container`**: Names the container `mysql-container`.
- **`-e MYSQL_ROOT_PASSWORD=your_root_password`**: Sets the root password for MySQL ("1234").
- **`-e MYSQL_DATABASE=user_management`**: Creates a database named `chatDB`.
- **`-e MYSQL_USER=root`**: Creates a user with the username `root`.
- **`-e MYSQL_PASSWORD=user_password`**: Sets the password for the `user ("1234")`.
- **`-p 3306:3306`**: Maps port 3306 on your local machine to port 3306 in the container (default MySQL port).
- **`-d mysql:latest`**: Runs the container in detached mode using the latest MySQL image.

### **4. Verify the MySQL Container is Running**
To check if your MySQL container is running, use the following command:

```bash
docker ps
```

This command lists all running containers. You should see `mysql-container` in the list.

### **5. Connect to the MySQL Database**
You can connect to the MySQL server running in your Docker container using any MySQL client or from within the container itself.

**Option 1: Use MySQL CLI in the Container**
```bash
docker exec -it mysql-container mysql -u root -p
```
- This command logs you into the MySQL CLI as the root user.

**Option 2: Use a MySQL Client**
- Host: `127.0.0.1`
- Port: `3306`
- Username: `root` or `user`
- Password: `1234` or `user_password`
- Database: `chatDB`

This will set up and start the MySQL service .


4. Configure the MySQL database:
   - Create a MySQL database named `chatDB`.
   - Update the `.env` file with your MySQL credentials.

5. Start the backend server:

    ```bash
    node app.js
    ```

    The server should be running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

    The frontend should be running on `http://localhost:3000`.

## Usage

1. **Register** a new user by navigating to `http://localhost:3000/register`.
2. **Login** using the registered credentials.
3. After logging in, you can view the list of users, edit user details, or delete a user by navigating to `http://localhost:3000/users`.

## API Endpoints

### Authentication

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in an existing user.

### User Management

- `GET /api/users`: Get all users.
- `GET /api/user/:id`: Get a single user by ID.
- `PUT /api/user/:id`: Update an existing user.
- `DELETE /api/user/:id`: Delete a user.
