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
        color="white"
        text
        rounded
        class="my-2"
        href="https://joeczubiak.com?ref=shadows"
        target="_blank"
        rel="noopener"
      >
        Built by JOE
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
export default {
  data() {
    return {
      links: [],
    }
  }
}
</script>