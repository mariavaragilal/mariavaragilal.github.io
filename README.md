# mariavaragilal.github.io

This repository contains a responsive, accessible personal CV website built with Gatsby, React, and Tailwind CSS. It presents professional information — summary, experience, education, skills and contact — in a clean, printable layout that is easy to update and deploy.

## ✨ Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Internationalization** - Support for English and Portuguese languages
- **Print-Friendly** - Optimized layout for PDF generation and printing
- **Fast Performance** - Built with Gatsby for lightning-fast static site generation
- **Accessible** - Semantic HTML and proper contrast ratios
- **SEO Optimized** - Meta tags and structured data for search engines
- **PWA Ready** - Progressive Web App capabilities with manifest and service worker
- **PDF Export** - Built-in PDF generation functionality for easy CV sharing

## 🛠 Tech Stack

- **Gatsby 5** - Static site generator for React
- **React 18** - JavaScript library for building user interfaces
- **Tailwind CSS 4** - Utility-first CSS framework
- **Sass** - CSS preprocessor for enhanced styling
- **React i18next** - Internationalization framework
- **Redux Toolkit** - State management (configured but not actively used)
- **html2canvas & jsPDF** - PDF generation capabilities
- **React Helmet** - Document head management
- **JavaScript** - No TypeScript dependencies

## 📁 Project Structure

```text
src/
├── _common/         # Shared components and layout
│   ├── components/  # Reusable components (copyright, languages)
│   └── layout/      # Layout components and SEO
├── assets/          # Global styles and images
│   ├── images/      # Static images and assets
│   └── stylesheets/ # Global SCSS styles
├── constants/       # Configuration and utilities
│   ├── i18n/        # Internationalization setup
│   └── utils/       # Helper functions
└── pages/           # Gatsby pages
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git (for deployment)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mariavaragilal/mariavaragilal.github.io.git
cd mariavaragilal.github.io
```

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run develop
```

1. Open your browser and navigate to `http://localhost:8000`

### Available Scripts

- `npm run develop` - Start Gatsby development server with hot reload
- `npm run build` - Build static site for production
- `npm run serve` - Serve production build locally
- `npm run clean` - Clean Gatsby cache
- `npm run lint` - Run ESLint for code quality checks
- `npm run deploy` - Build and deploy to GitHub Pages

## 🌐 Deployment

This project is configured for GitHub Pages deployment using Gatsby:

1. Build the static site: `npm run build`
2. Deploy to GitHub Pages: `npm run deploy`

The site will be available at `https://mariavaragilal.github.io`

### Gatsby Features

- **Static Site Generation** - Pre-built HTML pages for optimal performance
- **Image Optimization** - Automatic image processing and optimization
- **Plugin System** - Extensible with Gatsby plugins for enhanced functionality
- **GraphQL Data Layer** - Built-in data querying capabilities
- **Hot Reloading** - Fast development with instant updates

## 🎨 Customization

### Adding New Languages

1. Create a new locale file in `src/constants/i18n/locales/`
2. Add the language to the i18n configuration
3. Update the language switcher component

### Updating Content

- Personal information: Edit the JSON files in `src/constants/i18n/locales/`
- Styling: Modify Tailwind classes and SCSS files in `src/assets/stylesheets/`
- Layout: Update the grid structure in `src/pages/index.js`
- SEO: Update metadata in `src/_common/layout/seo.js`

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

### Maria Varagilal

- LinkedIn: [mariavaragilal](<https://www.linkedin.com/in/mariavaragilal>)
- Dribbble: [mariavaragilal](https://dribbble.com/mariavaragilal)
- Behance: [mariavaragilal](https://be.net/mariavaragilal)
