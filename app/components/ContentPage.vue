<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lead: string
  accent?: 'yellow' | 'pink' | 'blue' | 'orange'
}>()
</script>

<template>
  <div class="content-page-root">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="content-shell notebook-paper" :class="`content-shell--${accent || 'yellow'}`">
      <SiteHeader />
      <main id="main-content">
        <header class="content-hero">
          <span class="content-hero__tape" aria-hidden="true" />
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1>{{ title }}</h1>
          <p>{{ lead }}</p>
        </header>
        <div class="content-body">
          <slot />
        </div>
      </main>
      <SiteFooter />
    </div>
  </div>
</template>

<style scoped>
.content-page-root { min-height: 100dvh; }
.content-shell {
  min-height: 100vh;
  border: 5px solid var(--ink);
  background-color: var(--paper);
}

.content-hero {
  position: relative;
  border-bottom: var(--line);
  background: rgba(246, 255, 180, 0.82);
  padding: clamp(2.5rem, 7vw, 6rem) clamp(1rem, 7vw, 7rem);
}

.content-shell--pink .content-hero { background: rgba(255, 226, 241, 0.88); }
.content-shell--blue .content-hero { background: rgba(220, 234, 255, 0.9); }
.content-shell--orange .content-hero { background: rgba(255, 225, 215, 0.9); }
.content-hero__tape { position: absolute; top: 2rem; right: 8%; width: clamp(5rem, 10vw, 9rem); height: 2rem; background: rgba(255, 116, 186, 0.66); transform: rotate(4deg); }
.content-shell--pink .content-hero__tape { background: rgba(233, 255, 104, 0.82); transform: rotate(-3deg); }
.content-shell--blue .content-hero__tape { background: rgba(255, 112, 72, 0.68); }

.content-hero h1 {
  max-width: 15ch;
  margin: 0.4rem 0 1.2rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6.8rem);
  letter-spacing: -0.04em;
  line-height: 0.96;
  overflow-wrap: anywhere;
}

.content-hero > p:last-child {
  max-width: 50rem;
  margin: 0;
  font-size: clamp(1.05rem, 2.1vw, 1.45rem);
  line-height: 1.45;
}

.content-body {
  width: min(100% - 2rem, 76rem);
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 6rem) 0;
}

.content-body :deep(h2) {
  margin: 2.8rem 0 0.7rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 0.95;
}

.content-body :deep(h2:first-child) {
  margin-top: 0;
}

.content-body :deep(p),
.content-body :deep(li) {
  max-width: 52rem;
  font-size: 1.05rem;
  line-height: 1.65;
}

.content-body :deep(a) {
  font-weight: 900;
  text-underline-offset: 0.25rem;
}

.content-body :deep(.steps) {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  margin: 2rem 0;
  padding: 0;
}

.content-body :deep(.steps li) {
  border: var(--line);
  background: white;
  box-shadow: var(--shadow);
  padding: 1.3rem;
}

.content-body :deep(.steps strong) {
  display: block;
  margin-bottom: 0.6rem;
  font-family: var(--font-display);
  font-size: 2rem;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .content-shell {
    border-width: 3px;
  }

  .content-body :deep(.steps) {
    grid-template-columns: 1fr;
  }

}
</style>
