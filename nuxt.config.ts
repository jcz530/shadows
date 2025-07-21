// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/plausible',
  ],
  css: ['./assets/css/main.css'],
  components: [
    {
      pathPrefix: false,
    },
  ],
  imports: {
    scan: false,
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  plausible: {
    domain: 'shadows.joeczubiak.com',
    ignoredHostnames: ['localhost'],
    apiHost: 'https://plausible.io',
    autoOutboundTracking: true,
  },
  head: {
    title: 'Shadows',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#da532c',
      },
      { hid: 'theme-color', name: 'theme-color', content: '#4963c7' },

      { hid: 'og:site-name', property: 'og:site_name', content: 'Shadows' },
      { hid: 'og:type', property: 'og:type', content: 'Website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Shadows: CSS Box-Shadow Generator',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          "It's a better CSS Box-Shadow Generator. Generate multi-layered CSS box shadows. It has presets for Material Design and TailwindCSS shadows.",
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://shadows.joeczubiak.com',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://shadows.joeczubiak.com/shadows-social-image.png',
      },
      { hid: 'og:image-width', property: 'og:image:width', content: '1000' },
      { hid: 'og:image-height', property: 'og:image:height', content: '523' },

      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Shadows: CSS Box-Shadow Generator',
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content:
          "It's a better CSS Box-Shadow Generator. Generate multi-layered CSS box shadows. It has presets for Material Design and TailwindCSS shadows.",
      },
      { hid: 'twitter:site', property: 'twitter:site', content: 'Shadows' },
      {
        hid: 'twitter:creator',
        property: 'twitter:creator',
        content: '@joeczubiak',
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://shadows.joeczubiak.com/shadows-social-image.png',
      },

      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: 'https://shadows.joeczubiak.com',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        color: '#5bbad5',
        href: '/favicons/safari-pinned-tab.svg',
      },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  },
})
