# SEO and indexing boundaries

## Indexable platform routes

- `/`
- `/about`
- `/how-it-works`
- `/history`
- `/history/founding-page`
- `/rules`

The owner studio is `noindex, nofollow`. Reporting is `noindex, follow`. Authentication, checkout and administration routes must also be excluded.

## Stable identity

Owner content cannot control the document title, metadata, canonical URL, structured data or platform headings. The homepage provides stable Outbuy Me identity and `WebSite` JSON-LD while the canvas changes.

## User links

Every owner-provided link is emitted with:

```html
rel="sponsored ugc nofollow noopener noreferrer"
```

Links are validated as public `http` or `https` destinations. URL reputation and redirect checks belong in the publishing pipeline. The product does not promise backlinks or ranking value.

## History

The public history begins with the preserved founding page, then lists every completed reign and links to an immutable page snapshot. Each paid snapshot records its takeover number, price, dates, owner label and exact published content. Snapshots remain subject to moderation and legal removal requirements; preservation does not mean unsafe content must stay publicly accessible.

## Launch work

- add real Open Graph image generation from the safe current revision
- validate canonical and structured data output
- submit the sitemap through Google Search Console and Bing Webmaster Tools
- monitor branded and descriptive queries without generating search-first filler pages
- earn coverage through the changing canvas, ownership history and shareable reign cards
