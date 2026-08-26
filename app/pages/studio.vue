<script setup lang="ts">
import { ownerContentSchema } from '#shared/schemas/content'
import type { OwnerContent, PageBlock, PromoLink } from '#shared/types/content'
import type { PageTool } from '~/composables/useOwnerDraft'

type StudioMode = 'promo' | 'visual' | null
const mode = ref<StudioMode>(null)
const saveStatus = ref('')
const selectedBlockId = ref<string | null>(null)
const draftRestored = ref(false)
const lastRemoval = ref<
  | { kind: 'promo', item: PromoLink, index: number }
  | { kind: 'block', item: PageBlock, index: number }
  | null
>(null)
const { promo, visual } = useOwnerDraft()

const pageTools: { type: PageTool, label: string, icon: string }[] = [
  { type: 'text', label: 'Text', icon: 'T' },
  { type: 'handwriting', label: 'Handwriting', icon: '✎' },
  { type: 'image', label: 'Image', icon: '▧' },
  { type: 'link', label: 'Button', icon: '↗' },
  { type: 'highlighter', label: 'Highlighter', icon: '▰' },
  { type: 'rectangle', label: 'Rectangle', icon: '▬' },
  { type: 'circle', label: 'Circle', icon: '●' },
  { type: 'star', label: 'Star', icon: '★' },
  { type: 'arrow', label: 'Arrow', icon: '→' },
]

const selectedBlock = computed(() => visual.value.blocks.find(block => block.id === selectedBlockId.value) || null)

onMounted(() => {
  const saved = localStorage.getItem('outbuyme-owner-preview')
  if (!saved) return
  try {
    const result = ownerContentSchema.safeParse(JSON.parse(saved))
    if (!result.success) return
    if (result.data.type === 'promo') promo.value = result.data
    else visual.value = result.data
    draftRestored.value = true
  }
  catch {
    localStorage.removeItem('outbuyme-owner-preview')
  }
})

const selectMode = (nextMode: Exclude<StudioMode, null>) => {
  mode.value = nextMode
  saveStatus.value = draftRestored.value ? 'Saved draft restored.' : ''
  if (nextMode === 'visual') selectedBlockId.value = visual.value.blocks[0]?.id || null
  nextTick(() => {
    window.scrollTo({ top: 0 })
    document.querySelector<HTMLElement>('#studio-editor-title')?.focus({ preventScroll: true })
  })
}

const returnToChooser = () => {
  mode.value = null
  saveStatus.value = ''
  nextTick(() => {
    window.scrollTo({ top: 0 })
    document.querySelector<HTMLElement>('#studio-choice-title')?.focus({ preventScroll: true })
  })
}

const validationMessage = (path: PropertyKey[], fallback: string) => {
  const joined = path.join('.')
  if (joined.includes('url')) return 'Check every link and use a full address beginning with http:// or https://.'
  if (joined.includes('src')) return 'Choose an image for every image block.'
  if (joined.includes('blocks')) return 'Add at least one item to the page.'
  if (joined.includes('links')) return 'Add at least one complete link to the promo.'
  return fallback === 'Invalid input' ? 'Check the highlighted fields and try again.' : fallback
}

const saveDraft = () => {
  const content: OwnerContent = mode.value === 'promo' ? promo.value : visual.value
  const result = ownerContentSchema.safeParse(content)
  if (!result.success) {
    const issue = result.error.issues[0]
    saveStatus.value = issue ? validationMessage(issue.path, issue.message) : 'Check the page and try again.'
    return false
  }
  if (import.meta.client) localStorage.setItem('outbuyme-owner-preview', JSON.stringify(result.data))
  saveStatus.value = 'Draft saved on this device.'
  draftRestored.value = true
  return true
}

const beginTakeover = () => {
  if (!saveDraft()) return
  saveStatus.value = 'Draft saved. Takeovers are not open yet.'
}

const readImage = (event: Event, onLoad: (dataUrl: string) => void) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/') || file.size > 1_500_000) {
    saveStatus.value = 'Choose an image smaller than 1.5 MB.'
    input.value = ''
    return
  }
  const reader = new FileReader()
  reader.addEventListener('load', () => onLoad(String(reader.result || '')))
  reader.readAsDataURL(file)
}

const handleAvatar = (event: Event) => readImage(event, (src) => {
  promo.value.avatarDataUrl = src
  saveStatus.value = 'Photo added.'
})

const addPromoLink = () => {
  if (promo.value.links.length >= 100) {
    saveStatus.value = 'A promo card can hold up to 100 links.'
    return
  }
  promo.value.links.push({ id: `promo-link-${Date.now()}`, label: 'New link', url: 'https://example.com' })
  lastRemoval.value = null
  nextTick(() => document.querySelector<HTMLInputElement>(`#promo-link-label-${promo.value.links.length - 1}`)?.focus())
}

const removePromoLink = (index: number) => {
  if (promo.value.links.length === 1) {
    saveStatus.value = 'Keep at least one link on the card.'
    return
  }
  const [item] = promo.value.links.splice(index, 1)
  if (item) lastRemoval.value = { kind: 'promo', item, index }
  saveStatus.value = 'Link removed.'
}

const startPaletteDrag = (event: DragEvent, type: PageTool) => {
  event.dataTransfer?.setData('application/x-outbuy-new', type)
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy'
}

const toolName = (type: PageTool | PageBlock['type']) => type === 'handwriting' ? 'Handwriting' : type === 'shape' ? 'Shape' : type.charAt(0).toUpperCase() + type.slice(1)

const addBlock = (type: PageTool, position?: { x: number, y: number }) => {
  if (visual.value.blocks.length >= 40) {
    saveStatus.value = 'This page can hold up to 40 items.'
    return
  }
  const block = makeBlock(type, visual.value.blocks.length)
  if (position) Object.assign(block, position)
  visual.value.blocks.push(block)
  lastRemoval.value = null
  selectedBlockId.value = block.id
  saveStatus.value = `${toolName(type)} added.`
}

const moveBlock = ({ id, x, y }: { id: string, x: number, y: number }) => {
  const block = visual.value.blocks.find(item => item.id === id)
  if (!block) return
  block.x = x
  block.y = y
  selectedBlockId.value = id
}

const resizeBlock = ({ id, width, height }: { id: string, width: number, height: number }) => {
  const block = visual.value.blocks.find(item => item.id === id)
  if (!block) return
  block.width = width
  block.height = height
  selectedBlockId.value = id
}

const removeSelectedBlock = () => {
  const index = visual.value.blocks.findIndex(block => block.id === selectedBlockId.value)
  if (index < 0) return
  const [item] = visual.value.blocks.splice(index, 1)
  if (item) lastRemoval.value = { kind: 'block', item, index }
  selectedBlockId.value = visual.value.blocks[Math.max(0, index - 1)]?.id || null
  saveStatus.value = `${item ? toolName(item.type) : 'Item'} removed.`
}

const undoRemoval = () => {
  if (!lastRemoval.value) return
  if (lastRemoval.value.kind === 'promo') promo.value.links.splice(lastRemoval.value.index, 0, lastRemoval.value.item)
  else {
    visual.value.blocks.splice(lastRemoval.value.index, 0, lastRemoval.value.item)
    selectedBlockId.value = lastRemoval.value.item.id
  }
  lastRemoval.value = null
  saveStatus.value = 'Restored.'
}

const moveSelectedLayer = (direction: -1 | 1) => {
  const index = visual.value.blocks.findIndex(block => block.id === selectedBlockId.value)
  const target = index + direction
  if (index < 0 || target < 0 || target >= visual.value.blocks.length) return
  const item = visual.value.blocks.splice(index, 1)[0]
  if (item) visual.value.blocks.splice(target, 0, item)
}

const handleBlockImage = (event: Event) => readImage(event, (src) => {
  if (selectedBlock.value?.type === 'image') selectedBlock.value.src = src
  saveStatus.value = 'Image added.'
})

useSeoMeta({ title: 'Make your page — Outbuy Me', description: 'Create a promo card or build a page before you take over Outbuy Me.', robots: 'noindex, nofollow' })
</script>

<template>
  <div class="studio-page-root">
    <a class="skip-link" href="#studio-main">Skip to the studio</a>
    <div class="studio-shell">
      <SiteHeader />
      <main id="studio-main">
      <section v-if="mode === null" class="choice notebook-paper" aria-labelledby="studio-choice-title">
        <div class="choice__intro">
          <p class="eyebrow">Make it before you buy it</p>
          <h1 id="studio-choice-title" tabindex="-1">What are you putting up?</h1>
          <p class="choice__lead">Start a draft now. You only pay when you’re ready to put it live.</p>
          <p v-if="draftRestored" class="restored-note">✓ A saved draft is waiting on this device.</p>
        </div>
        <div class="choice__options">
          <button class="choice-card choice-card--promo" type="button" @click="selectMode('promo')">
            <span class="choice-card__number">01</span><span class="postcard-mini" aria-hidden="true"><i /><b>YOUR THING</b><em>links · links · links</em></span><strong>Quick promo</strong><span>A photo, a short pitch and as many links as you need.</span><span class="choice-card__action">Make a promo →</span>
          </button>
          <button class="choice-card choice-card--editor" type="button" @click="selectMode('visual')">
            <span class="choice-card__number">02</span><span class="builder-mini" aria-hidden="true"><i>T</i><i>▧</i><i>↗</i></span><strong>Build a page</strong><span>Drop in text, images and links, then move and style them yourself.</span><span class="choice-card__action">Open the builder →</span>
          </button>
        </div>
      </section>

      <section v-else class="workspace" aria-labelledby="studio-editor-title">
        <aside class="workspace__controls">
          <div class="workspace__heading">
            <button class="back-button" type="button" @click="returnToChooser">← Back to options</button>
            <p class="eyebrow">{{ mode === 'promo' ? 'Quick promo' : 'Page builder' }}</p>
            <h1 id="studio-editor-title" tabindex="-1">{{ mode === 'promo' ? 'Make a postcard.' : 'Make the page.' }}</h1>
            <a class="preview-jump" href="#studio-preview">Jump to preview ↓</a>
          </div>

          <form v-if="mode === 'promo'" class="editor-form" @submit.prevent="saveDraft">
            <div class="field"><label for="promo-name">Name or handle</label><input id="promo-name" v-model="promo.displayName" maxlength="50" required></div>
            <div class="field"><label for="promo-headline">Headline</label><input id="promo-headline" v-model="promo.headline" maxlength="120" required></div>
            <div class="field"><label for="promo-headline-size">Headline size</label><select id="promo-headline-size" v-model="promo.headlineSize"><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option></select></div>
            <div class="field"><label for="promo-description">Short pitch</label><textarea id="promo-description" v-model="promo.description" maxlength="400" /><small>{{ promo.description.length }}/400</small></div>
            <fieldset class="theme-picker"><legend>Paper colour</legend><label v-for="theme in ['paper', 'pink', 'blue', 'yellow']" :key="theme"><input v-model="promo.theme" type="radio" :value="theme"><span :class="`swatch swatch--${theme}`">{{ theme }}</span></label></fieldset>
            <div class="field"><label for="promo-avatar">Photo or logo</label><input id="promo-avatar" accept="image/*" type="file" @change="handleAvatar"><small>PNG, JPG, GIF or WebP. Up to 1.5 MB.</small></div>
            <fieldset class="link-editor">
              <legend>Your links</legend>
              <div v-for="(link, index) in promo.links" :key="link.id" class="link-row">
                <span>{{ index + 1 }}</span>
                <div class="field"><label :for="`promo-link-label-${index}`">Label</label><input :id="`promo-link-label-${index}`" v-model="link.label" maxlength="40" required></div>
                <div class="field"><label :for="`promo-link-url-${index}`">URL</label><input :id="`promo-link-url-${index}`" v-model="link.url" inputmode="url" type="url" required></div>
                <button type="button" aria-label="Remove link" @click="removePromoLink(index)">×</button>
              </div>
              <button class="add-control" type="button" @click="addPromoLink">+ Add another link</button>
            </fieldset>
            <div class="studio-actions"><button class="button button--paper" type="submit">Save draft</button><button class="button button--takeover" type="button" @click="beginTakeover">Take over for $5 USD</button></div>
          </form>

          <div v-else class="builder-controls">
            <section aria-labelledby="toolbox-title">
              <h2 id="toolbox-title">Add something</h2>
              <p class="control-hint">Click to add, or drag it where you want it.</p>
              <div class="toolbox">
                <button v-for="tool in pageTools" :key="tool.type" type="button" draggable="true" @click="addBlock(tool.type)" @dragstart="startPaletteDrag($event, tool.type)"><span aria-hidden="true">{{ tool.icon }}</span>{{ tool.label }}</button>
              </div>
            </section>
            <fieldset class="theme-picker"><legend>Page background</legend><label v-for="background in ['paper', 'white', 'pink', 'yellow', 'blue']" :key="background"><input v-model="visual.background" type="radio" :value="background"><span :class="`swatch swatch--${background}`">{{ background }}</span></label></fieldset>
            <section v-if="selectedBlock" class="inspector" aria-labelledby="inspector-title">
              <div class="inspector__title"><h2 id="inspector-title">Edit {{ selectedBlock.type }}</h2><button type="button" @click="removeSelectedBlock">Remove {{ selectedBlock.type }}</button></div>
              <template v-if="selectedBlock.type === 'text'">
                <div class="field"><label for="block-text">Words</label><textarea id="block-text" v-model="selectedBlock.text" maxlength="500" /></div>
                <div class="field"><label for="block-text-style">Style</label><select id="block-text-style" v-model="selectedBlock.style"><option value="heading">Big heading</option><option value="body">Body text</option><option value="scribble">Handwritten note</option></select></div>
                <div class="field"><label for="block-text-size">Text size</label><select id="block-text-size" v-model="selectedBlock.size"><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="huge">Huge</option></select></div>
                <div class="field"><label for="block-colour">Ink colour</label><select id="block-colour" v-model="selectedBlock.colour"><option value="ink">Black</option><option value="pink">Pink</option><option value="blue">Blue</option><option value="orange">Orange</option><option value="yellow">Dark yellow</option><option value="paper">Paper</option></select></div>
              </template>
              <template v-else-if="selectedBlock.type === 'image'">
                <div class="field"><label for="block-image-file">Upload image</label><input id="block-image-file" accept="image/*" type="file" @change="handleBlockImage"></div>
                <div class="field"><label for="block-image-url">Or paste an image URL</label><input id="block-image-url" v-model="selectedBlock.src" inputmode="url"></div>
                <div class="field"><label for="block-image-alt">Image description</label><input id="block-image-alt" v-model="selectedBlock.alt" maxlength="180"><small>Describe the image for people who cannot see it.</small></div>
                <div class="field"><label for="block-rotation">Tilt: {{ selectedBlock.rotation }}°</label><input id="block-rotation" v-model.number="selectedBlock.rotation" min="-12" max="12" type="range"></div>
              </template>
              <template v-else-if="selectedBlock.type === 'link'">
                <div class="field"><label for="block-link-label">Link label</label><input id="block-link-label" v-model="selectedBlock.label" maxlength="40"></div>
                <div class="field"><label for="block-link-url">URL</label><input id="block-link-url" v-model="selectedBlock.url" inputmode="url" type="url"></div>
                <div class="field"><label for="block-link-style">Style</label><select id="block-link-style" v-model="selectedBlock.style"><option value="button">Button</option><option value="underline">Underlined link</option></select></div>
                <div class="field"><label for="block-link-colour">Button colour</label><select id="block-link-colour" v-model="selectedBlock.colour"><option value="yellow">Yellow</option><option value="pink">Pink</option><option value="blue">Blue</option><option value="orange">Orange</option><option value="paper">Paper</option><option value="ink">Black</option></select></div>
              </template>
              <template v-else>
                <div class="field"><label for="block-shape">Shape</label><select id="block-shape" v-model="selectedBlock.shape"><option value="rectangle">Rectangle</option><option value="circle">Circle</option><option value="star">Star</option><option value="arrow">Arrow</option><option value="highlighter">Highlighter</option></select></div>
                <div class="field"><label for="block-shape-colour">Colour</label><select id="block-shape-colour" v-model="selectedBlock.colour"><option value="yellow">Yellow</option><option value="pink">Pink</option><option value="blue">Blue</option><option value="orange">Orange</option><option value="paper">Paper</option><option value="ink">Black</option></select></div>
                <div class="field"><label for="block-shape-rotation">Tilt: {{ selectedBlock.rotation }}°</label><input id="block-shape-rotation" v-model.number="selectedBlock.rotation" min="-180" max="180" type="range"></div>
              </template>
              <p class="canvas-help"><strong>On the page:</strong> drag anywhere on the item to move it. Drag the yellow corner to resize. Arrow keys move; Shift + arrow keys resize.</p>
              <div class="layer-controls"><button type="button" @click="moveSelectedLayer(-1)">Send back</button><button type="button" @click="moveSelectedLayer(1)">Bring forward</button></div>
            </section>
            <p v-else class="control-hint">Select something on the page to edit it.</p>
            <div class="studio-actions"><button class="button button--paper" type="button" @click="saveDraft">Save draft</button><button class="button button--takeover" type="button" @click="beginTakeover">Take over for $5 USD</button></div>
          </div>
          <div class="status-row"><p class="save-status" role="status">{{ saveStatus }}</p><button v-if="lastRemoval" type="button" @click="undoRemoval">Undo</button></div>
        </aside>

        <section id="studio-preview" class="workspace__preview" :aria-label="mode === 'promo' ? 'Promo preview' : 'Page builder canvas'">
          <div class="preview-label"><span>{{ mode === 'promo' ? 'Live preview' : 'Your page' }}</span><span>{{ mode === 'promo' ? 'Scroll to see every link' : 'Drag to move · yellow corner resizes' }}</span></div>
          <div class="preview-frame">
            <div class="mini-bar" aria-hidden="true"><strong>OUTBUY ME</strong><span>Take over · $10 USD</span></div>
            <PromoCard v-if="mode === 'promo'" :content="promo" preview />
            <BuilderCanvas v-else :content="visual" :selected-id="selectedBlockId" @select="selectedBlockId = $event" @move="moveBlock" @resize="resizeBlock" @add="addBlock($event.type, $event)" />
          </div>
        </section>
      </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.studio-page-root { min-height: 100dvh; }
.studio-shell { min-height: 100dvh; background: var(--paper); }
.studio-shell > :deep(.site-header) { position: sticky; z-index: 40; top: 0; }
.choice { display: grid; min-height: calc(100dvh - var(--header-height)); align-content: center; gap: clamp(1.5rem, 4vw, 2.5rem); padding: clamp(2rem, 6vw, 5rem); }
.choice__intro { max-width: 62rem; }
.choice__intro h1, .workspace__heading h1 { margin: 0.35rem 0 0.8rem; font-family: var(--font-display); font-size: clamp(2.8rem, 7vw, 6.5rem); letter-spacing: -0.045em; line-height: 0.96; }
.choice__lead { max-width: 48rem; margin: 0; font-size: clamp(1rem, 1.8vw, 1.25rem); line-height: 1.5; }
.restored-note { width: fit-content; border-bottom: 0.45rem solid rgba(233,255,104,.8); margin-top: 1rem !important; font-family: var(--font-hand); font-size: 0.95rem !important; }
.choice__options { display: grid; gap: 1.5rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.choice-card { position: relative; display: grid; min-height: 22rem; align-content: start; border: var(--line); border-radius: var(--radius); background: white; box-shadow: var(--shadow); gap: 0.8rem; padding: clamp(1.2rem, 3vw, 2rem); text-align: left; transition: transform 130ms ease, box-shadow 130ms ease; }
.choice-card:hover, .choice-card:focus-visible { transform: translate(-3px, -3px); box-shadow: 8px 8px 0 var(--ink); }
.choice-card--promo { background: #ffe2f1; }
.choice-card--editor { background: #dceaff; }
.choice-card__number { position: absolute; top: 1rem; right: 1rem; font-family: var(--font-hand); font-weight: 900; }
.choice-card > strong { margin-top: 0.3rem; font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1; }
.choice-card__action { align-self: end; margin-top: 0.5rem; font-weight: 900; text-decoration: underline; text-underline-offset: 0.25rem; }
.postcard-mini { position: relative; display: grid; width: min(100%, 25rem); height: 8rem; align-content: center; border: var(--line); background: #fffdf6; box-shadow: 4px 5px 0 rgba(32,32,31,.2); gap: 0.4rem; padding: 1rem 1rem 1rem 5rem; transform: rotate(-1deg); }
.postcard-mini i { position: absolute; top: 50%; left: 1rem; width: 3rem; aspect-ratio: 1; border: var(--line); border-radius: 50%; background: var(--pink); transform: translateY(-50%); }
.postcard-mini em { font-family: var(--font-hand); font-style: normal; }
.builder-mini { display: flex; width: min(100%, 25rem); height: 8rem; align-items: center; justify-content: space-around; border: var(--line); background: var(--paper); font-family: var(--font-display); font-size: 2.5rem; }
.builder-mini i { display: grid; width: 3.5rem; aspect-ratio: 1; place-items: center; border: 1px dashed var(--blue); font-style: normal; }
.workspace { display: grid; height: calc(100dvh - var(--header-height)); min-height: 560px; overflow: hidden; grid-template-columns: minmax(340px, 0.68fr) minmax(500px, 1.32fr); }
.workspace__controls { min-height: 0; overflow-y: auto; border-right: var(--line); padding: clamp(1.2rem, 2.5vw, 2rem); overscroll-behavior: contain; }
.workspace__heading h1 { font-size: clamp(2.6rem, 4.5vw, 4.5rem); }
.preview-jump { display: none; min-height: 40px; align-items: center; font-size: 0.8rem; font-weight: 900; }
.back-button { min-height: 44px; border: 0; background: transparent; padding: 0; font-weight: 900; text-decoration: underline; text-underline-offset: 0.25rem; }
.editor-form, .builder-controls { display: grid; gap: 1.15rem; margin-top: 1.6rem; }
.theme-picker, .link-editor { display: flex; flex-wrap: wrap; border: 0; gap: 0.45rem; margin: 0; padding: 0; }
.theme-picker legend, .link-editor legend, .builder-controls h2 { width: 100%; margin: 0 0 0.4rem; font-size: 0.78rem; font-weight: 900; letter-spacing: 0.07em; text-transform: uppercase; }
.theme-picker label { position: relative; }
.theme-picker input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.theme-picker label > span { display: grid; min-width: 4.5rem; min-height: 42px; place-items: center; border: var(--line); background: white; padding: 0.45rem; font-size: 0.72rem; font-weight: 900; text-transform: capitalize; }
.theme-picker input:checked + span { box-shadow: inset 0 0 0 3px currentColor; text-decoration: underline; }
.theme-picker input:focus-visible + span { outline: 3px solid var(--blue); outline-offset: 3px; }
.swatch--paper, .swatch--white { background: #fffdf6 !important; }
.swatch--pink { background: #ffe2f1 !important; }
.swatch--blue { background: #dceaff !important; }
.swatch--yellow { background: #f6ffb4 !important; }
.link-editor { display: grid; gap: 0.8rem; }
.link-row { display: grid; align-items: end; border-bottom: 1px dashed #aaa394; gap: 0.5rem; grid-template-columns: auto 0.8fr 1.2fr auto; padding-bottom: 0.8rem; }
.link-row > span { align-self: center; font-family: var(--font-hand); font-weight: 900; }
.link-row > button, .inspector__title button { min-width: 40px; min-height: 40px; border: 1px solid var(--ink); background: white; font-weight: 900; }
.add-control { min-height: 44px; border: 2px dashed var(--ink); background: white; padding: 0.6rem; font-weight: 900; }
.toolbox { display: grid; gap: 0.5rem; grid-template-columns: repeat(3, 1fr); }
.toolbox button { display: grid; min-height: 82px; place-items: center; border: var(--line); background: white; font-weight: 900; }
.toolbox button span { font-family: var(--font-display); font-size: 1.8rem; }
.control-hint { margin: 0 0 0.7rem; color: var(--muted); font-size: 0.82rem; line-height: 1.4; }
.inspector { display: grid; border-top: var(--line); gap: 1rem; padding-top: 1rem; }
.inspector__title { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.inspector__title h2 { margin: 0; }
.canvas-help { border: 1px dashed #aaa394; background: #fff; margin: 0; padding: 0.8rem; color: var(--muted); font-size: 0.8rem; line-height: 1.45; }
.layer-controls { display: grid; gap: 0.5rem; grid-template-columns: 1fr 1fr; }
.layer-controls button { min-height: 42px; border: var(--line); background: white; font-weight: 800; }
.studio-actions { display: grid; gap: 0.65rem; grid-template-columns: 0.75fr 1.25fr; }
.button--takeover { background: var(--yellow); color: var(--ink); }
.status-row { display: flex; min-height: 2.5rem; align-items: center; gap: 0.75rem; margin-top: 0.7rem; }
.save-status { margin: 0; color: var(--muted); font-size: 0.85rem; }
.status-row button { min-height: 36px; border: 0; background: transparent; font-weight: 900; text-decoration: underline; text-underline-offset: 0.2rem; }
.workspace__preview { display: grid; min-width: 0; min-height: 0; background: var(--paper-deep); grid-template-rows: auto minmax(0, 1fr); padding: clamp(0.8rem, 2vw, 1.5rem); }
.preview-label { display: flex; justify-content: space-between; padding-bottom: 0.55rem; font-size: 0.7rem; font-weight: 900; letter-spacing: 0.07em; text-transform: uppercase; }
.preview-frame { display: grid; min-height: 0; overflow: auto; border: 3px solid var(--ink); background: white; box-shadow: 5px 5px 0 var(--ink); grid-template-rows: auto minmax(100%, auto); overscroll-behavior: contain; }
.mini-bar { position: sticky; z-index: 5; top: 0; display: flex; min-height: 40px; align-items: center; justify-content: space-between; background: var(--ink); color: white; padding: 0.45rem 0.65rem; font-size: 0.7rem; }
.mini-bar span { background: var(--yellow); color: var(--ink); padding: 0.35rem 0.5rem; font-weight: 900; }
@media (max-width: 950px) {
  .workspace { height: auto; min-height: 0; overflow: visible; grid-template-columns: 1fr; }
  .workspace__controls { overflow: visible; border-right: 0; }
  .workspace__preview { height: 72dvh; min-height: 520px; }
  .preview-jump { display: inline-flex; }
}
@media (max-width: 700px) {
  .choice__options { grid-template-columns: 1fr; }
  .choice-card { min-height: 20rem; }
  .link-row { grid-template-columns: auto 1fr auto; }
  .link-row .field:nth-of-type(2) { grid-column: 2 / 4; }
  .studio-actions { grid-template-columns: 1fr; }
  .workspace__preview { height: 75dvh; padding: 0.7rem; }
}
@media (prefers-reduced-motion: reduce) { .choice-card { transition: none; } }
</style>
