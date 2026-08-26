<script setup lang="ts">
import { historyEntries } from '~/data/history'

useSeoMeta({ title: 'Page history — Outbuy Me', description: 'Open every previous version of Outbuy Me and see who held the page, when, and for how much.' })
useHead({ link: [{ rel: 'canonical', href: 'https://outbuyme.com/history' }] })
const formatDate = (value: string) => new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
</script>

<template>
  <ContentPage accent="blue" eyebrow="The archive" title="The page changes. The old ones stay." lead="Every time somebody pays more, the page they replace moves into history. Former owners can ask us to remove an old page from public view.">
    <section class="current-page">
      <div><p class="eyebrow">Live now</p><h2>Waiting for owner #1</h2><p>The page is unclaimed. Public takeovers start at $5 USD.</p></div>
      <NuxtLink class="button" to="/">See the current page</NuxtLink>
    </section>
    <section aria-labelledby="past-pages-title">
      <h2 id="past-pages-title">The collection</h2>
      <ol class="history-list">
        <li class="history-list__founding">
          <NuxtLink to="/history/founding-page">
            <span class="history-number">#0</span><strong>The founding page</strong><span>Before the first takeover</span><span>Launch page</span><span aria-hidden="true">Open page ↗</span>
          </NuxtLink>
        </li>
        <li v-for="entry in historyEntries" :key="entry.slug">
          <NuxtLink :to="`/history/${entry.slug}`">
            <span class="history-number">#{{ entry.takeoverNumber }}</span><strong>{{ entry.visibility === 'removed' ? 'Page removed' : entry.ownerName }}</strong><span>{{ formatDate(entry.startedAt) }}–{{ formatDate(entry.endedAt) }}</span><span>${{ entry.priceUsd }} USD</span><span aria-hidden="true">{{ entry.visibility === 'removed' ? 'View notice' : 'Open page' }} ↗</span>
          </NuxtLink>
        </li>
      </ol>
      <div v-if="historyEntries.length === 0" class="archive-empty"><span aria-hidden="true">✎</span><div><strong>No takeovers yet.</strong><p>Page #1 will appear here after somebody replaces the founding page.</p></div></div>
    </section>
  </ContentPage>
</template>

<style scoped>
.current-page { display: flex; align-items: center; justify-content: space-between; border: var(--line); background: #fff; box-shadow: var(--shadow); gap: 2rem; padding: clamp(1.2rem, 3vw, 2rem); }
.current-page + section { padding-block: clamp(3rem, 7vw, 6rem) clamp(1rem, 3vw, 2rem); }
.current-page h2 { margin: 0.25rem 0 !important; }
.current-page p { margin: 0; }
.history-list { display: grid; gap: 0.8rem; list-style: none; margin: 1.5rem 0 0; padding: 0; }
.history-list a { display: grid; align-items: center; border-bottom: var(--line); gap: 1rem; grid-template-columns: auto 1.2fr 1fr auto auto; padding: 1rem 0.4rem; text-decoration: none; transition: background-color 140ms ease, transform 140ms ease; }
.history-list a:hover, .history-list a:focus-visible { background: #fff; transform: translateX(0.35rem); }
.history-list__founding a { border: var(--line); background: #f6ffb4; box-shadow: var(--shadow); padding: 1rem; }
.history-number { font-family: var(--font-hand); font-size: 1.2rem; }
.archive-empty { display: flex; align-items: center; border: 2px dashed #aaa394; gap: 1rem; margin-top: 1.5rem; padding: 1.3rem; }
.archive-empty span { font-family: var(--font-hand); font-size: 2rem; }
.archive-empty p { margin: 0.2rem 0 0; }
@media (max-width: 700px) { .current-page { align-items: stretch; flex-direction: column; } .history-list a { grid-template-columns: auto 1fr; } }
</style>
