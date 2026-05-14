# Government Scheme Recommendation System

![Government Schemes](https://img.shields.io/badge/Project-Active-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![React](https://img.shields.io/badge/React-19.2.5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)

A comprehensive full-stack web application that helps citizens discover and apply for eligible government schemes using AI-powered personalized recommendations.

## 🎯 Project Overview

The Government Scheme Recommendation System is designed to bridge the gap between citizens and government welfare schemes. By leveraging AI-powered personalization and comprehensive data analysis, the platform helps users discover schemes they're eligible for based on their demographic and socioeconomic profiles.

### Problem Statement
Many eligible citizens are unaware of government schemes they can benefit from, leading to underutilization of welfare programs. This platform solves this by providing intelligent, personalized scheme recommendations.

### Solution
An intelligent recommendation engine that analyzes user profiles and matches them with relevant government schemes, simplifying access to welfare benefits.

## ✨ Key Features

### 🔐 User Management
- **Secure Authentication**: JWT-based login system with bcrypt password hashing
- **User Registration**: Email verification and account creation
- **Profile Management**: Comprehensive user profile with demographics
- **Profile Image Upload**: Personalized user avatars with secure file handling

### 👤 User Profile Components
- Age, income, and family size information
- Education level and occupation details
- Geographic location (state and district)
- Gender and family composition
- Customizable profile images

### 📋 Scheme Database
- **Extensive Scheme Catalog**: Repository of government welfare schemes
- **Detailed Information**: Scheme descriptions, benefits, and amounts
- **Flexible Eligibility Criteria**: JSON-based criteria for complex matching rules
- **Direct Application Links**: Easy access to scheme application portals

### 🤖 AI-Powered Recommendations
- **Intelligent Matching**: Algorithm analyzes user profiles against scheme criteria
- **Multi-Factor Scoring**: Considers age, income, education, occupation, location, and family size
- **Dynamic Recommendations**: Real-time eligibility assessment
- **Weighted Scoring System**: Prioritizes most relevant schemes

### 🔒 Security & Performance
- **Helmet Middleware**: Security headers for protected APIs
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Comprehensive data validation using express-validator
- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based user sessions
- **Logging System**: Winston-based comprehensive logging

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | v14+ | JavaScript runtime |
| Express.js | 5.2.1 | Web framework |
| PostgreSQL | Latest | Relational database |
| Sequelize | 6.37.8 | ORM for database management |
| JWT | 9.0.3 | Authentication tokens |
| bcryptjs | 3.0.3 | Password hashing |
| Multer | 2.1.1 | File upload handling |
| Helmet | 8.1.0 | Security middleware |
| Winston | 3.19.0 | Logging framework |
| express-validator | 7.3.2 | Input validation |
| Axios | 1.14.0 | HTTP client |
| dotenv | 17.4.0 | Environment variables |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.5 | UI framework |
| Vite | 8.0.10 | Build tool & dev server |
| React Router DOM | 7.15.0 | Client-side routing |
| Tailwind CSS | 4.3.0 | Utility-first CSS |
| Axios | 1.16.0 | API communication |
| JWT Decode | 4.0.0 | Token parsing |
| Google OAuth | 0.13.5 | Social authentication |
| ESLint | 10.2.1 | Code linting |

## 📁 Project Structure

```
Government-Scheme/
├── Backend/
│   ├── server.js                 # Application entry point
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables (not in repo)
│   ├── .gitignore                # Git ignore rules
│   ├── README.md                 # Backend documentation
│   ├── scripts/
│   │   └── data-scheme.js        # Scheme data initialization
│   ├── src/
│   │   ├── app.js                # Express app configuration
│   │   ├── config/
│   │   │   ├── database.js       # PostgreSQL configuration
│   │   │   └── multer.js         # File upload configuration
│   │   ├── controllers/
│   │   │   ├── authController.js       # Authentication logic
│   │   │   ├── profileController.js    # User profile operations
│   │   │   └── schemeController.js     # Scheme operations
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js       # JWT verification
│   │   │   └── uploadMiddleware.js     # File upload handling
│   │   ├── models/
│   │   │   ├── User.js           # User data model
│   │   │   ├── UserProfile.js    # Profile data model
│   │   │   └── Scheme.js         # Scheme data model
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # Authentication endpoints
│   │   │   ├── profileRoutes.js       # Profile endpoints
│   │   │   └── schemeRoutes.js        # Scheme endpoints
│   │   └── services/
│   │       └── aiRecommendationService.js  # AI matching engine
│   └── uploads/                  # User uploaded files
│
├── Frontend/
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── index.html                # Main HTML file
│   ├── README.md                 # Frontend documentation
│   ├── public/
│   │   └── images/               # Static images
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Root component
│       ├── App.css               # Global styles
│       ├── index.css             # Base styles
│       ├── api/
│       │   └── api.js            # API client setup
│       ├── components/
│       │   ├── Navbar.jsx        # Navigation component
│       │   └── PrivateRoute.jsx  # Protected route wrapper
│       ├── context/
│       │   └── AuthContext.jsx   # Authentication state
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── SchemesPage.jsx
│       │   ├── RecommendationsPage.jsx
│       │   ├── AboutPage.jsx
│       │   └── ContactPage.jsx
│       ├── assets/               # Images and static files
│       └── utils/
│           └── speak.js          # Text-to-speech utility
│
└── README.md                     # This file
```

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### UserProfiles Table
```sql
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    age INTEGER CHECK (age >= 1 AND age <= 120),
    income DECIMAL(10,2) CHECK (income >= 0),
    occupation VARCHAR(100),
    education_level VARCHAR(100),
    location_state VARCHAR(100),
    location_district VARCHAR(100),
    family_size INTEGER CHECK (family_size >= 1),
    profile_image VARCHAR(255),
    gender VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Schemes Table
```sql
CREATE TABLE schemes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    benefits TEXT,
    benefit_amount DECIMAL(10,2),
    application_link VARCHAR(255),
    eligibility_criteria JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Relationships
```
Users (1) ──── (1) UserProfiles
Schemes (independent master data)
```

## 🔌 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/me` | Get current user info | ✅ |

### Profile Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/profile` | Create/Update profile | ✅ |
| GET | `/api/profile` | Get user profile | ✅ |
| DELETE | `/api/profile` | Delete user profile | ✅ |

### Scheme Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/schemes` | Get all schemes | ✅ |
| GET | `/api/schemes/:id` | Get scheme by ID | ✅ |
| GET | `/api/schemes/recommendations` | Get personalized recommendations | ✅ |

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v14 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Git** for version control

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd Government-Scheme
```

### Step 2: Backend Setup

```bash
cd Backend
npm install
```

**Create `.env` file:**
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/government_scheme_db

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Multer Configuration (file uploads)
UPLOAD_DIR=./uploads
```

**Start Backend Server:**
```bash
# Development with auto-reload
npx nodemon server.js

# Or production
npm start
```

Backend will run on `http://localhost:3000`

### Step 3: Frontend Setup

```bash
cd Frontend
npm install
```

**Start Frontend Development Server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173` (Vite default)

### Step 4: Database Setup

1. **Create PostgreSQL Database:**
```sql
CREATE DATABASE government_scheme_db;
```

2. **Database auto-syncs** when backend server starts (Sequelize will create tables)

3. **(Optional) Seed data:**
```bash
cd Backend/scripts
node data-scheme.js
```

## 📖 Usage

### User Registration & Login
1. Navigate to **Register Page** (`/register`)
2. Enter email, password, and full name
3. Click Register
4. Log in with credentials on **Login Page** (`/login`)

### Create/Update Profile
1. Go to **Profile Page** (`/profile`)
2. Fill in personal details:
   - Age, income, occupation
   - Education level, location
   - Family size, gender
3. Upload profile picture (optional)
4. Save profile

### View & Filter Schemes
1. Navigate to **Schemes Page** (`/schemes`)
2. Browse all available government schemes
3. View scheme details and benefits
4. Click application link to apply

### Get Personalized Recommendations
1. Go to **Recommendations Page** (`/recommendations`)
2. System analyzes your profile
3. View schemes sorted by eligibility score
4. Apply for recommended schemes

## 🤖 AI Recommendation Algorithm

The system uses an intelligent multi-factor scoring algorithm:

### Scoring Factors
- **Age Matching**: ±15 points based on age requirements
- **Income Analysis**: ±10 points based on income brackets
- **Education Level**: +10 points for meeting criteria
- **Occupation**: +5 points for relevant occupations
- **Family Size**: +5 points for appropriate family composition
- **Location**: +5 bonus for location-specific schemes

### Base Score Calculation
1. Start with 50 points (neutral baseline)
2. Add/subtract points based on matching factors
3. Final score ranges from 0-100
4. Schemes sorted by final eligibility score

## 🔐 Security Features

### Authentication & Authorization
- ✅ JWT tokens with expiration (7 days default)
- ✅ Secure password hashing (bcrypt, 10 salt rounds)
- ✅ Protected routes with middleware validation
- ✅ Automatic token refresh on login

### Data Protection
- ✅ Input sanitization and validation
- ✅ SQL injection prevention (Sequelize parameterized queries)
- ✅ XSS protection (React built-in escaping)
- ✅ CORS configuration for origin validation
- ✅ Helmet middleware for HTTP headers

### File Upload Security
- ✅ File type validation
- ✅ Size limit restrictions
- ✅ Filename sanitization
- ✅ Secure storage in uploads directory

## 📊 Features in Detail

### Personalization Engine
- Analyzes 10+ user attributes
- Compares against 100+ government schemes
- Provides relevance-based scoring
- Considers location-specific eligibility

### Recommendation Accuracy
- Multi-factor eligibility assessment
- Weighted scoring system
- Real-time profile updates
- Continuous improvement potential

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
```bash
# Set environment variables in deployment platform
# Deploy using git or platform CLI
```

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy build/ folder to hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙋 Support & Contact

For support, questions, or feedback:
- Create an issue in the repository
- Contact the development team
- Check the [Contact Page](/Frontend/src/pages/ContactPage.jsx)

## 🎓 Learning Resources

### For Backend Development
- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM Guide](https://sequelize.org/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT Authentication](https://jwt.io/)

### For Frontend Development
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 📈 Future Enhancements

- [ ] Mobile application (React Native)
- [ ] Advanced analytics dashboard
- [ ] SMS/Email notifications
- [ ] Multi-language support (i18n)
- [ ] Payment gateway integration
- [ ] Document upload for applications
- [ ] Application tracking system
- [ ] Admin dashboard for scheme management
- [ ] Real-time notifications
- [ ] Machine learning for improved recommendations

## 👥 Team

- **Project Lead**: Government Scheme Team
- **Backend Developer**: [Your Name]
- **Frontend Developer**: [Your Name]
- **Database Designer**: [Your Name]

## 📅 Version History

### v1.0.0 (Current)
- Initial release
- User authentication system
- Profile management
- Scheme database
- AI recommendations
- File upload functionality

## 🎉 Acknowledgments

- Government agencies for scheme data
- Open-source communities
- Contributors and testers
- All citizens using this platform

---

**Last Updated**: May 14, 2026

**Status**: ✅ Active Development

For detailed backend setup, see [Backend README](./Backend/README.md)  
For detailed frontend setup, see [Frontend README](./Frontend/README.md)
