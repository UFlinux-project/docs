import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ locals }) => {
	const route = locals.starlightRoute;
	// The configured icon links replace Starlight's default shortcut icon.
	route.head = route.head.filter(({ tag, attrs }) => !(tag === 'link' && attrs?.rel === 'shortcut icon'));
});
