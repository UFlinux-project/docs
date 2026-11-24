import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ locals, site }) => {
	const route = locals.starlightRoute;
	// The configured icon links replace Starlight's default shortcut icon.
	route.head = route.head.filter(({ tag, attrs }) => !(tag === 'link' && attrs?.rel === 'shortcut icon'));

	const canonical = route.head.find(({ tag, attrs }) => tag === 'link' && attrs?.rel === 'canonical')?.attrs?.href;
	if (!site || typeof canonical !== 'string' || /(?:^|\/)404$/.test(route.id)) return;

	const home = route.id === (route.locale ?? '');
	const websiteId = new URL('#website', site).href;
	const { title, description } = route.entry.data;
	const page = {
		'@type': home ? 'CollectionPage' : 'TechArticle',
		'@id': canonical + (home ? '#webpage' : '#article'),
		url: canonical,
		...(home ? { name: title } : { headline: title, mainEntityOfPage: canonical }),
		description,
		inLanguage: route.entryMeta.lang,
		isPartOf: { '@id': websiteId },
		about: { '@id': 'https://uflinux.org/#software' },
	};
	const graph: object[] = [page];
	if (home && !route.locale) {
		graph.push({
			'@type': 'WebSite',
			'@id': websiteId,
			url: site.href,
			name: route.siteTitle,
			inLanguage: ['en', 'cs'],
		});
	}

	route.head.push({
		tag: 'script',
		attrs: { type: 'application/ld+json' },
		content: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
	});
});
