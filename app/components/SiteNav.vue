<script setup lang="ts">
defineProps<{ compact?: boolean }>()

const links = [
  { to: '/about', label: 'About' },
  { to: '/studio', label: 'Make a page' },
  { to: '/history', label: 'History' },
  { to: '/rules', label: 'Rules' },
  { to: '/report', label: 'Report' },
]
</script>

<template>
  <nav class="desktop-nav" :class="{ 'desktop-nav--compact': compact }" aria-label="Primary navigation">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
  </nav>

  <details class="mobile-nav" :class="{ 'mobile-nav--compact': compact }">
    <summary>Menu <span aria-hidden="true">＋</span></summary>
    <nav aria-label="Mobile navigation">
      <NuxtLink to="/">Current page</NuxtLink>
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
    </nav>
  </details>
</template>

<style scoped>
.desktop-nav { display: flex; align-items: center; gap: clamp(0.9rem, 2vw, 1.8rem); font-size: 0.76rem; font-weight: 900; letter-spacing: 0.035em; text-transform: uppercase; }
.desktop-nav a { position: relative; min-height: 40px; padding: 0.65rem 0; text-decoration: none; }
.desktop-nav a::after { position: absolute; right: 0; bottom: 0.3rem; left: 0; height: 0.22rem; background: var(--pink); content: ''; transform: scaleX(0) rotate(-1deg); transform-origin: left; transition: transform 150ms ease; }
.desktop-nav a:hover::after, .desktop-nav a:focus-visible::after, .desktop-nav a.router-link-active::after { transform: scaleX(1) rotate(-1deg); }
.desktop-nav--compact { font-size: 0.7rem; }
.mobile-nav { position: relative; display: none; }
.mobile-nav summary { display: flex; min-width: 76px; min-height: 44px; align-items: center; justify-content: center; border: var(--line); border-radius: 0.3rem; background: var(--yellow); gap: 0.35rem; font-size: 0.78rem; font-weight: 900; list-style: none; text-transform: uppercase; }
.mobile-nav summary::-webkit-details-marker { display: none; }
.mobile-nav summary span { font-size: 1rem; transition: transform 160ms ease; }
.mobile-nav[open] summary span { transform: rotate(45deg); }
.mobile-nav nav { position: absolute; z-index: 80; top: calc(100% + 0.55rem); right: 0; display: grid; width: min(18rem, calc(100vw - 2rem)); border: var(--line); background: var(--paper); box-shadow: 6px 6px 0 var(--ink); padding: 0.55rem; }
.mobile-nav nav::before { position: absolute; top: -0.65rem; right: 2rem; width: 4.5rem; height: 1.3rem; background: rgba(233, 255, 104, 0.82); content: ''; transform: rotate(2deg); }
.mobile-nav nav a { min-height: 44px; border-bottom: 1px dashed #aaa394; padding: 0.75rem; font-weight: 900; text-decoration: none; }
.mobile-nav nav a:last-child { border-bottom: 0; }
.mobile-nav nav a:hover, .mobile-nav nav a:focus-visible { background: #ffe2f1; }
@media (max-width: 790px) { .desktop-nav { display: none; } .mobile-nav { display: block; } }
@media (prefers-reduced-motion: reduce) { .desktop-nav a::after, .mobile-nav summary span { transition: none; } }
</style>
