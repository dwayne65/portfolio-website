# Niyonshuti Dick Jameson — Personal Portfolio

A modern, responsive, multi-page portfolio website built with **HTML5, CSS3 and Bootstrap 5** for the Mid-Semester Project.

**Live site:** `https://<your-username>.github.io/portfolio-website/`
**Repository:** `https://github.com/<your-username>/portfolio-website`

## Pages

| Page | File | Contents |
|------|------|----------|
| Home | `index.html` | Sticky glass navbar, animated hero with typing effect and CTA buttons, tech marquee, bento highlight cards (skills, current program, achievements), featured projects, CTA band, footer |
| About Me | `about.html` | Biography with quick facts, education timeline, coursework table, animated skill progress bars, soft-skill rings, tool badges, interests & hobbies |
| Gallery | `gallery.html` | **Self-motivation video** (HTML5 `<video>`) with caption, filterable photo grid with captions and a full-screen lightbox |
| Contact | `contact.html` | Contact cards (companies, phone, location, email), LinkedIn/GitHub links, validated Bootstrap contact form, FAQ accordion, embedded Google Map |

## Features

- Fully responsive (mobile → desktop), Bootstrap 5.3 grid and components
- Dark / light theme toggle (remembers your choice)
- Glassmorphism UI, animated gradient blobs, scroll-reveal animations, animated counters
- Scroll-progress bar, back-to-top button, page loader, cursor glow
- Gallery category filter + keyboard-navigable lightbox (← / → / Esc)
- Contact form with live validation and character counter; opens the visitor's email app pre-filled (GitHub Pages has no server)
- Accessible: semantic HTML, alt text, ARIA labels, focus states, `prefers-reduced-motion` support

## Project structure

```
portfolio-website/
├── index.html
├── about.html
├── gallery.html
├── contact.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── img/        (profile.webp, favicon.svg, video-poster.svg)
│   └── video/      (put motivation.mp4 here)
└── README.md
```

## Personalise before submitting

1. **Video** — record your motivation video and save it as `assets/video/motivation.mp4` (or swap in the YouTube embed shown in the comment in `gallery.html`).
2. **Photo** — your portrait is `assets/img/profile.webp`; replace that file to change it everywhere.
3. **Gallery images** — replace the stock photos in `gallery.html` with your own pictures (save them in `assets/img/`).
4. **Details** — check coursework, grades and social links (search for `github.com/` and `linkedin.com/`).

## Deploying to GitHub Pages

```bash
git remote add origin https://github.com/<your-username>/portfolio-website.git
git branch -M main
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**. The site goes live at `https://<your-username>.github.io/portfolio-website/` within a minute or two.

## Credits

- [Bootstrap 5](https://getbootstrap.com/) and [Bootstrap Icons](https://icons.getbootstrap.com/)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- Stock photos: [Unsplash](https://unsplash.com/)

© 2026 Niyonshuti Dick Jameson
