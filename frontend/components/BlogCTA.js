import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12 text-center relative overflow-hidden group"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-mono">
              Cybersecurity Insights
            </h2>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Explore my latest articles on threat analysis, defensive strategies, SOC operations, and cybersecurity best practices.
            </p>
            
            <Link
              href="/blog"
              className="glass-button inline-block group/btn"
            >
              <span className="flex items-center gap-2">
                Read the Blog
                <svg 
                  className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
