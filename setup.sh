#!/bin/bash

echo "🚀 Portfolio Quick Start Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Setup MongoDB (local or Atlas)"
echo "2. Configure environment variables:"
echo "   - Copy .env.local.example to .env.local (frontend)"
echo "   - Update backend/.env with your MongoDB URI"
echo ""
echo "3. Start the development servers:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: npm run dev"
echo ""
echo "4. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Admin: http://localhost:3000/admin/login"
echo "   - Backend: http://localhost:5000/api/health"
echo ""
echo "5. Default admin credentials (CHANGE IMMEDIATELY):"
echo "   - Email: admin@example.com"
echo "   - Password: admin123"
echo ""
echo "📖 For deployment instructions, see DEPLOYMENT.md"
echo ""
