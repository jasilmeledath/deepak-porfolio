#!/bin/bash

echo "🔍 Premium Portfolio - Installation Verification"
echo "=================================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0

echo "📦 Checking Dependencies..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
    ISSUES=$((ISSUES + 1))
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    ISSUES=$((ISSUES + 1))
fi

echo ""
echo "📁 Checking Project Structure..."
echo ""

# Check frontend files
FRONTEND_FILES=(
    "package.json"
    "next.config.js"
    "tailwind.config.js"
    "pages/index.js"
    "pages/blog.js"
    "pages/admin/login.js"
    "pages/admin/dashboard.js"
    "components/SEO.js"
    "components/Hero.js"
    "styles/globals.css"
)

for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
        ISSUES=$((ISSUES + 1))
    fi
done

echo ""

# Check backend files
BACKEND_FILES=(
    "backend/package.json"
    "backend/server.js"
    "backend/models/SiteConfig.js"
    "backend/models/BlogPost.js"
    "backend/models/User.js"
    "backend/routes/auth.js"
    "backend/routes/config.js"
    "backend/routes/blog.js"
)

for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
        ISSUES=$((ISSUES + 1))
    fi
done

echo ""
echo "⚙️  Checking Environment Files..."
echo ""

# Check .env files
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} Frontend .env.local exists"
else
    echo -e "${YELLOW}⚠${NC} Frontend .env.local not found (copy from .env.local.example)"
    ISSUES=$((ISSUES + 1))
fi

if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} Backend .env exists"
else
    echo -e "${YELLOW}⚠${NC} Backend .env not found (copy from backend/.env.example)"
    ISSUES=$((ISSUES + 1))
fi

echo ""
echo "📚 Checking Documentation..."
echo ""

DOCS=(
    "README.md"
    "DEPLOYMENT.md"
    "QUICK_START.md"
    "PROJECT_COMPLETE.md"
    "DESIGN_SYSTEM.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc"
    else
        echo -e "${RED}✗${NC} $doc missing"
        ISSUES=$((ISSUES + 1))
    fi
done

echo ""
echo "🔍 Checking node_modules..."
echo ""

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Frontend dependencies not installed. Run: npm install"
    ISSUES=$((ISSUES + 1))
fi

if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Backend dependencies not installed. Run: cd backend && npm install"
    ISSUES=$((ISSUES + 1))
fi

echo ""
echo "=================================================="
echo ""

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Your project is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Configure environment variables (.env files)"
    echo "2. Setup MongoDB"
    echo "3. Run: cd backend && npm run dev (Terminal 1)"
    echo "4. Run: npm run dev (Terminal 2)"
    echo "5. Visit: http://localhost:3000"
else
    echo -e "${RED}❌ Found $ISSUES issue(s). Please fix them before proceeding.${NC}"
fi

echo ""
