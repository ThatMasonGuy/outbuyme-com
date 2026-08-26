<script setup lang="ts">
import type { PromoCardContent } from '#shared/types/content'

defineProps<{ content: PromoCardContent, preview?: boolean }>()
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join('') || '?'
</script>

<template>
  <article class="promo-stage notebook-paper" :class="`promo-stage--${content.theme}`">
    <section class="postcard">
      <span class="postcard__tape" aria-hidden="true" />
      <div class="postcard__identity">
        <div class="postcard__avatar" aria-hidden="true">
          <img v-if="content.avatarDataUrl" :src="content.avatarDataUrl" alt="">
          <span v-else>{{ initials(content.displayName) }}</span>
        </div>
        <p>{{ content.displayName }}</p>
      </div>
      <div class="postcard__message">
        <h1 :class="`postcard__headline--${content.headlineSize}`">{{ content.headline }}</h1>
        <p>{{ content.description }}</p>
      </div>
      <nav class="postcard__links" aria-label="Owner links">
        <a v-for="link in content.links" :key="link.id" :href="link.url" :tabindex="preview ? -1 : undefined" rel="sponsored ugc nofollow noopener noreferrer" target="_blank" @click="preview ? $event.preventDefault() : undefined">
          {{ link.label }} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </section>
  </article>
</template>

<style scoped>
.promo-stage { position: relative; display: grid; min-height: 100%; place-items: center; overflow: auto; padding: clamp(1.5rem, 5vw, 4rem); color: var(--ink); }
.promo-stage--paper { background-color: var(--paper); }
.promo-stage--pink { background-color: #ffe2f1; }
.promo-stage--blue { background-color: #dceaff; }
.promo-stage--yellow { background-color: #f6ffb4; }
.postcard { position: relative; display: grid; width: min(100%, 880px); min-height: 430px; border: 3px solid var(--ink); background: #fffdf6; box-shadow: 10px 12px 0 rgba(32, 32, 31, 0.18); grid-template-columns: minmax(180px, 0.75fr) minmax(260px, 1.25fr); grid-template-rows: 1fr auto; transform: rotate(-1deg); }
.postcard::after { position: absolute; inset: 14px; border: 1px solid rgba(32, 32, 31, 0.25); content: ''; pointer-events: none; }
.postcard__tape { position: absolute; z-index: 2; top: -18px; left: 42%; width: 120px; height: 38px; background: rgba(233, 255, 104, 0.78); transform: rotate(2deg); }
.postcard__identity { display: grid; align-content: center; justify-items: center; border-right: 2px dashed #aaa394; padding: 2rem; text-align: center; }
.postcard__identity p { margin: 1.2rem 0 0; font-family: var(--font-hand); font-size: 1.2rem; font-weight: 700; }
.postcard__avatar { display: grid; width: min(180px, 70%); aspect-ratio: 1; place-items: center; border: var(--line); border-radius: 50%; background: var(--pink); box-shadow: 4px 4px 0 var(--ink); font-family: var(--font-display); font-size: clamp(2.5rem, 7vw, 5rem); overflow: hidden; }
.postcard__avatar img { width: 100%; height: 100%; object-fit: cover; }
.postcard__message { position: relative; z-index: 1; align-self: center; padding: clamp(2rem, 5vw, 4rem); }
.postcard__message h1 { max-width: 18ch; margin: 0 0 1rem; font-family: var(--font-display); letter-spacing: -0.04em; line-height: 0.98; }
.postcard__headline--small { font-size: clamp(1.65rem, 3vw, 2.8rem); }
.postcard__headline--medium { font-size: clamp(2rem, 4vw, 3.7rem); }
.postcard__headline--large { font-size: clamp(2.4rem, 5vw, 4.6rem); }
.postcard__message > p:last-child { max-width: 38rem; margin: 0; font-size: clamp(0.95rem, 1.8vw, 1.2rem); line-height: 1.5; }
.postcard__links { position: relative; z-index: 1; display: flex; flex-wrap: wrap; border-top: 2px dashed #aaa394; grid-column: 1 / -1; gap: 0.65rem; padding: 1.2rem 1.5rem 1.4rem; }
.postcard__links a { display: inline-flex; min-height: 42px; align-items: center; gap: 0.35rem; border: 2px solid var(--ink); border-radius: 999px; background: white; padding: 0.55rem 0.85rem; font-size: 0.88rem; font-weight: 900; text-decoration: none; }
.postcard__links a:nth-child(4n + 1) { background: var(--yellow); }
.postcard__links a:nth-child(4n + 2) { background: #ffd4e8; }
.postcard__links a:nth-child(4n + 3) { background: #dceaff; }
.postcard__links a:nth-child(4n) { background: #ffe1d7; }
@media (max-width: 680px) {
  .promo-stage { align-items: start; padding: 1.5rem 1rem 2rem; }
  .postcard { grid-template-columns: 1fr; transform: none; }
  .postcard__identity { border-right: 0; border-bottom: 2px dashed #aaa394; padding: 2.5rem 1.2rem 1.5rem; }
  .postcard__avatar { width: 110px; }
  .postcard__message { padding: 2rem 1.4rem; }
  .postcard__links { grid-column: 1; }
}
</style>
