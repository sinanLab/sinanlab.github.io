import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const link = z.object({ label: z.string(), url: z.string().min(1) });
const common = {
  title: z.string(),
  description: z.string(),
  draft: z.boolean().default(false),
  placeholder: z.boolean().default(false),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...common,
    order: z.number().default(0),
    selected: z.boolean().default(false),
    category: z.string(),
    visual: z.enum(['dynamics', 'segmentation', 'timeseries']).default('dynamics'),
    tags: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    figure: z.object({ src: z.string(), alt: z.string(), caption: z.string() }).optional(),
    embed: z.object({ src: z.url(), title: z.string(), caption: z.string() }).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    ...common,
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    category: z.string().default('Research notes'),
    tags: z.array(z.string()).default([]),
  }).refine((entry) => entry.placeholder || entry.draft || !!entry.date, {
    message: 'Published posts need a date. Use placeholder: true for an example.',
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int().min(1800).max(2200).nullable(),
    type: z.enum(['Journal article', 'Conference paper', 'Preprint', 'Book chapter', 'Thesis']),
    abstract: z.string(),
    bibtex: z.string(),
    selected: z.boolean().default(false),
    placeholder: z.boolean().default(false),
    draft: z.boolean().default(false),
    thumbnail: z.object({ src: z.string(), alt: z.string() }).optional(),
    links: z.object({
      doi: z.url().optional(),
      pdf: z.string().optional(),
      preprint: z.url().optional(),
      code: z.url().optional(),
      dataset: z.url().optional(),
    }).default({}),
  }).refine((entry) => entry.placeholder || entry.draft || (entry.year !== null && entry.authors.length > 0 && !!entry.venue), {
    message: 'Real publications require a year, authors, and venue.',
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    placeholder: z.boolean().default(false),
    draft: z.boolean().default(false),
  }).refine((entry) => entry.placeholder || entry.draft || !!entry.date, {
    message: 'Real news entries require a date.',
  }),
});

export const collections = { projects, blog, publications, news };
