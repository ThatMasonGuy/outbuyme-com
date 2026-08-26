import { describe, expect, it } from 'vitest'
import { ownerContentSchema, publicHttpUrl } from '#shared/schemas/content'

describe('owner content validation', () => {
  it('accepts a promo card with several links', () => {
    const result = ownerContentSchema.safeParse({
      type: 'promo',
      displayName: 'Mason',
      headline: 'Look at this thing',
      description: 'A real description.',
      avatarDataUrl: '',
      theme: 'pink',
      headlineSize: 'medium',
      links: [
        { id: 'one', label: 'Website', url: 'https://example.com' },
        { id: 'two', label: 'Follow me', url: 'https://x.com/example' },
      ],
    })

    expect(result.success).toBe(true)
  })

  it.each(['javascript:alert(1)', 'data:text/html,hello', 'file:///c:/secret']) (
    'rejects unsafe link protocol %s',
    (url) => {
      expect(publicHttpUrl.safeParse(url).success).toBe(false)
    },
  )

  it('accepts a page made from movable blocks', () => {
    const result = ownerContentSchema.safeParse({
      type: 'visual',
      background: 'paper',
      blocks: [
        { id: 'highlight', type: 'shape', shape: 'highlighter', colour: 'pink', rotation: -2, x: 7, y: 125, width: 60, height: 44 },
        { id: 'title', type: 'text', text: 'Hello', style: 'heading', size: 'huge', colour: 'ink', x: 8, y: 40, width: 70, height: 160 },
        { id: 'link', type: 'link', label: 'Go', url: 'https://example.com', style: 'button', colour: 'yellow', x: 8, y: 300, width: 30, height: 54 },
      ],
    })

    expect(result.success).toBe(true)
  })

  it('rejects a page with an unsafe block link', () => {
    const result = ownerContentSchema.safeParse({
      type: 'visual',
      background: 'white',
      blocks: [
        { id: 'link', type: 'link', label: 'Nope', url: 'javascript:alert(1)', style: 'button', colour: 'yellow', x: 8, y: 80, width: 30, height: 54 },
      ],
    })

    expect(result.success).toBe(false)
  })
})
