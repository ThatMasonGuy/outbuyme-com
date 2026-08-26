export type PromoTheme = 'paper' | 'pink' | 'blue' | 'yellow'
export type PromoHeadlineSize = 'small' | 'medium' | 'large'
export type CanvasBackground = 'paper' | 'white' | 'pink' | 'yellow' | 'blue'
export type TextStyle = 'heading' | 'body' | 'scribble'
export type TextSize = 'small' | 'medium' | 'large' | 'huge'
export type LinkStyle = 'button' | 'underline'
export type BlockColour = 'ink' | 'pink' | 'blue' | 'orange' | 'yellow' | 'paper'
export type ShapeKind = 'rectangle' | 'circle' | 'star' | 'arrow' | 'highlighter'

export interface PromoLink {
  id: string
  label: string
  url: string
}

export interface PromoCardContent {
  type: 'promo'
  displayName: string
  headline: string
  description: string
  avatarDataUrl: string
  theme: PromoTheme
  headlineSize: PromoHeadlineSize
  links: PromoLink[]
}

interface BlockPosition {
  id: string
  x: number
  y: number
  width: number
  height: number
}

export interface TextBlock extends BlockPosition {
  type: 'text'
  text: string
  style: TextStyle
  size: TextSize
  colour: BlockColour
}

export interface ImageBlock extends BlockPosition {
  type: 'image'
  src: string
  alt: string
  rotation: number
}

export interface LinkBlock extends BlockPosition {
  type: 'link'
  label: string
  url: string
  style: LinkStyle
  colour: BlockColour
}

export interface ShapeBlock extends BlockPosition {
  type: 'shape'
  shape: ShapeKind
  colour: BlockColour
  rotation: number
}

export type PageBlock = TextBlock | ImageBlock | LinkBlock | ShapeBlock

export interface VisualPageContent {
  type: 'visual'
  background: CanvasBackground
  blocks: PageBlock[]
}

export type OwnerContent = PromoCardContent | VisualPageContent

export interface HistoryEntry {
  slug: string
  takeoverNumber: number
  ownerName: string
  priceUsd: number
  startedAt: string
  endedAt: string
  content: OwnerContent
  visibility: 'public' | 'removed'
  removedAt?: string
}
