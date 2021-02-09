<template>
    <v-card class="mb-10">
      <div :style="cssShadow" class="bg-white w-4/5 h-50 border border-solid border-red-300X rounded p-10 mt-16">
        <div class="mb-3 pt-0">
          <v-card-title>
            Your CSS
          </v-card-title>
          <v-card-text class="my-4 " style="white-space: pre;">{{cssShadow}}</v-card-text>
          <v-card-actions>
            <v-btn
              elevation="1"
              color="indigo"
              dark
              @click="copyCSS"
            >
              Copy
            </v-btn>

          </v-card-actions>
          
        </div>
      </div>
    </v-card>
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