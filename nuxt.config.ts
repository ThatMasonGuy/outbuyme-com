export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    public: {
      siteUrl: 'https://outbuyme.com',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-AU' },
      meta: [
        { name: 'theme-color', content: '#f4ff53' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
