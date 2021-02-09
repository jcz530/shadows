<template>
  <v-row class='mx-8'>
    <v-col class="">
      <p class='overline'>Page</p>
      
      <label
        for="bg-color"
        >
        Background Color
      </label>
      <input
        name="bg-color"
        id="bg-color"
        v-model="bg.color"
        type="color"
        @input="backgroundChange"
      />
      <br />

      View 
      <v-btn-toggle v-model="viewType">
        <v-btn 
          value="uniform"
          @click="setType('uniform')"
        >
          <v-icon color="indigo">mdi-view-grid</v-icon>
        </v-btn>

        <v-btn 
          value="varied"
          @click="setType('varied')"
        >
          <IconVariedBoxes class="indigo--text" />
        </v-btn>
      </v-btn-toggle>

      <v-slider
        hint=""
        label="Num Items"
        max="24"
        min="1"
        thumb-label
        dense
        hide-details
        :disabled="viewType == 'varied'"
        color="indigo"
        track-color="indigo lighten-4"
        v-model="gridItems"
        step="1"
      ></v-slider>
    </v-col>

    <v-col>
      <p class='overline'>Preview Cards</p>
        
      <label
      for="bg-color"
      >
        Background Color
      </label>
      <input
        name="bg-color"
        id="bg-color"
        v-model="boxColor"
        class="" 
        type="color"
      />
      <v-slider
        hint="Radius"
        label="Border Radius"
        max="10"
        min="0"
        thumb-label
        dense
        hide-details
        color="indigo"
        track-color="indigo lighten-4"
        v-model="radius"
        step="0.01"
      ></v-slider>

      <v-slider
        hint=""
        label="Height"
        max="100"
        min="0"
        thumb-label
        dense
        hide-details
        :disabled="viewType == 'varied'"
        color="indigo"
        track-color="indigo lighten-4"
        v-model="boxHeight"
        step="0.01"
      ></v-slider>

      <v-slider
        hint=""
        label="Width"
        max="100"
        min="0"
        thumb-label
        dense
        hide-details
        :disabled="viewType == 'varied'"
        color="indigo"
        track-color="indigo lighten-4"
        v-model="boxWidth"
        step="0.01"
      ></v-slider>


    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { hexToRgba } from '../utils/colors'
import IconVariedBoxes from '@/assets/icons/varied-boxes.svg?inline'



export default {
  components: {
    IconVariedBoxes,
  },
  data() {
    return {
      bg: {
        color: "#ffffff",
        opacity: 100,
      },
    }
  },
  computed: {
    radius: {
      get () {
        return this.box.borderRadius
      },
      set (value) {
        this.$store.commit('settings/updateBorderRadius', value)
      }
    },
    boxColor: {
      get () {
        return this.box.bg.color
      },
      set (value) {
        this.$store.commit('settings/setBoxBackground', value)
      }
    },
    boxHeight: {
      get () {
        return this.box.height
      },
      set (value) {
        this.$store.commit('settings/updateBoxHeight', value)
      }
    },
    boxWidth: {
      get () {
        return this.box.width
      },
      set (value) {
        this.$store.commit('settings/updateBoxWidth', value)
      }
    },

    gridItems: {
      get () {
        return this.grid.items
      },
      set (value) {
        this.$store.commit('settings/updateGridItems', value)
      }
    },
    
    viewType() {
      return this.$store.state.settings.type
    },
    box() {
      return this.$store.state.settings.box
    },
    grid() {
      return this.$store.state.settings.grid
    },
    bgColor() {
      return `background: ${hexToRgba(this.$store.state.settings.bg.color, this.$store.state.settings.bg.opacity)}`
    },

    // bgStyle() {
    //   return `background: ${hexToRgba(this.bg.color, this.bg.opacity)}`
    // },
  },
  methods: {
    backgroundChange(e) {
      this.setBackground(e.target.value)
    },

    ...mapMutations({
      setBackground: 'settings/setBackground',
      setType: 'settings/setType'
    }),
    
    backgroundChange(e) {
      this.setBackground(e.target.value)
    },
    
    boxBackgroundChange(e) {
      this.setBoxBackground(e.target.value)
    },
    

  },
  mounted() {
  },
}
</script>