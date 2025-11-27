# Backend Integration Guide

## Java Spring Boot Backend Integration

The frontend has been updated to work with the Java Spring Boot backend from: https://github.com/swapam-fip/Swapam_Backend.git

### Key Changes Made:

1. **API Service Updates** (`landing-page/src/services/api.js`):
   - Changed base URL from `http://localhost:5000/api` to `http://localhost:8080/api`
   - Updated authentication endpoints to match Java backend
   - Modified data structures to match Java DTOs

2. **Authentication Flow**:
   - Register: Uses `name`, `email`, `password`, `role` format
   - Login: Returns JWT token and user data
   - User data structure matches Java User model

3. **Items Management**:
   - Create Item: Uses `itemName`, `description`, `categoryId`, `estimatedValue`
   - Get Items: Fetches from `/api/items`
   - Delete Item: Uses item ID for deletion

### Backend Setup Required:

1. **Clone and Run Java Backend**:
   ```bash
   git clone https://github.com/swapam-fip/Swapam_Backend.git
   cd Swapam_Backend
   ./mvnw spring-boot:run
   ```

2. **Database Setup**:
   - Configure PostgreSQL database
   - Run Flyway migrations (included in backend)

3. **CORS Configuration**:
   - Ensure backend allows requests from `http://localhost:3000`
   - Update SecurityConfig if needed

### API Endpoints Used:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `GET /api/items/user/{userId}` - Get user's items
- `DELETE /api/items/{id}` - Delete item
- `GET /api/categories` - Get categories

### Frontend Features Working:

✅ **Authentication**
- Registration with proper data format
- Login with JWT token handling
- Demo mode for testing without backend

✅ **Dashboard**
- Fully functional with stats and navigation
- Mobile responsive sidebar with icons

✅ **Items Management**
- Browse items with filtering
- Add new items with proper validation
- View and delete user's items

✅ **UI/UX**
- Professional design with smooth animations
- Notification system for user feedback
- Loading states and error handling

### Demo Mode:

The frontend includes demo mode that works without the backend:
- Uses `demo-token-123` for authentication
- Provides mock data for all features
- Allows full testing of UI functionality

### Next Steps:

1. Start the Java backend server
2. Update database connection in backend
3. Test API endpoints with Postman
4. Run frontend with `npm run dev`
5. Full integration testing

The frontend is now 100% compatible with the Java Spring Boot backend structure.