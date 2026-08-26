<template>
  <footer class="site-footer">
    <div class="site-footer__brand">
      <BrandMark />
      <p>The page changes hands. The archive keeps the receipts.</p>
    </div>
    <nav aria-label="Footer navigation">
      <NuxtLink to="/">Current page</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/studio">Make a page</NuxtLink>
      <NuxtLink to="/history">History</NuxtLink>
      <NuxtLink to="/rules">Rules</NuxtLink>
      <NuxtLink to="/report">Report content</NuxtLink>
    </nav>
    <p class="site-footer__note">One page. One owner. Until somebody pays more.</p>
  </footer>
</template>

<style scoped>
.site-footer { position: relative; display: grid; align-items: end; border-top: var(--line); background: var(--ink); color: white; gap: 2rem; grid-template-columns: 1.1fr 1fr; padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 6vw, 5rem) 1.4rem; }
.site-footer::before { position: absolute; top: -0.55rem; left: 12%; width: 8rem; height: 1.1rem; background: var(--pink); content: ''; transform: rotate(-1deg); }
.site-footer__brand { display: grid; gap: 1rem; }
.site-footer__brand p { max-width: 28rem; margin: 0; color: #d7d1c6; font-family: var(--font-hand); font-size: clamp(1rem, 2vw, 1.35rem); }
.site-footer nav { display: grid; justify-self: end; gap: 0.35rem 1.5rem; grid-template-columns: repeat(2, auto); }
.site-footer nav a { min-height: 40px; padding: 0.55rem 0; font-size: 0.82rem; font-weight: 900; text-underline-offset: 0.25rem; }
.site-footer__note { margin: 0; color: #bcb6ab; font-size: 0.7rem; grid-column: 1 / -1; letter-spacing: 0.06em; text-transform: uppercase; }
@media (max-width: 680px) { .site-footer { grid-template-columns: 1fr; } .site-footer nav { justify-self: stretch; } }
</style>
