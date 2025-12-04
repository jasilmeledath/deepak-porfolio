# 🎨 Design System Documentation

## Color Palette

### Base Colors
```css
--cyber-dark: #050505           /* Almost black background */
--pure-white: #FFFFFF           /* Text and accents */
```

### Glass Effects
```css
--glass-bg: rgba(255, 255, 255, 0.03)      /* Card background */
--glass-border: rgba(255, 255, 255, 0.1)   /* Border color */
--glass-light: rgba(255, 255, 255, 0.05)   /* Lighter variant */
```

### Glow Colors
```css
--glow-blue: rgba(59, 130, 246, 0.15)      /* Blue radial glow */
--glow-purple: rgba(147, 51, 234, 0.15)    /* Purple radial glow */
```

### Accent Colors
```css
--blue-400: #60A5FA                         /* Primary actions */
--red-500: #EF4444                          /* Destructive actions */
--green-500: #10B981                        /* Success states */
--yellow-500: #F59E0B                       /* Warning states */
```

## Typography

### Font Families
```css
/* Primary - Body text, headings */
font-family: 'Inter', system-ui, sans-serif;
font-display: swap;

/* Accent - Code, technical terms, badges */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
font-display: swap;
```

### Font Sizes
```css
/* Headings */
--text-7xl: 4.5rem;    /* 72px - Main hero title */
--text-6xl: 3.75rem;   /* 60px - Large headings */
--text-5xl: 3rem;      /* 48px - Section headings */
--text-4xl: 2.25rem;   /* 36px - Sub-headings */
--text-3xl: 1.875rem;  /* 30px - Card headings */
--text-2xl: 1.5rem;    /* 24px - Medium headings */
--text-xl: 1.25rem;    /* 20px - Small headings */

/* Body */
--text-lg: 1.125rem;   /* 18px - Large body */
--text-base: 1rem;     /* 16px - Base body */
--text-sm: 0.875rem;   /* 14px - Small text */
--text-xs: 0.75rem;    /* 12px - Tiny text */
```

## Spacing System

Based on 4px base unit:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

## Border Radius

```css
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Buttons */
--radius-lg: 0.75rem;    /* 12px - Cards */
--radius-xl: 1rem;       /* 16px - Large cards */
--radius-2xl: 1.5rem;    /* 24px - Hero elements */
--radius-full: 9999px;   /* Circular */
```

## Glassmorphism Effect

### Standard Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  position: relative;
}

/* Gradient border */
.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.01)
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### Glass Button
```css
.glass-button {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.glass-button:active {
  transform: scale(0.95);
}
```

## Animations

### Timing Functions
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Keyframe Animations

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Glow Pulse */
@keyframes glowPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Typing Effect */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

/* Cursor Blink */
@keyframes blink {
  from, to { border-color: transparent; }
  50% { border-color: white; }
}
```

### Usage
```css
.fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up {
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.glow-pulse {
  animation: glowPulse 3s ease-in-out infinite;
}
```

## Component Patterns

### Hero Profile Picture
```jsx
<div className="relative inline-block">
  {/* Glow Ring */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl animate-glow-pulse" />
  
  {/* Glass Container */}
  <div className="relative glass-card p-2 rounded-full">
    <div className="w-48 h-48 rounded-full overflow-hidden">
      <img src="/profile.jpg" alt="Profile" />
    </div>
  </div>
</div>
```

### Section Container
```jsx
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="glass-card p-8 sm:p-12">
      {/* Content */}
    </div>
  </div>
</section>
```

### Input Field
```jsx
<input
  type="text"
  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
             focus:outline-none focus:border-blue-500 transition-colors"
  placeholder="Enter text..."
/>
```

### Button Variants
```jsx
{/* Primary */}
<button className="glass-button bg-blue-500/20 hover:bg-blue-500/30">
  Primary Action
</button>

{/* Secondary */}
<button className="glass-button">
  Secondary Action
</button>

{/* Danger */}
<button className="glass-button bg-red-500/20 hover:bg-red-500/30">
  Delete
</button>
```

## Responsive Breakpoints

```css
/* Mobile First */
/* Default: < 640px */

@media (min-width: 640px) {  /* sm: tablets */
  /* Styles */
}

@media (min-width: 768px) {  /* md: small laptops */
  /* Styles */
}

@media (min-width: 1024px) { /* lg: laptops */
  /* Styles */
}

@media (min-width: 1280px) { /* xl: desktops */
  /* Styles */
}

@media (min-width: 1536px) { /* 2xl: large screens */
  /* Styles */
}
```

## Accessibility

### Focus Styles
```css
*:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Performance Optimizations

### Image Loading
```jsx
<Image
  src="/profile.jpg"
  alt="Profile"
  width={192}
  height={192}
  priority // For above-the-fold images
  loading="lazy" // For below-the-fold images
/>
```

### Font Loading
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

body {
  font-display: swap; /* Prevent FOIT */
}
```

### Custom Scrollbar
```css
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

## Noise Texture Overlay

Applied to body for premium film grain effect:

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url("data:image/svg+xml,...");
  opacity: 0.04;
  z-index: 1;
}
```

## Dark Mode Considerations

This theme is dark-mode only. Colors are optimized for:
- Low light viewing
- Reduced eye strain
- Premium aesthetic
- High contrast for readability

---

**Design Philosophy:**
- Minimalism: Less is more
- Performance: Every element counts
- Accessibility: Everyone can use it
- Premium: Attention to detail
