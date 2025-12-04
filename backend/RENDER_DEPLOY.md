# Render Deployment Guide for Backend

## Quick Deploy to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `jasilmeledath/deepak-porfolio`
3. Configure the service:

**Basic Settings:**
- **Name**: `deepak-portfolio-backend` (or any name)
- **Region**: Oregon (or closest to you)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- **Free** (or upgrade as needed)

### Step 3: Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `8080` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Strong random string (64+ chars) |
| `ADMIN_EMAIL` | `admin@deepaksivan.in` |
| `ADMIN_PASSWORD` | Your secure password |
| `CORS_ORIGIN` | `https://yourdomain.vercel.app` |

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**MongoDB Atlas Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 4: Health Check (Optional but Recommended)
- **Health Check Path**: `/api/health`

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repo
   - Install dependencies
   - Start the server
3. Wait for deployment to complete (~2-3 minutes)

### Step 6: Get Your Backend URL
After deployment, you'll get a URL like:
```
https://deepak-portfolio-backend.onrender.com
```

### Step 7: Update Frontend
Update your frontend `.env.local` with the new backend URL:
```env
NEXT_PUBLIC_API_URL=https://deepak-portfolio-backend.onrender.com/api
```

### Step 8: Update CORS
After deploying frontend to Vercel, update the `CORS_ORIGIN` environment variable in Render:
```
CORS_ORIGIN=https://your-actual-domain.vercel.app
```

## ⚠️ Important Notes

### Free Tier Limitations
- Free instances spin down after 15 minutes of inactivity
- First request after inactivity takes ~30 seconds (cold start)
- 750 hours/month free
- Consider upgrading for production use

### MongoDB Atlas Setup
1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist all IPs: `0.0.0.0/0`
4. Copy connection string and replace `<password>` with actual password

### Security Checklist
- ✅ Change default admin password
- ✅ Use strong JWT secret (64+ characters)
- ✅ Use MongoDB Atlas (not local MongoDB)
- ✅ Set proper CORS_ORIGIN (your frontend domain)
- ✅ Never commit .env files

## 🔧 Troubleshooting

**Build Failed:**
- Check if `package.json` is in `backend/` directory
- Verify Node version (18+)
- Check build logs in Render dashboard

**Server Won't Start:**
- Verify all environment variables are set
- Check MongoDB connection string is correct
- Review logs in Render dashboard

**CORS Errors:**
- Ensure `CORS_ORIGIN` matches your frontend URL exactly
- Include protocol (`https://`)
- No trailing slash

**Database Connection Failed:**
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check username/password in connection string
- Ensure database cluster is running

## 📊 Monitoring

**View Logs:**
- Go to your service in Render dashboard
- Click "Logs" tab
- Monitor real-time logs

**Check Health:**
Visit: `https://your-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-12-04T..."
}
```

## 🔄 Auto-Deploy

Render automatically deploys when you push to the main branch:
```bash
git add .
git commit -m "Update backend"
git push origin main
```

## 📞 Support

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Check Logs**: Render Dashboard → Your Service → Logs

---

**Your backend is now live!** 🎉

API URL: `https://your-backend.onrender.com/api`
