<template>
  <v-app-bar 
    color="indigo"
    dense
    dark
    app
    elevate-on-scroll
    class="px-md-14 px-lg-14"
    >
    <v-app-bar-title>
      <img src="@/assets/shadows-logo.svg" width="131" height="22" alt="Shadows logo" />
    </v-app-bar-title>
    
    <v-spacer></v-spacer>
    <!-- <template v-slot:extension> -->
      <!-- <v-btn
      color="white"
      text
      rounded
      class="my-2"
      :to="{ path: '/',hash:''}"
      nuxt
    >
      Builder
    </v-btn> -->
    <!-- <v-btn
        color="white"
        text
        rounded
        class="my-2"
        :to="{ path: '/',hash:'#presets'}"
        nuxt
      >
        Presets
      </v-btn> -->
      <v-btn 
        icon
        href="https://github.com/jcz530/shadows"
        rel="noopener"
        target="_blank"
      >
        <IconGithub style="height: 2em; width: 2em;" class='text--white' />
      </v-btn>
    <!-- </template> -->
  </v-app-bar>
</template>
<script>
import IconGithub from '@/assets/icons/github.svg?inline'

export default {
  components: {
    IconGithub,
  },
}
</script>