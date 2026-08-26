<script setup lang="ts">
defineProps<{
  price: string
  ownerLabel: string
  statusLabel: string
}>()

</script>

<template>
  <div class="takeover-shell">
    <header class="takeover-bar">
      <BrandMark />
      <div class="takeover-bar__status">
        <span>{{ statusLabel }}</span>
        <strong>{{ ownerLabel }}</strong>
      </div>
      <SiteNav compact />
      <NuxtLink class="button button--acid takeover-bar__action" to="/studio">
        Take over · {{ price }}
      </NuxtLink>
    </header>

    <main id="main-content" class="takeover-canvas">
      <slot />
    </main>

    <footer class="takeover-foot">
      <span>One page. One owner.</span>
      <strong>Until somebody pays more.</strong>
      <NuxtLink to="/about">What is Outbuy Me?</NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
.takeover-shell {
  display: grid;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  border: 6px solid var(--ink);
  grid-template-rows: auto 1fr auto;
}

.takeover-bar {
  display: grid;
  min-height: 66px;
  align-items: center;
  border-bottom: var(--line);
  background: var(--paper);
  color: var(--ink);
  gap: 1rem;
  grid-template-columns: auto auto 1fr auto;
  padding: 0.65rem 0.8rem 0.65rem 1rem;
}

.takeover-bar__status {
  display: grid;
  min-width: 9.5rem;
  border-left: 1px solid #aaa394;
  gap: 0.12rem;
  padding-left: 1rem;
}

.takeover-bar__status span {
  color: var(--muted);
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.takeover-bar__status strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.takeover-canvas {
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
}

.takeover-foot {
  display: flex;
  min-height: 38px;
  align-items: center;
  border-top: var(--line);
  background: #fffefa;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.76rem;
}

.takeover-foot a {
  margin-left: auto;
  font-weight: 900;
}

@media (max-width: 800px) {
  .takeover-shell {
    border-width: 4px;
    padding-bottom: 62px;
  }

  .takeover-bar {
    min-height: 64px;
    gap: 0.65rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .takeover-bar__status {
    min-width: 0;
    justify-self: center;
    padding-left: 0.65rem;
    text-align: center;
  }

  .takeover-bar__status strong { max-width: 7rem; }

  .takeover-bar__action {
    position: fixed;
    z-index: 30;
    right: 7px;
    bottom: 7px;
    left: 7px;
    min-height: 52px;
    box-shadow: 0 -4px 0 var(--ink);
  }

  .takeover-foot {
    display: none;
  }
}
</style>
