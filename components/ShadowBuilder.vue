<template>
  <div>
    <v-row
      no-gutters
      class="flex-nowrap"
      style="overflow: scroll"
    >
      <v-col 
        style="max-width: 61px"
        class="text-center overline"
      >
        On/Off
      </v-col>

      <v-col
        class="text-center overline"
      >
        Angle
      </v-col>
      
      <v-col
        class="text-center overline"
      >
        Distance
      </v-col>

      <v-col 
        class="text-center overline"
      >
        Blur
      </v-col>

      <v-col
        class="text-center overline"
      >
        Spread
      </v-col>
      <v-col 
        style="max-width: 61px"
        class="text-center overline"
      >
        Color
      </v-col>
      <v-col
        class="text-center overline"
      >
        Opacity
      </v-col>
      <v-col
        class="text-center overline"
      >
        Actions
      </v-col>
    </v-row>

    <div 
      v-for="shadow in shadows" 
      v-bind:key="shadow.id"
    >
      <v-divider></v-divider>
      <ShadowBuilderInputRow :shadow="shadow"/>
      
    </div>

    <v-btn 
      color="indigo"
      elevation="1"
      @click="addNew"
      dark
      class='mx-2 mt-3'
    >
      Add Shadow
    </v-btn>
    <v-btn 
      color="red"
      elevation="1"
      @click="clear"
      dark
      class='mx-2 mt-3'
    >
      Clear
    </v-btn>

    <v-btn 
      color="blue"
      elevation="1"
      @click="copyCSS"
      dark
      class='mx-2 mt-3'
    >
      Copy CSS
    </v-btn>
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
      cssToShadow: 'presets/cssToShadow',
      shadows: 'builder/shadows',
      cssShadow: 'builder/cssShadow',
    }),
  },
  methods: {
    ...mapMutations({
      addNew: 'builder/addShadow',
      clear: 'builder/clearShadows',
    }),
    copyCSS() {
      copy(this.cssShadow)
    },
  },
}
</script>
<style scoped>
  @media (max-width: 768px) {
    .overline {
      font-size: 0.6rem!important;
    }
  }
  @media (max-width: 600px) {
    .overline {
      font-size: 0.52rem!important;
    }
  }
</style>