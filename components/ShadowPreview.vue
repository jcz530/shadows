<template>
<div>
  
  <v-row 
    v-if="viewType == 'varied'"
    class="mt-8"
  >
    <v-col
      align-self="center"
      align="center"
      v-for="(size, i) in sizes"
      v-bind:key="i"
    >
      <div 
        :style="`${styles}width:${size.width}rem;height:${size.height}rem;`"
        class="bg-white"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </v-col>
  </v-row>

  <v-row 
    v-else
    class="mt-8"
  >

    <v-col
      align-self="center"
      align="center"
      v-for="i in grid.items"
      v-bind:key="i"
    >
      <div 
        :style="styles"
        class="bg-white"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </v-col>
    <!-- <v-col>
      <div 
        :style="styles" 
        class="bg-white mx-16"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </v-col>
    <v-col>
      <div 
        :style="styles"
        class="bg-white mx-16"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </v-col> -->
  </v-row>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      // w-16 h-8
    //  w-40 h-40
    // w-64 h-64

    sizes: [
      {width: '7', height: '2.5'},
      {width: '10', height: '10'},
      {width: '20', height: '20'},
    ]

    }
  },
  computed: {
    ...mapGetters({
      cssShadow: 'builder/cssShadow',
      // box: 'settings/box',
    }),
    box() {
      return this.$store.state.settings.box
    },
    grid() {
      return this.$store.state.settings.grid
    },
    viewType() {
      return this.$store.state.settings.type
    },
    styles() {
      let css = `${this.cssShadow};` 
      css += `border-radius:${this.box.borderRadius}rem;`
      css += `background-color:${this.box.bg.color};`
      if (this.viewType !== 'varied') {
        css += `height:${this.box.height}vh;`
        css += `width:${this.box.width}vw;`
      }
      // ${hexToRgba(this.$store.state.settings.bg.color, this.$store.state.settings.bg.opacity)}
      return css
    },
  },
  methods: {
    
  },
  mounted() {
    
  },
}
</script>
