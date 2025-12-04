const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');
const auth = require('../middleware/auth');

// @route   GET /api/blog
// @desc    Get all active blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find({ isActive: true })
      .sort({ publishedAt: -1 });
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/all
// @desc    Get all blog posts (including inactive)
// @access  Private (Admin only)
router.get('/all', auth, async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .sort({ publishedAt: -1 });
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:id
// @desc    Get blog post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Private (Admin only)
router.post('/', [
  auth,
  body('title').notEmpty().withMessage('Title is required'),
  body('url').isURL().withMessage('Valid URL is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, url, description, publishedAt } = req.body;

    const newPost = new BlogPost({
      title,
      url,
      description,
      publishedAt: publishedAt || Date.now()
    });

    const post = await newPost.save();
    res.json({ message: 'Blog post created successfully', post });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('url').optional().isURL().withMessage('Valid URL is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, url, description, publishedAt, isActive } = req.body;

    let post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Update fields
    if (title) post.title = title;
    if (url) post.url = url;
    if (description !== undefined) post.description = description;
    if (publishedAt) post.publishedAt = publishedAt;
    if (isActive !== undefined) post.isActive = isActive;

    await post.save();
    res.json({ message: 'Blog post updated successfully', post });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await post.deleteOne();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
