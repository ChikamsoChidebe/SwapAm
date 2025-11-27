# SwapAm Backend API

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env` file and update with your credentials:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/swapam
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Ensure MongoDB is running on the specified URI

4. **Run the Server**
   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify email with code
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/my-items` - Get user's items (protected)
- `GET /api/users/dashboard-stats` - Get dashboard statistics (protected)

### Items
- `GET /api/items` - Get all items with filters
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item (protected)
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)
- `POST /api/items/:id/like` - Like/unlike item (protected)

### Swaps
- `POST /api/swaps` - Create swap request (protected)
- `GET /api/swaps/my-swaps` - Get user's swaps (protected)
- `PUT /api/swaps/:id/status` - Update swap status (protected)
- `POST /api/swaps/:id/rate` - Rate completed swap (protected)

## Features

- **User Authentication**: JWT-based authentication with email verification
- **File Uploads**: Image upload for items and user avatars
- **Real-time Features**: Campus points, ratings, and swap management
- **Security**: Rate limiting, input validation, and secure headers
- **Email Service**: Automated verification and notification emails