<script setup lang="ts">
useSeoMeta({
  title: 'About Outbuy Me — Make the page, until somebody pays more',
  description: 'Outbuy Me is one public page that anyone can redesign, own for a while, and lose when somebody pays more.',
  ogTitle: 'Outbuy Me — One page, passed around the internet',
  ogDescription: 'Make a page, put it live, and keep it until somebody outbuys you.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://outbuyme.com/about' }] })
</script>

<template>
  <div class="about-page-root">
    <a class="skip-link" href="#main-content">Skip to the story</a>
    <div class="about-shell notebook-paper">
      <SiteHeader />
      <main id="main-content">
      <section class="about-hero">
        <span class="about-hero__star" aria-hidden="true">★</span>
        <span class="about-hero__note" aria-hidden="true">pass it on →</span>
        <p class="eyebrow">One page, passed around the internet</p>
        <h1>Make it yours.<br><span class="highlighter">For a while.</span></h1>
        <p>Outbuy Me has one public page and one current owner. Build what you want, pay the current price, and keep the page until somebody pays more.</p>
        <div class="about-hero__actions">
          <NuxtLink class="button" to="/studio">Start a free draft <span aria-hidden="true">→</span></NuxtLink>
          <NuxtLink to="/">See the page now</NuxtLink>
        </div>
      </section>

      <section class="price-story" aria-labelledby="price-story-title">
        <div>
          <p class="eyebrow">The price has a floor</p>
          <h2 id="price-story-title">Someone will always want to write over you.</h2>
          <p>Takeovers start at $5 USD. Every successful takeover pushes the price up. When price decay arrives, it may drift down while the page sits—but never below $5.</p>
        </div>
        <div class="price-notes" aria-label="The public price starts at five dollars, rises after a takeover and never falls below five dollars">
          <span>$5<small>floor</small></span><i aria-hidden="true">→</i><span>+$5<small>outbought</small></span><i aria-hidden="true">→</i><span>$5<small>minimum</small></span>
        </div>
      </section>

      <section class="ways" aria-labelledby="ways-title">
        <header><p class="eyebrow">Two ways in</p><h2 id="ways-title">Post something quick or take over the whole canvas.</h2></header>
        <article class="ways__promo">
          <span aria-hidden="true" class="ways__tape" />
          <p class="eyebrow">Quick promo</p>
          <h3>A postcard for your corner of the web.</h3>
          <p>Add a photo, a short message and a pile of links. It is the fast route for a profile, launch, joke or shameless plug.</p>
          <NuxtLink to="/studio">Make a promo →</NuxtLink>
        </article>
        <article class="ways__builder">
          <div class="ways__tools" aria-hidden="true"><span>T</span><span>▧</span><span>↗</span></div>
          <p class="eyebrow">Page builder</p>
          <h3>Move the pieces yourself.</h3>
          <p>Drop in text, images and links. Move them around, resize them and build a page that does not look like anybody else’s.</p>
          <NuxtLink to="/studio">Build a page →</NuxtLink>
        </article>
      </section>

      <section class="kept" aria-labelledby="kept-title">
        <span class="kept__scribble" aria-hidden="true">nothing gets binned</span>
        <div><p class="eyebrow">After you get outbought</p><h2 id="kept-title">Your page moves into history.</h2></div>
        <p>Finished pages move into the archive. Former owners can ask us to remove their page and public owner details; the takeover still remains part of the count.</p>
        <NuxtLink class="button button--paper" to="/history">Open the archive</NuxtLink>
      </section>
      </main>
      <SiteFooter />
    </div>
  </div>
</template>

<style scoped>
.about-page-root { min-height: 100dvh; }
.about-shell { min-height: 100dvh; border: 5px solid var(--ink); }
.about-hero { position: relative; display: grid; min-height: min(760px, calc(100dvh - var(--header-height))); align-content: center; overflow: hidden; padding: clamp(3rem, 9vw, 8rem) clamp(1.2rem, 8vw, 7rem); }
.about-hero h1 { max-width: 13ch; margin: 0.5rem 0 1.25rem; font-family: var(--font-display); font-size: clamp(3.3rem, 9vw, 8.4rem); letter-spacing: -0.055em; line-height: 0.94; }
.about-hero > *:not(.about-hero__star):not(.about-hero__note) { animation: note-arrive 450ms both cubic-bezier(.2,.75,.25,1); }
.about-hero > h1 { animation-delay: 55ms; }
.about-hero > p:not(.eyebrow) { animation-delay: 110ms; }
.about-hero__actions { animation-delay: 165ms !important; }
.about-hero > p:not(.eyebrow) { max-width: 47rem; margin: 0; font-size: clamp(1rem, 2vw, 1.35rem); line-height: 1.5; }
.about-hero__actions { display: flex; align-items: center; gap: 1.2rem; margin-top: 1.8rem; }
.about-hero__actions > a:not(.button) { min-height: 44px; padding: 0.75rem 0; font-weight: 900; text-underline-offset: 0.25rem; }
.about-hero__star { position: absolute; top: 16%; right: 9%; color: var(--pink); font-size: clamp(4rem, 10vw, 9rem); transform: rotate(8deg); }
.about-hero__note { position: absolute; right: 13%; bottom: 18%; font-family: var(--font-hand); font-size: clamp(1rem, 2.5vw, 1.8rem); transform: rotate(-6deg); }
.price-story { display: grid; align-items: center; border-block: var(--line); background: #dceaff; gap: 3rem; grid-template-columns: 1.1fr 0.9fr; padding: clamp(3rem, 7vw, 6rem) clamp(1.2rem, 8vw, 7rem); }
.price-story h2, .ways h2, .kept h2 { max-width: 15ch; margin: 0.45rem 0 1rem; font-family: var(--font-display); font-size: clamp(2.5rem, 5.5vw, 5.2rem); letter-spacing: -0.045em; line-height: 0.98; }
.price-story p { max-width: 42rem; line-height: 1.55; }
.price-notes { display: flex; align-items: center; justify-content: center; gap: clamp(0.45rem, 1.5vw, 1rem); transform: rotate(-2deg); }
.price-notes span { display: grid; width: clamp(74px, 9vw, 118px); aspect-ratio: 1; place-items: center; border: var(--line); background: var(--yellow); box-shadow: var(--shadow); font-family: var(--font-display); font-size: clamp(1.7rem, 3vw, 2.8rem); }
.price-notes span:nth-of-type(2) { background: #ffe2f1; transform: translateY(-1rem) rotate(2deg); }
.price-notes span:nth-of-type(3) { background: #fff; transform: rotate(2deg); }
.price-notes small { font-family: var(--font-hand); font-size: 0.75rem; font-weight: 400; }
.price-notes i { font-family: var(--font-hand); font-size: 1.5rem; font-style: normal; }
.ways { display: grid; gap: 1.5rem; grid-template-columns: repeat(2, minmax(0, 1fr)); padding: clamp(3rem, 8vw, 7rem) clamp(1.2rem, 8vw, 7rem); }
.ways > header { grid-column: 1 / -1; margin-bottom: 1rem; }
.ways article { position: relative; min-height: 26rem; border: var(--line); box-shadow: var(--shadow); padding: clamp(1.5rem, 4vw, 3rem); }
.ways article h3 { max-width: 12ch; margin: 0.5rem 0 1rem; font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.8rem); letter-spacing: -0.04em; line-height: 1; }
.ways article p:not(.eyebrow) { max-width: 36rem; line-height: 1.55; }
.ways article a { position: absolute; bottom: 2rem; left: clamp(1.5rem, 4vw, 3rem); min-height: 44px; font-weight: 900; text-underline-offset: 0.25rem; }
.ways__promo { background: #ffe2f1; transform: rotate(-0.7deg); }
.ways__builder { background: #f6ffb4; transform: rotate(0.6deg); }
.ways__tape { position: absolute; top: -1rem; left: 38%; width: 7rem; height: 2rem; background: rgba(233,255,104,.78); transform: rotate(3deg); }
.ways__tools { display: flex; justify-content: flex-end; gap: 0.5rem; }
.ways__tools span { display: grid; width: 3rem; aspect-ratio: 1; place-items: center; border: 1px dashed var(--ink); background: #fff; font-family: var(--font-display); }
.kept { position: relative; display: grid; align-items: center; border-top: var(--line); background: var(--ink); color: white; gap: 1.5rem 3rem; grid-template-columns: 1.1fr 0.9fr; padding: clamp(3rem, 8vw, 7rem) clamp(1.2rem, 8vw, 7rem); }
.kept p { max-width: 42rem; color: #ddd7cc; line-height: 1.55; }
.kept .button { justify-self: start; }
.kept__scribble { position: absolute; top: 2rem; right: 8%; color: var(--yellow); font-family: var(--font-hand); transform: rotate(5deg); }
@media (max-width: 760px) {
  .about-shell { border-width: 3px; }
  .about-hero { min-height: 620px; align-content: start; padding-top: 4rem; }
  .about-hero__actions { align-items: stretch; flex-direction: column; }
  .about-hero__actions .button { width: 100%; }
  .about-hero__star { top: 1.2rem; right: 1.2rem; font-size: 3.2rem; }
  .about-hero__note { display: none; }
  .price-story, .kept, .ways { grid-template-columns: 1fr; }
  .price-notes { justify-content: flex-start; }
  .ways > header { grid-column: 1; }
  .ways article { min-height: 25rem; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .about-hero > * { animation: none !important; } }
</style>
