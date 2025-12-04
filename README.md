# Premium Portfolio Website

A premium, SEO-optimized portfolio website with glassmorphism design and complete admin panel. Built with Next.js, Express, and MongoDB.

![Portfolio Preview](https://via.placeholder.com/1200x600/050505/ffffff?text=Premium+Portfolio)

## ✨ Features

### 🎨 Design
- **Ultra-minimal dark mode** with cyber aesthetic (#050505 base)
- **Glassmorphism 2.0** with frosted cards and gradient borders
- **Subtle grain texture** overlay for premium feel
- **Radial gradient glows** for depth
- **Smooth animations** with Framer Motion
- **Fully responsive** mobile-first design

### 🔍 SEO Optimized
- **Server-Side Rendering (SSR)** with Next.js
- **Dynamic meta tags** (Title, Description, OG, Twitter)
- **JSON-LD structured data** (Schema.org Person)
- **Semantic HTML5** throughout
- **Sitemap.xml** generation
- **robots.txt** configuration
- **Perfect accessibility** scores

### 🛠️ Admin Panel
- **SEO Manager**: Edit meta tags, OG image, keywords
- **Hero Manager**: Update name, bio, rotating titles, profile picture
- **Content Manager**: Resume URL, TryHackMe ID, social links
- **Blog Manager**: Add/Edit/Delete Medium article links
- **Profile Settings**: Change admin password
- **JWT Authentication**: Secure admin access

### 📱 Sections
- **Hero**: Animated profile picture, typing effect, bio
- **Resume**: Download button with glassmorphism
- **TryHackMe**: Embedded badge with progress
- **Blog CTA**: Call-to-action for blog articles
- **Blog Page**: SEO-optimized article listing
- **Footer**: Social media links

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   cd /Users/jasilm/Desktop/deepak
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Setup environment variables**
   
   Frontend (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Backend (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key-change-this
   PORT=5000
   NODE_ENV=development
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   brew services start mongodb-community
   # Or use MongoDB Atlas connection string
   ```

6. **Run backend server**
   ```bash
   cd backend
   npm run dev
   ```

7. **Run frontend (in new terminal)**
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login
   - Backend API: http://localhost:5000/api/health

## 📁 Project Structure

```
deepak/
├── pages/
│   ├── _app.js              # App wrapper
│   ├── _document.js         # HTML document (lang="en")
│   ├── index.js             # Landing page (SSR)
│   ├── blog.js              # Blog listing (SSR)
│   └── admin/
│       ├── login.js         # Admin login
│       └── dashboard.js     # Admin panel
├── components/
│   ├── SEO.js               # SEO component with metadata
│   ├── Hero.js              # Hero section
│   ├── ResumeSection.js     # Resume download
│   ├── TryHackMeSection.js  # THM badge
│   ├── BlogCTA.js           # Blog call-to-action
│   ├── Footer.js            # Footer with social links
│   └── admin/
│       ├── AdminLayout.js   # Admin layout
│       ├── SEOManager.js    # SEO settings
│       ├── HeroManager.js   # Hero content
│       ├── ContentManager.js# Resume, THM, socials
│       ├── BlogManager.js   # Blog posts CRUD
│       └── ProfileSettings.js# Password change
├── styles/
│   └── globals.css          # Global styles + Tailwind
├── backend/
│   ├── server.js            # Express server
│   ├── models/
│   │   ├── SiteConfig.js    # Site configuration
│   │   ├── BlogPost.js      # Blog posts
│   │   └── User.js          # Admin user
│   ├── routes/
│   │   ├── auth.js          # Authentication
│   │   ├── config.js        # Site config API
│   │   └── blog.js          # Blog posts API
│   ├── middleware/
│   │   └── auth.js          # JWT auth middleware
│   └── utils/
│       └── initDefaults.js  # Initialize defaults
├── public/
│   ├── robots.txt           # SEO robots file
│   └── (add your assets here)
├── tailwind.config.js       # Custom theme config
├── next.config.js           # Next.js config
└── package.json             # Dependencies
```

## 🎨 Customization

### Colors (tailwind.config.js)
```javascript
colors: {
  'cyber-dark': '#050505',      // Base background
  'glass-border': 'rgba(255, 255, 255, 0.1)',
  'glass-light': 'rgba(255, 255, 255, 0.05)',
  'glow-blue': 'rgba(59, 130, 246, 0.15)',
  'glow-purple': 'rgba(147, 51, 234, 0.15)',
}
```

### Fonts
- Primary: Inter (Google Fonts)
- Code/Accent: JetBrains Mono

### Animations
- `fade-in`: Smooth fade entrance
- `slide-up`: Slide up with fade
- `glow-pulse`: Pulsing glow effect
- Custom cubic-bezier easing

## 🔐 Security

- JWT authentication for admin panel
- bcryptjs password hashing
- Helmet.js for HTTP headers
- Rate limiting on API routes
- CORS protection
- Input validation with express-validator

## 📊 SEO Features

### Implemented
- ✅ Server-Side Rendering (SSR)
- ✅ Dynamic meta tags
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Semantic HTML5
- ✅ Sitemap.xml
- ✅ robots.txt
- ✅ Alt text for images
- ✅ Font display: swap

### Todo After Deployment
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Configure Google Analytics
- [ ] Test with PageSpeed Insights
- [ ] Verify Open Graph with debuggers

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions covering:
- Vercel (Frontend)
- Render/Railway (Backend)
- MongoDB Atlas (Database)
- Environment variables
- Custom domains
- Post-deployment checklist

## 📝 API Documentation

### Public Endpoints

**GET** `/api/config`
- Get site configuration
- No authentication required

**GET** `/api/blog`
- Get all active blog posts
- No authentication required

**GET** `/api/health`
- Health check
- Returns: `{"status": "OK"}`

### Protected Endpoints (Requires JWT)

**POST** `/api/auth/login`
- Login and get JWT token
- Body: `{ email, password }`

**PUT** `/api/config`
- Update site configuration
- Requires: `Authorization: Bearer <token>`

**POST** `/api/blog`
- Create blog post
- Requires: `Authorization: Bearer <token>`

**PUT** `/api/blog/:id`
- Update blog post
- Requires: `Authorization: Bearer <token>`

**DELETE** `/api/blog/:id`
- Delete blog post
- Requires: `Authorization: Bearer <token>`

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin handling

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - Feel free to use this template for your portfolio.

## 🆘 Support

For issues:
1. Check the logs (browser console, Vercel, Render)
2. Verify environment variables
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
4. Check MongoDB connection

## 🎯 Default Credentials

**Admin Login** (Change immediately after first deployment):
- Email: `admin@example.com` (or value from .env)
- Password: `admin123` (or value from .env)

Access admin at: `/admin/login`

---

**Built with ❤️ for cybersecurity professionals**
