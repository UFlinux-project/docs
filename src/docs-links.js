import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Astro renders relative links to other content files verbatim, so
 * `[Settings](./settings.md)` is published as `./settings.md` and 404s.
 *
 * Pages link with a `.md` extension on purpose — that is the form GitHub
 * renders and the form the upstream notes use — so the extension is resolved to
 * the target page's route here instead of being rewritten out of every file.
 *
 * Register as a hast plugin: `markdown: { processor: satteri({ hastPlugins: [docsLinks({ docsRoot })] }) }`.
 *
 * @param {{ docsRoot: string }} options Absolute path to `src/content/docs`.
 */
export function docsLinks({ docsRoot }) {
	const root = path.resolve(docsRoot);

	/** @param {string} abs @returns {string} */
	function routeFor(abs) {
		let rel = path.relative(root, abs).split(path.sep).join('/').replace(/\.mdx?$/i, '');
		if (rel === 'index') rel = '';
		else if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
		return `/${rel ? `${rel}/` : ''}`;
	}

	return ({ fileURL }) => {
		if (!fileURL) return;
		const file = fileURLToPath(fileURL);
		if (!file.startsWith(root + path.sep)) return;
		const pageDir = path.dirname(file);

		return {
			name: 'uflinux-docs-links',
			element: {
				filter: ['a'],
				/** @param {any} node @param {any} ctx */
				visit(node, ctx) {
					const href = node.properties?.href;
					if (typeof href !== 'string') return;
					const [target, ...suffix] = href.split(/(?=[?#])/);
					if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('/')) return;
					if (!/\.(md|mdx)$/i.test(target)) return;
					const abs = path.resolve(pageDir, target);
					if (!abs.startsWith(root + path.sep)) return;
					ctx.setField(node, 'properties', {
						...node.properties,
						href: routeFor(abs) + suffix.join(''),
					});
				},
			},
		};
	};
}
