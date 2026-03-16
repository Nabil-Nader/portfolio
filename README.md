# Nabil Nader — Portfolio (React + Vite)

> Senior Backend Engineer · Java 21 · Spring Boot · Microservices  
> Built with React 19, Vite 6, TypeScript 5, Framer Motion, CSS Modules

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output → dist/
npm run preview    # preview production build
```

---

## What's Already Built (Scaffold Phase)

| File | Status | Description |
|------|--------|-------------|
| `package.json` | ✅ Done | All dependencies declared |
| `vite.config.ts` | ✅ Done | Path alias `@/` → `src/`, chunked build |
| `tsconfig*.json` | ✅ Done | Strict TypeScript, path aliases |
| `index.html` | ✅ Done | Fonts (Syne, DM Sans, JetBrains Mono), OG meta |
| `src/styles/globals.css` | ✅ Done | All design tokens, terminal mode vars, animations |
| `src/types/index.ts` | ✅ Done | All TypeScript interfaces |
| `src/data/skills.ts` | ✅ Done | 6 skill categories, ~45 skills with levels |
| `src/data/experience.ts` | ✅ Done | DXC, Kazyon, KIWE — full bullet points + metrics |
| `src/data/caseStudies.ts` | ✅ Done | 3 deep-dive case studies with full content |
| `src/data/constants.ts` | ✅ Done | Personal info, STATS array, NAV_LINKS, ROLES |
| `src/context/TerminalContext.tsx` | ✅ Done | Global terminal mode toggle (`T` key shortcut) |
| `src/hooks/useAnimatedCounter.ts` | ✅ Done | IntersectionObserver + RAF counter animation |
| `src/hooks/useTypewriter.ts` | ✅ Done | Typewriter that cycles through role strings |
| `src/components/ui/SectionLabel.tsx` | ✅ Done | Gold label with line accent + Framer entrance |
| `src/components/ui/AnimatedCounter.tsx` | ✅ Done | Scroll-triggered counting stat card |
| `src/main.tsx` | ✅ Done | App entry point (placeholder App component) |

---

## What to Build Next in Kiro

### 1. Layout Shell

**`src/components/layout/Navbar.tsx`**
- Fixed glassmorphism nav (`backdrop-filter: blur(20px)`)
- Logo: `NN` in gold + full name
- Nav links from `NAV_LINKS` constant
- "Available for hire" pulsing dot (reads `PERSONAL.available`)
- Terminal mode toggle button (calls `useTerminal().toggle()`)
- Mobile hamburger menu
- Active section highlight on scroll (IntersectionObserver)

**`src/components/layout/Footer.tsx`**
- One-liner: `Designed & built · Nabil Nader · Cairo · 2026`
- Links: Email, LinkedIn, GitHub

**`src/components/layout/ScrollProgress.tsx`**
- Thin gold line at top of viewport tracking scroll %
- `scaleX` transform driven by `window.scrollY / (docHeight - windowHeight)`

---

### 2. Hero Section — `src/components/sections/Hero.tsx`

```
┌────────────────────────────────────────────────────────────┐
│  [ ● Available for hire ]                     (badge)      │
│                                                            │
│  NABIL NADER                            (Syne 800, huge)  │
│  Senior Backend Engineer_               (typewriter)       │
│                                                            │
│  Java 21 · Spring Boot · Microservices  (mono tags)       │
│                                                            │
│  [ View Work ]  [ Download CV ]         (CTA buttons)     │
│                                                            │
│  Cairo, Egypt                           (location mono)   │
└────────────────────────────────────────────────────────────┘
```

Key details:
- Use `useTypewriter(ROLES)` for the animated subtitle
- Stagger entrance animations with Framer Motion (`variants` + `staggerChildren`)
- `PERSONAL.available` flag controls the green pulsing badge
- "Download CV" links to `public/Nabil-Rizkalla-CV.pdf`
- Scroll indicator arrow at bottom (animated bounce)
- Cursor glow effect: track `mousemove` → update a radial gradient `::before`

---

### 3. About Section — `src/components/sections/About.tsx`

```
┌──────────────────────────────────────────────┐
│  // About                                    │
│  My engineering story                        │
│                                              │
│  [paragraph about backend philosophy]        │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │  5+  │ │ 50+  │ │  3   │ │ 156  │  ←stats│
│  │years │ │μSvcs │ │indus.│ │files │        │
│  └──────┘ └──────┘ └──────┘ └──────┘        │
└──────────────────────────────────────────────┘
```

Key details:
- Stats grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))`
- Use `<AnimatedCounter stat={s} />` from the existing UI component
- Import `STATS` from `@/data/constants`
- Personal brand statement: *"Self-taught engineer who learns by solving real problems"*

---

### 4. Tech Stack Section — `src/components/sections/TechStack.tsx`

```
┌──────────────────────────────────────────────────────┐
│  // Tech Stack                                       │
│  Tools I build with                                  │
│                                                      │
│  [ All ] [ Core ] [ Data ] [ Cloud ] [ Security ]... │
│                                 (filter tabs)        │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Java 21  │ │Spring Boot│ │  MySQL   │  ← skill   │
│  │ ████████ │ │ ████████ │ │ ██████   │    cards    │
│  │  expert  │ │  expert  │ │ expert   │            │
│  └──────────┘ └──────────┘ └──────────┘             │
└──────────────────────────────────────────────────────┘
```

Key details:
- Import `skillCategories` from `@/data/skills`
- `useState` for active category filter
- `AnimatePresence` + `layout` prop on the grid for smooth filter transitions
- Skill level bar: `expert` = 90%, `proficient` = 65%, `familiar` = 40%
- Level pill color: expert=gold, proficient=emerald, familiar=sky

---

### 5. Case Studies Section — `src/components/sections/CaseStudies.tsx`

```
┌──────────────────────────────────────────────────────┐
│  // Case Studies                                     │
│  Engineering problems I've solved                    │
│                                                      │
│  ┌────────────────────────────────────────────┐      │
│  │ DXC  Java 8→21 Migration at Scale          │      │
│  │ ─────────────────────────────────────────  │      │
│  │ Problem / Approach / Outcomes (tabs)        │      │
│  │                                             │      │
│  │ [View Full Case Study →]                   │      │
│  └────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────┘
```

Key details:
- Import `caseStudies` from `@/data/caseStudies`
- Cards with left color-coded accent border (each company has a `color` field)
- "View Full Case Study →" navigates to `/case-study/:slug`
- Route must be added: `<Route path="/case-study/:slug" element={<CaseStudyPage />} />`

**`src/pages/CaseStudyPage.tsx`** — the deep-dive page:
- Header: company + role + period + tags
- Three tabs: `Problem` | `Approach` | `Outcomes`
- Approach tab: numbered step cards, each with tech stack pills
- Outcomes tab: 2×2 metric grid with large number + description
- Back button: `← Back to portfolio`

---

### 6. Experience Section — `src/components/sections/Experience.tsx`

```
┌────────────────────────────────────────────────────────┐
│  // Experience                                         │
│  Where I've built & led                               │
│                                                        │
│  ●── Aug 2024 – Present                               │
│  |   Senior Software Engineer @ DXC Technology        │
│  |   London Market Platform · Global Insurance        │
│  |   [ expand → bullet points ]                       │
│  |                                                     │
│  ●── Apr 2023 – Jul 2024                              │
│  |   Backend Developer @ Kazyon                       │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

Key details:
- Import `experiences` from `@/data/experience`
- Vertical line drawn with `::before` pseudo-element
- Each entry is `useState`-expandable (click to reveal bullets)
- Metrics row (`50+ Microservices`, `0% Dead Code`) shown as small pills
- Tags row at bottom of expanded card
- Animate expand/collapse with Framer `AnimatePresence` + `height` animation

---

### 7. Contact Section — `src/components/sections/Contact.tsx`

```
┌──────────────────────────────────────────────┐
│  // Contact                                  │
│  Let's build something great together.       │
│                                              │
│  Open to senior backend roles,               │
│  architecture consultations...               │
│                                              │
│  [ nabilnader@... ]  [ LinkedIn ]  [ Phone ] │
│                                              │
│  [ Download CV ]                             │
└──────────────────────────────────────────────┘
```

---

### 8. Terminal Mode (already wired — just add UI)

The `TerminalContext` is already built. The `T` keyboard shortcut already works.
What to add:

**Terminal Hero overlay** — when `isTerminal === true`, render a `<TerminalHero />` component over/instead of the normal hero that shows:

```
> whoami
  nabil-nader

> cat experience.txt
  Senior Software Engineer @ DXC Technology (Aug 2024 – Present)
  Backend Developer @ Kazyon (Apr 2023 – Jul 2024)
  Backend Developer @ KIWE (Jan 2021 – Mar 2023)

> cat skills.txt
  Java 21 | Spring Boot 3.5 | AWS SQS/SNS | Keycloak | JUnit 5 ...

> echo $STATUS
  Available for hire

> _    ← blinking cursor
```

The text should appear letter-by-letter using the existing `useTypewriter` hook pattern.
The CSS scanline overlay and green palette are already applied via `html.terminal-mode` in `globals.css`.

---

### 9. Page Assembly — `src/main.tsx` (update placeholder)

```tsx
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { TechStack } from '@/components/sections/TechStack'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { CaseStudyPage } from '@/pages/CaseStudyPage'

function Home() {
  return (
    <>
      <div className="grid-bg" />
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <TechStack />
        <CaseStudies />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case-study/:slug" element={<CaseStudyPage />} />
    </Routes>
  )
}
```

---

## AWS Deployment

```
# One-time setup
aws s3 mb s3://nabilnader.dev
aws s3 website s3://nabilnader.dev --index-document index.html --error-document index.html

# GitHub Actions (add to .github/workflows/deploy.yml)
- run: npm run build
- run: aws s3 sync ./dist s3://nabilnader.dev --delete
- run: aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*"
```

Stack: S3 (~$0.02/mo) + CloudFront + Route53 + ACM (free SSL) ≈ **$1–3/month**

---

## Design Tokens (quick reference)

| Token | Value | Usage |
|-------|-------|-------|
| `--gold` | `#F59E0B` | Primary accent, headings, borders |
| `--emerald` | `#10B981` | Success, available badge, DXC accent |
| `--sky` | `#38BDF8` | KIWE accent, info states |
| `--bg` | `#07090F` | Page background |
| `--bg1` | `#0C1020` | Card backgrounds |
| `--ff-head` | Syne 800 | Section titles, hero name |
| `--ff-mono` | JetBrains Mono | Labels, tags, code |
| `--ff-body` | DM Sans 300 | Body text |

In terminal mode (`html.terminal-mode`), `--gold` becomes `#00FF41` and all fonts switch to JetBrains Mono automatically.

---

## Framer Motion Patterns (copy-paste ready)

```tsx
// Staggered children entrance
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } }
}

// Scroll-triggered section
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
>

// Expandable height
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
      style={{ overflow: 'hidden' }}
    >
```

---

## Kiro Spec Stubs (optional)

If you're using Kiro's spec-driven workflow, here are starter specs for each component:

- **Hero**: "Animated hero with typewriter role cycling, availability badge, and staggered entrance"
- **TechStack**: "Filterable skill grid by category with proficiency level bars and AnimatePresence transitions"
- **CaseStudies**: "Card list linking to deep-dive pages, each with Problem/Approach/Outcomes tabs"
- **Experience**: "Expandable vertical timeline with scroll-triggered line animation"
- **TerminalHero**: "Green-on-black terminal that types out CV data letter-by-letter on mode toggle"
