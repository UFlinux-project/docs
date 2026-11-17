# UFLinux documentation

Public user documentation for the [UFLinux](https://github.com/UFlinux-project) project, built
with [Astro Starlight](https://starlight.astro.build).

- Live site: <https://docs.uflinux.org>
- Content is derived from the developer notes in
  [`UFlinux-project/uflinux3`](https://github.com/UFlinux-project/uflinux3). Every derived page
  links to the exact upstream file it was rewritten from.
- Languages: English (default) and Czech (`/cs/`). Untranslated Czech pages fall back to
  English instead of 404ing.

## Layout

```
astro.config.mjs        site, branding, i18n, Starlight plugins
sidebar.mjs             explicit navigation for both locales
src/content.config.ts   frontmatter schema (adds `source` and `status`)
src/content/docs/       English pages
src/content/docs/cs/    Czech pages, mirrored slugs
src/components/         UpstreamSource.astro, PageTitle.astro (status badge)
src/styles/custom.css   brand tokens and site-wide tweaks
public/                 favicon, logo, _headers, _redirects
```

`status:` in a page's frontmatter (`Supported`, `Experimental`, `Draft`) renders as a badge
above the heading. `source:` records the upstream file and feeds the provenance footer.

## Local development

Node.js 22.23.4 or newer is required (Astro 7 requirement; also pinned in `.node-version`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # type and content check
npm run build    # static site into dist/
npm run preview  # serve the built site
```

Adding a page means adding a matching entry in `sidebar.mjs` (including its Czech label),
otherwise it will not appear in the navigation.

## Deployment

Deployed to **Cloudflare Pages** with *Connect to Git*; Cloudflare runs the build, so there is
no deploy workflow in this repository.

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

Node.js 22.23.4 is the Pages default and satisfies Astro 7; `.node-version` pins it explicitly.
`astro.config.mjs` sets `site` — point it at the Pages domain or your custom domain before the
first deploy, since it drives canonical URLs and the sitemap.

`public/_headers` and `public/_redirects` are copied into `dist/` and read by Pages.

## Licence

GPL-3.0-only, matching the distribution.

## Shared website design

The documentation follows the dark design of https://uflinux.org/, using Ubuntu typography
and the live logo/favicon at https://uflinux.org/assets/logo.svg. Fonts load from Google
Fonts with system-font fallbacks. Header and footer links follow the selected locale.
The English and Czech homepages are documentation hubs; the full original introductions
live at `/introduction/` and `/cs/introduction/`.

Starlight generates the multilingual sitemap index and numbered sitemap files.
`npm run build` also runs `postbuild`, copying the generated index to `/sitemap.xml`.
Both the HTML sitemap link and `robots.txt` advertise this URL. The numbered files and
`/sitemap-index.xml` remain available; the alias updates on every build.

Custom interface icons match uflinux.org: Font Awesome 7.3.1 from cdnjs, using
the same core, solid, and regular stylesheets with integrity hashes. Shared links
use the trailing `arrow-up-right-from-square` icon; artwork/license links stay plain.
Starlight retains its built-in control icons.
