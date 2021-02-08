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
      >
        Built by JOE
      </v-btn>
      <v-col
        class="indigo py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Shadows</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>