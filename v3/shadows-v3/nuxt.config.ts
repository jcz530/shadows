// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from 'nuxt/config'


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  css: ['./assets/css/main.css'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  head: {
    title: 'Shadows V3',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Modern CSS Box-Shadow Generator' }
    ]
  }
})
