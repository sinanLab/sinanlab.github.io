# Personal academic website

A static academic website built with Astro, TypeScript, Markdown, and plain CSS. It includes Home, Research, Publications, Projects, Blog, CV, Contact, individual project/post pages, and a custom 404 page. No backend, analytics, third-party fonts, or client-side UI framework is required.

The visual direction takes inspiration from the compact academic presentation of [the supplied reference](https://hirunavishwamith.github.io/). All code, text, and schematic illustrations in this project are original. Reference-site personal content was not reused.

## Local setup

Use Node.js 24 LTS (see `.nvmrc`) and npm. Commands below work in macOS, Linux, and Windows WSL/Git Bash.

```sh
npm ci
npm run dev
```

Open **http://localhost:4321/**. Changes to source files update the local preview. If the port is occupied, Astro prints the actual port it chose.

**Keep the server terminal running while viewing the website.** Pressing `Ctrl+C` stops the server. `npm ci` installs dependencies; it does not start a website. Run only one development or preview server at a time, and open the exact URL printed by that command.

### Opening the preview from Windows / WSL

The server listens on WSL's network interfaces so a Windows browser can reach it directly. If `localhost` does not load, open the **Network** URL printed by Astro (for example, `http://172.x.x.x:4321/`). Use HTTP, not HTTPS. You can also run `hostname -I` in a second WSL terminal to find the current WSL IP address. This address can change when WSL restarts.

If Astro prints “Port 4321 is in use, trying another one,” use the new port it prints, or stop the other server before restarting. You do not need to reinstall dependencies for a port or browser-connection problem.

This serves a local preview. A public `USERNAME.github.io` URL becomes available only after the GitHub Pages deployment described below. For background on Windows-to-WSL connections, see [Microsoft's WSL networking guide](https://learn.microsoft.com/en-us/windows/wsl/networking).

### Check and preview the production build

```sh
npm run check       # TypeScript, Astro, and content schema validation
npm run build       # Generate dist/
npm run preview     # Serve the production build locally
```

Astro's build-tool telemetry is disabled by the npm scripts. The published site makes no analytics requests.

## Personalize the profile

Start in **`src/data/profile.ts`**. Replace the name, role, affiliation, biography, and research interests. Fill in the email and any profile URLs you want to display. Empty URLs remain hidden on the home page and are identified as pending on Contact.

Set `nameIsPlaceholder: false` once you have supplied your name. The site outputs `noindex` while this flag is true to avoid indexing an unfinished identity. Set `biographyIsPlaceholder: false` after reviewing and replacing the draft biography.

Use `src/data/research.ts` for research-theme descriptions; set `researchIsPlaceholder` to `false` after replacing the outlines. Use `src/data/cv.ts` for education, experience, presentations, teaching, skills, and awards. The CV publication section draws from verified publication records automatically.

### Photograph and CV

1. Put an optimized photograph in `public/images/profile.webp`.
2. Set `photo: '/images/profile.webp'` and a descriptive `photoAlt` in `profile.ts`.
3. Put your CV in `public/files/cv.pdf` and set `cvPdf: '/files/cv.pdf'`.

No broken photo or PDF link is rendered while these fields are empty. The CV also has print styles for printing from the browser.

## Add and edit content

Content lives under **`src/content/`**. Filenames become the URL slug for projects and posts. Lowercase, hyphenated filenames are recommended. You can copy the files in **`templates/`**, or use these commands:

```sh
npm run new -- post my-first-note
npm run new -- project my-research-project
npm run new -- publication my-paper
npm run new -- news conference-presentation
```

The command creates a draft without overwriting existing files. Edit the new file and set **`draft: false`** when it is ready to include in the next build. In JSON use `"draft": false`. Drafts are omitted from all lists and have no generated detail pages. The built site only changes after rebuilding and deploying.

`placeholder: true` identifies a visible example, independently of `draft`. Replace or delete the shipped examples when adding real content. Example projects and posts are marked `noindex`. Do not remove the placeholder label until the content is accurate.

### Blog posts

Posts are Markdown files in `src/content/blog/`, with frontmatter:

```yaml
---
title: "Your post title"
description: "A one-sentence summary."
date: 2026-10-01
category: Research notes
tags: [Methods]
draft: true
placeholder: false
---
```

The date above is an example; set the actual intended publication date. Posts appear newest first. Optional `updated` uses the same date format. A date is required for real, non-draft posts. Dates do **not** schedule publication: use `draft` to control visibility. Headings automatically populate the on-page navigation.

### Projects

Projects are Markdown files in `src/content/projects/`. Start with `templates/project.md`. Its sections cover overview, research question, methods, figures/results, technologies, and resources.

- `selected: true` features a project on Home (up to three).
- `order` controls ordering, smallest first.
- `category` and `tags` label the project.
- `visual` selects the fallback schematic: `dynamics`, `segmentation`, or `timeseries`.
- `links` accepts `{ label, url }` objects for code, papers, and datasets.
- `figure` replaces the fallback with your own image and caption.

```yaml
figure:
  src: /images/my-figure.webp
  alt: "Describe the scientific content of the image."
  caption: "Figure 1. Explain the data, units, experimental conditions, and source."
links:
  - label: Code
    url: https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```

Only use links and findings that actually belong to your work. The included schematics are explicitly illustrative and contain no experimental data.

### Publications

Each publication is one JSON file in `src/content/publications/`. Copy `templates/publication.json` and supply:

- `title`, `authors` (an array of names), `venue`, and numeric `year`.
- `type`: `Journal article`, `Conference paper`, `Preprint`, `Book chapter`, or `Thesis`.
- `abstract` and the exact `bibtex` string (use `\n` for line breaks in JSON).
- Optional `links` keys: `doi`, `pdf`, `preprint`, `code`, `dataset`.
- Optional `thumbnail`: `{ "src": "/images/paper.webp", "alt": "A useful description" }`.
- `selected: true` to show the publication on Home (up to three, newest first).

Use a complete `https://doi.org/...` URL for a DOI. PDF links can be external URLs or local `/files/paper.pdf` paths. Only share files you have permission to distribute. Real, non-draft records must have authors, a venue, and a year; placeholders may use `year: null`.

Search matches title, authors, venue, abstract, and type. Year/type filter options are generated from the records. Abstracts and BibTeX disclosures work without JavaScript. Clipboard copying requires a secure origin (HTTPS or localhost); if copying is unavailable, the citation is selected for manual copying.

### News

Create Markdown files in `src/content/news/` using `templates/news.md`. Supply a short title, date, and body. The three most recent non-draft entries appear on Home. News is displayed on the home page rather than on separate detail pages.

## Images, Markdown links, and visualizations

- Files in `public/` are copied unchanged to the build. Prefer WebP for photos, PNG for figures requiring lossless detail, and SVG for diagrams. Supply image alt text and scientific captions. Aim for a profile image around 500 × 550 pixels and avoid multi-megabyte thumbnails.
- Use paths such as `/images/figure.webp` and `/research/` in ordinary Markdown links and images. The configured Markdown processor adds the deployment base automatically. Do **not** manually include the repository name in content paths.
- Use `withBase()` from `src/lib/utils.ts` for internal paths added to Astro components. It preserves external URLs and email links.
- Raw HTML in Markdown is advanced usage. Prefer ordinary Markdown for links/images and the supported frontmatter below for embeds; manually written HTML may need base-path handling.
- Project frontmatter can include an optional visualization:

```yaml
embed:
  src: https://YOUR-VISUALIZATION-HOST.example/
  title: "A descriptive accessible title"
  caption: "Explain the visualization without requiring interaction."
```

Embeds load lazily and are sandboxed with scripts allowed; they cannot access the parent page. Some hosts may prohibit embedding or require additional permissions. A normal link accompanies the embed, and navigation does not depend on it. Keep static figures and interpretation available as a fallback. No external embed is configured in the starter.

`public/images/social-card.png` is a generic 1200 × 630 sharing image. Replace it with your own card; its editable SVG source is adjacent. Update the image description in `src/layouts/BaseLayout.astro` if the replacement has different content. Replace `public/favicon.svg` to change the favicon.

## GitHub Pages deployment

The site is prepared for publishing; this build has **not** modified a remote repository or deployed anything.

After you decide to publish:

1. Put the source in your GitHub repository. Use `USERNAME.github.io` for a user site, or any repository name for a project site.
2. In the repository, open **Settings → Pages → Build and deployment**, and select **GitHub Actions**.
3. Open **Actions → Deploy academic website to GitHub Pages → Run workflow**.

The workflow in `.github/workflows/deploy.yml` is intentionally **manual**. Pushing source alone does not trigger deployment. It runs `npm ci`, validates the source, builds the site, and deploys the static artifact. GitHub's Pages configuration supplies the origin and base path automatically, including a configured custom domain.

For local production builds, supply the canonical site origin and base explicitly:

```sh
# User site
SITE_URL=https://YOUR-USERNAME.github.io BASE_PATH=/ npm run build

# Repository site
SITE_URL=https://YOUR-USERNAME.github.io BASE_PATH=/YOUR-REPOSITORY/ npm run build
BASE_PATH=/YOUR-REPOSITORY/ npm run preview
```

`SITE_URL` is the origin (scheme and hostname); `BASE_PATH` is the path. Without overrides the canonical metadata uses `https://example.github.io`, which is a placeholder. `.env.example` documents the variables; this configuration reads shell/CI environment variables directly rather than automatically loading an `.env` file.

A custom 404 page and `.nojekyll` are included. Nested routes use directories with `index.html`, so direct page loads work on GitHub Pages.

## Browser verification

```sh
npx playwright install chromium
npm run build
npm test
npm run test:subpath
```

Tests cover static pages and assets, internal links and anchors, navigation, theme persistence and unavailable storage, publication controls, successful and denied clipboard access, phone/tablet/desktop widths, automated WCAG checks in both themes, no-JavaScript behavior, reduced motion, and screenshots. The subpath command rebuilds into `dist-subpath/` at `/academic/` and runs the same tests without replacing `dist/`.

Screenshot artifacts appear in `test-results/`. Automated accessibility checks complement manual keyboard and visual checks; they cannot establish complete accessibility conformance. Browser tests currently target Chromium.

## Source map

| Location | Purpose |
| --- | --- |
| `src/data/` | Profile, CV, and research-theme text |
| `src/content/` | Editable posts, projects, publications, and news |
| `templates/` | Copyable content starting points |
| `src/pages/` | Static routes and generated detail pages |
| `src/components/` | Shared navigation, footer, figures, cards, publications |
| `src/layouts/BaseLayout.astro` | HTML shell, theme initialization, metadata |
| `src/styles/global.css` | Design tokens, responsive styles, print styles |
| `public/` | Photograph, figures, PDFs, favicon, sharing image |
| `.github/workflows/deploy.yml` | Manual GitHub Pages deployment |

## Information and assets still needed

- Your name, institution, department, institutional address, and reviewed biography.
- Your photograph and its alt text.
- Email, GitHub, Google Scholar, ORCID, and LinkedIn URLs.
- Verified publication records, abstracts, BibTeX, and associated links.
- Actual project questions, methods, technologies, figures, captions, and results.
- Education, research experience, presentations, teaching, skills, and awards.
- CV PDF, any news entries/blog posts, and the intended GitHub username/repository or custom domain.

Until supplied, these items are clearly marked placeholders or omitted. Empty sections do not imply that you have no experience or publications.
