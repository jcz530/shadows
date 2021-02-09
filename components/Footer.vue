<template>
  <v-footer
      color="indigo darken-1"
      padless
    >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-btn 
        icon
        rounded
        color="white"
        href="https://github.com/jcz530/shadows"
        rel="noopener"
        target="_blank"
        class="my-2 mx-3"
      >
        <IconGithub style="height: 2em; width: 2em;" class='white--textx' />
      </v-btn>
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
        href="https://joeczubiak.com?ref=shadows"
        target="_blank"
        rel="noopener"
      >
        Built by <img class='d-inline ml-1' style="height: 1em" src="https://joeczubiak.com/images/joe-czubiak-logo.svg" width="35" height="14" alt="Joe Czubiak logo" />
      </v-btn>
      <v-col
        class="indigo py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Shadows: A CSS Box Shadow Generator</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
import IconGithub from '@/assets/icons/github.svg?inline'

export default {
  components: {
    IconGithub,
  },
  data() {
    return {
      links: [],
    }
  }
}
</script>