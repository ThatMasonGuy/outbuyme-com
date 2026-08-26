<template>
  <header class="site-header">
    <BrandMark />
    <SiteNav />
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  z-index: 50;
  top: 0;
  display: flex;
  min-height: var(--header-height);
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: var(--line);
  background: #fffefa;
  padding: 0.7rem clamp(1rem, 3vw, 2.5rem);
}

</style>
