<template>
  <section class="removed-snapshot notebook-paper">
    <span aria-hidden="true">×</span>
    <p class="eyebrow">No longer public</p>
    <h1>This page was removed from history.</h1>
    <p>Its former owner asked us to take the page down. The takeover still counts, but the page and owner details are no longer public.</p>
    <NuxtLink class="button button--paper" to="/history">Back to history</NuxtLink>
  </section>
</template>

<style scoped>
.removed-snapshot { display: grid; min-height: 100%; align-content: center; justify-items: start; padding: clamp(3rem, 9vw, 8rem); }
.removed-snapshot > span { display: grid; width: 4rem; aspect-ratio: 1; place-items: center; border: var(--line); border-radius: 50%; background: #ffe1d7; color: #9d2410; font-family: var(--font-display); font-size: 2rem; }
.removed-snapshot h1 { max-width: 13ch; margin: 0.6rem 0 1rem; font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6.5rem); letter-spacing: -0.05em; line-height: 0.96; }
.removed-snapshot p:not(.eyebrow) { max-width: 42rem; margin: 0 0 1.5rem; font-size: 1.1rem; line-height: 1.55; }
</style>
