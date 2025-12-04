import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SEOManager() {
  const [config, setConfig] = useState({
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/config`);
      setConfig({
        seoTitle: response.data.seoTitle || '',
        seoDescription: response.data.seoDescription || '',
        seoKeywords: response.data.seoKeywords || '',
        ogImage: response.data.ogImage || ''
      });
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');
      
      await axios.put(`${apiUrl}/config/seo`, config, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'SEO settings updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-mono">SEO Settings</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Meta Title
            <span className="text-gray-500 ml-2">(60 characters recommended)</span>
          </label>
          <input
            type="text"
            value={config.seoTitle}
            onChange={(e) => setConfig({ ...config, seoTitle: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Cybersecurity Professional | Portfolio"
          />
          <p className="text-xs text-gray-500 mt-1">{config.seoTitle.length}/60</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Meta Description
            <span className="text-gray-500 ml-2">(160 characters recommended)</span>
          </label>
          <textarea
            value={config.seoDescription}
            onChange={(e) => setConfig({ ...config, seoDescription: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Experienced Cybersecurity Engineer specializing in Blue Team operations..."
          />
          <p className="text-xs text-gray-500 mt-1">{config.seoDescription.length}/160</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
          <input
            type="text"
            value={config.seoKeywords}
            onChange={(e) => setConfig({ ...config, seoKeywords: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="cybersecurity, SOC analyst, blue team, threat hunting"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            OG Image URL
            <span className="text-gray-500 ml-2">(For social media sharing)</span>
          </label>
          <input
            type="text"
            value={config.ogImage}
            onChange={(e) => setConfig({ ...config, ogImage: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="/og-image.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-button py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </form>
    </div>
  );
}
