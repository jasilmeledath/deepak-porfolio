# Premium Portfolio Website

A premium, SEO-optimized portfolio website with glassmorphism design and complete admin panel. Built with Next.js, Express, and MongoDB.

## ✨ Features

### 🎨 Design
- **Ultra-minimal dark mode** with cyber aesthetic
- **Glassmorphism UI** with frosted cards and gradient borders
- **Subtle grain texture** overlay for premium feel
- **Radial gradient glows** for depth
- **Smooth animations** with Framer Motion
- **Fully responsive** mobile-first design

### 🔍 SEO Optimized
- **Server-Side Rendering (SSR)** with Next.js
- **Dynamic meta tags** (Title, Description, OG, Twitter)
- **JSON-LD structured data** (Schema.org Person)
- **Semantic HTML5** throughout
- **Perfect accessibility** scores

### 🛠️ Admin Panel
- **SEO Manager**: Edit meta tags, OG image, keywords
- **Hero Manager**: Update name, bio, rotating titles, profile picture
- **Content Manager**: Resume URL, social links
- **Blog Manager**: Add/Edit/Delete Medium article links
- **Profile Settings**: Change admin password
- **JWT Authentication**: Secure admin access

### 📱 Sections
- **Hero**: Animated profile picture, typing effect, bio
- **Resume**: Download button with glassmorphism
- **Blog CTA**: Call-to-action for blog articles
- **Blog Page**: SEO-optimized article listing
- **Footer**: Social media links (LinkedIn, GitHub, Twitter, Medium, Instagram, TryHackMe)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasilmeledath/deepak-porfolio.git
   cd deepak-porfolio
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   cd ..
   ```

3. **Setup environment variables**
   
   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   **Backend** (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key-change-this
   PORT=8080
   NODE_ENV=development
   ADMIN_EMAIL=admin@deepaksivan.in
   ADMIN_PASSWORD=admin@123
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin/login
   - **Backend API**: http://localhost:8080/api/health

## 📁 Project Structure

```
deepak-portfolio/
├── frontend/                  # Next.js frontend
│   ├── pages/
│   │   ├── index.js          # Landing page (SSR)
│   │   ├── blog.js           # Blog listing (SSR)
│   │   └── admin/
│   │       ├── login.js      # Admin login
│   │       └── dashboard.js  # Admin panel
│   ├── components/
│   │   ├── Hero.js
│   │   ├── ResumeSection.js
│   │   ├── Footer.js
│   │   └── admin/            # Admin components
│   ├── styles/
│   │   └── globals.css       # Global styles + Tailwind
│   ├── public/               # Static assets
│   └── package.json
│
├── backend/                   # Express backend
│   ├── server.js             # Main server file
│   ├── models/
│   │   ├── SiteConfig.js     # Site configuration
│   │   ├── BlogPost.js       # Blog posts
│   │   └── User.js           # Admin user
│   ├── routes/
│   │   ├── auth.js           # Authentication
│   │   ├── config.js         # Site config API
│   │   └── blog.js           # Blog posts API
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md        # Comprehensive deployment guide
└── README.md                  # This file
```

## 🎨 Customization

### Admin Panel
Access the admin panel at `/admin/login` to customize:
- Profile name, bio, and profile picture
- Social media links
- Resume PDF
- Blog posts
- SEO meta tags and keywords

### Supported Social Icons
Add these in Content Manager:
- `linkedin`
- `github`
- `twitter`
- `medium`
- `instagram`
- `tryhackme`

### Colors & Theme
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'cyber-dark': '#050505',
  'glass-border': 'rgba(255, 255, 255, 0.1)',
  'glow-blue': 'rgba(59, 130, 246, 0.15)',
  'glow-purple': 'rgba(147, 51, 234, 0.15)',
}
```

## 🔐 Security

- JWT authentication for admin panel
- bcryptjs password hashing
- Helmet.js for HTTP headers
- Rate limiting on API routes
- CORS protection
- Input validation

## 🚢 Deployment

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for detailed deployment instructions.

### Quick Deploy Summary:
- **Frontend**: Vercel (recommended)
- **Backend**: Railway or Render
- **Database**: MongoDB Atlas

## 📊 SEO Features

### Implemented
✅ Server-Side Rendering (SSR)  
✅ Dynamic meta tags  
✅ Open Graph tags  
✅ Twitter Card tags  
✅ JSON-LD structured data  
✅ Semantic HTML5  
✅ robots.txt  

## 📝 API Documentation

### Public Endpoints

- `GET /api/config` - Get site configuration
- `GET /api/blog` - Get all blog posts
- `GET /api/health` - Health check

### Protected Endpoints (Requires JWT)

- `POST /api/auth/login` - Login
- `PUT /api/config` - Update configuration
- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

## 🛠️ Tech Stack

### Frontend
- Next.js 14 - React framework with SSR
- React 18 - UI library
- Tailwind CSS - Utility-first CSS
- Framer Motion - Animations
- Axios - HTTP client

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT - Authentication
- bcryptjs - Password hashing
- Helmet - Security headers

## 🎯 Default Credentials

**Change immediately after deployment!**

- Email: `admin@deepaksivan.in`
- Password: `admin@123`

Access: `/admin/login`

## 📄 License

MIT License - Feel free to use this template for your portfolio.

## 👨‍💻 Credits

**Designed & Developed by Jasilmeledath**

---

**Built for cybersecurity professionals** 🛡️
