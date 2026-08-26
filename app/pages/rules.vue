<script setup lang="ts">
useSeoMeta({
  title: 'Page rules — Outbuy Me',
  description: 'The content and ownership rules for taking over the Outbuy Me page.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://outbuyme.com/rules' }] })
</script>

<template>
  <ContentPage
    accent="orange"
    eyebrow="The short version"
    title="Be weird. Don’t be harmful."
    lead="Promote yourself, show your work, make a joke or build something gloriously pointless. Do not use the page to target people, steal information or break the law."
  >
    <h2>The hard no list</h2>
    <ul class="rule-list">
      <li><span aria-hidden="true">×</span><p><strong>Abuse or exploitation</strong>Threats, targeted harassment, doxxing, impersonation, non-consensual intimate material or anything that exploits children.</p></li>
      <li><span aria-hidden="true">×</span><p><strong>Scams or technical attacks</strong>Phishing, malware, credential collection, deceptive downloads or attempts to attack another device or service.</p></li>
      <li><span aria-hidden="true">×</span><p><strong>Illegal or stolen material</strong>Illegal content, instructions for serious wrongdoing, or copyright and trademark infringement reported by the rights holder.</p></li>
      <li><span aria-hidden="true">×</span><p><strong>Anything our essential services prohibit</strong>Content barred by the services that host the site or process its payments cannot stay live.</p></li>
    </ul>

    <section class="report-note"><p class="eyebrow">Important</p><h2>You never need to buy the page to remove harmful content.</h2><p>Send a report. We can hide the page while it is reviewed, restore an earlier safe version and suspend the owner.</p><NuxtLink class="button" to="/report">Report the page</NuxtLink></section>

    <h2>You are buying attention, not search ranking</h2>
    <p>Your links can send visitors wherever you choose, provided the destination is safe. A takeover does not include a promise that search engines will rank those links or your site.</p>
  </ContentPage>
</template>

<style scoped>
.rule-list { display: grid; gap: 0.8rem; list-style: none; margin: 1.5rem 0 4rem; padding: 0; }
.rule-list li { display: grid; border-bottom: 1px dashed #aaa394; gap: 1rem; grid-template-columns: auto 1fr; padding: 1rem 0; }
.rule-list li > span { display: grid; width: 2.4rem; height: 2.4rem; place-items: center; border: var(--line); border-radius: 50%; background: #ffe1d7; color: #9d2410; font-family: var(--font-display); font-size: 1.3rem; }
.rule-list p { margin: 0; }
.rule-list strong { display: block; margin-bottom: 0.2rem; color: var(--ink); }
.report-note { position: relative; border: var(--line); background: #f6ffb4; box-shadow: var(--shadow); margin: 0 0 4rem; padding: clamp(1.5rem, 4vw, 2.8rem); }
.report-note::after { position: absolute; top: 1rem; right: 1.5rem; content: '!'; font-family: var(--font-hand); font-size: 3rem; transform: rotate(8deg); }
.report-note h2 { max-width: 18ch; margin-top: 0.45rem !important; }
</style>
