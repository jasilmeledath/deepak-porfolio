#!/bin/bash

# Premium Portfolio - Complete Setup & Launch Script
# This script will guide you through the entire setup process

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║      🚀 PREMIUM PORTFOLIO - COMPLETE SETUP WIZARD 🚀      ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Verify prerequisites
echo -e "${BLUE}Step 1/5:${NC} Verifying prerequisites..."
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found!${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js $(node -v)"
echo -e "${GREEN}✓${NC} npm $(npm -v)"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}Step 2/5:${NC} Installing dependencies..."
echo ""

read -p "Install frontend dependencies? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Installing frontend packages..."
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
fi

echo ""
read -p "Install backend dependencies? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Installing backend packages..."
    cd backend && npm install && cd ..
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
fi

# Step 3: Setup environment files
echo ""
echo -e "${BLUE}Step 3/5:${NC} Configuring environment variables..."
echo ""

if [ ! -f ".env.local" ]; then
    read -p "Create frontend .env.local? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.local.example .env.local
        echo -e "${GREEN}✓${NC} Created .env.local (configure before running)"
    fi
fi

if [ ! -f "backend/.env" ]; then
    read -p "Create backend .env? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✓${NC} Created backend/.env (configure before running)"
    fi
fi

# Step 4: MongoDB setup check
echo ""
echo -e "${BLUE}Step 4/5:${NC} MongoDB setup..."
echo ""
echo "MongoDB is required for the backend to work."
echo ""
echo "Options:"
echo "1. Local MongoDB (brew install mongodb-community)"
echo "2. MongoDB Atlas (cloud, free tier available)"
echo ""
read -p "Do you have MongoDB configured? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}⚠️  MongoDB Setup Required${NC}"
    echo ""
    echo "Option 1 - Local MongoDB:"
    echo "  brew install mongodb-community"
    echo "  brew services start mongodb-community"
    echo "  Use URI: mongodb://localhost:27017/portfolio"
    echo ""
    echo "Option 2 - MongoDB Atlas (Recommended):"
    echo "  1. Visit https://www.mongodb.com/cloud/atlas"
    echo "  2. Create free account and cluster"
    echo "  3. Get connection string"
    echo "  4. Update MONGODB_URI in backend/.env"
    echo ""
    echo "After setting up MongoDB, update backend/.env with your connection string."
    echo ""
fi

# Step 5: Configuration reminder
echo ""
echo -e "${BLUE}Step 5/5:${NC} Final configuration checklist..."
echo ""

echo "Before running the application, ensure you've configured:"
echo ""
echo "Frontend (.env.local):"
echo "  ✓ NEXT_PUBLIC_API_URL=http://localhost:5000/api"
echo "  ✓ NEXT_PUBLIC_SITE_URL=http://localhost:3000"
echo ""
echo "Backend (backend/.env):"
echo "  ✓ MONGODB_URI=<your-mongodb-uri>"
echo "  ✓ JWT_SECRET=<generate-secure-random-string>"
echo "  ✓ ADMIN_EMAIL=<your-email>"
echo "  ✓ ADMIN_PASSWORD=<secure-password>"
echo ""

echo "To generate a secure JWT_SECRET, run:"
echo "  node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
echo ""

# Summary
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    SETUP COMPLETE! 🎉                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps to launch your portfolio:"
echo ""
echo "1. Configure environment files:"
echo "   - Edit .env.local (frontend)"
echo "   - Edit backend/.env (backend)"
echo ""
echo "2. Start the servers:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: npm run dev"
echo ""
echo "3. Access your portfolio:"
echo "   Frontend:     http://localhost:3000"
echo "   Admin Panel:  http://localhost:3000/admin/login"
echo "   Backend API:  http://localhost:5000/api/health"
echo ""
echo "4. Default admin credentials (CHANGE IMMEDIATELY):"
echo "   Email:    admin@example.com"
echo "   Password: admin123"
echo ""
echo "5. Read the documentation:"
echo "   Quick Start:  QUICK_START.md"
echo "   Full Docs:    README.md"
echo "   Deployment:   DEPLOYMENT.md"
echo ""
echo "Need help? Run: ./verify.sh to check your setup"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
