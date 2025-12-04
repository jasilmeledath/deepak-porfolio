# Premium Portfolio - Deployment Guide

## 📋 Table of Contents
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render/Railway)](#backend-deployment-render)
- [MongoDB Setup (MongoDB Atlas)](#mongodb-setup)
- [Environment Variables](#environment-variables)
- [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   cd /Users/jasilm/Desktop/deepak
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure build settings:
     - Framework Preset: `Next.js`
     - Root Directory: `./` (leave empty or set to root)
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

---

## 🖥️ Backend Deployment (Render)

### Prerequisites
- Render account (free tier available)
- MongoDB Atlas account

### Steps

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

2. **Configure Service**
   - Name: `portfolio-backend`
   - Environment: `Node`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   PORT=5000
   NODE_ENV=production
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=ChangeThisSecurePassword123
   CORS_ORIGIN=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your backend

---

## 🗄️ MongoDB Setup (MongoDB Atlas)

### Steps

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose "Shared" (Free tier)
   - Select region closest to your backend
   - Click "Create Cluster"

3. **Configure Security**
   - **Database Access**: Create a user
     - Username: `portfolio_user`
     - Password: Generate strong password
     - Role: `Read and write to any database`
   
   - **Network Access**: Add IP addresses
     - Click "Add IP Address"
     - Select "Allow Access from Anywhere" (0.0.0.0/0) for production
     - Or add specific IPs for better security

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Format: `mongodb+srv://portfolio_user:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio`

---

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=generate-a-strong-random-string-at-least-32-characters
PORT=5000
NODE_ENV=production
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=SecurePassword123!
CORS_ORIGIN=https://yourdomain.com
```

**Security Notes:**
- Never commit `.env` files to Git
- Use strong, unique passwords
- Change default admin credentials immediately after first login
- Generate JWT_SECRET using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## ✅ Post-Deployment Checklist

### 1. Test Backend API
```bash
curl https://your-backend.onrender.com/api/health
```
Should return: `{"status":"OK"}`

### 2. Update Frontend URL
- In Vercel, update `NEXT_PUBLIC_API_URL` to your Render backend URL
- Redeploy if needed

### 3. Configure Custom Domain (Optional)
- **Vercel**: Settings → Domains → Add domain
- **Render**: Settings → Custom Domain

### 4. First Login
- Go to `https://yourdomain.com/admin/login`
- Login with default credentials (from .env)
- **IMMEDIATELY** change password in Profile Settings

### 5. Configure Site Content
- Update SEO settings
- Add your name and bio
- Upload profile picture
- Add resume PDF to `/public` folder
- Configure TryHackMe username
- Add social media links
- Create blog posts

### 6. SEO Optimization
- Submit sitemap to Google Search Console: `https://yourdomain.com/api/sitemap.xml`
- Submit to Bing Webmaster Tools
- Verify Open Graph tags using [opengraph.xyz](https://www.opengraph.xyz/)

### 7. Performance Testing
- Test with [PageSpeed Insights](https://pagespeed.web.dev/)
- Test with [GTmetrix](https://gtmetrix.com/)

---

## 🔧 Alternative Deployment Options

### Backend Alternatives
- **Railway**: Similar to Render, great DX
- **Heroku**: Classic option (paid tiers)
- **DigitalOcean App Platform**: More control
- **AWS Elastic Beanstalk**: Enterprise option

### Database Alternatives
- **MongoDB Atlas**: Recommended (free tier)
- **Self-hosted MongoDB**: On VPS/cloud
- **Railway PostgreSQL**: If switching to SQL

---

## 🐛 Troubleshooting

### Frontend Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Backend Connection Issues
- Check CORS_ORIGIN matches frontend URL exactly
- Verify MongoDB IP whitelist includes Render IPs
- Check environment variables are set correctly

### API Not Connecting
- Ensure `NEXT_PUBLIC_API_URL` doesn't have trailing slash
- Check browser console for CORS errors
- Verify backend is running: check Render logs

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)

---

## 🆘 Support

For issues:
1. Check Vercel/Render logs
2. Check browser console for errors
3. Verify all environment variables
4. Test API endpoints directly

**Default Admin Credentials** (Change immediately after deployment):
- Email: Value from `ADMIN_EMAIL` env variable
- Password: Value from `ADMIN_PASSWORD` env variable
