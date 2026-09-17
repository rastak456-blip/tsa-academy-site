// Create responsive WebP assets from the site's photographic source files.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(toolDirectory, '..');
const assetDirectory = path.join(projectRoot, 'assets', 'site');
const sourceDirectory = path.join(projectRoot, 'images');
const siteSourceDirectory = path.join(sourceDirectory, 'source-site');

const variantWidths = [640, 960];
const facilityMaxWidth = 1920;
const webpOptions = { quality: 74, effort: 6, smartSubsample: true };
const avifOptions = { quality: 55, effort: 6, chromaSubsampling: '4:2:0' };

// Only these two assets are painted as CSS backgrounds, where an AVIF can be
// offered through image-set() without touching any page markup.
const avifStems = new Set(['campus-learning-lounge', 'facility-safety']);

async function encode(pipeline, targetPath, options, avif) {
  await pipeline.clone().toFormat(avif ? 'avif' : 'webp', avif ? avifOptions : webpOptions).toFile(targetPath);
}

async function convert(source, outputStem, maxWidth) {
  const input = sharp(source, { failOn: 'error' });
  const { width: sourceWidth } = await input.metadata();
  const mainWidth = Math.min(sourceWidth, maxWidth);
  const widths = [...new Set([...variantWidths.filter((width) => width < mainWidth), mainWidth])];

  for (const width of widths) {
    // The sources are soft renders, so sharpen just enough to restore acutance.
    const pipeline = sharp(source).resize({ width, withoutEnlargement: true });
    pipeline.sharpen({ sigma: 0.6, m1: 0.4, m2: 0.25 });

    const suffix = width === mainWidth ? '' : `-${width}`;
    await encode(pipeline, path.join(assetDirectory, `${outputStem}${suffix}.webp`), webpOptions, false);
    if (avifStems.has(outputStem)) {
      await encode(pipeline, path.join(assetDirectory, `${outputStem}${suffix}.avif`), avifOptions, true);
    }
  }
}

async function buildManifest() {
  const files = (await readdir(assetDirectory)).filter((file) => file.endsWith('.webp')).sort();
  const manifest = {};

  for (const file of files) {
    const stem = path.basename(file, '.webp');
    if (/-\d+$/.test(stem)) continue;

    const variants = [];
    for (const variantFile of files.filter((candidate) => new RegExp(`^${stem}-\\d+\\.webp$`).test(candidate))) {
      const { width } = await sharp(path.join(assetDirectory, variantFile)).metadata();
      variants.push({ file: variantFile, width });
    }

    const { width, height } = await sharp(path.join(assetDirectory, file)).metadata();
    variants.sort((left, right) => left.width - right.width);
    variants.push({ file, width });
    manifest[file] = { width, height, variants };
  }

  await writeFile(path.join(assetDirectory, 'image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

for (const file of (await readdir(siteSourceDirectory)).sort()) {
  if (!file.endsWith('.png')) continue;
  await convert(path.join(siteSourceDirectory, file), path.basename(file, '.png'), Number.POSITIVE_INFINITY);
}

const facilitySource = path.join(sourceDirectory, 'facility-safety-original.jpg');
if (await stat(facilitySource).catch(() => null)) {
  await convert(facilitySource, 'facility-safety', facilityMaxWidth);
}

await buildManifest();

const total = (await readdir(assetDirectory))
  .filter((file) => file.endsWith('.webp') || file.endsWith('.avif'));
let bytes = 0;
for (const file of total) bytes += (await stat(path.join(assetDirectory, file))).size;
console.log(`Wrote ${total.length} image files into assets/site (${Math.round(bytes / 1024)} KB).`);
