<script setup lang="ts">
useSeoMeta({
  title: 'Outbuy Me — One page. One owner. Take it from them.',
  description: 'Pay the current takeover price, redesign the page and keep control until somebody outbuys you.',
  ogTitle: 'Outbuy Me — One page. One owner.',
  ogDescription: 'Buy the page. Change it. Keep it until somebody outbuys you.',
  ogType: 'website',
  ogUrl: 'https://outbuyme.com/',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://outbuyme.com/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Outbuy Me',
        alternateName: 'OutbuyMe',
        url: 'https://outbuyme.com/',
      }),
    },
  ],
})
</script>

<template>
  <div class="index-page-root">
    <a class="skip-link" href="#main-content">Skip to the page</a>
    <TakeoverChrome price="$1 USD" owner-label="Unclaimed" status-label="Current owner">
      <HomeCanvas />
    </TakeoverChrome>
  </div>
</template>

<style scoped>
.index-page-root { height: 100dvh; overflow: hidden; }
</style>
