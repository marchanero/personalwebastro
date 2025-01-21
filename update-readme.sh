#!/bin/bash

# Update the README file with the latest project information
echo "Updating README.md..."

cat <<EOL > README.md
# Astro Web Project

![Astro](https://astro.build/assets/logo.png)

## Introduction

Welcome to the Astro Web Project! 🚀 This project is built using Astro, a modern framework for building fast, content-focused websites. The project includes pages for publications, projects, and personal projects, with a modern and responsive design.

## Project Structure

The project is organized as follows:

\`\`\`
astroweb/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   ├── Contact.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Publications.astro
│   │   ├── Projects.astro
│   │   ├── PersonalProjects.astro
│   │   ├── Research.astro
│   │   ├── Teaching.astro
│   │   ├── ThemeToggle.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── publications.astro
│   │   ├── projects.astro
│   │   └── personal-projects.astro
│   ├── styles/
│   │   └── base.css
│   └── api/
│       ├── publications.js
│       ├── projects.js
│       └── personal-projects.js
├── astro.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.cjs
├── tailwind.config.mjs
└── tsconfig.json
\`\`\`

## Features

- **Publications Page**: Displays a list of publications with titles, descriptions, and links. 📚
- **Projects Page**: Displays a list of projects with titles, descriptions, and links. 🏗️
- **Personal Projects Page**: Displays a list of personal projects with titles, descriptions, and links. 👨‍💻
- **Responsive Design**: The website is designed to be responsive and look great on all devices. 📱
- **Dark Mode**: Toggle between light and dark mode for better readability. 🌙

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/yourusername/astroweb.git
   cd astroweb
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

## Usage

- **Home Page**: The home page includes a hero section, research, teaching, and contact information. 🏠
- **Publications Page**: Accessible via the navigation menu, this page lists all publications. 📚
- **Projects Page**: Accessible via the navigation menu, this page lists all projects. 🏗️
- **Personal Projects Page**: Accessible via the navigation menu, this page lists all personal projects. 👨‍💻

## Live Demo

You can view the live demo of the project [here](https://yourusername.github.io/astroweb).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature-branch\`).
3. Commit your changes (\`git commit -am 'Add new feature'\`).
4. Push to the branch (\`git push origin feature-branch\`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Astro team for creating such an amazing framework. 🌟
- Special thanks to [OpenWeather](https://openweathermap.org/) for providing weather data. ☀️

EOL

echo "README.md updated successfully."