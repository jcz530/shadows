<template>
  <div class="flex flex-wrap py-6x my-4x mb-4">
    <div :class="css.input.container">
      <button
        @click='toggleShadowVisibility'
      >
        <span v-if="shadow.visible">On</span>
        <span v-else>Off</span>
      </button>
    </div>
    <div :class="css.input.container">
      <label 
        :class="css.input.label" 
        for="angle"
      >
        Angle
      </label>
      <input
        name="angle"
        id="angle" 
        v-model="shadow.angle"
        :class="css.input.input" 
        type="number"
        :max="360"
        :min="0"
      />
      <input 
        type="range" 
        placeholder="Angle" 
        name="angle"
        id="angle"
        v-model="shadow.angle"
        :class="css.input.range"
        :max="360"
        :min="0"
      />
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="distance"
      >
        Distance
      </label>
      <input
        name="distance"
        id="distance"
        v-model="shadow.distance"
        :class="css.input.input" 
        type="number"
      />
      <input 
        type="range" 
        placeholder="Distance" 
        name="distance"
        id="distance"
        v-model="shadow.distance"
        :class="css.input.range"
        :max="100"
        :min="-100"
      />
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="blur"
      >
        Blur
      </label>
      <input
        name="blur"
        id="blur"
        v-model="shadow.blur"
        :class="css.input.input" 
        type="number"
      />
      <input 
        type="range" 
        placeholder="Blur" 
        name="blur"
        id="blur"
        v-model="shadow.blur"
        :class="css.input.range"
        :max="100"
        :min="0"
      />
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="spread"
      >
        Spread
      </label>
      <input
        name="spread"
        id="spread"
        v-model="shadow.spread"
        :class="css.input.input" 
        type="number"
      />
      <input 
        type="range" 
        placeholder="Spread" 
        name="spread"
        id="spread"
        v-model="shadow.spread"
        :class="css.input.range"
        :max="100"
        :min="0"
      />
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="color"
      >
        Color
      </label>
      <input
        name="color"
        id="color"
        v-model="shadow.color"
        class="css.input.input" 
        type="color"
      />
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="opacity"
      >
        Opacity
      </label>
      <input
        name="opacity"
        id="opacity"
        v-model="shadow.opacity"
        :class="css.input.input" 
        type="number"
        :max="100"
        :min="0"
      />
      <input 
        type="range" 
        placeholder="Opacity" 
        name="opacity"
        id="opacity"
        v-model="opacity"
        :class="css.input.range"
        :max="100"
        :min="0"
      />
    </div>



    <div :class="css.input.container">
      
      <button
        :class="css.input.input" 
        @click="duplicateShadow"
      >
        Duplicate
      </Button>
       <button
        :class="css.input.input" 
        @click="deleteShadow"
      >
        Del
      </Button>
    </div>



  </div>
</template>
<script>
// @input="(e) => updateOpacity(shadow, e)"
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    shadow: Object,
  },
  data() {
    return {
     css: {
        
        input: {
          container: "w-1/12 mx-4",
          label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
          input: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
          range: "w-full  py-1",
        },
        
      },
    }
  },
  computed: {


        opacity: {
          get () {
            return this.shadow.opacity
          },
          set (value) {
            // this.$store.commit('updateOpacity', {shadow:shadow, opacity:e.target.value})
            this.$store.commit('builder/updateOpacity', {shadow:this.shadow, opacity:value})
          }
        },
    
    
    
    
    
    // shadow() {
    //   return shadow
    // },
    // shadows() {
    //   console.log(this.$store.state.builder.shadows)
    //   return this.$store.state.builder.shadows;
    // },
    ...mapGetters({
      }),
  },
  methods: {
    ...mapMutations({
      addShadow: 'builder/addShadow',
      // toggleShadowVisibility: 'builder/toggleShadowVisibility'
      // duplicateShadow: 'builder/duplicateShadow',
      // deleteShadow: 'builder/deleteShadow',
    }),

    toggleShadowVisibility(e) {

      this.$store.commit('builder/toggleShadowVisibility', this.shadow)
    },

    duplicateShadow(e) {

      this.$store.commit('builder/duplicateShadow', this.shadow)
    },
    deleteShadow(e) {
      this.$store.commit('builder/deleteShadow', this.shadow)
    },
     updateOpacity (shadow, e) {
      this.$store.commit('builder/updateOpacity', this.shadow, e.target.value)
    },
    addNew() {
      this.addShadow()
    },
  },
  mounted() {
    
  },
}
</script>
