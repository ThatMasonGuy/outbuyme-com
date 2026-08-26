<script setup lang="ts">
import type { PageBlock, VisualPageContent } from '#shared/types/content'

const props = defineProps<{ content: VisualPageContent, preview?: boolean }>()

const blockStyle = (block: PageBlock) => ({ left: `${block.x}%`, top: `${block.y}px`, width: `${block.width}%`, height: `${block.height}px` })
const isExternal = (url: string) => /^https?:\/\//i.test(url)
const canvasHeight = computed(() => Math.max(760, ...props.content.blocks.map(block => block.y + block.height + 80)))
</script>

<template>
  <article class="canvas notebook-paper" :class="`canvas--${content.background}`" :style="{ minHeight: `${canvasHeight}px` }">
    <template v-for="block in content.blocks" :key="block.id">
      <div v-if="block.type === 'text'" class="canvas-block canvas-text" :class="[`canvas-text--${block.style}`, `canvas-text--${block.size}`, `canvas-text--${block.colour}`]" :style="blockStyle(block)">
        {{ block.text }}
      </div>
      <figure v-else-if="block.type === 'image'" class="canvas-block canvas-image" :style="{ ...blockStyle(block), transform: `rotate(${block.rotation}deg)` }">
        <img :src="block.src" :alt="block.alt">
      </figure>
      <a v-else-if="block.type === 'link'" class="canvas-block canvas-link" :class="[`canvas-link--${block.style}`, `canvas-link--${block.colour}`]" :href="block.url" :style="blockStyle(block)" :tabindex="preview ? -1 : undefined" :rel="isExternal(block.url) ? 'sponsored ugc nofollow noopener noreferrer' : undefined" :target="isExternal(block.url) ? '_blank' : undefined" @click="preview ? $event.preventDefault() : undefined">
        {{ block.label }} <span aria-hidden="true">↗</span>
      </a>
      <div v-else class="canvas-block canvas-shape" :class="[`canvas-shape--${block.shape}`, `canvas-shape--${block.colour}`]" :style="{ ...blockStyle(block), transform: `rotate(${block.rotation}deg)` }" aria-hidden="true">
        <span v-if="block.shape === 'star'">★</span><span v-else-if="block.shape === 'arrow'">→</span>
      </div>
    </template>
  </article>
</template>

<style scoped>
.canvas { position: relative; width: 100%; min-width: 0; overflow: hidden; color: var(--ink); }
.canvas--white { background-color: #fff; }
.canvas--pink { background-color: #ffe2f1; }
.canvas--yellow { background-color: #f6ffb4; }
.canvas--blue { background-color: #dceaff; }
.canvas-block { position: absolute; max-width: calc(100% - 1rem); }
.canvas-text { overflow: hidden; white-space: pre-wrap; overflow-wrap: anywhere; }
.canvas-text--heading { font-family: var(--font-display); font-weight: 900; letter-spacing: -0.045em; line-height: 0.96; }
.canvas-text--body { line-height: 1.5; }
.canvas-text--scribble { font-family: var(--font-hand); line-height: 1.2; transform: rotate(-2deg); }
.canvas-text--small { font-size: clamp(0.85rem, 1.5vw, 1.05rem); }
.canvas-text--medium { font-size: clamp(1.1rem, 2.5vw, 1.8rem); }
.canvas-text--large { font-size: clamp(1.8rem, 5vw, 4rem); }
.canvas-text--huge { font-size: clamp(2.6rem, 8vw, 7rem); }
.canvas-text--pink { color: #d82179; }
.canvas-text--blue { color: #1759c8; }
.canvas-text--orange { color: #c93d1f; }
.canvas-text--yellow { color: #697300; }
.canvas-text--paper { color: #fffaf0; }
.canvas-image { margin: 0; border: 2px solid var(--ink); background: white; box-shadow: var(--shadow); padding: 0.45rem 0.45rem 1.5rem; }
.canvas-image img { display: block; width: 100%; max-height: 420px; object-fit: cover; }
.canvas-link { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; gap: 0.5rem; color: inherit; font-weight: 900; overflow-wrap: anywhere; }
.canvas-link--button { border: var(--line); border-radius: 0.3rem; background: var(--yellow); box-shadow: 3px 3px 0 var(--ink); padding: 0.75rem 1rem; text-decoration: none; }
.canvas-link--underline { justify-content: flex-start; text-decoration-thickness: 2px; text-underline-offset: 0.25rem; }
.canvas-link--pink { background: var(--pink); }
.canvas-link--blue { background: #9fc4ff; }
.canvas-link--orange { background: #ff9b7f; }
.canvas-link--yellow { background: var(--yellow); }
.canvas-link--paper { background: var(--paper); }
.canvas-link--ink { background: var(--ink); color: white; }
.canvas-shape { display: grid; place-items: center; pointer-events: none; }
.canvas-shape--rectangle, .canvas-shape--highlighter { background: var(--shape-colour); }
.canvas-shape--circle { border-radius: 50%; background: var(--shape-colour); }
.canvas-shape--star, .canvas-shape--arrow { color: var(--shape-colour); font-family: var(--font-display); font-size: min(9rem, 16vw); line-height: 1; }
.canvas-shape--highlighter { opacity: 0.72; }
.canvas-shape--pink { --shape-colour: var(--pink); }
.canvas-shape--blue { --shape-colour: var(--blue); }
.canvas-shape--orange { --shape-colour: var(--orange); }
.canvas-shape--yellow { --shape-colour: var(--yellow); }
.canvas-shape--paper { --shape-colour: var(--paper); }
.canvas-shape--ink { --shape-colour: var(--ink); }
</style>
