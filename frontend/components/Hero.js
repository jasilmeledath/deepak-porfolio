import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero({ config }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = config?.heroTitles || [
    'Cybersecurity Engineer',
    'SOC Analyst',
    'Threat Hunter',
    'Blue Team Specialist'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText !== currentTitle) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        } else {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto text-center">
        {/* Profile Image with Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative inline-block mb-8"
        >
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl animate-glow-pulse" />
          
          {/* Glass Container */}
          <div className="relative glass-card p-2 rounded-full">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden">
              <Image
                src={config?.profileImage || '/profile.jpg'}
                alt={config?.heroName || 'Profile Picture'}
                fill
                sizes="(max-width: 640px) 160px, 192px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Name - H1 for SEO */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
        >
          {config?.heroName || 'Your Name'}
        </motion.h1>

        {/* Typing Effect Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 h-12 flex items-center justify-center"
        >
          <h2 className="text-2xl sm:text-3xl font-mono text-blue-400">
            {displayText}
            <span className="animate-pulse">|</span>
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 px-4"
        >
          {config?.heroBio || 
            'Passionate cybersecurity professional specializing in Blue Team operations, threat hunting, and SOC analysis. Dedicated to defending against cyber threats and securing digital infrastructure.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#resume"
            className="glass-button w-full sm:w-auto text-center"
          >
            View Resume
          </a>
          <a
            href="/blog"
            className="glass-button w-full sm:w-auto text-center bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/40 hover:to-purple-500/40 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20"
          >
            <span className="font-semibold"> Read Blog</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
