import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(toolDirectory, '..');
const sourceRoot = path.join(projectRoot, 'src', 'pages');
const partialRoot = path.join(projectRoot, 'src', 'partials');
const distributionRoot = path.join(projectRoot, 'dist');

const publicFiles = ['styles.css', 'script.js', 'introduce-tsacebu.css'];

const menuGroups = {
  about: ['about-philosophy.html', 'about-difference.html', 'about-teachers.html', 'about-care.html', 'about-schedule.html'],
  gallery: ['gallery-campus.html', 'gallery-stay.html', 'gallery-activities.html'],
  curriculum: [
    'curriculum-overview.html',
    'curriculum-esl.html',
    'curriculum-esl-regular.html',
    'curriculum-esl-regular-plus.html',
    'curriculum-esl-intensive.html',
    'curriculum-esl-power.html',
    'curriculum-ielts.html',
    'curriculum-ielts-pre.html',
    'curriculum-ielts-regular.html',
    'curriculum-ielts-guarantee.html',
    'curriculum-levels.html',
  ],
  community: ['community-notice.html', 'community-faq.html', 'partnership-inquiry.html', 'partnership-thank-you.html'],
};

const [siteHeaderTemplate, familyHeaderTemplate, siteFooterTemplate] = await Promise.all([
  readFile(path.join(partialRoot, 'site-header.html'), 'utf8'),
  readFile(path.join(partialRoot, 'family-header.html'), 'utf8'),
  readFile(path.join(partialRoot, 'site-footer.html'), 'utf8'),
]);
const imageManifest = JSON.parse(await readFile(path.join(projectRoot, 'assets', 'site', 'image-manifest.json'), 'utf8'));
const remoteImageManifest = JSON.parse(await readFile(path.join(toolDirectory, 'remote-image-manifest.json'), 'utf8'));

function replaceTokens(template, tokens) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    if (!(key in tokens)) {
      throw new Error(`Missing template token: ${key}`);
    }
    return tokens[key];
  });
}

function addImageAttribute(tag, name, value) {
  if (new RegExp(`\\s${name}=`).test(tag)) return tag;
  return tag.replace(/>$/, ` ${name}="${value}">`);
}

function optimizeImageMarkup(content) {
  return content.replace(/<img\b[^>]*>/g, (originalTag) => {
    const source = originalTag.match(/\ssrc="([^"]+)"/)?.[1] ?? '';
    const localFileName = source.match(/assets\/site\/([^/?#]+\.webp)(?:[?#].*)?$/)?.[1];
    const imageInfo = localFileName ? imageManifest[localFileName] : remoteImageManifest[source];
    const isSubhero = /\bsubhero__image\b/.test(originalTag);
    const isBrand = /\b(?:brand__image|family-header__brand-image)\b/.test(originalTag);
    let tag = originalTag;

    tag = addImageAttribute(tag, 'loading', isSubhero || isBrand ? 'eager' : 'lazy');
    tag = addImageAttribute(tag, 'decoding', 'async');
    if (isSubhero) tag = addImageAttribute(tag, 'fetchpriority', 'high');

    if (imageInfo) {
      tag = addImageAttribute(tag, 'width', imageInfo.width);
      tag = addImageAttribute(tag, 'height', imageInfo.height);
      if (localFileName) {
        const prefix = source.slice(0, source.lastIndexOf('/') + 1);
        const srcset = imageInfo.variants.map(({ file, width }) => `${prefix}${file} ${width}w`).join(', ');
        tag = addImageAttribute(tag, 'srcset', srcset);
        tag = addImageAttribute(tag, 'sizes', isSubhero ? '(max-width: 48rem) calc(100vw - 2rem), 44rem' : '(max-width: 48rem) calc(100vw - 2rem), 32rem');
      }
    } else if (/assets\/tsa-logo\.png(?:[?#].*)?$/.test(source)) {
      tag = addImageAttribute(tag, 'width', '450');
      tag = addImageAttribute(tag, 'height', '457');
    }

    return tag;
  });
}

function getPageContext(relativePath) {
  const normalizedPath = relativePath.split(path.sep).join('/');
  const fileName = path.basename(normalizedPath);
  const isHome = normalizedPath === 'index.html';
  const isIntroduction = normalizedPath === 'introduce_tsacebu.html';
  const isSubpage = normalizedPath.startsWith('pages/');
  const activeGroup = Object.entries(menuGroups).find(([, pages]) => pages.includes(fileName))?.[0] ?? '';

  return {
    normalizedPath,
    fileName,
    isHome,
    isIntroduction,
    isSubpage,
    activeGroup,
    rootPrefix: isSubpage ? '../' : '',
    pagePrefix: isSubpage ? '' : 'pages/',
    homeHref: isHome ? '#top' : '../index.html',
    footerHomeHref: isSubpage ? '../index.html' : '#top',
  };
}

function renderSiteHeader(context) {
  let header = replaceTokens(siteHeaderTemplate, {
    HEADER_MODIFIER: context.isHome ? '' : ' site-header--subpage',
    STUDENT_HREF: '#',
    ROOT_PREFIX: context.rootPrefix,
    PAGE_PREFIX: context.pagePrefix,
    HOME_HREF: context.homeHref,
  });

  if (context.activeGroup) {
    header = header.replace(
      `class="main-menu__group" data-menu-group="${context.activeGroup}"`,
      `class="main-menu__group main-menu__group--current" data-menu-group="${context.activeGroup}"`,
    );
  }

  if (context.isSubpage) {
    const sublinkPattern = new RegExp(
      `class="([^"]*main-menu__sublink[^"]*)" data-menu-page="${context.fileName.replace(/\./g, '\\.')}"`,
    );
    header = header.replace(
      sublinkPattern,
      (match, classNames) =>
        `class="${classNames} main-menu__sublink--active" data-menu-page="${context.fileName}" aria-current="page"`,
    );
  }

  return header;
}

function renderFamilyHeader(context) {
  return replaceTokens(familyHeaderTemplate, {
    ROOT_PREFIX: context.rootPrefix,
  });
}

function renderSiteFooter(context) {
  return replaceTokens(siteFooterTemplate, {
    ROOT_PREFIX: context.rootPrefix,
    FOOTER_HOME_HREF: context.footerHomeHref,
  });
}

async function listHtmlTemplates(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listHtmlTemplates(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }

  return files;
}

async function renderEslCourseExplorer() {
  const courses = [
    ['regular', 'Regular ESL'], ['regular-plus', 'Regular+ ESL'],
    ['intensive', 'Intensive Speaking'], ['power', 'Power Speaking'],
  ];
  const panels = await Promise.all(courses.map(async ([key], index) => {
    const html = await readFile(path.join(sourceRoot, 'pages', `curriculum-esl-${key}.html`), 'utf8');
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
    const heroEnd = main?.indexOf('</section>');
    const ctaStart = main?.indexOf('<section class="section section--course-cta">');
    if (!main || heroEnd < 0 || ctaStart < 0) throw new Error(`Cannot embed ESL course: ${key}`);
    const intro = main.slice(0, heroEnd).match(/<header class="section__header">([\s\S]*?)<\/header>/)?.[1];
    if (!intro) throw new Error(`Missing ESL introduction: ${key}`);
    let body = `<div class="section__inner esl-course-intro">${intro.replace(/h1/g, 'h2')}</div>` + main.slice(heroEnd + '</section>'.length, ctaStart);
    body = body.replace(/\b(id|aria-controls|aria-labelledby)="([^"]+)"/g, (_, attribute, id) => `${attribute}="embedded-${key}-${id}"`);
    return `<div class="esl-course-panel" id="esl-panel-${key}" role="tabpanel" aria-labelledby="esl-tab-${key}" tabindex="0"${index ? ' hidden' : ''}>${body}</div>`;
  }));
  const buttons = courses.map(([key, label], index) => `<button type="button" class="esl-course-tab" id="esl-tab-${key}" role="tab" aria-controls="esl-panel-${key}" aria-selected="${!index}" tabindex="${index ? '-1' : '0'}">${label}</button>`).join('\n');
  return `<section class="esl-course-explorer" id="esl-comparison" aria-label="ESL Courses"><div class="section__inner"><div class="esl-course-tabs" role="tablist" aria-label="ESL Courses">${buttons}</div></div>${panels.join('\n')}</section>`;
}

async function writeOutput(relativePath, content) {
  const outputTargets = [
    path.join(projectRoot, relativePath),
    path.join(distributionRoot, relativePath),
  ];

  for (const target of outputTargets) {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content, 'utf8');
  }
}

async function copyPublicAssets() {
  await cp(path.join(projectRoot, 'assets'), path.join(distributionRoot, 'assets'), { recursive: true });

  for (const fileName of publicFiles) {
    await cp(path.join(projectRoot, fileName), path.join(distributionRoot, fileName));
  }
}

await rm(distributionRoot, { recursive: true, force: true });
await mkdir(distributionRoot, { recursive: true });

const pageTemplates = await listHtmlTemplates(sourceRoot);

for (const templatePath of pageTemplates) {
  const relativePath = path.relative(sourceRoot, templatePath);
  const context = getPageContext(relativePath);
  let content = await readFile(templatePath, 'utf8');

  if (content.includes('{{SITE_HEADER}}')) {
    content = content.replace('{{SITE_HEADER}}', renderSiteHeader(context));
  }

  if (content.includes('{{FAMILY_HEADER}}')) {
    content = content.replace('{{FAMILY_HEADER}}', renderFamilyHeader(context));
  }

  if (content.includes('{{SITE_FOOTER}}')) {
    content = content.replace('{{SITE_FOOTER}}', renderSiteFooter(context));
  }

  if (content.includes('{{ESL_COURSE_EXPLORER}}')) {
    content = content.replace('{{ESL_COURSE_EXPLORER}}', await renderEslCourseExplorer());
  }
  content = optimizeImageMarkup(content);

  if (/\{\{[A-Z0-9_]+\}\}/.test(content)) {
    throw new Error(`Unresolved template token in ${relativePath}`);
  }

  await writeOutput(relativePath, content);
}

await copyPublicAssets();
console.log(`Built ${pageTemplates.length} HTML files into the project root and dist/.`);
