<script setup lang="ts">
const pageIsClaimed = false
const status = ref('')
const submitReport = () => { status.value = 'Report sent. We will email you if we need more information.' }

useSeoMeta({
  title: 'Report page content — Outbuy Me',
  description: 'Report abusive, unlawful or unsafe content displayed on Outbuy Me.',
  robots: 'noindex, follow',
})
</script>

<template>
  <ContentPage
    accent="pink"
    eyebrow="No purchase required"
    title="Report harmful content."
    lead="If the live page targets someone, breaks the law or sends people somewhere unsafe, tell us here. You never need to outbuy it first."
  >
    <section v-if="!pageIsClaimed" class="report-empty">
      <span aria-hidden="true">✓</span>
      <div><p class="eyebrow">Nothing to report yet</p><h2>The page has no owner content.</h2><p>Reporting opens with the first takeover. For now, the page only contains the Outbuy Me introduction.</p></div>
      <NuxtLink class="button" to="/">See the current page</NuxtLink>
    </section>

    <form v-else class="report-form" @submit.prevent="submitReport">
      <div class="field">
        <label for="report-reason">Reason</label>
        <select id="report-reason" required>
          <option value="">Choose a reason</option>
          <option>Harassment or threats</option>
          <option>Private information or impersonation</option>
          <option>Illegal or exploitative content</option>
          <option>Phishing, malware or unsafe link</option>
          <option>Copyright or trademark</option>
          <option>Something else</option>
        </select>
      </div>
      <div class="field">
        <label for="report-details">What happened?</label>
        <textarea id="report-details" maxlength="2000" required />
        <small>Include the part of the page or destination link we should check.</small>
      </div>
      <div class="field">
        <label for="report-email">Your email (optional)</label>
        <input id="report-email" autocomplete="email" type="email">
        <small>We will only use it to ask about this report or tell you the outcome.</small>
      </div>
      <button class="button" type="submit">Send report</button>
      <p role="status">{{ status }}</p>
    </form>
  </ContentPage>
</template>

<style scoped>
.report-form {
  display: grid;
  max-width: 46rem;
  gap: 1.2rem;
}

.report-form p {
  min-height: 2rem;
  margin: 0;
  color: var(--muted);
}
.report-empty { display: grid; align-items: center; border: var(--line); background: #fff; box-shadow: var(--shadow); gap: 1.2rem; grid-template-columns: auto 1fr auto; padding: clamp(1.4rem, 4vw, 2.5rem); }
.report-empty > span { display: grid; width: 4rem; aspect-ratio: 1; place-items: center; border: var(--line); border-radius: 50%; background: var(--yellow); font-family: var(--font-display); font-size: 1.8rem; }
.report-empty h2 { margin: 0.35rem 0 !important; }
.report-empty p { margin: 0; }
@media (max-width: 700px) { .report-empty { align-items: stretch; grid-template-columns: 1fr; } .report-empty > span { width: 3.2rem; } }
</style>
