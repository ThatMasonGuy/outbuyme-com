<script setup lang="ts">
const event = useRequestEvent()
if (event) setResponseStatus(event, 404)

useSeoMeta({
  title: 'Page not found — Outbuy Me',
  description: 'This Outbuy Me page could not be found.',
  robots: 'noindex, follow',
})
</script>

<template>
  <MissingPage />
</template>
