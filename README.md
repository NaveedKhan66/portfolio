# Portfolio Website

A modern, dark-themed portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and an interactive project showcase with detailed case studies.

## Features

- 🌙 **Dark Theme**: Modern dark design with gradient accents
- 📱 **Responsive**: Optimized for all device sizes
- ✨ **Animations**: Smooth scroll animations and hover effects
- 🎨 **Interactive Projects**: Click to view detailed case studies
- 📧 **Contact Form**: Functional contact form with validation
- 🔗 **Social Links**: Easy access to all social profiles
- 📄 **Resume Download**: Direct link to download resume
- 🚀 **Fast Loading**: Optimized for performance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information

Edit `data/personal.js` to update:
- Personal details (name, title, contact info)
- Bio and description
- Skills and technologies
- Work experience
- Education and certifications
- Social media links

### Projects

Edit `data/projects.js` to:
- Add new projects
- Update project details
- Modify case studies
- Change project images

### Images

Add your images to the appropriate folders:
- `public/images/profile/` - Profile photos
- `public/images/projects/` - Project screenshots and galleries

### Styling

The design uses Tailwind CSS with custom colors defined in `tailwind.config.js`:
- Primary colors (blue theme)
- Dark colors for backgrounds
- Custom animations

### Resume

Replace `public/resume.pdf` with your own resume file.

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Header navigation
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Projects.tsx      # Projects showcase
│   └── Contact.tsx       # Contact section
├── data/                 # Data files
│   ├── personal.js       # Personal information
│   └── projects.js       # Project data
├── public/               # Static files
│   └── images/          # Image assets
└── README.md            # This file
```

## Adding New Projects

To add a new project, edit `data/projects.js` and add a new object to the projects array:

```javascript
{
  id: 4, // Unique ID
  title: "Project Name",
  description: "Detailed project description",
  shortDescription: "Brief description for the card",
  image: "/images/projects/project-main.jpg",
  gallery: [
    "/images/projects/project-1.jpg",
    "/images/projects/project-2.jpg"
  ],
  tech: ["React", "Node.js", "MongoDB"],
  liveUrl: "https://your-project.com",
  githubUrl: "https://github.com/your-username/project",
  category: "Web App",
  year: "2024",
  caseStudy: {
    overview: "Project overview...",
    challenge: "What challenges did you face?",
    solution: "How did you solve them?",
    features: [
      "Feature 1",
      "Feature 2"
    ],
    results: "What were the results?"
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with default settings

### Other Platforms

Build the project:
```bash
npm run build
```

The `out` folder contains the static files for deployment.

## Customization Tips

1. **Colors**: Modify the color scheme in `tailwind.config.js`
2. **Fonts**: Change fonts in `app/layout.tsx`
3. **Animations**: Adjust animation timing in `tailwind.config.js`
4. **Layout**: Modify component layouts in the respective files
5. **Content**: Update all content in the data files

## Performance

- Images are optimized with Next.js Image component
- CSS is purged in production
- Code is automatically split
- Static generation for fast loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help customizing the portfolio or run into any issues, feel free to reach out! 