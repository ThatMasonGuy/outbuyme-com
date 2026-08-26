# Outbuy Me

One public webpage, one owner at a time. Anyone can prepare a quick promo or build a page for free, then pay the current takeover price to put it live. Their content stays up until somebody completes the next takeover.

This repository is the Nuxt 4/TypeScript foundation for `outbuyme.com`.

## Current state

- Public unclaimed-page prototype with permanent takeover chrome
- Always-available owner studio with two publishing paths
- Floating promo postcard with an editable link list
- Block-based page builder with movable text, image and link items
- Permanent archive routes for previous page snapshots
- Server-validated content schemas and URL restrictions
- Indexable product, history and rules routes
- No-index owner studio and reporting route
- Stripe and Firebase configuration placeholders

Payment, authentication, persistent publishing, asset storage and operational reporting are intentionally not represented as complete. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Local setup

Make sure to install dependencies:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The Nuxt development server defaults to `http://127.0.0.1:3000` on Windows.

## Verification

```powershell
npm run verify
```

## Product documentation

- [Product and interface decisions](docs/PRODUCT.md)
- [System architecture and delivery milestones](docs/ARCHITECTURE.md)
- [SEO and indexing boundaries](docs/SEO.md)
