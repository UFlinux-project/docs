import { copyFile } from 'node:fs/promises';
// Reuse Starlight's generated index so all locale links and future chunks stay current.
await copyFile(new URL('../dist/sitemap-index.xml', import.meta.url), new URL('../dist/sitemap.xml', import.meta.url));
