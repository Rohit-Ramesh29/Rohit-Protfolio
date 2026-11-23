# Rohit R — Portfolio

React + TypeScript + Tailwind CSS + Framer Motion + Lucide.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Personalise

| What | Where |
|---|---|
| All text, links, skills, projects, education, certifications | `src/data/portfolio.ts` |
| Your photo (square, ~800×800 JPG). Shows an "RR" monogram until added | `public/images/profile.jpg` |
| Your resume. The buttons show a "being updated" notice until added | `public/resume/Rohit_R_Resume.pdf` |
| Direct contact-form delivery (optional) | copy `.env.example` → `.env`, add a free [Web3Forms](https://web3forms.com) key |

**Contact form:** without a key, the form validates the input and opens the visitor's email app with the message filled in, then tells them it is **not sent** until they press send. With `VITE_WEB3FORMS_KEY` set, messages go straight to your inbox and the form shows a confirmed success or error.

**Skill levels** use three honest labels (Used in projects / Working knowledge / Fundamentals) instead of percentages. Adjust them per skill in `portfolio.ts`.

**Project visuals** are concept mockups built in code (`src/components/mockups`) and are labelled as mockups on the page. To use real screenshots, swap the entry in the `visuals` map in `src/components/sections/Projects.tsx` for an `<img>`.

## Structure

```
src/
  data/portfolio.ts        content (single source of truth)
  components/
    layout/                Navbar, Footer, background/cursor/progress/back-to-top effects
    sections/              Hero, About, Skills, Projects, QualityAssurance, DataAnalytics, Education, Contact
    mockups/               SVG charts + project dashboard mockups
    ui/                    Section, Reveal, Button, Toast, MockupLabel
    icons/                 GitHub / LinkedIn marks
  hooks/                   useCountUp, useActiveSection
  lib/                     contact (Web3Forms / mailto), resume download check
```

Deploys as a static site to Vercel, Netlify or GitHub Pages (build command `npm run build`, output `dist`).
