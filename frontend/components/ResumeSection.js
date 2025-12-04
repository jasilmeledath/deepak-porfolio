import { motion } from 'framer-motion';

export default function ResumeSection({ resumeUrl }) {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-mono">Resume</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Download my full resume to learn more about my experience, certifications, and technical skills.
          </p>
          
          <a
            href={resumeUrl || '/resume.pdf'}
            download
            className="glass-button inline-block group relative overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              Download Resume
            </span>
          </a>
          
          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500">
              PDF Format • Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
