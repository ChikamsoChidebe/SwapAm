# SwapAm - Campus Exchange Platform

A comprehensive web application for university students to swap, sell, and donate items within their campus community.

## Project Structure

```
SwapAm/
├── landing-page/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Authentication pages
│   │   ├── dashboard/     # Dashboard components
│   │   ├── context/       # React context for state management
│   │   └── services/      # API service layer
│   └── package.json
├── backend/               # Node.js/Express API
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication & validation
│   ├── controllers/      # Business logic
│   └── utils/            # Helper functions
└── README.md
```

## Features

### Frontend (React)
- **Landing Page**: Professional design with auto-advancing testimonials
- **Authentication**: Sign up, login, email verification, password reset
- **Dashboard**: User statistics, quick actions, recent items
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: React Context for authentication

### Backend (Node.js/Express)
- **Authentication**: JWT-based with email verification
- **File Uploads**: Image handling for items and avatars
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, input validation, CORS
- **Email Service**: Automated verification emails

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
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

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd landing-page
npm install
npm run dev
```

### 3. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- The application will create collections automatically

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset

### Items Management
- `GET /api/items` - Browse items with filters
- `POST /api/items` - Create new listing
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Swap Management
- `POST /api/swaps` - Create swap request
- `GET /api/swaps/my-swaps` - User's swap history
- `PUT /api/swaps/:id/status` - Update swap status

## Key Features

### 🔐 Authentication System
- University email verification
- JWT token-based sessions
- Password reset functionality
- Protected routes

### 📱 Dashboard
- User statistics and analytics
- Quick action buttons
- Recent items overview
- Campus points system

### 🔄 Item Management
- Multi-category listings (Books, Electronics, Clothing, etc.)
- Image upload support
- Exchange types (Swap, Sell, Donate)
- Search and filtering

### 🤝 Swap System
- Request management
- Meeting coordination
- Rating system
- Transaction history

### 🎨 Design System
- Consistent green (#2E7D32) and yellow (#CAAC2A) theme
- Professional, clean interface
- Mobile-responsive design
- Smooth animations and transitions

## Technology Stack

**Frontend:**
- React 18 with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management
- Fetch API for HTTP requests

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Nodemailer for emails
- bcryptjs for password hashing

## Development Status

✅ **Completed:**
- Landing page with professional design
- Complete authentication flow
- Backend API with all endpoints
- Dashboard layout and components
- Database models and relationships

🚧 **Ready for Enhancement:**
- Real-time messaging system
- Advanced search filters
- Push notifications
- Mobile app development
- Payment integration

## Getting Started

1. Clone the repository
2. Set up MongoDB database
3. Configure environment variables
4. Install dependencies for both frontend and backend
5. Start both servers
6. Access the application at `http://localhost:3000`

The application is now fully functional with user registration, authentication, and basic dashboard features integrated with the backend API.