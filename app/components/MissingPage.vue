<script setup lang="ts">
defineProps<{ unexpected?: boolean }>()
const handleHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-page notebook-paper">
    <SiteHeader />
    <main>
      <span class="error-page__scribble" aria-hidden="true">where did it go?</span>
      <p class="eyebrow">{{ unexpected ? 'That did not work' : '404 · page missing' }}</p>
      <h1>{{ unexpected ? 'We could not open this page.' : 'This page wandered off.' }}</h1>
      <p>{{ unexpected ? 'Try the current page again. Your browser draft will still be there.' : 'The link may be old, or the page may have moved into history.' }}</p>
      <div class="error-page__actions">
        <button class="button" type="button" @click="handleHome">See the current page</button>
        <NuxtLink to="/history">Search the archive</NuxtLink>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.error-page { min-height: 100dvh; border: 5px solid var(--ink); }
.error-page main { position: relative; display: grid; min-height: 65dvh; align-content: center; padding: clamp(3rem, 9vw, 8rem) clamp(1.2rem, 8vw, 7rem); }
.error-page h1 { max-width: 13ch; margin: 0.5rem 0 1rem; font-family: var(--font-display); font-size: clamp(3rem, 8vw, 7rem); letter-spacing: -0.05em; line-height: 0.96; }
.error-page main > p:not(.eyebrow) { max-width: 40rem; margin: 0; font-size: 1.15rem; line-height: 1.55; }
.error-page__scribble { position: absolute; top: 18%; right: 12%; color: #d82179; font-family: var(--font-hand); font-size: clamp(1.2rem, 3vw, 2rem); transform: rotate(6deg); }
.error-page__actions { display: flex; align-items: center; gap: 1.2rem; margin-top: 1.8rem; }
.error-page__actions a { min-height: 44px; padding: 0.75rem 0; font-weight: 900; text-underline-offset: 0.25rem; }
@media (max-width: 600px) { .error-page { border-width: 3px; } .error-page__scribble { display: none; } .error-page__actions { align-items: stretch; flex-direction: column; } .error-page__actions .button { width: 100%; } }
</style>
