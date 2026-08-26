<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error.statusCode === 404)
useHead({ title: () => isNotFound.value ? 'Page not found — Outbuy Me' : 'Something went wrong — Outbuy Me' })
</script>

<template>
  <MissingPage :unexpected="!isNotFound" />
</template>
