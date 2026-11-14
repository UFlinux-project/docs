import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import { sidebar } from './sidebar.mjs';

export default defineConfig({
	// Replace with the Cloudflare Pages domain (or custom domain) once the project exists.
	site: 'https://docs.uflinux.org',
	output: 'static',
	trailingSlash: 'ignore',
	integrations: [
		// Starlight registers astro-expressive-code, which must be set up before MDX.
		starlight({
			title: {
				en: 'UFLinux Docs',
				cs: 'Dokumentace UFLinux',
			},
			description:
				'Official documentation for UFLinux: a minimal Alpine Linux desktop with labwc and a Windows 10-inspired Ironbar taskbar.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				cs: { label: 'Čeština', lang: 'cs' },
			},
			sidebar,
			logo: {
				src: './src/assets/uflinux-logo.svg',
				alt: 'UFLinux leaf logo',
			},
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
			favicon: '/favicon.svg',
			head: [
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#1f6f4a', media: '(prefers-color-scheme: dark)' },
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				PageTitle: './src/components/PageTitle.astro',
			},
		}),
	],
});
