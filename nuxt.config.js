export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Shadows',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#da532c' },
      { hid: 'theme-color', name: 'theme-color', content: '#ffffff' },

      { hid: 'og:site-name', property:'og:site_name', content: 'Shadows' },
      { hid: 'og:type', property:'og:type', content: 'Website' },
      { hid: 'og:title', property:'og:title', content: 'Shadows: CSS Box-Shadow Generator' },
      { hid: 'og:description', property:'og:description', content: 'It\'s a better CSS Box-Shadow Generator. Generate multi-layered CSS box shadows. It has presets for Material Design and TailwindCSS shadows.' },
      { hid: 'og:url', property:'og:url', content: 'https://shadows.joeczubiak.com' },
      { hid: 'og:image', property:'og:image', content: 'https://shadows.joeczubiak.com/shadows-social-image.png' },
      { hid: 'og:image-width', property:'og:image:width', content: '1000' },
      { hid: 'og:image-height', property:'og:image:height', content: '523' },

      { hid: 'twitter:title', property:'twitter:title', content: 'Shadows: CSS Box-Shadow Generator' },
      { hid: 'twitter:description', property:'twitter:description', content: 'It\'s a better CSS Box-Shadow Generator. Generate multi-layered CSS box shadows. It has presets for Material Design and TailwindCSS shadows.' },
      { hid: 'twitter:site', property:'twitter:site', content: 'Shadows' },
      { hid: 'twitter:creator', property:'twitter:creator', content: '@joeczubiak' },
      { hid: 'twitter:card', property:'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:image', property:'twitter:image', content: 'https://shadows.joeczubiak.com/shadows-social-image.png' },

      { hid: 'twitter:url', property:'twitter:url', content: 'https://shadows.joeczubiak.com' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '@/assets/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/assets/favicons/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: "180x180", href: '/assets/favicons/apple-touch-icon.png' },
      { rel: 'manifest', href: '/assets/favicons/site.webmanifest' },
      { rel: 'mask-icon', color: "#5bbad5", href: '/assets/favicons/safari-pinned-tab.svg' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  'google-gtag': {
    id: process.env.gtag,
    config: {
    },
    debug: false, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  },

  vuetify: {
    customVariables: ['~/assets/sass/variables.scss'],
    treeShake: true
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/google-gtag',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
