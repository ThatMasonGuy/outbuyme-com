<script setup lang="ts">
import { findHistoryEntry } from '~/data/history'

const route = useRoute()
const slug = String(route.params.slug)
const isFoundingPage = slug === 'founding-page'
const entry = findHistoryEntry(slug)

if (!isFoundingPage && !entry) throw createError({ statusCode: 404, statusMessage: 'Archived page not found' })

const isRemoved = entry?.visibility === 'removed'
const archiveTitle = isFoundingPage ? 'The founding page' : isRemoved ? 'Page removed' : `Page #${entry!.takeoverNumber} by ${entry!.ownerName}`
const archiveMeta = isFoundingPage ? 'Chapter zero · before owner #1' : isRemoved ? `Takeover #${entry!.takeoverNumber}` : `$${entry!.priceUsd} USD · ${entry!.ownerName}`

useSeoMeta({
  title: `${archiveTitle} — Outbuy Me history`,
  description: isFoundingPage ? 'The original Outbuy Me page, preserved before the first takeover.' : isRemoved ? 'This archived Outbuy Me page is no longer public.' : `An archived Outbuy Me page held by ${entry!.ownerName} for $${entry!.priceUsd} USD.`,
  robots: isRemoved ? 'noindex, follow' : 'index, follow',
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
      <RemovedSnapshotNotice v-else-if="isRemoved" />
      <PromoCard v-else-if="entry?.content.type === 'promo'" :content="entry.content" />
      <VisualCanvas v-else-if="entry" :content="entry.content" />
    </main>
    <footer v-if="entry && !isRemoved" class="archive-owner-actions"><span>Want your old page taken down?</span><NuxtLink :to="`/history/${slug}/request-removal`">Request removal</NuxtLink></footer>
  </div>
</template>

<style scoped>
.archive-page { display: grid; height: 100dvh; overflow: hidden; grid-template-rows: auto minmax(0, 1fr) auto; }
.archive-bar { position: relative; z-index: 10; display: grid; min-height: 64px; align-items: center; border-bottom: var(--line); background: var(--paper); gap: 1rem; grid-template-columns: 1fr auto 1fr; padding: 0.55rem 1rem; font-size: 0.78rem; font-weight: 900; }
.archive-bar::after { position: absolute; bottom: -0.35rem; left: 46%; width: 6rem; height: 0.7rem; background: var(--pink); content: ''; transform: rotate(-1deg); }
.archive-bar > div { text-align: center; }
.archive-bar p { margin: 0; }
.archive-bar span { display: block; margin-top: 0.15rem; color: var(--muted); font-family: var(--font-hand); font-size: 0.72rem; font-weight: 400; }
.archive-bar > a:last-child { justify-self: end; }
.archive-page main { min-height: 0; overflow: auto; }
.archive-owner-actions { display: flex; min-height: 46px; align-items: center; justify-content: center; border-top: var(--line); background: #fffefa; gap: 0.6rem; padding: 0.55rem 1rem; font-size: 0.78rem; }
.archive-owner-actions a { font-weight: 900; }
@media (max-width: 650px) { .archive-bar { min-height: 88px; grid-template-columns: 1fr 1fr; } .archive-bar > div { order: 3; grid-column: 1 / -1; text-align: left; } .archive-bar > a:last-child { justify-self: end; } .archive-owner-actions { align-items: flex-start; flex-direction: column; } }
</style>
