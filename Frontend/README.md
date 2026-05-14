# Government Scheme Recommendation System - Frontend

![React](https://img.shields.io/badge/React-19.2.5-blue)
![Vite](https://img.shields.io/badge/Vite-8.0.10-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.0-38B2AC)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)

The user-facing web application for discovering and applying for eligible government schemes with AI-powered personalized recommendations.

## 🎯 Overview

This is a modern React-based frontend application that provides citizens with an intuitive interface to discover government schemes. Built with React 19, Vite for fast development, and Tailwind CSS for responsive design, it delivers a seamless user experience for profile creation, scheme exploration, and personalized recommendations.

## ✨ Features

### 🔐 Authentication
- **User Registration**: Easy sign-up with email and password
- **Login System**: Secure JWT-based authentication
- **Google OAuth**: Social login integration
- **Password Security**: Client-side validation before submission
- **Auto Logout**: Session expiration handling

### 👤 User Profile Management
- **Profile Creation**: Comprehensive form for demographic data
- **Profile Picture Upload**: User avatar personalization
- **Profile Updates**: Edit existing profile information
- **Profile Deletion**: Remove profile data option
- **Data Validation**: Real-time form validation

### 📋 Scheme Discovery
- **Browse All Schemes**: View complete scheme database
- **Scheme Details**: Detailed information for each scheme
- **Search Functionality**: Find schemes by name or category
- **Filter Options**: Filter by category, benefit amount, etc.
- **Direct Application**: Links to scheme application portals

### 🤖 AI Recommendations
- **Personalized Matching**: Get schemes based on your profile
- **Eligibility Scores**: See how eligible you are for each scheme
- **Sorted Results**: Schemes ranked by relevance
- **Real-time Updates**: Recommendations update when profile changes

### 📱 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use navigation bar
- **Protected Routes**: Secure pages require authentication
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: User-friendly error messages
- **Accessibility**: Semantic HTML and ARIA labels

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.5 | UI Framework |
| Vite | 8.0.10 | Build Tool & Dev Server |
| React Router DOM | 7.15.0 | Client-side Routing |
| Tailwind CSS | 4.3.0 | Utility-first Styling |
| Axios | 1.16.0 | HTTP Client |
| JWT Decode | 4.0.0 | Token Parsing |
| Google OAuth | 0.13.5 | Social Authentication |
| ESLint | 10.2.1 | Code Quality |

## 📁 Project Structure

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # Root component
├── App.css                     # Global styles
├── index.css                   # Base CSS
├── api/
│   └── api.js                  # Axios instance & API calls
├── components/
│   ├── Navbar.jsx              # Navigation bar
│   └── PrivateRoute.jsx        # Protected route wrapper
├── context/
│   └── AuthContext.jsx         # Authentication state management
├── pages/
│   ├── HomePage.jsx            # Landing page
│   ├── LoginPage.jsx           # User login
│   ├── RegisterPage.jsx        # User registration
│   ├── ProfilePage.jsx         # User profile management
│   ├── SchemesPage.jsx         # Browse all schemes
│   ├── RecommendationsPage.jsx # Personalized recommendations
│   ├── AboutPage.jsx           # About the project
│   └── ContactPage.jsx         # Contact information
├── assets/                     # Images and static files
├── utils/
│   └── speak.js                # Text-to-speech utility
└── public/
    └── images/                 # Public images
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager
- Backend server running on `http://localhost:3000`

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File (Optional)
Create a `.env` file in the Frontend root (optional):
```env
VITE_API_URL=http://localhost:3000
```

### Step 3: Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Production
```bash
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint to check code quality
```

## 🎨 Pages & Routes

| Route | Component | Auth Required | Description |
|-------|-----------|---------------|-------------|
| `/` | HomePage | ❌ | Landing page with project overview |
| `/login` | LoginPage | ❌ | User login form |
| `/register` | RegisterPage | ❌ | User registration form |
| `/profile` | ProfilePage | ✅ | Create/Edit user profile |
| `/schemes` | SchemesPage | ✅ | Browse all schemes |
| `/recommendations` | RecommendationsPage | ✅ | Personalized scheme recommendations |
| `/about` | AboutPage | ❌ | Project information |
| `/contact` | ContactPage | ❌ | Contact & support |

## 🔌 API Integration

All API calls are managed through the centralized `api.js` file using Axios:

### Authentication Endpoints
```javascript
// POST /api/auth/register
// POST /api/auth/login
// GET /api/auth/me
```

### Profile Endpoints
```javascript
// POST /api/profile
// GET /api/profile
// DELETE /api/profile
```

### Scheme Endpoints
```javascript
// GET /api/schemes
// GET /api/schemes/:id
// GET /api/schemes/recommendations
```

### Example API Call
```javascript
import { apiClient } from './api/api';

const getSchemes = async () => {
  try {
    const response = await apiClient.get('/schemes');
    return response.data.schemes;
  } catch (error) {
    console.error('Error fetching schemes:', error);
  }
};
```

## 🔐 Authentication System

### JWT Token Management
- Tokens stored in localStorage
- Automatic token inclusion in API headers
- Token expiration handling
- Refresh on login/logout

### Protected Routes
```javascript
<PrivateRoute>
  <ProfilePage />
</PrivateRoute>
```

### AuthContext Usage
```javascript
const { user, login, logout, isAuthenticated } = useContext(AuthContext);
```

## 🎨 Styling with Tailwind CSS

The project uses Tailwind CSS for responsive, utility-first styling:

### Key Tailwind Features Used
- Responsive grid layouts
- Flexible spacing and sizing
- Custom color schemes
- Smooth transitions and animations
- Mobile-first design approach

### Example Component
```jsx
<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900 mb-4">
    Welcome
  </h1>
  <p className="text-gray-600">
    Start by creating your profile
  </p>
</div>
```

## 🌐 Responsive Design

The application is fully responsive:
- **Mobile**: < 640px - Optimized for phones
- **Tablet**: 640px - 1024px - Tablet layout
- **Desktop**: > 1024px - Full desktop experience

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 💬 Text-to-Speech Utility

The `speak.js` utility provides text-to-speech functionality:

```javascript
import { speak } from '@/utils/speak.js';

// Speak text
speak('Welcome to Government Schemes');

// With custom rate
speak('Slow speech', { rate: 0.5 });
```

## 📦 Component Architecture

### Page Components
- **HomePage**: Landing page with project overview
- **LoginPage**: User login form with validation
- **RegisterPage**: User registration with password confirmation
- **ProfilePage**: Create/edit comprehensive user profile
- **SchemesPage**: Browse and filter all schemes
- **RecommendationsPage**: AI-generated personalized recommendations
- **AboutPage**: Project information and mission
- **ContactPage**: Support and contact information

### Layout Components
- **Navbar**: Navigation with auth state awareness
- **PrivateRoute**: Wrapper for protected pages
- **AuthContext**: Global authentication state

## 🔄 State Management

### Context API
- **AuthContext**: Manages user authentication and global auth state
- **Global User State**: Available across all components

### Local State
- Component-level state with `useState`
- Form state management
- Loading and error states

## 🚨 Error Handling

The application includes comprehensive error handling:

```javascript
try {
  const response = await apiClient.get('/schemes');
  // Handle success
} catch (error) {
  if (error.response?.status === 401) {
    // Handle unauthorized - redirect to login
    navigate('/login');
  } else if (error.response?.status === 500) {
    // Handle server error
    setError('Server error. Please try again.');
  }
}
```

## ⚡ Performance Optimization

- **Code Splitting**: Route-based code splitting with React Router
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized images in public folder
- **CSS Purging**: Tailwind removes unused CSS in production
- **Build Optimization**: Vite provides fast builds and hot reload

## 🧪 Testing

While not currently included, recommended testing approach:

```bash
npm install --save-dev @testing-library/react vitest
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react';
import HomePage from './pages/HomePage';

test('renders homepage', () => {
  render(<HomePage />);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
```

## 🔧 Development Workflow

### Hot Module Replacement (HMR)
- Vite provides instant HMR
- Changes reflect immediately in browser
- State is preserved during reload

### Browser DevTools
- React Developer Tools extension recommended
- Redux DevTools (if Redux is added)
- Network tab for API debugging

## 📱 Mobile Optimization

- **Touch-Friendly**: Large tap targets (min 44x44px)
- **Viewport Configuration**: Proper meta tags for mobile
- **Responsive Images**: Images scale appropriately
- **Mobile Navigation**: Hamburger menu on small screens

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 🚀 Building for Production

```bash
# Create optimized build
npm run build

# Build output will be in the 'dist' folder
# Ready to deploy to any static hosting service
```

### Deployment Options
- **Vercel**: `vercel` CLI or git integration
- **Netlify**: Drag-and-drop or git integration
- **GitHub Pages**: Static hosting with GitHub
- **AWS S3**: Static website hosting
- **Traditional Hosting**: Upload `dist` folder via FTP

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Use different port
npm run dev -- --port 5174
```

**API not connecting**
- Ensure backend server is running on port 3000
- Check `.env` file configuration
- Verify CORS settings on backend

**JWT token expired**
- User needs to login again
- Automatic redirect to login page
- Clear localStorage if issues persist

**Styling issues**
- Clear browser cache
- Restart dev server
- Check Tailwind CSS configuration

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [Axios Guide](https://axios-http.com/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Create a pull request with description

## 📄 License

ISC License - See LICENSE file for details

## 🎉 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for utility-first styling
- Vite for lightning-fast build tool
- Community contributors and users

---

**Version**: 1.0.0  
**Last Updated**: May 14, 2026  
**Status**: ✅ Active Development

[Back to Main README](../README.md)
