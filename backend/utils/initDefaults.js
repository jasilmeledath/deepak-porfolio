const User = require('../models/User');
const SiteConfig = require('../models/SiteConfig');

async function initializeDefaults() {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminExists) {
      const admin = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
      await admin.save();
      console.log('✅ Default admin user created');
    }

    // Check if site config exists
    const configExists = await SiteConfig.findOne();
    
    if (!configExists) {
      const config = new SiteConfig({
        heroTitles: [
          'Cybersecurity Engineer',
          'SOC Analyst',
          'Threat Hunter',
          'Blue Team Specialist'
        ],
        socialLinks: [
          { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
          { name: 'GitHub', url: 'https://github.com', icon: 'github' },
          { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' }
        ]
      });
      await config.save();
      console.log('✅ Default site config created');
    }
  } catch (error) {
    console.error('❌ Error initializing defaults:', error);
  }
}

module.exports = initializeDefaults;
