# Design Document

## Overview

The KS Candles website will be built as a modern, responsive single-page application (SPA) using HTML5, CSS3, and JavaScript. The design emphasizes minimalism, elegance, and user experience while maintaining fast loading times and accessibility. The architecture will support future e-commerce integration and content management needs.

## Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: All content loads on a single HTML page with smooth scrolling navigation between sections
- **Progressive Enhancement**: Core content accessible without JavaScript, enhanced with interactive features
- **Mobile-First Responsive Design**: CSS Grid and Flexbox for flexible layouts across all devices
- **Performance Optimization**: Lazy loading for images, minified assets, and optimized delivery

### Technology Stack
- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern CSS features including Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Lightweight interactions without framework overhead
- **CSS Preprocessor**: Sass/SCSS for maintainable stylesheets
- **Build Tools**: Basic bundling and optimization for production

## Components and Interfaces

### Header Component
```
Header
├── Logo Container
│   └── KS Candles Logo (SVG)
├── Navigation Menu
│   ├── Home Link
│   ├── Shop Link  
│   ├── Our Story Link
│   └── Contact Link
└── User Actions
    ├── Shopping Cart Icon (with badge)
    └── User Account Icon
```

**Responsive Behavior**: 
- Desktop: Horizontal layout with all elements visible
- Mobile: Hamburger menu for navigation, persistent cart/user icons

### Hero Section Component
```
Hero Section
├── Background Image Container
│   └── High-resolution candle photography
├── Content Overlay
│   ├── Main Headline
│   ├── Subheadline (optional)
│   └── CTA Button
└── Scroll Indicator (subtle)
```

**Image Requirements**:
- Minimum 1920x1080px for desktop
- WebP format with JPEG fallback
- Optimized for different screen densities

### Featured Products Component
```
Featured Products
├── Section Header
│   └── "Featured Products" title
└── Product Grid
    ├── Product Card 1
    ├── Product Card 2
    └── Product Card 3

Product Card Structure:
├── Product Image Container
│   └── Product Photo (square aspect ratio)
├── Product Info
│   ├── Product Name
│   └── Price
└── Add to Cart Button
```

### About Us Component
```
About Us Section
├── Content Container
│   ├── Section Title
│   ├── Brand Story Text
│   └── Values/Ingredients List
└── Image Container
    └── Process/Founder Photo
```

### Customer Reviews Component
```
Reviews Section
├── Section Header
└── Testimonials Grid
    ├── Review Card 1
    ├── Review Card 2
    └── Review Card 3

Review Card Structure:
├── Star Rating Display
├── Review Text
└── Customer Name
```

### Footer Component
```
Footer
├── Navigation Links
├── Social Media Icons
├── Newsletter Signup
│   ├── Email Input
│   └── Subscribe Button
└── Copyright Notice
```

## Data Models

### Product Model
```javascript
Product {
  id: string,
  name: string,
  price: number,
  image: {
    src: string,
    alt: string,
    webp?: string
  },
  featured: boolean,
  description?: string
}
```

### Review Model
```javascript
Review {
  id: string,
  customerName: string,
  rating: number (1-5),
  text: string,
  featured: boolean
}
```

### Newsletter Subscription Model
```javascript
NewsletterSubscription {
  email: string,
  timestamp: Date,
  source: string
}
```

## Design System

### Color Palette
```css
:root {
  /* Primary Colors */
  --color-primary: #f8f6f3;     /* Warm white */
  --color-secondary: #e8e2d8;   /* Light beige */
  --color-accent: #d4a574;      /* Warm gold */
  
  /* Neutral Colors */
  --color-text-primary: #2c2c2c;   /* Dark gray */
  --color-text-secondary: #6b6b6b; /* Medium gray */
  --color-background: #ffffff;      /* Pure white */
  
  /* Interactive Colors */
  --color-button-primary: #2c2c2c;
  --color-button-hover: #1a1a1a;
  --color-link: #d4a574;
}
```

### Typography Scale
```css
:root {
  /* Font Families */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
}
```

### Spacing System
```css
:root {
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 0.75rem;  /* 12px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-2xl: 3rem;    /* 48px */
  --space-3xl: 4rem;    /* 64px */
  --space-4xl: 6rem;    /* 96px */
}
```

## Layout Structure

### CSS Grid Layout
```css
.main-container {
  display: grid;
  grid-template-rows: 
    auto          /* Header */
    100vh         /* Hero */
    auto          /* Featured Products */
    auto          /* About Us */
    auto          /* Reviews */
    auto;         /* Footer */
}
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
:root {
  --breakpoint-sm: 640px;   /* Small tablets */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Small desktops */
  --breakpoint-xl: 1280px;  /* Large desktops */
}
```

## Error Handling

### Image Loading
- Implement lazy loading with intersection observer
- Provide fallback images for failed loads
- Show loading placeholders during image fetch
- Graceful degradation for unsupported image formats

### Form Validation
- Client-side email validation for newsletter signup
- Visual feedback for form states (loading, success, error)
- Accessible error messages with ARIA labels

### Performance Fallbacks
- CSS-only navigation fallback if JavaScript fails
- Progressive enhancement for interactive features
- Graceful degradation for older browsers

## Testing Strategy

### Visual Testing
- Cross-browser compatibility testing (Chrome, Firefox, Safari, Edge)
- Responsive design testing across device sizes
- Color contrast validation for accessibility compliance
- Typography rendering verification

### Functional Testing
- Navigation link functionality
- Form submission handling
- Image loading and optimization
- Mobile touch interactions

### Performance Testing
- Page load speed optimization
- Image compression and delivery
- CSS and JavaScript minification
- Core Web Vitals measurement

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation support
- ARIA label implementation
- Color contrast compliance (WCAG 2.1 AA)

## Implementation Considerations

### SEO Optimization
- Semantic HTML structure
- Meta tags and Open Graph data
- Structured data for products
- Optimized image alt attributes

### Analytics Integration
- Google Analytics setup
- Conversion tracking for newsletter signups
- User interaction tracking
- Performance monitoring

### Future Scalability
- Modular CSS architecture for easy maintenance
- Component-based structure for reusability
- Preparation for CMS integration
- E-commerce platform compatibility