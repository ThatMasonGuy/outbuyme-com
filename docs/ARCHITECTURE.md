# V1 architecture

## Recommended platform

- Nuxt 4 and TypeScript for server-rendered public/product routes and the owner studio
- Firebase Authentication for verified owner identity
- Cloud Firestore for the takeover state machine, content revisions, reports and audit records
- Cloud Storage for moderated owner assets
- Cloud Functions in `australia-southeast1` for checkout reservations, Stripe webhooks, publishing and moderation workflows
- Firebase Hosting or a Nuxt-compatible managed runtime after deployment testing
- Stripe-hosted Checkout for one-time payments

Nuxt is already scaffolded. Firebase and Stripe dependencies/configuration should be activated with their real projects rather than mocked in the public UI.

## Content envelope

`OwnerContent` is a discriminated union:

- `promo`: fast profile/promotion card
- `visual`: block-based editor document containing positioned text, image and link blocks
- a future `html` type can be introduced without changing takeover ownership records

The server validates every revision with the shared schema. Client validation exists for fast feedback only.

## Takeover state machine

1. `DRAFT`: anyone can prepare a promo or page locally; authentication is required to save it to an account.
2. `AVAILABLE`: the current generation and authoritative USD price are public.
3. `RESERVED`: one authenticated buyer with a valid draft holds a short checkout reservation.
4. `PAYMENT_PENDING`: a Stripe Checkout Session exists for that reservation.
5. `LIVE`: a verified webhook archives the replaced page, activates the buyer and publishes the validated draft in one transaction.
6. `UNDER_REVIEW`: unsafe content is replaced with a neutral platform notice without altering the payment ledger or archive.

The browser redirect never grants ownership. Stripe webhook verification, the Firestore transaction and a unique processed-event record are authoritative.

## Required collections

- `users`
- `pageState/current`
- `takeovers`
- `checkoutReservations`
- `contentRevisions`
- `pageSnapshots` (append-only rendered content and metadata for every completed reign)
- immutable snapshot assets copied from the live revision so archived pages do not depend on an owner's later uploads or external image URL
- `assets`
- `reports`
- `moderationActions`
- `processedWebhookEvents`
- `auditEvents`

## Checkout requirements

- calculate price on the server in integer cents
- one active reservation, with rate limiting and expiry
- bind Stripe Session metadata to reservation ID, user ID, generation and price version
- verify the webhook signature against the raw request body
- process events idempotently
- archive the exact replaced content before updating the live page pointer
- never activate ownership from the success URL
- define recovery for expired sessions, duplicate payment and payment completed after the page state changes
- keep refunds and chargebacks visible in the audit ledger

## Reporting and moderation

The public reporting route must write to Firestore through a rate-limited server endpoint, notify moderators and return a case reference. Moderators need a small authenticated console to:

- hide the live revision immediately
- restore the latest safe revision
- inspect reports and content history
- suspend owners
- block assets and destination URLs
- record a reason and actor for every action

No affected person needs to purchase the page to request removal.

## Delivery milestones

1. Create Firebase project, environments, rules and emulator coverage.
2. Add authentication and persistent owner drafts.
3. Build the transaction-safe reservation and Stripe webhook flow.
4. Add Storage uploads, scanning hooks and publishing moderation.
5. Add reporting/admin operations.
6. Complete block positioning, responsive authoring and snapshot rendering.
7. Run payment, ownership-race, moderation, accessibility and release verification before connecting the domain.
