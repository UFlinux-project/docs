import path from 'node:path';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';

import { docsLinks } from './src/docs-links.js';
import { sidebar } from './sidebar.mjs';

const fontAwesome = [
	['fontawesome', 'sha384-m8DKa0MtZAZlyNgF18TSkQRYTPDY0sEELpwK2YijfYnVFH8kxiaO6hvopM168nue'],
	['solid', 'sha384-p/nJzgOJxEnSeUkMQ0nk5oPsUT5x8eOWi6pxU2ls9qcO9B78dCvZk0JSAOXWXUQN'],
].map(([name, integrity]) => ({
	tag: 'link',
	attrs: {
		id: `fa-${name}`,
		rel: 'stylesheet',
		href: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/${name}.min.css`,
		integrity,
		crossorigin: 'anonymous',
		referrerpolicy: 'no-referrer',
		media: 'print',
		onload: "this.onload=null; this.media='all';",
	},
}));

export default defineConfig({
	site: 'https://docs.uflinux.org',
	output: 'static',
	trailingSlash: 'ignore',
	markdown: {
		processor: satteri({
			hastPlugins: [docsLinks({ docsRoot: path.resolve('./src/content/docs') })],
		}),
	},
	integrations: [
		// Starlight registers astro-expressive-code, which must be set up before MDX.
		starlight({
			title: {
				en: 'UFLinux Docs',
				cs: 'Dokumentace UFLinux',
			},
			description:
				'Official documentation for UFLinux: a minimal Alpine Linux desktop with labwc.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				cs: { label: 'Čeština', lang: 'cs' },
			},
			sidebar,
			// Starlight appends the entry path relative to the repo root, e.g.
			// `src/content/docs/desktop/overview.mdx`.
			editLink: {
				baseUrl: 'https://github.com/UFlinux-project/docs/edit/main/',
			},
			social: [
				{
					icon: 'github',
					label: 'UFlinux on GitHub',
					href: 'https://github.com/UFlinux-project',
				},
			],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			routeMiddleware: './src/favicon-middleware.ts',
			credits: false,
			head: [
				{ tag: 'link', attrs: { rel: 'icon', href: 'https://uflinux.org/favicon.ico', type: 'image/vnd.microsoft.icon', sizes: '32x32' } },
				{ tag: 'link', attrs: { rel: 'icon', href: 'https://uflinux.org/favicon.png', type: 'image/png', sizes: '32x32' } },
				{ tag: 'link', attrs: { rel: 'icon', href: 'https://uflinux.org/favicon.svg', type: 'image/svg+xml', sizes: 'any' } },
				...fontAwesome,
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap' } },
				{ tag: 'link', attrs: { rel: 'sitemap', href: '/sitemap.xml' } },
				{ tag: 'meta', attrs: { name: 'color-scheme', content: 'dark' } },
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#191919' },
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/Header.astro',
				Footer: './src/components/Footer.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				PageTitle: './src/components/PageTitle.astro',
			},
		}),
	],
});
