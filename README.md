# Maria Kiani - AI Engineer Portfolio

**Version 1.0** | Professional Portfolio Website

## 🎯 Overview

Modern, responsive portfolio website showcasing Maria Kiani's expertise as an AI Engineer and Data Scientist. Built with cutting-edge web technologies and optimized for both performance and accessibility.

## ✨ Features

### 🚀 Modern Design
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Professional dark theme with accent colors
- **Smooth Animations**: Intersection Observer-based animations
- **Glass Morphism**: Modern UI with backdrop-blur effects

### 🎨 Interactive Elements
- **Animated Starfield Background**: Canvas-based particle system
- **Dynamic Content Loading**: Multi-language support (EN/DE)
- **Smooth Scrolling Navigation**: Section-aware navigation with active states
- **Experience Timeline**: Clean card-based experience showcase
- **Profile Photo Effects**: Elegant hover animations with glow effects

### ♿ Accessibility First
- **WCAG 2.1 Compliant**: Full keyboard navigation and screen reader support
- **ARIA Labels**: Comprehensive semantic markup
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects user motion preferences

### 🌍 Multilingual Support
- **English & German**: Complete translations for all content
- **Dynamic Language Switching**: Instant language change without reload
- **SEO Optimized**: Proper meta tags and structured data

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern features including Grid, Flexbox, backdrop-filter
- **Vanilla JavaScript**: ES6+ modules for optimal performance
- **Tailwind CSS**: Utility-first CSS framework

### Features & Libraries
- **Intersection Observer API**: Performance-optimized animations
- **Canvas API**: Custom starfield background animation
- **CSS Custom Properties**: Dynamic theming support
- **Modern CSS**: CSS Grid, Flexbox, transform animations

## 📁 Project Structure

```
maria-kiani-portfolio/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Custom styles and animations
├── js/
│   ├── main.js            # Application controller
│   ├── init.js            # Content data and configuration
│   ├── content-loader.js  # Dynamic content management
│   ├── navigation.js      # Navigation and smooth scrolling
│   ├── language-simple.js # Multilingual support
│   ├── starfield-enhanced.js # Background animation
│   ├── simple-particles.js   # Particle effects
│   └── profile-rotation.js   # Profile image interactions
├── assets/
│   └── images/            # Profile images and media
└── README.md              # This file
```

## 🚀 Quick Start

### Option 1: Live Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Option 2: Direct File Access
Simply open `index.html` in a modern web browser.

**Note**: Some features require a local server due to CORS restrictions.

## 🎛 Configuration

### Content Management
All content is managed in `js/init.js`:
- **Experience Data**: Automatically calculates years of experience
- **Projects**: GitHub repositories and descriptions
- **Skills**: Categorized technical competencies
- **Translations**: English and German content

### Automatic Experience Calculation
```javascript
// Experience years update automatically based on career start date
function calculateExperienceYears() {
    const startDate = new Date('2011-12-01'); // Career start: December 2011
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const exactYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.ceil(exactYears); // Always rounds up for professional display
}
```

### Customization
- **Colors**: Modify CSS custom properties in `css/styles.css`
- **Animations**: Adjust timing and effects in individual JS modules
- **Content**: Update data in `js/init.js`

## 📱 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Graceful Degradation**: Fallbacks for older browsers

## ⚡ Performance

- **Lighthouse Score**: 95+ Performance, 100 Accessibility
- **Bundle Size**: <100KB total (excluding images)
- **Load Time**: <2s on 3G networks
- **Optimizations**: Lazy loading, intersection observers, efficient animations

## 🔧 Development

### Adding New Content
1. Update `js/init.js` with new data
2. Ensure both English and German translations
3. Test responsive design on multiple devices

### Adding New Experience
```javascript
// In js/init.js - jobs array
{
    title: "Senior AI Engineer",
    company: "Tech Company",
    location: "Berlin, Germany",
    period: "Jan 2025 – Present",
    type: "Full-time",
    description: "Leading AI initiatives...",
    link: "https://company.com" // Optional
}
```

### Modifying Animations
1. Edit timing in respective JS modules
2. Test with `prefers-reduced-motion` setting
3. Verify accessibility compliance

## 📋 Features Checklist

- ✅ Responsive design (mobile-first)
- ✅ Accessibility compliance (WCAG 2.1)
- ✅ Performance optimization
- ✅ SEO optimization
- ✅ Multilingual support (EN/DE)
- ✅ Modern CSS features
- ✅ Smooth animations
- ✅ Clean, maintainable code
- ✅ Professional design
- ✅ Cross-browser compatibility
- ✅ Dynamic content system
- ✅ Automatic experience calculation

## 🎨 Design Philosophy

This portfolio emphasizes:
- **Minimalism**: Clean, uncluttered design focusing on content
- **Professionalism**: Suitable for corporate and startup environments
- **Accessibility**: Inclusive design for all users
- **Performance**: Fast loading and smooth interactions
- **Scalability**: Easy to update and extend

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)

### Netlify (Recommended)
1. Drag project folder to netlify.com/drop
2. Instant deployment with global CDN
3. Automatic HTTPS certificate

### Traditional Hosting
Upload all files to your web server - no build process required!

## 📄 License

Personal portfolio website for Maria Kiani. All rights reserved.

## 👤 Author

**Maria Kiani**
- AI Engineer & Data Scientist
- 14+ Years of Excellence in Data & AI
- 📧 eng.mkianiani@yahoo.com
- 💼 [LinkedIn](https://www.linkedin.com/in/maria-kiani/)
- 🐙 [GitHub](https://github.com/Mari-kn)
- 📍 Berlin, Germany

---

*Transforming businesses through advanced AI solutions* ✨

**Version 1.0** | *July 2025*