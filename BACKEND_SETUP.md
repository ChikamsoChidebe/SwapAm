# Java Backend Setup Instructions

## Prerequisites Required

Maven is not installed on this system. To run the Java Spring Boot backend, you need:

### Option 1: Install Maven
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to a folder (e.g., `C:\apache-maven-3.9.6`)
3. Add Maven bin directory to PATH environment variable
4. Restart command prompt and run: `mvn spring-boot:run`

### Option 2: Use IDE (Recommended)
1. Open the `java-backend` folder in IntelliJ IDEA or Eclipse
2. Import as Maven project
3. Run the main class: `com.flexisaf.Swapam.SwapamApplication`

## Backend Configuration

The backend has been configured with:
- **Database**: H2 in-memory (no setup required)
- **Port**: 8080
- **CORS**: Enabled for http://localhost:3000
- **JWT Secret**: Pre-configured

## API Endpoints

Once running, the backend will provide:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/items` - Get all items
- `POST /api/items` - Create item
- `DELETE /api/items/{id}` - Delete item

## Frontend Integration

The React frontend is already configured to work with this backend:
- API calls point to `http://localhost:8080/api`
- Authentication handles JWT tokens
- Data structures match Java DTOs

## Quick Start

1. Install Maven OR use an IDE
2. Run the backend (will start on port 8080)
3. Start the React frontend: `cd landing-page && npm run dev`
4. Access the application at http://localhost:3000

The frontend includes demo mode that works without the backend for testing UI functionality.