import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    publishedAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${apiUrl}/blog/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setFormData({
      title: post.title,
      url: post.url,
      description: post.description || '',
      publishedAt: new Date(post.publishedAt).toISOString().split('T')[0]
    });
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({ title: '', url: '', description: '', publishedAt: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');

      if (editingPost) {
        await axios.put(`${apiUrl}/blog/${editingPost}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Post updated successfully!' });
      } else {
        await axios.post(`${apiUrl}/blog`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Post created successfully!' });
      }

      handleCancel();
      fetchPosts();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');

      await axios.delete(`${apiUrl}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'Post deleted successfully!' });
      fetchPosts();
    } catch (error) {
      setMessage({ type: 'error', text: 'Delete failed' });
    }
  };

  const toggleActive = async (post) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');

      await axios.put(`${apiUrl}/blog/${post._id}`,
        { isActive: !post.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchPosts();
    } catch (error) {
      setMessage({ type: 'error', text: 'Update failed' });
    }
  };

  const togglePin = async (post) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('adminToken');

      await axios.put(`${apiUrl}/blog/${post._id}`,
        { isPinned: !post.isPinned },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: 'success', text: `Post ${!post.isPinned ? 'pinned' : 'unpinned'} successfully!` });
      fetchPosts();
    } catch (error) {
      setMessage({ type: 'error', text: 'Pin update failed' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-mono">Blog Posts</h2>

      {message.text && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success'
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
          {message.text}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white/5 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingPost ? 'Edit Post' : 'Add New Post'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Medium URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="https://medium.com/@username/article-title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="2"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Published Date</label>
            <input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 glass-button py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingPost ? 'Update Post' : 'Add Post'}
            </button>
            {editingPost && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold mb-4">All Posts ({posts.length})</h3>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No blog posts yet. Add your first one above!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/5 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{post.title}</h4>
                  {post.isPinned && (
                    <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-medium flex items-center gap-1">
                      📌 PINNED
                    </span>
                  )}
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 break-all"
                >
                  {post.url}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Published: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <span className={`text-xs px-2 py-1 rounded inline-block mt-2 ${post.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                  {post.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => togglePin(post)}
                  className={`px-3 py-2 rounded text-sm transition-colors ${post.isPinned
                      ? 'bg-amber-500/30 hover:bg-amber-500/40 text-amber-300'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
                    }`}
                  title={post.isPinned ? 'Unpin post' : 'Pin to top'}
                >
                  {post.isPinned ? '📌 Unpin' : '📌 Pin'}
                </button>
                <button
                  onClick={() => toggleActive(post)}
                  className="px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded text-sm transition-colors"
                >
                  {post.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
