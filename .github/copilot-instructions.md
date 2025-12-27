# GitHub Copilot Instructions

## Project Overview

This is a personal blog and portfolio website built with Docusaurus 2. The site focuses on coding, traveling, and combining both passions through remote work and digital nomad lifestyle.

## Tech Stack

- **Framework**: Docusaurus 2 (v2.0.1)
- **Language**: TypeScript, JavaScript, React (v17)
- **Package Manager**: Yarn
- **Content**: MDX for blog posts and documentation

## Development Commands

- **Install dependencies**: `yarn`
- **Start dev server**: `yarn start` (opens browser automatically)
- **Build for production**: `yarn build`
- **Type checking**: `yarn typecheck`
- **Clear cache**: `yarn clear`
- **Serve production build**: `yarn serve`

## Project Structure

- `/blog/` - Blog posts in MDX format with date-prefixed folders
- `/docs/` - Documentation pages (About me section)
- `/src/` - Custom React components and pages
- `/static/` - Static assets
- `docusaurus.config.js` - Main configuration file
- `sidebars.js` - Sidebar navigation configuration

## Content Guidelines

### Blog Posts

- Blog posts are stored in `/blog/` directory
- Use date-prefixed folders: `YYYY-MM-DD-post-title/`
- Each post has an `index.mdx` file with frontmatter:
  ```yaml
  ---
  slug: post-slug
  title: Post Title
  authors: [mateo]
  tags: [tag1, tag2]
  ---
  ```
- Topics focus on: traveling, coding, remote work, programming experiences
- Keep a conversational and personal tone
- Include practical advice and personal experiences

### Coding Style

- Use TypeScript for type safety
- Follow modern React patterns
- Keep components functional
- Use clear, descriptive variable names

## Site Configuration

- The site supports dark mode by default (`defaultMode: "dark"`)
- Base URL: `https://mateoguzman.net`
- GitHub organization: `mateoguzmana`
- Edit links point to GitHub repository

## Author's Focus Areas

This blog combines two passions: **traveling and coding**. When suggesting content or features:

- Consider the digital nomad lifestyle and remote work scenarios
- Think about offline work capabilities
- Focus on practical coding experiences while traveling
- Embrace the intersection of technology and exploration
- Keep content authentic and experience-based

## Best Practices

1. Always test locally with `yarn start` before committing
2. Run type checking with `yarn typecheck` to catch TypeScript errors
3. Follow existing file naming conventions for blog posts
4. Maintain consistent formatting in MDX files
5. Keep the site lightweight and fast-loading
6. Ensure mobile responsiveness for travelers on the go
