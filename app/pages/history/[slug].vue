<script setup lang="ts">
import { findHistoryEntry } from '~/data/history'

const route = useRoute()
const slug = String(route.params.slug)
const isFoundingPage = slug === 'founding-page'
const entry = findHistoryEntry(slug)

if (!isFoundingPage && !entry) throw createError({ statusCode: 404, statusMessage: 'Archived page not found' })

const archiveTitle = isFoundingPage ? 'The founding page' : `Page #${entry!.takeoverNumber} by ${entry!.ownerName}`
const archiveMeta = isFoundingPage ? 'Chapter zero · before owner #1' : `$${entry!.priceUsd} USD · ${entry!.ownerName}`

useSeoMeta({
  title: `${archiveTitle} — Outbuy Me history`,
  description: isFoundingPage ? 'The original Outbuy Me page, preserved before the first takeover.' : `An archived Outbuy Me page held by ${entry!.ownerName} for $${entry!.priceUsd} USD.`,
})
useHead({ link: [{ rel: 'canonical', href: `https://outbuyme.com/history/${slug}` }] })
</script>

<template>
  <div class="archive-page">
    <header class="archive-bar">
      <NuxtLink to="/history">← All history</NuxtLink>
      <div><p>{{ archiveTitle }}</p><span>{{ archiveMeta }}</span></div>
      <NuxtLink to="/">See the live page ↗</NuxtLink>
    </header>
    <main>
      <HomeCanvas v-if="isFoundingPage" />
      <PromoCard v-else-if="entry?.content.type === 'promo'" :content="entry.content" />
      <VisualCanvas v-else-if="entry" :content="entry.content" />
    </main>
  </div>
</template>

<style scoped>
.archive-page { display: grid; height: 100dvh; overflow: hidden; grid-template-rows: auto minmax(0, 1fr); }
.archive-bar { position: relative; z-index: 10; display: grid; min-height: 64px; align-items: center; border-bottom: var(--line); background: var(--paper); gap: 1rem; grid-template-columns: 1fr auto 1fr; padding: 0.55rem 1rem; font-size: 0.78rem; font-weight: 900; }
.archive-bar::after { position: absolute; bottom: -0.35rem; left: 46%; width: 6rem; height: 0.7rem; background: var(--pink); content: ''; transform: rotate(-1deg); }
.archive-bar > div { text-align: center; }
.archive-bar p { margin: 0; }
.archive-bar span { display: block; margin-top: 0.15rem; color: var(--muted); font-family: var(--font-hand); font-size: 0.72rem; font-weight: 400; }
.archive-bar > a:last-child { justify-self: end; }
.archive-page main { min-height: 0; overflow: auto; }
@media (max-width: 650px) {
  .archive-bar { min-height: 88px; grid-template-columns: 1fr 1fr; }
  .archive-bar > div { order: 3; grid-column: 1 / -1; text-align: left; }
  .archive-bar > a:last-child { justify-self: end; }
}
</style>
