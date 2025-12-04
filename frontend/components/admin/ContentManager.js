import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContentManager() {
  const [config, setConfig] = useState({
    resumeUrl: '',
    socialLinks: []
  });
  const [newLink, setNewLink] = useState({ name: '', url: '', icon: '' });
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
        resumeUrl: response.data.resumeUrl || '',
        socialLinks: response.data.socialLinks || []
      });
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      setConfig({
        ...config,
        socialLinks: [...config.socialLinks, { ...newLink }]
      });
      setNewLink({ name: '', url: '', icon: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setConfig({
      ...config,
      socialLinks: config.socialLinks.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');
      
      await axios.put(`${apiUrl}/config`, config, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'Content updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-mono">Content Manager</h2>
      
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
          <label className="block text-sm font-medium mb-2">Resume URL</label>
          <input
            type="text"
            value={config.resumeUrl}
            onChange={(e) => setConfig({ ...config, resumeUrl: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="/resume.pdf"
          />
          <p className="text-xs text-gray-500 mt-1">Upload your resume to /public folder and reference it here</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Social Links</label>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            <input
              type="text"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Platform (e.g., LinkedIn)"
            />
            <input
              type="text"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="URL"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newLink.icon}
                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Icon name"
              />
              <button
                type="button"
                onClick={handleAddLink}
                className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            {config.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-lg">
                <div className="flex-1">
                  <span className="font-medium">{link.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({link.icon})</span>
                  <br />
                  <span className="text-xs text-gray-400">{link.url}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-button py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Content'}
        </button>
      </form>
    </div>
  );
}
