# SwapAm Landing Page

A modern, responsive landing page for SwapAm - the campus circular economy platform.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth scrolling navigation and hover effects
- **Performance**: Optimized for fast loading and smooth performance

## Tech Stack

- **React 19**: Latest React with modern features
- **Vite**: Fast build tool and development server
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Icons**: Beautiful icon library
- **React Scroll**: Smooth scrolling navigation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
landing-page/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── about-image.jpg
│   │   ├── hero-image.jpg
│   │   └── HIW*.jpg
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Impact.jsx
│   │   ├── Navbar.jsx
│   │   └── Testimonials.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Components

### Navbar
- Responsive navigation with mobile menu
- Smooth scroll to sections
- Dynamic background on scroll

### Hero
- Eye-catching hero section with call-to-action
- Responsive grid layout
- Modern gradient design

### About
- Information about SwapAm platform
- Image and text layout

### HowItWorks
- Step-by-step process explanation
- Visual workflow representation

### Impact
- Statistics and achievements
- Animated counters

### Testimonials
- Student testimonials and reviews
- Carousel/grid layout

### Footer
- Links and contact information
- Social media links

## Customization

### Colors
The color scheme can be customized in the CSS variables:
- Primary: `#CAAC2A` (Yellow)
- Secondary: `#137C5C` (Green)
- Background: `#0b3d2e` (Dark Green)

### Content
All content can be easily modified in the respective component files.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the SwapAm team.