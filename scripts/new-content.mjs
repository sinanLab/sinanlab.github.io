import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const [kind, slug] = process.argv.slice(2);
const kinds = { post: ['blog', 'md'], project: ['projects', 'md'], publication: ['publications', 'json'], news: ['news', 'md'] };
if (!Object.hasOwn(kinds, kind || '') || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')) {
  console.error('Usage: npm run new -- <post|project|publication|news> <lowercase-slug>');
  process.exit(1);
}
const [folder, extension] = kinds[kind];
const root = new URL('../', import.meta.url);
const template = await readFile(new URL(`templates/${kind}.${extension}`, root), 'utf8');
const destination = new URL(`src/content/${folder}/${slug}.${extension}`, root);
await mkdir(new URL(`src/content/${folder}/`, root), { recursive: true });
try {
  await writeFile(destination, template.replaceAll('DATE_PLACEHOLDER', new Date().toISOString().slice(0, 10)), { flag: 'wx' });
  console.log(`Created ${fileURLToPath(destination)}\nEdit the content, then set draft: false to publish it in the next build.`);
} catch (error) {
  if (error.code === 'EEXIST') {
    console.error('That entry already exists. Choose a different slug; existing content was preserved.');
    process.exitCode = 1;
  } else { throw error; }
}
