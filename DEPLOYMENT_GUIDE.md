# Deployment Guide

This guide will help you deploy your premium portfolio website to production.

## 🌐 Deployment Architecture

- **Frontend**: Deploy to Vercel (recommended) or Netlify
- **Backend**: Deploy to Railway, Render, or DigitalOcean
- **Database**: MongoDB Atlas (cloud database)

---

## 📦 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create a new cluster (free tier available)
- [ ] Create database user with password
- [ ] Whitelist IP addresses (0.0.0.0/0 for all IPs in production)
- [ ] Copy connection string

### 2. Environment Variables
- [ ] Update backend `.env` with production values
- [ ] Update frontend `.env.local` with production values
- [ ] Generate strong JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Change default admin credentials

---

## 🚀 Backend Deployment (Railway)

### Option 1: Deploy to Railway

1. **Create Railway Account**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` as root directory

3. **Configure Environment Variables**
   Add these variables in Railway dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your-generated-secret-key
   PORT=8080
   NODE_ENV=production
   ADMIN_EMAIL=admin@deepaksivan.in
   ADMIN_PASSWORD=your-secure-password
   CORS_ORIGIN=https://yourdomain.vercel.app
   ```

4. **Configure Start Command**
   - In Railway settings, set start command: `npm start`
   - Set root directory: `/backend`

5. **Deploy**
   - Railway will auto-deploy on push
   - Note your backend URL: `https://your-app.up.railway.app`

### Option 2: Deploy to Render

1. **Create Render Account**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: portfolio-backend
     - **Root Directory**: `backend`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Add Environment Variables**
   Same as Railway above

4. **Deploy**
   - Click "Create Web Service"
   - Note your backend URL: `https://your-app.onrender.com`

---

## 🎨 Frontend Deployment (Vercel)

### Deploy to Vercel (Recommended)

1. **Create Vercel Account**
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Environment Variables**
   Add in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
   NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will auto-deploy on push to main branch
   - Your site will be live at: `https://your-project.vercel.app`

6. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

---

## 🔧 Post-Deployment Steps

### 1. Update CORS Origin
After frontend deployment, update backend environment variable:
```
CORS_ORIGIN=https://your-actual-domain.vercel.app
```

### 2. Change Default Admin Credentials
- Login to admin panel at: `https://yourdomain.com/admin/login`
- Use default credentials (admin@deepaksivan.in / admin@123)
- Go to Profile Settings and change password immediately

### 3. Configure Content
- Add your profile image to `/public` folder
- Update all content through admin panel
- Add social media links
- Upload resume PDF

### 4. SEO Configuration
- Update SEO settings in admin panel
- Add custom OG image
- Configure meta tags
- Submit sitemap to Google Search Console

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (64+ characters)
- [ ] Enable HTTPS only
- [ ] Configure proper CORS origin
- [ ] Keep dependencies updated
- [ ] Enable MongoDB IP whitelist
- [ ] Add rate limiting (already configured)
- [ ] Never commit .env files

---

## 📊 Monitoring & Maintenance

### Railway Dashboard
- Monitor logs
- Check resource usage
- View deployment history

### Vercel Dashboard
- Analytics
- Build logs
- Performance metrics

### MongoDB Atlas
- Monitor database usage
- Set up alerts
- Regular backups

---

## 🐛 Troubleshooting

### Backend Issues
**Error: Cannot connect to MongoDB**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Ensure database user has proper permissions

**Error: CORS issues**
- Verify CORS_ORIGIN matches frontend URL exactly
- Check if protocol (https://) is included
- Ensure no trailing slash in URL

### Frontend Issues
**Error: API calls failing**
- Check NEXT_PUBLIC_API_URL is correct
- Verify backend is running
- Check browser console for errors

**Error: Images not loading**
- Ensure images are in `/public` folder
- Use correct paths (e.g., `/profile.png` not `/public/profile.png`)
- Check image file sizes

---

## 📱 Domain Configuration

### Connect Custom Domain to Vercel
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your domain
4. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Update Environment Variables
After domain setup, update:
- Backend `CORS_ORIGIN` to your new domain
- Frontend `NEXT_PUBLIC_SITE_URL` to your new domain

---

## 🔄 Continuous Deployment

Both Vercel and Railway support automatic deployments:

1. **Main Branch**: Auto-deploys to production
2. **Other Branches**: Preview deployments
3. **Pull Requests**: Preview URLs for testing

To deploy manually:
```bash
# Commit changes
git add .
git commit -m "Update content"
git push origin main
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Your Portfolio is Live!

After following this guide, your portfolio should be:
- ✅ Accessible worldwide
- ✅ Fast and optimized
- ✅ Secure with HTTPS
- ✅ Easy to update via admin panel
- ✅ SEO-ready for search engines

**Frontend URL**: `https://yourdomain.vercel.app`
**Admin Panel**: `https://yourdomain.vercel.app/admin/login`
**Backend API**: `https://your-backend.up.railway.app/api`

---

Need help? Check the troubleshooting section or consult the platform-specific documentation.
