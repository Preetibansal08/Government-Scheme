# Government Scheme Backend API

A Node.js Express backend API for managing government schemes and providing personalized scheme recommendations to users based on their profile information.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcryptjs for password hashing
- **Validation**: express-validator
- **HTTP Client**: Axios
- **Logging**: Winston

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the Backend directory
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/government_scheme_db
   
   # Server Configuration
   PORT=3000
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   JWT_EXPIRE=7d
   
   # Node Environment
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   node server.js
   ```
   
   Or with auto-reload (development):
   ```bash
   npx nodemon server.js
   ```

The server will start on `http://localhost:3000`

## Database Schema

### 1. Users Table
Stores user authentication credentials and basic information.

| Field | Type | Notes |
|-------|------|-------|
| id | INTEGER | Primary Key, Auto-increment |
| email | VARCHAR(255) | Unique, Required, Email validation |
| password_hash | VARCHAR(255) | Hashed with bcryptjs, Required |
| full_name | VARCHAR(255) | Required |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-generated |

### 2. User Profiles Table
Stores detailed profile information for scheme eligibility matching.

| Field | Type | Notes |
|-------|------|-------|
| id | INTEGER | Primary Key, Auto-increment |
| user_id | INTEGER | Foreign Key → Users.id |
| age | INTEGER | Optional, Validation: 1-120 |
| income | DECIMAL(10,2) | Optional, Validation: >= 0 |
| occupation | VARCHAR(100) | Optional |
| education_level | VARCHAR(100) | Optional |
| location_state | VARCHAR(100) | Optional |
| location_district | VARCHAR(100) | Optional |
| family_size | INTEGER | Optional, Validation: >= 1 |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-generated |

### 3. Schemes Table
Stores government scheme information.

| Field | Type | Notes |
|-------|------|-------|
| id | INTEGER | Primary Key, Auto-increment |
| scheme_code | VARCHAR(50) | Unique, Required |
| name | VARCHAR(255) | Required |
| description | TEXT | Optional |
| category | VARCHAR(100) | Optional |
| eligibility_criteria | JSONB | Stores complex eligibility rules |
| benefits | TEXT | Description of benefits |
| benefit_amount | DECIMAL(10,2) | Monetary benefit amount |
| official_website | VARCHAR(500) | Official scheme website URL |
| application_link | VARCHAR(500) | Direct application link |
| helpline_number | VARCHAR(50) | Contact helpline |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-generated |

## API Endpoints

All endpoints (except `/api/auth/register` and `/api/auth/login`) require JWT authentication via Bearer token in the Authorization header.

### Authentication Endpoints

#### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

**Error Responses:**
- 400: User already exists
- 500: Server error

---

#### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

**Error Responses:**
- 401: Invalid credentials
- 500: Server error

---

#### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Profile Endpoints

#### 1. Create or Update User Profile
**POST** `/api/profile`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": 35,
  "income": 50000.00,
  "occupation": "Software Engineer",
  "education_level": "Bachelor's Degree",
  "location_state": "Maharashtra",
  "location_district": "Mumbai",
  "family_size": 4
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile created successfully",
  "profile": {
    "id": 1,
    "user_id": 1,
    "age": 35,
    "income": "50000.00",
    "occupation": "Software Engineer",
    "education_level": "Bachelor's Degree",
    "location_state": "Maharashtra",
    "location_district": "Mumbai",
    "family_size": 4,
    "created_at": "2024-01-15T10:35:00.000Z",
    "updated_at": "2024-01-15T10:35:00.000Z"
  }
}
```

---

#### 2. Get User Profile
**GET** `/api/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "profile": {
    "id": 1,
    "user_id": 1,
    "age": 35,
    "income": "50000.00",
    "occupation": "Software Engineer",
    "education_level": "Bachelor's Degree",
    "location_state": "Maharashtra",
    "location_district": "Mumbai",
    "family_size": 4,
    "created_at": "2024-01-15T10:35:00.000Z",
    "updated_at": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Responses:**
- 404: Profile not found
- 500: Server error

---

#### 3. Delete User Profile
**DELETE** `/api/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile deleted successfully"
}
```

**Error Responses:**
- 404: Profile not found
- 500: Server error

---

### Schemes Endpoints

#### 1. Get All Schemes
**GET** `/api/schemes`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:** None

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "schemes": [
    {
      "id": 1,
      "scheme_code": "PM_AWAS",
      "name": "Pradhan Mantri Awas Yojana",
      "description": "Housing scheme for economically weaker sections",
      "category": "Housing",
      "eligibility_criteria": {
        "max_income": 300000,
        "min_age": 18
      },
      "benefits": "Subsidized home loan",
      "benefit_amount": "250000.00",
      "official_website": "https://pmaymis.gov.in/",
      "application_link": "https://pmaymis.gov.in/Apply",
      "helpline_number": "1800-123-456",
      "created_at": "2024-01-15T10:00:00.000Z",
      "updated_at": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

#### 2. Get Scheme by ID
**GET** `/api/schemes/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (required): Scheme ID

**Response (200):**
```json
{
  "success": true,
  "scheme": {
    "id": 1,
    "scheme_code": "PM_AWAS",
    "name": "Pradhan Mantri Awas Yojana",
    "description": "Housing scheme for economically weaker sections",
    "category": "Housing",
    "eligibility_criteria": {
      "max_income": 300000,
      "min_age": 18
    },
    "benefits": "Subsidized home loan",
    "benefit_amount": "250000.00",
    "official_website": "https://pmaymis.gov.in/",
    "application_link": "https://pmaymis.gov.in/Apply",
    "helpline_number": "1800-123-456",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
}
```

**Error Responses:**
- 404: Scheme not found
- 500: Server error

---

#### 3. Get Schemes by Category
**GET** `/api/schemes/category/:category`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `category` (required): Category name (e.g., "Housing", "Education", "Healthcare")

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "schemes": [
    {
      "id": 1,
      "scheme_code": "PM_AWAS",
      "name": "Pradhan Mantri Awas Yojana",
      "description": "Housing scheme for economically weaker sections",
      "category": "Housing",
      "eligibility_criteria": {
        "max_income": 300000,
        "min_age": 18
      },
      "benefits": "Subsidized home loan",
      "benefit_amount": "250000.00",
      "official_website": "https://pmaymis.gov.in/",
      "application_link": "https://pmaymis.gov.in/Apply",
      "helpline_number": "1800-123-456",
      "created_at": "2024-01-15T10:00:00.000Z",
      "updated_at": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

#### 4. Search Schemes
**GET** `/api/schemes/search?keyword=housing`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `keyword` (required): Search term to filter by scheme name or description

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "schemes": [
    {
      "id": 1,
      "scheme_code": "PM_AWAS",
      "name": "Pradhan Mantri Awas Yojana",
      "description": "Housing scheme for economically weaker sections",
      "category": "Housing",
      "eligibility_criteria": {
        "max_income": 300000,
        "min_age": 18
      },
      "benefits": "Subsidized home loan",
      "benefit_amount": "250000.00",
      "official_website": "https://pmaymis.gov.in/",
      "application_link": "https://pmaymis.gov.in/Apply",
      "helpline_number": "1800-123-456",
      "created_at": "2024-01-15T10:00:00.000Z",
      "updated_at": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- 400: Keyword is required
- 500: Server error

---

#### 5. Get Personalized Recommendations
**GET** `/api/schemes/recommendations`

**Headers:**
```
Authorization: Bearer <token>
```

Returns schemes recommended based on user's profile (age, income, location, education, etc.).

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "recommendations": [
    {
      "id": 1,
      "scheme_code": "PM_AWAS",
      "name": "Pradhan Mantri Awas Yojana",
      "description": "Housing scheme for economically weaker sections",
      "category": "Housing",
      "eligibility_criteria": {
        "max_income": 300000,
        "min_age": 18
      },
      "benefits": "Subsidized home loan",
      "benefit_amount": "250000.00",
      "official_website": "https://pmaymis.gov.in/",
      "application_link": "https://pmaymis.gov.in/Apply",
      "helpline_number": "1800-123-456",
      "created_at": "2024-01-15T10:00:00.000Z",
      "updated_at": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**Prerequisites:**
- User must have a completed profile
- Profile should contain age, income, location, education level, etc.

**Error Responses:**
- 400: Please complete your profile first
- 500: Server error

---

#### 6. Create New Scheme (Admin)
**POST** `/api/schemes`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "scheme_code": "PM_AWAS",
  "name": "Pradhan Mantri Awas Yojana",
  "description": "Housing scheme for economically weaker sections",
  "category": "Housing",
  "eligibility_criteria": {
    "max_income": 300000,
    "min_age": 18
  },
  "benefits": "Subsidized home loan up to 5 lakhs",
  "benefit_amount": 250000.00,
  "official_website": "https://pmaymis.gov.in/",
  "application_link": "https://pmaymis.gov.in/Apply",
  "helpline_number": "1800-123-456"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Scheme created successfully",
  "scheme": {
    "id": 1,
    "scheme_code": "PM_AWAS",
    "name": "Pradhan Mantri Awas Yojana",
    "description": "Housing scheme for economically weaker sections",
    "category": "Housing",
    "eligibility_criteria": {
      "max_income": 300000,
      "min_age": 18
    },
    "benefits": "Subsidized home loan up to 5 lakhs",
    "benefit_amount": "250000.00",
    "official_website": "https://pmaymis.gov.in/",
    "application_link": "https://pmaymis.gov.in/Apply",
    "helpline_number": "1800-123-456",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
}
```

**Error Responses:**
- 500: Error creating scheme

---

## Authentication

### JWT Token Format
The API uses Bearer tokens in the Authorization header.

**Header Format:**
```
Authorization: Bearer <jwt_token>
```

**Token Payload:**
```json
{
  "id": 1,
  "iat": 1705315200,
  "exp": 1705920000
}
```

### Token Expiration
- Default: 7 days (configurable via `JWT_EXPIRE` environment variable)
- When expired, user must login again to get a new token

### Refresh Token
Currently not implemented. User must login again to get a new token.

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes
- `200`: OK - Successful GET, PUT, or POST request
- `201`: Created - Successful resource creation
- `400`: Bad Request - Invalid input or missing required fields
- `401`: Unauthorized - Missing or invalid token
- `404`: Not Found - Resource not found
- `500`: Server Error - Internal server error

---

## Testing Endpoints

### Test Database Connection
**GET** `/api/test-db`

**Response:**
```json
{
  "message": "Database connected successfully!"
}
```

### Health Check
**GET** `/`

**Response:**
```json
{
  "message": "Government Scheme API is running!"
}
```

---

## Security Features

1. **Password Hashing**: bcryptjs with salt rounds = 10
2. **JWT Authentication**: Signed tokens for secure API access
3. **CORS**: Enabled for cross-origin requests
4. **Helmet**: Security headers protection
5. **Environment Variables**: Sensitive data stored in .env file
6. **SQL Injection Prevention**: Sequelize ORM with parameterized queries

---

## Frontend Integration Guide

### 1. Setup
- Store JWT token in localStorage or sessionStorage after login
- Include token in all API requests (except register/login)

### 2. Authentication Flow
```
Register → Login (get token) → Store token → Use token in requests
```

### 3. Common Workflow
1. User registers or logs in
2. Frontend stores the JWT token
3. On page load, call `/api/auth/me` to verify user is still logged in
4. Call `/api/profile` to get user profile
5. For recommendations, ensure profile is complete first, then call `/api/schemes/recommendations`

### 4. Error Handling
- If 401 error received, token is invalid/expired → redirect to login
- If 400 error received, check request format and required fields
- If 500 error received, check backend logs

---

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db_name

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

---

## Troubleshooting

### Database Connection Failed
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database exists and credentials are correct

### Token Invalid
- Ensure token is included in Authorization header
- Check token hasn't expired (default 7 days)
- Verify JWT_SECRET is the same on all requests

### CORS Error
- Frontend and backend may be on different domains
- CORS is already enabled in the backend
- Check if frontend is sending credentials correctly

---

## Future Enhancements
- Add refresh token mechanism
- Implement role-based access control (RBAC)
- Add payment gateway integration
- Implement email notifications
- Add scheme application tracking

---

## License
ISC

## Support
For issues or questions, contact the development team.
