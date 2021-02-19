<template>
  <div>
    <v-app>
      <AppBar />
      <v-main :style="bgColor">
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <Nuxt />
        </v-container>
      </v-main>

      <Footer />
    </v-app>
  </div>
</template>
<script>
import { hexToRgba } from '../utils/colors'

export default {
  data() {
    return {}
  },
  computed: {
    bgColor() {
      return `background: ${hexToRgba(
        this.$store.state.settings.bg.color,
        this.$store.state.settings.bg.opacity
      )}`
    },
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
