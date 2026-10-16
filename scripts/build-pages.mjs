import { readFile, writeFile, mkdir } from 'node:fs/promises';
import ts from 'typescript';

const origin = 'https://rao-rabi-portfolio.vercel.app';
const source = await readFile('src/features/portfolio/projects.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { selectedProjects } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const template = await readFile('dist/index.html', 'utf8');
const pages = [
  { path: 'projects', title: 'All Projects — Rao Rabi', description: 'Explore Rao Rabi’s SaaS, mobile, internal tools, and automation projects.' },
  ...selectedProjects.map(project => ({ path: `work/${project.slug}`, title: `${project.name} — Case Study — Rao Rabi`, description: project.summary })),
];
function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
function pageHtml(page) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
  for (const [key, value] of Object.entries({ description: page.description, 'og:title': page.title, 'og:description': page.description, 'twitter:title': page.title, 'twitter:description': page.description, 'og:url': `${origin}/${page.path}` })) {
    html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("[^>]*>)`), (_, prefix, suffix) => prefix + escape(value) + suffix);
  }
  return html.replace(/(<link rel="canonical" href=")[^"]*("[^>]*>)/, (_, prefix, suffix) => prefix + `${origin}/${page.path}` + suffix);
}
for (const page of pages) {
  await mkdir(`dist/${page.path}`, { recursive: true });
  await writeFile(`dist/${page.path}/index.html`, pageHtml(page));
}
console.log(`Generated metadata for ${pages.length} static routes.`);
