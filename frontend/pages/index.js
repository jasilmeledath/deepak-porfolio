import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO, { generatePersonSchema } from '../components/SEO';
import Hero from '../components/Hero';
import ResumeSection from '../components/ResumeSection';
import BlogCTA from '../components/BlogCTA';
import Footer from '../components/Footer';
import axios from 'axios';

export default function Home({ siteConfig }) {
  const [config, setConfig] = useState(siteConfig);

  // Generate structured data for SEO
  const structuredData = generatePersonSchema({
    name: config?.heroName || 'Cybersecurity Professional',
    jobTitle: config?.heroTitles?.[0] || 'Cybersecurity Engineer',
    description: config?.heroBio || 'Experienced in cybersecurity and threat hunting',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    socialLinks: config?.socialLinks?.map(link => link.url) || [],
    image: config?.profileImage || '/profile.jpg',
    skills: config?.heroTitles || ['Cybersecurity', 'SOC Analysis', 'Threat Hunting'],
  });

  return (
    <>
      <SEO
        title={config?.seoTitle || 'Cybersecurity Professional | Portfolio'}
        description={config?.seoDescription || 'Experienced Cybersecurity Engineer specializing in Blue Team operations, SOC Analysis, and Threat Hunting.'}
        keywords={config?.seoKeywords || 'cybersecurity, SOC analyst, blue team, threat hunting'}
        ogImage={config?.ogImage || '/og-image.jpg'}
        structuredData={structuredData}
      />
      
      <main className="min-h-screen">
        {/* Background Glow Elements */}
        <div className="radial-glow top-20 left-20 w-96 h-96 bg-glow-blue opacity-30" />
        <div className="radial-glow bottom-40 right-20 w-96 h-96 bg-glow-purple opacity-20" />
        
        {/* Hero Section */}
        <Hero config={config} />
        
        {/* Resume Section */}
        <ResumeSection resumeUrl={config?.resumeUrl} />
        
        {/* Blog CTA */}
        <BlogCTA />
        
        {/* Footer */}
        <Footer socialLinks={config?.socialLinks} />
      </main>
    </>
  );
}

// Server-side rendering for SEO
export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const response = await axios.get(`${apiUrl}/config`);
    
    return {
      props: {
        siteConfig: response.data || null,
      },
    };
  } catch (error) {
    console.error('Error fetching site config:', error);
    return {
      props: {
        siteConfig: null,
      },
    };
  }
}
