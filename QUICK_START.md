# Premium Portfolio - Quick Reference

## 🚀 Quick Start Commands

### Development
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)
npm run dev
```

### Access Points
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **Backend API**: http://localhost:5000/api/health

### Default Admin Login
- Email: `admin@example.com`
- Password: `admin123`
- ⚠️ Change immediately after first login!

## 📂 Key Files to Customize

### Frontend
- `components/SEO.js` - SEO metadata
- `tailwind.config.js` - Colors, fonts, animations
- `styles/globals.css` - Global styles
- `public/` - Add your images (profile.jpg, resume.pdf, og-image.jpg)

### Backend
- `backend/.env` - Environment configuration
- `backend/models/SiteConfig.js` - Default content structure

## 🎨 Customization Checklist

After deployment:
1. [ ] Change admin password
2. [ ] Update SEO meta tags
3. [ ] Add your name and bio
4. [ ] Upload profile picture to `/public/profile.jpg`
5. [ ] Upload resume to `/public/resume.pdf`
6. [ ] Upload OG image to `/public/og-image.jpg`
7. [ ] Configure TryHackMe username
8. [ ] Add social media links
9. [ ] Create blog posts
10. [ ] Test all links

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key-min-32-chars
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
CORS_ORIGIN=http://localhost:3000
```

## 🌐 Production URLs (Update after deployment)

### Vercel (Frontend)
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
```

### Render (Backend)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=production-secret-key-very-secure
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.vercel.app
```

## 📝 API Endpoints

### Public
- `GET /api/config` - Get site configuration
- `GET /api/blog` - Get blog posts
- `GET /api/health` - Health check

### Protected (Requires JWT)
- `POST /api/auth/login` - Login
- `PUT /api/config` - Update config
- `POST /api/blog` - Create post
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post

## 🎨 Color Palette

```css
--cyber-dark: #050505        /* Base background */
--glass-border: rgba(255, 255, 255, 0.1)
--glass-light: rgba(255, 255, 255, 0.05)
--glow-blue: rgba(59, 130, 246, 0.15)
--glow-purple: rgba(147, 51, 234, 0.15)
```

## 🚨 Troubleshooting

### "Cannot connect to backend"
- Check backend is running: `http://localhost:5000/api/health`
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS_ORIGIN in backend `.env`

### "MongoDB connection failed"
- Verify MongoDB is running: `brew services list`
- Check MONGODB_URI in backend `.env`
- For Atlas: whitelist IP addresses

### "Build failed on Vercel"
- Check all environment variables are set
- Verify no syntax errors in code
- Check Vercel build logs

## 📚 Documentation
- Full README: `README.md`
- Deployment Guide: `DEPLOYMENT.md`
- This file: Quick reference

## 🆘 Support Checklist
1. Check browser console for errors
2. Check Vercel/Render logs
3. Verify all environment variables
4. Test API endpoints with curl/Postman
5. Clear cache and rebuild
