<template>
    <div class="flex mx-16">
    <div class="css.input.container">
        <label
        class="css.input.label" 
        for="bg-color"
        
        >
        BG Color
        </label>
        <input
            name="bg-color"
            id="bg-color"
            v-model="bg.color"
            class="css.input.input" 
            type="color"
            @input="backgroundChange"
        />
    </div>

    <div>
        <label 
            for="radius"
        >
            Border Radius
        </label>
        <input
            class="w-12"
            name="radius"
            id="radius" 
            v-model="radius"
            type="number"
            :max="5"
            :min="0"
        />
        <input 
            type="range" 
            placeholder="Radius" 
            name="radius"
            id="radius"
            v-model="radius"
            :max="10"
            :min="0"
            step="0.01"
        />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { hexToRgba } from '../utils/colors'

export default {
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
    box() {
      return this.$store.state.settings.box
    },
    bgColor() {
      // return this.$store.state.settings.bg.color
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
      setBackground: 'settings/setBackground'
    }),
    
    backgroundChange(e) {
      this.setBackground(e.target.value)
    },

  },
  mounted() {
  },
}
</script>