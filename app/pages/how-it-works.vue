<script setup lang="ts">
useSeoMeta({
  title: 'How it works — Outbuy Me',
  description: 'Buy control of one public webpage, replace what is on it and keep it until somebody outbuys you.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://outbuyme.com/how-it-works' }] })
</script>

<template>
  <ContentPage
    accent="pink"
    eyebrow="Three steps, one page"
    title="Make it. Buy it. Get outbought."
    lead="Build your page before you spend anything. Pay the current price when it is ready, then keep it live until somebody pays more."
  >
    <ol class="game-steps">
      <li><span>01</span><div><strong>Make a draft</strong><p>Use the quick promo or build the page yourself. Drafting is free.</p></div></li>
      <li><span>02</span><div><strong>Put it live</strong><p>Pay the displayed price. Public takeovers start at $5 USD.</p></div></li>
      <li><span>03</span><div><strong>Hold the page</strong><p>Change it whenever you like, until somebody completes the next takeover.</p></div></li>
    </ol>

    <section class="plain-note">
      <p class="eyebrow">The important bit</p>
      <h2>You control the page. You do not own Outbuy Me.</h2>
      <p>Your payment gives you temporary control of everything inside the permanent frame. You do not own the domain and you do not earn money from later takeovers.</p>
    </section>

    <h2>Pick the amount of effort</h2>
    <p><strong>Quick promo</strong> gives you a postcard with a photo, a message and your links. <strong>Build a page</strong> gives you a blank canvas for text, images and links. You can switch between them while you own the page.</p>

    <h2>What happens when you lose it?</h2>
    <p>Your finished page moves into the public archive with its takeover number and price. The new owner gets the live page. You can leave your old page public or request its removal.</p>

    <div class="page-actions"><NuxtLink class="button" to="/studio">Start a free draft</NuxtLink><NuxtLink to="/history">Browse the archive</NuxtLink></div>
  </ContentPage>
</template>

<style scoped>
.game-steps { display: grid; gap: 1rem; list-style: none; margin: 0 0 4rem; padding: 0; }
.game-steps li { display: grid; align-items: center; border-bottom: var(--line); gap: 1rem; grid-template-columns: auto 1fr; padding: 1.2rem 0.5rem; }
.game-steps li:nth-child(2) { transform: translateX(1rem); }
.game-steps li > span { display: grid; width: 3.3rem; aspect-ratio: 1; place-items: center; border: var(--line); border-radius: 50%; background: var(--yellow); font-family: var(--font-hand); font-weight: 900; }
.game-steps li:nth-child(2) > span { background: #ffe2f1; }
.game-steps li:nth-child(3) > span { background: #dceaff; }
.game-steps strong { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.5rem); }
.game-steps p { margin: 0.25rem 0 0; }
.plain-note { position: relative; border: var(--line); background: #fff; box-shadow: var(--shadow); margin: 0 0 4rem; padding: clamp(1.5rem, 4vw, 2.8rem); transform: rotate(-0.4deg); }
.plain-note::before { position: absolute; top: -1rem; left: 38%; width: 7rem; height: 1.8rem; background: rgba(233,255,104,.78); content: ''; transform: rotate(2deg); }
.plain-note h2 { margin-top: 0.5rem !important; }
.page-actions { display: flex; align-items: center; gap: 1.2rem; margin-top: 2rem; }
.page-actions > a:not(.button) { min-height: 44px; padding: 0.75rem 0; font-weight: 900; }
@media (max-width: 600px) { .game-steps li:nth-child(2) { transform: none; } .page-actions { align-items: stretch; flex-direction: column; } .page-actions .button { width: 100%; } }
</style>
