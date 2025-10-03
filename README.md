# DevOps Portfolio

A modern, dynamic portfolio website showcasing DevOps engineering skills, projects, and experience.

## Features

- **Dynamic Content**: Projects and blogs loaded from JSON files
- **Command Palette**: Quick search with ⌘/Ctrl+P and blog search with ⌘/Ctrl+B
- **Responsive Design**: Mobile-first design that works on all devices
- **Interactive Filtering**: Filter projects and blogs by topics with AND/OR matching
- **Real-time Search**: Search across all content with live filtering
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Inline CSS with modern design patterns

## Keyboard Shortcuts

- **⌘/Ctrl + P**: Open global search
- **⌘/Ctrl + B**: Search blogs specifically
- **Escape**: Close command palette

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── AboutSection.tsx # About section with contact info
│   ├── Header.tsx      # Site header
│   ├── Tabs.tsx        # Main content tabs
│   └── CommandPalette.tsx # Search functionality
├── constants/          # Configuration and data
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── DevOpsPortfolioDynamic.tsx # Main portfolio component

public/
├── projects.json       # Project data
├── blogs.json         # Blog post data
├── harsh-photo.png    # Profile photo
└── logos/             # Technology logos
    ├── aws-logo.png
    ├── docker-logo.png
    ├── kubernetes-logo.png
    └── linux-log.png
```





## License

MIT License - feel free to use this template for your own portfolio!

