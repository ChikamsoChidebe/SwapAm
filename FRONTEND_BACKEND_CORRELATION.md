# Frontend-Backend Correlation Summary

## Changes Made to Ensure Proper Correlation

### 1. Environment Configuration
- **Updated**: `frontend/.env`
- **Change**: Modified `REACT_APP_API_URL` from `http://localhost:3000/api` to `https://swapam-backend.onrender.com/api`
- **Reason**: Frontend was pointing to local backend, now points to deployed Java backend

### 2. API Service Updates
- **Updated**: `frontend/src/services/api.ts`
- **Changes**:
  - Simplified AuthAPI to match backend endpoints (`/auth/login`, `/auth/register`, `/swaps/whoami`)
  - Updated ItemsAPI to match ItemController endpoints
  - Added CategoriesAPI to match CategoryController endpoints
  - Updated SwapsAPI to match SwapController endpoints
  - Removed unused API classes (Chat, Notifications, Upload, AI) that don't have backend implementations

### 3. Type Definitions
- **Updated**: `frontend/src/types/api.ts`
- **Changes**:
  - Updated LoginRequest/Response to match backend DTOs
  - Updated RegisterRequest/Response to match backend DTOs
  - Updated CreateItemRequest to match backend CreateItemRequest DTO
  - Updated CreateSwapRequest to match backend SwapRequest DTO

### 4. Backend Test Component
- **Created**: `frontend/src/components/common/BackendTest.tsx`
- **Purpose**: Test component to verify API connectivity and correlation
- **Features**:
  - Test login with existing credentials
  - Test categories endpoint
  - Test items endpoint
  - Test whoami endpoint (requires authentication)

## API Endpoint Mapping

### Authentication Endpoints
| Frontend Method | Backend Endpoint | HTTP Method | Description |
|----------------|------------------|-------------|-------------|
| `authAPI.login()` | `/api/auth/login` | POST | User login |
| `authAPI.register()` | `/api/auth/register` | POST | User registration |
| `authAPI.whoami()` | `/api/swaps/whoami` | GET | Get current user info |

### Categories Endpoints
| Frontend Method | Backend Endpoint | HTTP Method | Description |
|----------------|------------------|-------------|-------------|
| `categoriesAPI.getCategories()` | `/api/categories` | GET | Get all categories |
| `categoriesAPI.getCategoryById()` | `/api/categories/{id}` | GET | Get category by ID |
| `categoriesAPI.createCategory()` | `/api/categories` | POST | Create new category |
| `categoriesAPI.updateCategory()` | `/api/categories/{id}` | PUT | Update category |
| `categoriesAPI.deleteCategory()` | `/api/categories/{id}` | DELETE | Delete category |

### Items Endpoints
| Frontend Method | Backend Endpoint | HTTP Method | Description |
|----------------|------------------|-------------|-------------|
| `itemsAPI.getItems()` | `/api/items` | GET | Get all items |
| `itemsAPI.getItemById()` | `/api/items/{id}` | GET | Get item by ID |
| `itemsAPI.createItem()` | `/api/items` | POST | Create new item |
| `itemsAPI.deleteItem()` | `/api/items/{id}` | DELETE | Delete item |
| `itemsAPI.getItemsByUserId()` | `/api/items/user/{userId}` | GET | Get items by user |

### Swaps Endpoints
| Frontend Method | Backend Endpoint | HTTP Method | Description |
|----------------|------------------|-------------|-------------|
| `swapsAPI.requestSwap()` | `/api/swaps/request` | POST | Request a swap |
| `swapsAPI.acceptSwap()` | `/api/swaps/{id}/accept` | PUT | Accept swap |
| `swapsAPI.rejectSwap()` | `/api/swaps/{id}/reject` | PUT | Reject swap |
| `swapsAPI.cancelSwap()` | `/api/swaps/{id}` | DELETE | Cancel swap |
| `swapsAPI.getOutgoingSwaps()` | `/api/swaps/outgoing` | GET | Get outgoing swaps |
| `swapsAPI.getIncomingSwaps()` | `/api/swaps/incoming` | GET | Get incoming swaps |
| `swapsAPI.getPendingIncomingSwaps()` | `/api/swaps/incoming/pending` | GET | Get pending incoming swaps |

## Data Transfer Objects (DTOs)

### Login Request/Response
```typescript
// Frontend
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}
```

### Register Request/Response
```typescript
// Frontend
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface RegisterResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}
```

### Create Item Request
```typescript
// Frontend
interface CreateItemRequest {
  itemName: string;
  description: string;
  categoryId: number;
  imageUrl?: string;
  estimatedValue?: number;
}
```

### Create Swap Request
```typescript
// Frontend
interface CreateSwapRequest {
  itemAId: number;
  itemBId: number;
}
```

## Testing Instructions

1. **Start the frontend development server**:
   ```bash
   cd frontend
   npm start
   ```

2. **Navigate to the homepage** and scroll down to find the "Backend Connection Test" component

3. **Test the endpoints**:
   - Click "Test Login" to verify authentication works
   - Click "Test Categories" to verify categories endpoint
   - Click "Test Items" to verify items endpoint
   - After successful login, click "Test WhoAmI" to verify authenticated endpoints

4. **Expected Results**:
   - Login should return a JWT token
   - Categories should return an array of categories
   - Items should return an array of items
   - WhoAmI should return user information

## Security Considerations

- JWT tokens are automatically included in requests via axios interceptors
- CORS is configured in the Java backend to allow frontend requests
- Authentication is required for protected endpoints (items creation, swaps, etc.)

## Next Steps

1. Remove the BackendTest component from HomePage after testing
2. Implement proper error handling in frontend components
3. Add loading states for API calls
4. Implement proper authentication flow with token refresh
5. Add form validation for user inputs
6. Implement file upload functionality for item images