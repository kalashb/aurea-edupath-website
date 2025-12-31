# AUREA Edupath Website

A modern career counseling website for AUREA Edupath, providing personalized guidance to students by Mrs. Pallavi.

## 🌟 Features

### Public Pages
- **Home Page** - Hero section, services overview, subscription plans comparison
- **About Page** - Mission/vision, team information, image placeholders for photos
- **Contact Form** - Easy-to-use contact form for inquiries

### Student Portal (Protected)
- **Secure Login/Signup** - Access letter-based authentication
- **Personalized Dashboard** - Resources filtered by student's class and access letter
- **Upcoming Exams** - Class-specific exam calendar with registration deadlines
- **Profile Management** - View account details

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your browser. The website is fully static and works offline.

### Option 2: Local Server (Recommended)
For best experience with ES modules:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
aurea-edupath-website/
├── index.html          # Home page
├── about.html          # About & Contact page
├── login.html          # Student login
├── signup.html         # Student registration
├── dashboard.html      # Student dashboard (protected)
├── styles.css          # All styles
├── js/
│   ├── auth.js         # Authentication system
│   └── data.js         # Resources & access letters config
└── README.md
```

## 🔐 Access Letter System

Students need a valid **access letter** provided by Mrs. Pallavi to sign up. Each letter grants access to specific resources based on the student's class level.

### Demo Access
For testing, use:
- **Access Letter:** `DEMO`
- **Class:** Any class

### Managing Access Letters
Edit `js/data.js` to:
1. Add/remove valid access letters
2. Configure which classes each letter allows
3. Add/update study resources
4. Manage upcoming exam dates

## 🎨 Customization

### Adding Images
Replace the placeholder `about-image-placeholder` elements in `about.html` with actual images:

```html
<img src="your-image.jpg" alt="Description" class="about-image-placeholder">
```

### Updating Contact Info
Edit contact details in:
- `about.html` - Contact section
- `index.html` - Footer

### Changing Colors
All colors are defined as CSS variables in `styles.css`:

```css
:root {
    --primary-500: #00afc8;  /* Main brand color */
    --accent-500: #ff6b2c;   /* Accent color for CTAs */
    /* ... more colors */
}
```

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Technical Notes

- **No Backend Required** - Uses localStorage for authentication (demo purposes)
- **ES Modules** - JavaScript uses modern ES6 imports
- **No Dependencies** - Pure HTML, CSS, and JavaScript
- **Google Fonts** - Uses Inter font family

## 🚀 Deployment

Deploy to any static hosting:
- **GitHub Pages** - Free, easy setup
- **Netlify** - Drag and drop
- **Vercel** - One-click deploy
- **Firebase Hosting** - Google infrastructure

## 📞 Support

For questions about the website, contact:
- Email: hello@aureaedupath.com
- Phone: +91 98765 43210

---

Made with ❤️ for AUREA Edupath
