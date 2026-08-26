<script setup lang="ts">
import { findHistoryEntry } from '~/data/history'

const route = useRoute()
const slug = String(route.params.slug)
const entry = findHistoryEntry(slug)
if (!entry || entry.visibility === 'removed') throw createError({ statusCode: 404, statusMessage: 'Archived page not found' })

useSeoMeta({ title: 'Request archive removal — Outbuy Me', description: 'Ask to remove a former page from public Outbuy Me history.', robots: 'noindex, nofollow' })
</script>

<template>
  <ContentPage accent="orange" eyebrow="Former owners" title="Remove your old page." lead="If this page was yours, sign in and ask us to remove it from public history. The takeover will still count, but the page and your public owner details will be replaced with a removal notice.">
    <section class="removal-card">
      <div><p class="eyebrow">Page #{{ entry!.takeoverNumber }}</p><h2>{{ entry!.ownerName }}</h2><p>Archived after the ${{ entry!.priceUsd }} USD takeover.</p></div>
      <NuxtLink class="button" :to="`/login?returnTo=/history/${slug}/request-removal`">Log in to request removal</NuxtLink>
    </section>
    <h2>What gets removed?</h2>
    <p>The public snapshot, its images, links and owner name. We retain the minimum transaction and moderation records required to operate the service and handle disputes.</p>
  </ContentPage>
</template>

<style scoped>
.removal-card { display: flex; align-items: center; justify-content: space-between; border: var(--line); background: #fff; box-shadow: var(--shadow); gap: 2rem; padding: clamp(1.5rem, 4vw, 2.5rem); }
.removal-card h2 { margin: 0.3rem 0 !important; }
.removal-card p { margin: 0; }
@media (max-width: 700px) { .removal-card { align-items: stretch; flex-direction: column; } }
</style>
