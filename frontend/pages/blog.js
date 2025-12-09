import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import axios from 'axios';
import Link from 'next/link';

export default function Blog({ blogPosts, siteConfig }) {
  const [sortOrder, setSortOrder] = useState('newest');

  // Sort posts while keeping pinned posts at the top
  const sortedPosts = [...(blogPosts || [])].sort((a, b) => {
    // Pinned posts always come first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    // Among pinned or non-pinned posts, sort by date
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);

    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <SEO
        title="Blog | Cybersecurity Insights and Analysis"
        description="Read my latest articles on cybersecurity, threat intelligence, SOC analysis, and defensive security strategies."
        keywords="cybersecurity blog, threat analysis, SOC insights, security articles"
        ogType="website"
      />

      <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
              ← Back to Home
            </Link>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl font-bold font-mono">Blog</h1>

              {/* Sort Control */}
              {blogPosts && blogPosts.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer hover:bg-white/10"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              )}
            </div>
            <p className="text-gray-400 text-lg">
              Insights on cybersecurity, threat hunting, and defensive strategies.
            </p>
          </motion.div>

          {/* Blog Posts List */}
          <div className="space-y-6">
            {sortedPosts && sortedPosts.length > 0 ? (
              sortedPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      {post.isPinned && (
                        <span className="text-amber-400 text-sm" title="Pinned post">
                          📌
                        </span>
                      )}
                    </div>
                    {post.description && (
                      <p className="text-gray-400 mb-4">{post.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-blue-400 group-hover:translate-x-2 transition-transform inline-block">
                        Read on Medium →
                      </span>
                    </div>
                  </a>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer socialLinks={siteConfig?.socialLinks} />
    </>
  );
}

// Server-side rendering for SEO
export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const [postsResponse, configResponse] = await Promise.all([
      axios.get(`${apiUrl}/blog`),
      axios.get(`${apiUrl}/config`)
    ]);

    return {
      props: {
        blogPosts: postsResponse.data || [],
        siteConfig: configResponse.data || null,
      },
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      props: {
        blogPosts: [],
        siteConfig: null,
      },
    };
  }
}
