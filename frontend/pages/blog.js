import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import axios from 'axios';
import Link from 'next/link';

export default function Blog({ blogPosts, siteConfig }) {
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
            <h1 className="text-5xl font-bold mb-4 font-mono">Blog</h1>
            <p className="text-gray-400 text-lg">
              Insights on cybersecurity, threat hunting, and defensive strategies.
            </p>
          </motion.div>

          {/* Blog Posts List */}
          <div className="space-y-6">
            {blogPosts && blogPosts.length > 0 ? (
              blogPosts.map((post, index) => (
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
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
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
