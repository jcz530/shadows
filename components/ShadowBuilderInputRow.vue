<template>
  <div class="flex flex-wrap py-6x my-4x mb-4">
    <div class="w-1/24 mx-4">
      <div 
        @click='toggleShadowVisibility' 
        class="mt-4 mdc-elevation--z1 rounded px-1 py-1"
      >
        <IconLightBulb 
          v-if="shadow.visible"
          class="fill-current" 
          :class="visibilityIconClass"
          style="width: 2em; height: 2em" 
        />
        <IconLightBulbOff
          v-else
          class="fill-current" 
          :class="visibilityIconClass"
          style="width: 2em; height: 2em;" 
        />
      </div>
    </div>
    <div :class="css.input.container">
      <label 
        :class="css.input.label" 
        for="angle"
      >
        Angle: <small>
          <input
            name="angle"
            id="angle" 
            v-model="angle"
            type="number"
            :max="360"
            :min="0"
          />
          </small>
      </label>
      
      <input 
        type="range" 
        placeholder="Angle" 
        name="angle"
        id="angle"
        v-model="angle"
        :class="css.input.range"
        :max="360"
        :min="0"
      />
    </div>

    <div :class="css.input.container">
      <label
        class="" 
        for="distance"
      >
        Distance 
      </label>
      <div class="bg-gray-200 rounded mdc-elevation--z1">
      <small><input
          name="distance"
          id="distance"
          v-model="distance"
          class="bg-gray-200 w-full" 
          type="number"
        /></small>
      <input 
        type="range" 
        placeholder="Distance" 
        name="distance"
        id="distance"
        v-model="distance"
        :class="css.input.range"
        :max="100"
        :min="-100"
      />
      </div>
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="blur"
      >
        Blur 
        <input
        name="blur"
        id="blur"
        v-model="blur"
        class="css.input.input" 
        type="number"
      />
      </label>
      
      <input 
        type="range" 
        placeholder="Blur" 
        name="blur"
        id="blur"
        v-model="blur"
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
        Spread:
         <input
          name="spread"
          id="spread"
          v-model="spread"
          class="css.input.input" 
          type="number"
        />
      </label>
     
      <input 
        type="range" 
        placeholder="Spread" 
        name="spread"
        id="spread"
        v-model="spread"
        :class="css.input.range"
        :max="100"
        :min="-100"
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
        v-model="color"
        class="css.input.input" 
        type="color"
      />
    </div>

    <div :class="css.input.container">
      <label
        :class="css.input.label" 
        for="opacity"
      >
        Opacity: 
          <input
            name="opacity"
            id="opacity"
            v-model="opacity"
            class="css.input.input" 
            type="number"
            :max="100"
            :min="0"
          />
      </label>
      
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
        class="mt-4 bg-indigo-100X rounded px-1 py-1 mdc-elevation--z1" 
        @click="duplicateShadow"
      >
        <IconDuplicate
          class='fill-current text-indigo-600'
          style="height: 1em"
         /> 
      </Button>
       <button
        class="mt-4 ml-3 bg-indigo-100X rounded px-1 py-1 mdc-elevation--z1" 
        @click="deleteShadow"
      >
        <IconTrashCan 
          class='fill-current text-red-600'
          style="height: 1em"
          />
      </Button>
    </div>


  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

import IconLightBulb from '@/assets/icons/light-bulb.svg?inline'
import IconLightBulbOff from '@/assets/icons/light-bulb-off.svg?inline'
import IconTrashCan from '@/assets/icons/trash-can.svg?inline'
import IconDuplicate from '@/assets/icons/duplicate.svg?inline'

export default {
  components: {
    IconLightBulb,
    IconLightBulbOff,
    IconTrashCan,
    IconDuplicate,
  },
  props: {
    shadow: Object,
  },
  data() {
    return {
     css: {
        
        input: {
          container: "w-1/12 mx-4",
          label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
          input: "hidden appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
          range: "w-full  py-1",
        },
        
      },
    }
  },
  computed: {
    visibilityIconClass() {
      if (this.shadow.visible)
        return "text-gray-700";
      else 
        return "text-gray-500"
    },
    angle: {
      get () {
        return this.shadow.angle
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'angle'})
      }
    },

    distance: {
      get () {
        return this.shadow.distance
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'distance'})
      }
    },

    blur: {
      get () {
        return this.shadow.blur
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'blur'})
      }
    },

    spread: {
      get () {
        return this.shadow.spread
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'spread'})
      }
    },

    color: {
      get () {
        return this.shadow.color
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'color'})
      }
    },

    opacity: {
      get () {
        return this.shadow.opacity
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'opacity'})
      }
    },
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
    //  updateOpacity (shadow, e) {
    //   this.$store.commit('builder/updateOpacity', this.shadow, e.target.value)
    // },
    addNew() {
      this.addShadow()
    },
  },
  mounted() {
    
  },
}
</script>
<style scoped>

</style>
