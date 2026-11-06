# Santosh Adhikari — Developer Portfolio

Portfolio of Santosh Adhikari, a computer science graduate and backend-focused full-stack developer.

## Technologies
React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · Three.js

## Featured work
- **S4 Neighborhood Intelligence** — Java/Spring Boot, React, PostgreSQL and Meta AI integration; 2026 hackathon prototype.
- **StudentNest** — academic capstone built with a five-person team.
- **Golden Brows Web Platform** — business website and appointment-workflow software.
- **Personal Budget Management** — team budgeting application; displayed without screenshots. The earlier repository URL currently returns 404 publicly, so its GitHub button is hidden until the link is corrected.

## Run locally
```bash
npm ci
npm run dev
```

## Validate
```bash
npm run build
npm run lint
```

## Project screenshots
Keep these screenshots in `public/projects` (they are intentionally not included in an updates-only ZIP):

- `s4-intelligence/1.png` through `6.png`
- `studentnest/1.png` through `3.png`
- `goldenbrows/1.png` through `4.png`
- Personal Budget Management stays text-only.

The React gallery displays images that exist, with thumbnails and an enlarge view. Use real application screenshots and avoid publishing private tokens or customer information.

## Resume
The website links to `public/Santosh Adhikari Resume.pdf`. Replace that file to update the downloadable resume without editing the components.

## Contact form
The form submits to the existing Formspree endpoint (`https://formspree.io/f/xdkwbyak`). Test delivery from the deployed site before sharing it with recruiters. The visible email link remains usable if the form service is unavailable.

## About the code
This is a static frontend portfolio. No Java/Spring Boot backend is required to run the portfolio itself. Its project cards describe separately developed applications.


## Portfolio usability
- The intro appears only on a first visit per browser session and can be skipped.
- The background toggle switches between calm navy and subtle starfield. Text stays readable in both.
- Project cards show key accomplishments upfront, with longer technical details in expandable sections.
- `Contact` is always rendered and does not rely on scroll animations.
