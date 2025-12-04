import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import SEOManager from '../../components/admin/SEOManager';
import HeroManager from '../../components/admin/HeroManager';
import ContentManager from '../../components/admin/ContentManager';
import BlogManager from '../../components/admin/BlogManager';
import ProfileSettings from '../../components/admin/ProfileSettings';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('seo');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'seo', label: 'SEO Settings', icon: '🔍' },
    { id: 'hero', label: 'Hero Section', icon: '🎯' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'blog', label: 'Blog Posts', icon: '📚' },
    { id: 'profile', label: 'Profile', icon: '⚙️' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 font-mono">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your portfolio content and settings</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 glass-card p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-white'
                : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-card p-6 sm:p-8">
        {activeTab === 'seo' && <SEOManager />}
        {activeTab === 'hero' && <HeroManager />}
        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'profile' && <ProfileSettings />}
      </div>
    </AdminLayout>
  );
}
