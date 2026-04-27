# Sanchari - Full Stack Migration

Sanchari has been successfully migrated from a static React frontend to a Full-Stack architecture with a Spring Boot backend and MySQL DB.

## Prerequisites
- Java 17+ installed
- Node.js installed
- MySQL Server installed and running on port 3306

## Database Configuration
Make sure you have a database schema named `sanchari` created in your MySQL environment:
```sql
CREATE DATABASE sanchari;
```
The backend is configured to use the following credentials (editable in `sanchari-backend/src/main/resources/application.properties`):
- Username: `nihar200710`
- Password: `Kl2427351`

By default, the backend will auto-create the necessary tables (`users`, `monuments`, `bookings`, `forum_threads`, `thread_messages`) and insert initial mock data so you can test it immediately!

## How to Run

### 1. Spring Boot Backend
Navigate to the `sanchari-backend` directory and run the application:
```bash
cd sanchari-backend
./mvnw spring-boot:run
```
*(Or use `mvn spring-boot:run` if you have Maven installed globally).*
The backend API will be available at `https://indianheritage-backend-final.onrender.com`.

### 2. React Frontend
In a separate terminal, start the React Vite server from the project root:
```bash
cd indianheritage
npm install
npm run dev
```
The frontend UI will be running on `http://localhost:5173`.

## Architecture Highlights
- **Axios Integration**: Hardcoded state inside React has been removed. The `AuthContext`, `HeritageExplore`, `Bookings`, and `DiscussForum` pages all communicate directly with the backend using REST APIs.
- **Global CORS**: The Spring backend utilizes a `CorsConfig` allowing secure requests from `localhost:5173`.
- **Database Seeding**: The `DataInitializer.java` checks for an empty database and automatically inserts all the previous mock data directly into MySQL during the first launch.
