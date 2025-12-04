const express = require('express');
const router = express.Router();
const SiteConfig = require('../models/SiteConfig');
const auth = require('../middleware/auth');

// @route   GET /api/config
// @desc    Get site configuration
// @access  Public
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    
    if (!config) {
      config = new SiteConfig();
      await config.save();
    }

    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/config
// @desc    Update site configuration
// @access  Private (Admin only)
router.put('/', auth, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    
    if (!config) {
      config = new SiteConfig();
    }

    // Update fields
    const allowedFields = [
      'seoTitle',
      'seoDescription',
      'seoKeywords',
      'ogImage',
      'heroName',
      'heroTitles',
      'heroBio',
      'profileImage',
      'resumeUrl',
      'tryHackMeId',
      'socialLinks'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        config[field] = req.body[field];
      }
    });

    config.updatedAt = Date.now();
    await config.save();

    res.json({ message: 'Configuration updated successfully', config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/config/seo
// @desc    Update SEO settings
// @access  Private (Admin only)
router.put('/seo', auth, async (req, res) => {
  try {
    const { seoTitle, seoDescription, seoKeywords, ogImage } = req.body;
    
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig();
    }

    if (seoTitle) config.seoTitle = seoTitle;
    if (seoDescription) config.seoDescription = seoDescription;
    if (seoKeywords) config.seoKeywords = seoKeywords;
    if (ogImage) config.ogImage = ogImage;

    config.updatedAt = Date.now();
    await config.save();

    res.json({ message: 'SEO settings updated successfully', config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/config/hero
// @desc    Update hero section
// @access  Private (Admin only)
router.put('/hero', auth, async (req, res) => {
  try {
    const { heroName, heroTitles, heroBio, profileImage } = req.body;
    
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig();
    }

    if (heroName) config.heroName = heroName;
    if (heroTitles) config.heroTitles = heroTitles;
    if (heroBio) config.heroBio = heroBio;
    if (profileImage) config.profileImage = profileImage;

    config.updatedAt = Date.now();
    await config.save();

    res.json({ message: 'Hero section updated successfully', config });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
