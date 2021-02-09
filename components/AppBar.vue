<template>
  <v-app-bar 
    color="indigo"
    dense
    dark
    class="px-14"
    >
    <v-app-bar-title>
      Shadows: A CSS Box-Shadow Generator
    </v-app-bar-title>
    
    <v-spacer></v-spacer>
    <v-btn
      color="white"
      text
      rounded
      class="my-2"
      :to="{ path: '/',hash:''}"
      nuxt
    >
      Builder
    </v-btn>
    <v-btn
        color="white"
        text
        rounded
        class="my-2"
        :to="{ path: '/',hash:'#presets'}"
        nuxt
      >
        Presets
      </v-btn>
      <v-btn 
        icon
        href="https://github.com/jcz530/shadows"
        rel="noopener"
        target="_blank"
      >
        <IconGithub style="height: 2em; width: 2em;" class='text--white' />
      </v-btn>
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