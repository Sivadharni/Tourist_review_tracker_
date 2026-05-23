# Tourist Attraction Review System - Frontend

A modern, production-quality full-stack web application for exploring and reviewing tourist attractions worldwide.

## 🌟 Features

### Core Functionality
- **🏠 Home Page**: Hero section with search functionality and attraction cards
- **🔐 Authentication**: Secure JWT-based login and registration system
- **📍 Attraction Details**: Comprehensive attraction pages with reviews
- **✍️ Review System**: Interactive star rating and comment system
- **👤 User Profiles**: Personal dashboard with review history
- **🔍 Search & Filter**: Real-time search and sorting capabilities

### Advanced Features
- **⭐ Interactive Star Ratings**: Visual rating system with hover effects
- **📱 Responsive Design**: Mobile-first approach with Bootstrap 5
- **🎨 Modern UI**: Clean, professional design with smooth transitions
- **🔔 Toast Notifications**: User feedback for all actions
- **⚡ Loading States**: Professional spinners and empty states
- **🎯 Accessibility**: Semantic HTML and ARIA labels

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern component-based UI framework
- **React Router 6** - Client-side routing
- **Bootstrap 5** - Professional UI components
- **React Bootstrap** - React-specific Bootstrap components
- **Axios** - HTTP client with interceptors

### Backend Integration
- **Spring Boot** - REST API backend
- **JWT Authentication** - Secure token-based auth
- **MySQL Database** - Data persistence
- **RESTful APIs** - Standardized endpoints

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend server running on port 8080

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tourist-review-tracker-main/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

4. **Start the development server**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navigation.js
│   │   ├── StarRating.js
│   │   ├── LoadingSpinner.js
│   │   ├── EmptyState.js
│   │   ├── ProtectedRoute.js
│   │   └── Footer.js
│   ├── context/              # React Context providers
│   │   ├── AuthContext.js
│   │   └── ToastContext.js
│   ├── pages/                # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── AttractionDetails.js
│   │   ├── AddReview.js
│   │   └── Profile.js
│   ├── utils/                # Utility functions
│   │   ├── api.js
│   │   └── helpers.js
│   ├── App.js                # Main application component
│   ├── App.css               # Global styles
│   └── index.js              # Application entry point
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0066cc`
- **Secondary Green**: `#00a86b`
- **Accent Orange**: `#ff6b35`
- **Light Blue**: `#e3f2fd`
- **Dark Blue**: `#004080`

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Clean, readable with 1.6 line height

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Rounded pill style with hover effects
- **Forms**: Floating labels with focus states
- **Navigation**: Transparent with blur effect

## 🔐 Authentication Flow

1. **Registration**: User creates account with username, email, password
2. **Login**: Credentials validated, JWT token issued
3. **Token Storage**: JWT stored in localStorage with axios interceptor
4. **Protected Routes**: Authentication check before accessing protected pages
5. **Auto Logout**: Token expiration handling and redirect

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px  
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

## 🔄 State Management

### Context Providers
- **AuthContext**: User authentication state and methods
- **ToastContext**: Global notification system

### Local State
- **useState**: Component-specific state
- **useEffect**: Side effects and data fetching
- **useParams**: URL parameter extraction

## 🌐 API Integration

### Endpoints
```javascript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/user

// Attractions
GET  /api/attractions
GET  /api/attractions/:id
GET  /api/attractions/:id/reviews
POST /api/attractions/:id/reviews

// Users
GET  /api/users/:id/reviews
GET  /api/users/:id/stats
```

### Error Handling
- Global axios interceptors for common errors
- Component-level error boundaries
- User-friendly toast notifications

## 🎯 Performance Optimizations

- **Code Splitting**: Lazy loading for better initial load
- **Image Optimization**: Responsive images with proper sizing
- **Debounced Search**: Prevent excessive API calls
- **Memoization**: React.memo for expensive components

## 🔧 Development Scripts

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
npm run eject  # Eject from Create React App
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

### Static Hosting
The build output can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## 🤝 Contributing Guidelines

1. **Code Style**: Follow existing patterns and conventions
2. **Components**: Make reusable, documented components
3. **Testing**: Add tests for new features
4. **Documentation**: Update README for new functionality

## 🐛 Troubleshooting

### Common Issues
- **CORS Errors**: Ensure backend allows frontend origin
- **Token Issues**: Clear localStorage if authentication fails
- **Build Errors**: Check Node.js version compatibility

### Debug Mode
```bash
# Start with debug logging
REACT_APP_DEBUG=true npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for the UI components
- Spring Boot team for the backend framework
- All contributors and users of this application
