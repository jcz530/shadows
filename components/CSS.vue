<template>
  <div>
    <v-row>
      <v-col 
        class="text-center"
      >
        <p class='overline'>Your CSS</p>
        <v-card-text class="my-4 " style="white-space: pre;">{{cssShadow}}</v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        class="text-center"
      >
          <v-btn
            elevation="1"
            color="indigo"
            dark
            @click="copyCSS"
          >
            Copy
          </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { copy } from "../utils/clipboard"

export default {
  data() {
    return {
     
    }
  },
  computed: {
    ...mapGetters({
      cssShadow: 'builder/cssShadow',
    }),
  },
  methods: {
    ...mapMutations({
      addShadow: 'builder/addShadow'
    }),

    copyCSS() {
      copy(this.cssShadow)
    },
  },
  mounted() {
    
  },
}
</script>