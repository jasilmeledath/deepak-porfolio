import { motion } from 'framer-motion';

export default function TryHackMeSection({ thmId }) {
  const badgeUrl = thmId 
    ? `https://tryhackme-badges.s3.amazonaws.com/${thmId}.png`
    : null;

  if (!thmId) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center font-mono">
            TryHackMe Progress
          </h2>
          
          <div className="glass-card p-6 sm:p-8">
            <div className="flex justify-center">
              <a
                href={`https://tryhackme.com/p/${thmId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 duration-300"
              >
                <img
                  src={badgeUrl}
                  alt="TryHackMe Badge"
                  className="w-full max-w-md rounded-lg"
                  loading="lazy"
                />
              </a>
            </div>
            
            <div className="mt-6 text-center">
              <a
                href={`https://tryhackme.com/p/${thmId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
              >
                View Full Profile
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
