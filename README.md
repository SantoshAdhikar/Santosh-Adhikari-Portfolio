# Santosh Adhikari | Developer Portfolio

Personal portfolio of **Santosh Adhikari**, a Computer Science graduate from California State University, Long Beach (December 2025), focused on **backend and full-stack software development**.

I build applications using Java, Spring Boot, React, TypeScript, and relational databases. This website highlights my projects, technical experience, and resume.

**[View Portfolio](https://santosh-adhikari-portfolio.vercel.app/)** · **[GitHub](https://github.com/SantoshAdhikar)** · **[LinkedIn](https://www.linkedin.com/in/santosh-adhikari-2043-sant/)**

## Featured Projects

### S4 Neighborhood Intelligence

**Independent full-stack project | Meta Global AI Developer Hackathon 2026**

A local-business intelligence prototype that combines storefront image inspection, neighborhood research, evidence review, and ranked business opportunities in a unified workflow.

- Developed Java/Spring Boot APIs, PostgreSQL persistence, Flyway migrations, and saved analysis history.
- Built React/TypeScript interfaces for business workspaces, storefront inspection, neighborhood exploration, and reports.
- Integrated Meta AI model workflows, image segmentation, and local Ollama support.

**Technologies:** Java 21, Spring Boot, React, TypeScript, PostgreSQL, Flyway, Meta Model API, SAM 3.1, Ollama.

[Source code](https://github.com/SantoshAdhikar/s4-neighborhood-intelligence)

### StudentNest

**Five-person CSULB senior capstone | 2025**

A student-focused academic platform for course planning, role-based workflows, and tuition information. I contributed primarily to backend APIs, application logic, and database integration.

**Technologies:** Java, Spring Boot, React, MySQL.

[Source code](https://github.com/erictran739/StudentNest)

### Golden Brows Web Platform

**Independent business software project**

A web platform built around real beauty-studio needs, including service information and appointment-related workflows. The project demonstrates frontend/backend integration and business-oriented product development.

**Technologies:** Java, Spring Boot, React, MySQL.

[Source code](https://github.com/SantoshAdhikar/GoldenBrows-web)

### Personal Budget Management

**Team project**

A budgeting application focused on organizing personal finances. This portfolio displays the project without a screenshot gallery.

## Portfolio Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Animation and graphics | Framer Motion, Three.js, React Three Fiber |
| Icons | Lucide React |
| Hosting | Vercel |
| Contact | Formspree |

> This repository contains the **portfolio website only**. The Java/Spring Boot backends described above belong to separate project repositories. No Java server or database is required to run this portfolio.

## Run Locally

**Prerequisites:** Node.js and npm.

```bash
git clone https://github.com/SantoshAdhikar/Santosh-Adhikari-Portfolio.git
cd Santosh-Adhikari-Portfolio
npm ci
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Quality Checks

```bash
npm run lint
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Portfolio Features

- Responsive project cards featuring technical contributions and expandable engineering details.
- Screenshot galleries for S4 Neighborhood Intelligence, StudentNest, and Golden Brows.
- Animated introduction with skip support and reduced-motion considerations.
- Original `BlueShaderBackground` built with Three.js and a background-mode toggle.
- Resume download, GitHub and LinkedIn links, and a contact form with an email fallback.

## Project Screenshot Structure

Screenshots are served from the `public/projects` directory:

```text
public/projects/
├── s4-intelligence/
│   ├── 1.png ... 6.png
├── studentnest/
│   ├── 1.png ... 3.png
└── goldenbrows/
    ├── 1.png ... 4.png
```

Personal Budget Management is intentionally shown without screenshots. Only use screenshots that represent actual application behavior, and remove sensitive information before committing them.

## Resume and Contact

The downloadable resume is stored at:

```text
public/Santosh Adhikari Resume.pdf
```

To update the resume, replace this file while keeping the filename unchanged.

The contact form uses Formspree. Direct contact is also available through the email link on the portfolio. Verify form delivery after deployment.

## About

This portfolio is designed to present my software engineering work clearly, with an emphasis on backend development, practical problem-solving, and projects that can be explored through source code and real screenshots.
