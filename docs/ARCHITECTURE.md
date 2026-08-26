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
- visual blocks store width and height and include text, handwriting, image, link/button and decorative shape types
- a future `html` type can be introduced without changing takeover ownership records

The server validates every revision with the shared schema. Client validation exists for fast feedback only.

## Takeover state machine

1. `DRAFT`: anyone can prepare a promo or page locally; authentication is required to save it to an account.
2. `AVAILABLE`: the current generation and authoritative USD price are public.
3. `RESERVED`: one authenticated buyer with a valid draft holds a short checkout reservation.
4. `PAYMENT_PENDING`: a Stripe Checkout Session exists for that reservation.
5. `LIVE`: a verified webhook archives the replaced page, activates the buyer and publishes the validated draft in one transaction. The former owner's last published revision is copied into a new detached draft so they can edit it for a future takeover without changing the archive.
6. `UNDER_REVIEW`: unsafe content is replaced with a neutral platform notice without altering the payment ledger or archive.
7. `OUTBOUGHT`: the former owner has no live-page permission. Their studio opens the detached draft, while the archived snapshot remains read-only.

The browser redirect never grants ownership. Stripe webhook verification, the Firestore transaction and a unique processed-event record are authoritative.

## Required collections

- `users`
- `ownerDrafts` (mutable, private to the account, never used as an archive record)
- `pageState/current`
- `takeovers`
- `checkoutReservations`
- `contentRevisions`
- `pageSnapshots` (append-only rendered content and metadata for every completed reign)
- immutable snapshot assets copied from the live revision so archived pages do not depend on an owner's later uploads or external image URL
- `assets`
- `reports`
- `archiveRemovalRequests`
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
- create a new editable owner draft from the replaced revision without sharing IDs or asset pointers that could mutate the snapshot
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

## Archive immutability and removal

Published snapshot content and takeover metadata are append-only. A former owner cannot edit an archived page into a different page. They can request that public access be removed after authenticating as the owner of that reign.

An approved request changes only the snapshot visibility to `removed`. Public history keeps the takeover number, dates and price, but replaces the page and owner label with a neutral removal notice. The original snapshot remains access-controlled for payment disputes, abuse handling and legal obligations; it is not served publicly.

## Pricing seed and public floor

The public starting price and future decay floor are $5 USD. A separate $1 founder seed price exists only to establish the first owned page before public launch. It must be restricted to the platform owner and must never become the public price authority.

## Delivery milestones

1. Create Firebase project, environments, rules and emulator coverage.
2. Connect the prepared login/create-account routes to Firebase Authentication and add persistent owner drafts.
3. Build the transaction-safe reservation and Stripe webhook flow.
4. Add Storage uploads, scanning hooks and publishing moderation.
5. Add reporting/admin operations.
6. Complete block positioning, responsive authoring and snapshot rendering.
7. Run payment, ownership-race, moderation, accessibility and release verification before connecting the domain.
