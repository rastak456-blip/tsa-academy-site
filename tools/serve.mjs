import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));

// --root lets a second instance serve another checkout, so two builds can run side by side.
function readOption(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

const distributionRoot = path.resolve(readOption('root') ?? path.join(toolDirectory, '..', 'dist'));
const port = Number(readOption('port') || process.env.PORT || 4173);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.json': 'application/json; charset=utf-8',
};

http
  .createServer(async (request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let filePath = path.join(distributionRoot, requestPath);

    try {
      if ((await stat(filePath)).isDirectory()) filePath = path.join(filePath, 'index.html');
    } catch {
      response.writeHead(404).end('Not found');
      return;
    }

    response.writeHead(200, { 'content-type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
    createReadStream(filePath).pipe(response);
  })
  .listen(port, () => console.log(`Preview server running on http://localhost:${port}`));
