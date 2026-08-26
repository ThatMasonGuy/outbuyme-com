<template>
  <NuxtLink class="brand-mark" to="/" aria-label="Outbuy Me home">
    <span aria-hidden="true">O</span>
    <span class="brand-mark__words">Outbuy<br>Me</span>
  </NuxtLink>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.6rem;
  font-weight: 950;
  line-height: 0.82;
  text-decoration: none;
  text-transform: uppercase;
}

.brand-mark > span:first-child {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border: 2px solid currentColor;
  border-radius: 0.35rem;
  background: var(--pink);
  box-shadow: 2px 2px 0 currentColor;
  font-family: var(--font-display);
  font-size: 1.55rem;
}

.brand-mark__words {
  letter-spacing: -0.04em;
  line-height: 0.9;
}
</style>
