import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HeroManager() {
  const [config, setConfig] = useState({
    heroName: '',
    heroTitles: [],
    heroBio: '',
    profileImage: ''
  });
  const [newTitle, setNewTitle] = useState('');
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
        heroName: response.data.heroName || '',
        heroTitles: response.data.heroTitles || [],
        heroBio: response.data.heroBio || '',
        profileImage: response.data.profileImage || ''
      });
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleAddTitle = () => {
    if (newTitle.trim()) {
      setConfig({
        ...config,
        heroTitles: [...config.heroTitles, newTitle.trim()]
      });
      setNewTitle('');
    }
  };

  const handleRemoveTitle = (index) => {
    setConfig({
      ...config,
      heroTitles: config.heroTitles.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');
      
      await axios.put(`${apiUrl}/config/hero`, config, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'Hero section updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-mono">Hero Section</h2>
      
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
          <label className="block text-sm font-medium mb-2">Your Name</label>
          <input
            type="text"
            value={config.heroName}
            onChange={(e) => setConfig({ ...config, heroName: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rotating Titles</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTitle())}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., Cybersecurity Engineer"
            />
            <button
              type="button"
              onClick={handleAddTitle}
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="space-y-2">
            {config.heroTitles.map((title, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-lg">
                <span className="font-mono">{title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTitle(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={config.heroBio}
            onChange={(e) => setConfig({ ...config, heroBio: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="A brief description about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Profile Image URL</label>
          <input
            type="text"
            value={config.profileImage}
            onChange={(e) => setConfig({ ...config, profileImage: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="/profile.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-button py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Hero Section'}
        </button>
      </form>
    </div>
  );
}
