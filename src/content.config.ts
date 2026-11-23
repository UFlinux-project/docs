import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: () =>
				z.object({
					/**
					 * Path of the file in https://github.com/UFlinux-project/uflinux this page was
					 * derived from, used by the provenance footer and by future doc syncs.
					 */
					source: z.string().optional(),
					/** Shown as a badge under the page title, e.g. `Experimental`. */
					status: z.enum(['Supported', 'Experimental', 'Draft']).optional(),
				}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
