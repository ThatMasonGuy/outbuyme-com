<template>
  <article class="home-canvas notebook-paper">
    <span class="doodle doodle--one" aria-hidden="true">★</span>
    <span class="doodle doodle--two" aria-hidden="true">mine?</span>
    <div class="home-copy">
      <p class="eyebrow">One page · whoever pays most gets it</p>
      <h1>Make the page.<br><span class="highlighter">Own the moment.</span></h1>
      <p class="home-lead">Build something first. When you’re happy with it, pay <strong>$1 USD</strong> to put it live. It stays yours until somebody pays more.</p>
      <div class="home-actions">
        <NuxtLink class="button" to="/studio">Make your page <span aria-hidden="true">→</span></NuxtLink>
        <NuxtLink to="/how-it-works">How it works</NuxtLink>
      </div>
    </div>
    <div class="bid-notes" aria-label="Takeover price path">
      <span class="bid-note bid-note--past">Start<br><strong>$1</strong></span>
      <span class="bid-arrow" aria-hidden="true">→</span>
      <span class="bid-note">Next<br><strong>$5</strong></span>
      <span class="bid-arrow" aria-hidden="true">→</span>
      <span class="bid-note bid-note--pink">Then<br><strong>+$5</strong></span>
    </div>
  </article>
</template>

<style scoped>
.home-canvas { position: relative; display: grid; height: 100%; min-height: 0; align-items: center; overflow: hidden; padding: clamp(1.3rem, 5vw, 5rem) clamp(1.2rem, 7vw, 7rem); }
.home-copy { position: relative; z-index: 2; max-width: 72rem; }
.home-copy > * { animation: note-arrive 430ms both cubic-bezier(.2,.75,.25,1); }
.home-copy > h1 { animation-delay: 55ms; }
.home-copy > .home-lead { animation-delay: 110ms; }
.home-copy > .home-actions { animation-delay: 165ms; }
h1 { max-width: 14ch; margin: 0.45rem 0 1rem; font-family: var(--font-display); font-size: clamp(3rem, 8.5vw, 8rem); letter-spacing: -0.055em; line-height: 0.95; }
.home-lead { max-width: 43rem; margin: 0; font-size: clamp(0.95rem, 1.7vw, 1.3rem); line-height: 1.45; }
.home-actions { display: flex; align-items: center; gap: 1.25rem; margin-top: clamp(1.1rem, 3vh, 2rem); }
.home-actions > a:not(.button) { min-height: 44px; padding: 0.75rem 0; font-weight: 900; text-underline-offset: 0.25rem; }
.bid-notes { position: absolute; right: clamp(1.2rem, 5vw, 5rem); bottom: clamp(1.3rem, 4vw, 3rem); display: flex; align-items: center; gap: clamp(0.4rem, 1.2vw, 1rem); transform: rotate(-2deg); animation: placed-down 500ms 240ms both cubic-bezier(.2,.75,.25,1); }
.bid-note { display: grid; width: clamp(62px, 7vw, 92px); aspect-ratio: 1; place-items: center; border: var(--line); border-radius: 0.3rem; background: var(--yellow); box-shadow: 3px 3px 0 var(--ink); font-family: var(--font-hand); line-height: 1; text-align: center; }
.bid-note strong { font-family: var(--font-display); font-size: clamp(1.3rem, 2.5vw, 2.2rem); }
.bid-note--past { background: white; }
.bid-note--pink { background: #ffd4e8; }
.bid-arrow { font-family: var(--font-hand); font-size: 1.5rem; }
.doodle { position: absolute; z-index: 1; font-family: var(--font-hand); pointer-events: none; }
.doodle--one { top: 9%; right: 8%; color: var(--pink); font-size: clamp(3rem, 8vw, 7rem); transform: rotate(12deg); }
.doodle--two { right: 16%; bottom: 34%; font-size: clamp(1rem, 2vw, 1.5rem); transform: rotate(8deg); }
@media (max-height: 700px) and (min-width: 701px) {
  h1 { font-size: clamp(2.8rem, 7vw, 6rem); }
  .bid-notes { bottom: 1rem; }
}
@media (max-width: 700px) {
  .home-canvas { align-items: start; padding: 2rem 1.25rem 1rem; }
  h1 { font-size: clamp(2.6rem, 13vw, 4.8rem); }
  .home-actions { align-items: stretch; flex-direction: column; gap: 0.3rem; }
  .home-actions .button { width: 100%; }
  .bid-notes { right: auto; bottom: 1.1rem; left: 1.25rem; }
  .doodle--one { top: 1rem; right: 1rem; font-size: 2.7rem; }
  .doodle--two { display: none; }
}
@media (max-width: 380px), (max-height: 720px) {
  .bid-notes { display: none; }
}
@media (prefers-reduced-motion: reduce) { .home-copy > *, .bid-notes { animation: none; } }
</style>
