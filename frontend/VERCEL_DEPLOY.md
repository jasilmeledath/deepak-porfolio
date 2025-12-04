# Vercel Deployment Guide for Frontend

## Quick Deploy to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project
1. Click **"Add New"** → **"Project"**
2. Import `jasilmeledath/deepak-porfolio` repository
3. Vercel will automatically detect Next.js

### Step 3: Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `frontend`

**Build Settings:**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

### Step 4: Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api` |
| `NEXT_PUBLIC_SITE_URL` | Leave empty (will use Vercel URL) |

**Important:** 
- Get your backend URL from Render after deploying backend
- Update `NEXT_PUBLIC_API_URL` with actual backend URL
- `NEXT_PUBLIC_SITE_URL` will be auto-populated by Vercel

### Step 5: Deploy
1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build your Next.js app
   - Deploy to global CDN
3. Wait ~2-3 minutes for deployment

### Step 6: Get Your URLs

After deployment, you'll get:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each git branch/PR

### Step 7: Update Backend CORS

⚠️ **Critical:** Update your backend environment variable on Render:

```env
CORS_ORIGIN=https://your-project.vercel.app
```

Go to Render → Your Service → Environment → Edit `CORS_ORIGIN`

### Step 8: Test Your Site

1. Visit: `https://your-project.vercel.app`
2. Test admin login: `https://your-project.vercel.app/admin/login`
3. Verify API calls are working

## 🎨 Custom Domain (Optional)

### Add Custom Domain
1. Go to Project Settings → Domains
2. Click **"Add"**
3. Enter your domain (e.g., `deepaksivan.com`)
4. Follow DNS configuration instructions

### DNS Configuration
Add these records to your domain provider:

**For root domain (@):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Update Environment Variables
After adding custom domain:

**Vercel (Frontend):**
```env
NEXT_PUBLIC_SITE_URL=https://deepaksivan.com
```

**Render (Backend):**
```env
CORS_ORIGIN=https://deepaksivan.com
```

## 📝 Post-Deployment Checklist

### Update Content via Admin Panel
1. Login at: `https://yourdomain.vercel.app/admin/login`
2. Default credentials: `admin@deepaksivan.in` / `admin@123`
3. **Change password immediately** in Profile Settings

### Upload Assets
1. Add `profile.png` to `frontend/public/` folder
2. Add `resume.pdf` to `frontend/public/` folder
3. Commit and push:
   ```bash
   git add frontend/public/
   git commit -m "Add profile image and resume"
   git push origin main
   ```
4. Vercel auto-deploys on push

### Configure Content
- ✅ Update profile name and bio
- ✅ Add social media links (LinkedIn, GitHub, etc.)
- ✅ Set resume URL to `/resume.pdf`
- ✅ Add blog posts
- ✅ Update SEO settings (title, description, keywords)
- ✅ Add OG image for social sharing

## 🔄 Auto-Deploy

Vercel automatically deploys:
- **Main branch** → Production
- **Other branches** → Preview deployments
- **Pull Requests** → Preview URLs

To deploy updates:
```bash
git add .
git commit -m "Update content"
git push origin main
```

## ⚙️ Environment Variables Reference

### Production
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Preview/Development
Same as production, or use staging backend if available.

## 🐛 Troubleshooting

### Build Failed
**Error:** `Module not found`
- Check if all dependencies are in `package.json`
- Verify root directory is set to `frontend`
- Check build logs in Vercel dashboard

**Error:** `API calls fail`
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running on Render
- Ensure backend CORS_ORIGIN matches frontend URL

### Images Not Loading
- Images must be in `frontend/public/` folder
- Use paths like `/profile.png` (not `/public/profile.png`)
- Commit and push images to git

### Admin Panel Not Working
- Check backend API is accessible
- Verify environment variables are set
- Check browser console for errors
- Ensure backend CORS is configured correctly

### CORS Errors
- Backend `CORS_ORIGIN` must match frontend URL **exactly**
- Include protocol: `https://yourdomain.com`
- No trailing slash
- Update in Render dashboard and restart service

## 📊 Performance Optimization

### Already Configured
✅ Server-Side Rendering (SSR)  
✅ Automatic code splitting  
✅ Image optimization with Next.js Image  
✅ CDN distribution via Vercel Edge Network  
✅ Automatic HTTPS  

### Optional Enhancements
- Add analytics (Vercel Analytics or Google Analytics)
- Configure caching headers
- Optimize images (WebP format, proper sizes)
- Monitor with Vercel Speed Insights

## 📱 Testing

### Test Checklist
- [ ] Homepage loads correctly
- [ ] Profile image displays
- [ ] Blog page works
- [ ] Admin login successful
- [ ] Admin panel all managers work
- [ ] Resume downloads
- [ ] Social links work
- [ ] Mobile responsive
- [ ] SEO meta tags present

### Tools
- **Lighthouse**: Check performance/SEO scores
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **OG Debugger**: https://www.opengraph.xyz/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## 🔐 Security

### SSL/HTTPS
✅ Automatic HTTPS via Vercel  
✅ SSL certificates auto-renewed  

### Best Practices
- ✅ Environment variables (not in code)
- ✅ JWT authentication for admin
- ✅ CORS configured properly
- ⚠️ Change default admin password
- ⚠️ Use strong passwords

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: support@vercel.com
- **Community**: https://github.com/vercel/next.js/discussions

## 🎉 Your Portfolio is Live!

**Production URL:** `https://your-project.vercel.app`  
**Admin Panel:** `https://your-project.vercel.app/admin/login`

Enjoy your premium portfolio! 🚀

---

**Designed & Developed by Jasilmeledath**
