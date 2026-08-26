import { z } from 'zod'

export const publicHttpUrl = z
  .string()
  .trim()
  .max(2048)
  .url()
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol
      return protocol === 'https:' || protocol === 'http:'
    }
    catch {
      return false
    }
  }, 'Use a full http or https URL')

const imageSource = z.string().max(2_000_000).refine(
  value => value === '' || value.startsWith('data:image/') || publicHttpUrl.safeParse(value).success,
  'Use an image URL or upload an image',
)

const position = {
  id: z.string().trim().min(1).max(80),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(1600),
  width: z.number().min(8).max(100),
  height: z.number().min(36).max(900),
}

const promoLinkSchema = z.object({
  id: z.string().trim().min(1).max(80),
  label: z.string().trim().min(1).max(40),
  url: publicHttpUrl,
})

export const promoCardSchema = z.object({
  type: z.literal('promo'),
  displayName: z.string().trim().min(1).max(50),
  headline: z.string().trim().min(1).max(120),
  description: z.string().trim().max(400),
  avatarDataUrl: imageSource,
  theme: z.enum(['paper', 'pink', 'blue', 'yellow']),
  headlineSize: z.enum(['small', 'medium', 'large']),
  links: z.array(promoLinkSchema).min(1, 'Add at least one link').max(100),
})

const textBlockSchema = z.object({
  ...position,
  type: z.literal('text'),
  text: z.string().trim().min(1).max(500),
  style: z.enum(['heading', 'body', 'scribble']),
  size: z.enum(['small', 'medium', 'large', 'huge']),
  colour: z.enum(['ink', 'pink', 'blue', 'orange', 'yellow', 'paper']),
})

const imageBlockSchema = z.object({
  ...position,
  type: z.literal('image'),
  src: imageSource.refine(value => value !== '', 'Choose an image'),
  alt: z.string().trim().max(180),
  rotation: z.number().min(-12).max(12),
})

const linkBlockSchema = z.object({
  ...position,
  type: z.literal('link'),
  label: z.string().trim().min(1).max(40),
  url: publicHttpUrl,
  style: z.enum(['button', 'underline']),
  colour: z.enum(['ink', 'pink', 'blue', 'orange', 'yellow', 'paper']),
})

const shapeBlockSchema = z.object({
  ...position,
  type: z.literal('shape'),
  shape: z.enum(['rectangle', 'circle', 'star', 'arrow', 'highlighter']),
  colour: z.enum(['ink', 'pink', 'blue', 'orange', 'yellow', 'paper']),
  rotation: z.number().min(-180).max(180),
})

export const pageBlockSchema = z.discriminatedUnion('type', [textBlockSchema, imageBlockSchema, linkBlockSchema, shapeBlockSchema])

export const visualPageSchema = z.object({
  type: z.literal('visual'),
  background: z.enum(['paper', 'white', 'pink', 'yellow', 'blue']),
  blocks: z.array(pageBlockSchema).min(1, 'Add something to the page').max(40),
})

export const ownerContentSchema = z.discriminatedUnion('type', [
  promoCardSchema,
  visualPageSchema,
])
