<script setup lang="ts">
import type { PageBlock, VisualPageContent } from '#shared/types/content'
import type { PageTool } from '~/composables/useOwnerDraft'

const props = defineProps<{ content: VisualPageContent, selectedId: string | null }>()
const emit = defineEmits<{
  select: [id: string]
  move: [payload: { id: string, x: number, y: number }]
  resize: [payload: { id: string, width: number, height: number }]
  add: [payload: { type: PageTool, x: number, y: number }]
}>()

const canvas = ref<HTMLElement | null>(null)
type PointerAction =
  | { kind: 'move', id: string, grabX: number, grabY: number }
  | { kind: 'resize', id: string, startClientX: number, startClientY: number, startWidth: number, startHeight: number }
let pointerAction: PointerAction | null = null

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
const blockStyle = (block: PageBlock, index: number) => ({
  left: `${block.x}%`, top: `${block.y}px`, width: `${block.width}%`, height: `${block.height}px`,
  zIndex: index + 1,
  transform: block.type === 'image' || block.type === 'shape' ? `rotate(${block.rotation}deg)` : undefined,
})
const blockLabel = (block: PageBlock) => {
  if (block.type === 'text') return `Edit text: ${block.text}`
  if (block.type === 'link') return `Edit link: ${block.label}`
  if (block.type === 'shape') return `Edit ${block.shape}`
  return `Edit image${block.alt ? `: ${block.alt}` : ''}`
}

const stopPointerAction = () => {
  pointerAction = null
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', stopPointerAction)
  window.removeEventListener('pointercancel', stopPointerAction)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!pointerAction || !canvas.value) return
  const block = props.content.blocks.find(item => item.id === pointerAction?.id)
  if (!block) return
  const rect = canvas.value.getBoundingClientRect()

  if (pointerAction.kind === 'move') {
    const nextX = ((event.clientX - rect.left - pointerAction.grabX) / rect.width) * 100
    const nextY = event.clientY - rect.top - pointerAction.grabY
    emit('move', { id: block.id, x: Math.round(clamp(nextX, 0, Math.max(0, 100 - block.width)) * 10) / 10, y: Math.round(clamp(nextY, 0, 1600 - block.height)) })
  }
  else {
    const widthDelta = ((event.clientX - pointerAction.startClientX) / rect.width) * 100
    const heightDelta = event.clientY - pointerAction.startClientY
    emit('resize', { id: block.id, width: Math.round(clamp(pointerAction.startWidth + widthDelta, 8, 100 - block.x) * 10) / 10, height: Math.round(clamp(pointerAction.startHeight + heightDelta, 36, 900)) })
  }
}

const listenForPointerAction = () => {
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', stopPointerAction, { once: true })
  window.addEventListener('pointercancel', stopPointerAction, { once: true })
}

const startMove = (event: PointerEvent, block: PageBlock) => {
  if (event.button !== 0) return
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  emit('select', block.id)
  target.focus({ preventScroll: true })
  pointerAction = { kind: 'move', id: block.id, grabX: event.clientX - rect.left, grabY: event.clientY - rect.top }
  listenForPointerAction()
  event.preventDefault()
}

const startResize = (event: PointerEvent, block: PageBlock) => {
  if (event.button !== 0) return
  emit('select', block.id)
  pointerAction = { kind: 'resize', id: block.id, startClientX: event.clientX, startClientY: event.clientY, startWidth: block.width, startHeight: block.height }
  listenForPointerAction()
  event.preventDefault()
  event.stopPropagation()
}

const handleBlockKeydown = (event: KeyboardEvent, block: PageBlock) => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
  event.preventDefault()
  if (event.shiftKey) {
    emit('resize', {
      id: block.id,
      width: clamp(block.width + (event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0), 8, 100 - block.x),
      height: clamp(block.height + (event.key === 'ArrowDown' ? 10 : event.key === 'ArrowUp' ? -10 : 0), 36, 900),
    })
  }
  else {
    emit('move', {
      id: block.id,
      x: clamp(block.x + (event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0), 0, 100 - block.width),
      y: clamp(block.y + (event.key === 'ArrowDown' ? 10 : event.key === 'ArrowUp' ? -10 : 0), 0, 1600 - block.height),
    })
  }
}

const handleDrop = (event: DragEvent) => {
  if (!canvas.value || !event.dataTransfer) return
  const tool = event.dataTransfer.getData('application/x-outbuy-new') as PageTool
  if (!tool) return
  const rect = canvas.value.getBoundingClientRect()
  emit('add', { type: tool, x: Math.round(clamp(((event.clientX - rect.left) / rect.width) * 100 - 20, 0, 82)), y: Math.round(Math.max(0, event.clientY - rect.top - 60)) })
}

onBeforeUnmount(stopPointerAction)
</script>

<template>
  <div ref="canvas" class="builder-canvas notebook-paper" :class="`builder-canvas--${props.content.background}`" @dragover.prevent @drop.prevent="handleDrop">
    <p id="canvas-keyboard-help" class="sr-only">Use arrow keys to move the selected item. Hold Shift and use arrow keys to resize it.</p>
    <p v-if="content.blocks.length === 0" class="builder-empty">Drop something here or add it from the toolbox.</p>
    <div
      v-for="(block, index) in content.blocks"
      :key="block.id"
      class="builder-block"
      :class="[
        `builder-block--${block.type}`,
        { 'builder-block--selected': block.id === selectedId },
        block.type === 'text' ? `builder-text--${block.style} builder-text--${block.size} builder-text--${block.colour}` : '',
        block.type === 'link' ? `builder-link--${block.style} builder-link--${block.colour}` : '',
        block.type === 'shape' ? `builder-shape--${block.shape} builder-shape--${block.colour}` : '',
      ]"
      :style="blockStyle(block, index)"
      role="button"
      tabindex="0"
      :aria-label="blockLabel(block)"
      aria-describedby="canvas-keyboard-help"
      @click="emit('select', block.id)"
      @focus="emit('select', block.id)"
      @keydown="handleBlockKeydown($event, block)"
      @pointerdown="startMove($event, block)"
    >
      <template v-if="block.type === 'text'">{{ block.text }}</template>
      <template v-else-if="block.type === 'link'">{{ block.label }} <span aria-hidden="true">↗</span></template>
      <template v-else-if="block.type === 'image'"><img v-if="block.src" :src="block.src" alt=""><span v-else class="image-placeholder">Choose an image</span></template>
      <template v-else><span v-if="block.shape === 'star'">★</span><span v-else-if="block.shape === 'arrow'">→</span></template>
      <button v-if="block.id === selectedId" class="resize-handle" type="button" :aria-label="`Resize ${blockLabel(block).replace('Edit ', '')}`" @pointerdown="startResize($event, block)"><span aria-hidden="true">↘</span></button>
    </div>
  </div>
</template>

<style scoped>
.builder-canvas { position: relative; width: 100%; min-height: 1760px; overflow: hidden; color: var(--ink); }
.builder-canvas--white { background-color: #fff; }
.builder-canvas--pink { background-color: #ffe2f1; }
.builder-canvas--yellow { background-color: #f6ffb4; }
.builder-canvas--blue { background-color: #dceaff; }
.builder-empty { width: min(24rem, calc(100% - 3rem)); margin: 8rem auto; border: 2px dashed var(--muted); padding: 1.2rem; color: var(--muted); text-align: center; }
.builder-block { position: absolute; min-width: 56px; border: 1px dashed transparent; background: transparent; padding: 0.3rem; color: inherit; cursor: grab; overflow: hidden; overflow-wrap: anywhere; text-align: left; touch-action: none; user-select: none; animation: placed-down 240ms both ease-out; }
.builder-block:hover, .builder-block:focus-visible, .builder-block--selected { border-color: var(--blue); outline: 3px solid rgba(74, 145, 255, 0.22); outline-offset: 2px; }
.builder-block--selected { cursor: move; }
.builder-text--heading { font-family: var(--font-display); font-weight: 900; letter-spacing: -0.045em; line-height: 0.96; }
.builder-text--body { line-height: 1.45; }
.builder-text--scribble { font-family: var(--font-hand); line-height: 1.2; }
.builder-text--small { font-size: 0.95rem; }
.builder-text--medium { font-size: 1.45rem; }
.builder-text--large { font-size: clamp(2rem, 4vw, 3.8rem); }
.builder-text--huge { font-size: clamp(3rem, 7vw, 6.5rem); }
.builder-text--pink { color: #d82179; }
.builder-text--blue { color: #1759c8; }
.builder-text--orange { color: #c93d1f; }
.builder-text--yellow { color: #697300; }
.builder-text--paper { color: var(--paper); }
.builder-block--link { display: flex; min-height: 36px; align-items: center; justify-content: center; font-weight: 900; }
.builder-link--button { border: var(--line); border-radius: 0.3rem; box-shadow: 3px 3px 0 var(--ink); padding: 0.7rem 0.9rem; text-align: center; }
.builder-link--underline { justify-content: flex-start; text-decoration: underline; text-underline-offset: 0.25rem; }
.builder-link--pink { background: var(--pink); }
.builder-link--blue { background: #9fc4ff; }
.builder-link--orange { background: #ff9b7f; }
.builder-link--yellow { background: var(--yellow); }
.builder-link--paper { background: var(--paper); }
.builder-link--ink { background: var(--ink); color: white; }
.builder-block--image { border: var(--line); background: white; box-shadow: var(--shadow); padding: 0.4rem 0.4rem 1.2rem; }
.builder-block--image img { display: block; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.image-placeholder { display: grid; width: 100%; height: 100%; min-height: 80px; place-items: center; background: var(--paper-deep); color: var(--muted); }
.builder-block--shape { display: grid; place-items: center; border: 0; padding: 0; color: var(--shape-colour); font-family: var(--font-display); font-size: min(8rem, 12vw); line-height: 1; }
.builder-shape--rectangle, .builder-shape--highlighter { background: var(--shape-colour); }
.builder-shape--circle { border-radius: 50%; background: var(--shape-colour); }
.builder-shape--highlighter { opacity: 0.72; }
.builder-shape--pink { --shape-colour: var(--pink); }
.builder-shape--blue { --shape-colour: var(--blue); }
.builder-shape--orange { --shape-colour: var(--orange); }
.builder-shape--yellow { --shape-colour: var(--yellow); }
.builder-shape--paper { --shape-colour: var(--paper); }
.builder-shape--ink { --shape-colour: var(--ink); }
.resize-handle { position: absolute; z-index: 5; right: -1px; bottom: -1px; display: grid; width: 34px; height: 34px; place-items: center; border: 2px solid var(--ink); background: var(--yellow); color: var(--ink); cursor: nwse-resize; font-weight: 900; touch-action: none; }
@media (prefers-reduced-motion: reduce) { .builder-block { animation: none; } }
</style>
