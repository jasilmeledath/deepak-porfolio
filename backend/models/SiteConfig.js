const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  // SEO Configuration
  seoTitle: {
    type: String,
    default: 'Cybersecurity Professional | Portfolio'
  },
  seoDescription: {
    type: String,
    default: 'Experienced Cybersecurity Engineer specializing in Blue Team operations, SOC Analysis, and Threat Hunting.'
  },
  seoKeywords: {
    type: String,
    default: 'cybersecurity, SOC analyst, blue team, threat hunting, security engineer'
  },
  ogImage: {
    type: String,
    default: '/og-image.jpg'
  },

  // Hero Section
  heroName: {
    type: String,
    default: 'Your Name'
  },
  heroTitles: [{
    type: String
  }],
  heroBio: {
    type: String,
    default: 'Passionate cybersecurity professional specializing in Blue Team operations.'
  },
  profileImage: {
    type: String,
    default: '/profile.jpg'
  },

  // Resume
  resumeUrl: {
    type: String,
    default: '/resume.pdf'
  },

  // TryHackMe
  tryHackMeId: {
    type: String,
    default: ''
  },

  // Social Links
  socialLinks: [{
    name: String,
    url: String,
    icon: String
  }],

  // Metadata
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
