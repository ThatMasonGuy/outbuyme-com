import type { PageBlock, PromoCardContent, ShapeKind, TextStyle, VisualPageContent } from '#shared/types/content'

export type PageTool = PageBlock['type'] | 'handwriting' | ShapeKind

let nextId = 1
export const makeBlockId = () => `block-${Date.now()}-${nextId++}`

export const makeBlock = (tool: PageTool, index = 0): PageBlock => {
  const base = { id: makeBlockId(), x: 8 + (index % 3) * 5, y: 70 + index * 95, width: 58, height: 130 }

  if (tool === 'image') return { ...base, type: 'image', height: 260, src: '', alt: '', rotation: -2 }
  if (tool === 'link') return { ...base, type: 'link', width: 30, height: 54, label: 'Visit my link', url: 'https://example.com', style: 'button', colour: 'yellow' }
  if (['rectangle', 'circle', 'star', 'arrow', 'highlighter', 'shape'].includes(tool)) {
    const shape = (tool === 'shape' ? 'rectangle' : tool) as ShapeKind
    return { ...base, type: 'shape', width: shape === 'arrow' ? 30 : 38, height: shape === 'highlighter' ? 48 : 150, shape, colour: shape === 'highlighter' ? 'pink' : 'yellow', rotation: shape === 'highlighter' ? -2 : 0 }
  }
  const style: TextStyle = tool === 'handwriting' ? 'scribble' : 'body'
  return { ...base, type: 'text', height: style === 'scribble' ? 90 : 130, text: style === 'scribble' ? 'Write a note' : 'Write something here', style, size: style === 'scribble' ? 'medium' : 'medium', colour: 'ink' }
}

const defaultPromo = (): PromoCardContent => ({
  type: 'promo',
  displayName: 'Your name',
  headline: 'Here is my corner of the internet.',
  description: 'A launch, a profile, a joke or whatever you want people to see before the next person takes over.',
  avatarDataUrl: '',
  theme: 'pink',
  headlineSize: 'small',
  links: [
    { id: 'promo-link-1', label: 'My website', url: 'https://example.com' },
    { id: 'promo-link-2', label: 'Follow me', url: 'https://x.com/' },
  ],
})

const defaultVisual = (): VisualPageContent => ({
  type: 'visual',
  background: 'paper',
  blocks: [
    { id: 'starter-highlight', type: 'shape', shape: 'highlighter', colour: 'pink', rotation: -1, x: 7, y: 188, width: 70, height: 54 },
    { id: 'starter-title', type: 'text', text: 'This page is mine for now.', style: 'heading', size: 'huge', colour: 'ink', x: 8, y: 70, width: 72, height: 190 },
    { id: 'starter-note', type: 'text', text: 'I can put almost anything here. You can replace it by outbuying me.', style: 'body', size: 'medium', colour: 'ink', x: 10, y: 330, width: 48, height: 110 },
    { id: 'starter-link', type: 'link', label: 'Go somewhere good', url: 'https://example.com', style: 'button', colour: 'yellow', x: 10, y: 455, width: 30, height: 54 },
  ],
})

export function useOwnerDraft() {
  const promo = useState<PromoCardContent>('owner-promo-draft', defaultPromo)
  const visual = useState<VisualPageContent>('owner-visual-draft', defaultVisual)

  return { promo, visual }
}
