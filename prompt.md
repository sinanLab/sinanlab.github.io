Copy this prompt into your AI coding agent:

Build a complete personal academic website for me, a PhD student, suitable for publishing at `https://<username>.github.io/` using GitHub Pages.

Reference website: https://hirunavishwamith.github.io/

First inspect the reference website to understand its layout, navigation, spacing, and academic presentation. Use it as design inspiration, but create an original implementation. Do not copy its personal information, text, photographs, or project content.

## Design direction

I want a clean, professional academic website with a similar overall feel, improved usability, and carefully designed research pages.

- Use standard, readable typography: a system font stack such as Arial, Helvetica, and sans-serif. Do not use decorative, handwritten, futuristic, or unusual fonts.
- Use a restrained color palette, generous whitespace, clear headings, and comfortable line spacing.
- Keep the main content at a readable maximum width.
- Use a professional navigation bar with a clear indication of the current page.
- Make the website responsive across desktop, tablet, and mobile.
- Support light and dark themes with an accessible toggle and saved preference.
- Use subtle hover effects and transitions. Respect reduced-motion preferences.
- Avoid excessive animations, oversized promotional headings, glass effects, gradients everywhere, and unnecessary decorative elements.
- Present it as an academic profile and research portfolio.
- make the webiste reproducable so that if i want to make a post in the blog or adding new publication or something, then will be easy to follow the template of that and add more information and add new stuff.
- make the website in the standard way as other devleopers design the website.

## Website pages

### 1. Home

Include:
- Name, photograph, PhD position, and institutional affiliation.
- A concise biography and research interests.
- Links to email, GitHub, Google Scholar, ORCID, LinkedIn, and CV where provided.
- Selected research projects.
- Selected publications.
- Recent news and academic updates.

The opening section should make my identity and research focus immediately clear.

### 2. Research

Explain my research themes and current work through readable sections, relevant images, and figure captions.

My general research area is systems biology, including NF-κB dynamics, microscopy image analysis, deep learning segmentation, and single-cell time-series analysis. Use this context for the page structure, but do not invent specific findings, affiliations, or achievements.

### 3. Publications

Provide a clean publication list with:
- Title, authors, venue, year, and publication type.
- Optional thumbnail.
- Expandable abstract.
- DOI, PDF, preprint, code, and dataset links when supplied.
- BibTeX display and copy button.
- Search and filtering by year or publication type.

Include only real publication information that I supply. Until then, use clearly marked editable placeholders.

### 4. Projects

Create a project overview and individual project pages.

Each project page should support:
- Overview and research question.
- Methods and workflow.
- Figures and results.
- Relevant technologies.
- Links to code, publications, and datasets.

Support scientific images and embedded visualizations without making them necessary for basic navigation.

### 5. CV

Create a readable CV page with sections for education, research experience, publications, presentations, teaching, skills, and awards. Include a downloadable PDF link when the file is available.

### 6. Contact

Include institutional contact details and relevant profile links. Use an email link; do not add a contact form that requires a backend.

## Implementation requirements

- Build a static website compatible with GitHub Pages.
- Choose a lightweight, maintainable implementation. Avoid unnecessary dependencies.
- If the repository already contains a suitable framework, work within it.
- Separate editable content from layout wherever practical, using Markdown or structured data.
- Provide reusable components for navigation, footer, publication entries, and project entries.
- Ensure links and assets work at both a user-site root and a repository subpath.
- Include descriptive page titles, metadata, a favicon, and social-sharing metadata.
- Use semantic HTML, keyboard-accessible controls, visible focus states, adequate contrast, and useful image alt text.
- Optimize images and keep loading fast.
- Do not include tracking or analytics unless I request them.
- Do not fabricate personal details. Mark missing content clearly and keep it easy to replace.

## Deliverables and verification

Implement the actual website rather than providing only a plan or mockup.

Provide:
1. The complete source code.
2. A working local preview.
3. GitHub Pages deployment configuration.
4. A README explaining local setup, content editing, image replacement, and deployment.
5. A short list of personal information and assets I need to supply.

Check the production build, navigation, responsive layouts, theme toggle, publication controls, and deployment paths. Report any remaining limitations.

Prepare the website for deployment, but do not publish it or modify my remote repository unless I explicitly authorize that action.