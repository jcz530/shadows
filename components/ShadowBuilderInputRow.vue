<template>
  <v-container>
    <v-card
    elevation="0"
    >
    <!-- align="align" -->
    <v-row
        
      >
      
      <v-col
        align-self="center"
        align='center'
        style="max-width: 61px"
      >
        <v-btn
          color="primary"
          elevation="2"
          icon
          @click='toggleShadowVisibility' 
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
        </v-btn>
      </v-col>

    <v-col
      align='center'
      align-self="center"
    >
      <v-icon
        @click="decrementField('angle')"
      >
        mdi-minus
      </v-icon>
        {{angle}}px
      <v-icon
        @click="incrementField('angle')"
      >
        mdi-plus
      </v-icon>
      <v-slider
        hint="Angle"
        max="360"
        min="0"
        thumb-label
        dense
        hide-details
        color="indigo"
        track-color="indigo lighten-4"
        v-model="angle"
      >
      </v-slider>
    </v-col>

    <v-col
      align-self="center"
      align='center'
    >
      <v-icon
        @click="decrementField('distance')"
      >
        mdi-minus
      </v-icon>
        {{distance}}px
      <v-icon
        @click="incrementField('distance')"
      >
        mdi-plus
      </v-icon>
      <v-slider
        hint="Distance"
        max="100"
        min="-100"
        thumb-label
        dense
        hide-details
        color="indigo"
        track-color="indigo lighten-4"
        v-model="distance"
      ></v-slider>
    </v-col>

    <v-col
      align-self="center"
      align='center'
    >
      <v-icon
        @click="decrementField('blur')"
      >
        mdi-minus
      </v-icon>
        {{blur}}px
      <v-icon
        @click="incrementField('blur')"
      >
        mdi-plus
      </v-icon>
      <v-slider
        hint="Blur"
        max="100"
        min="0"
        thumb-label
        dense
        hide-details
        color="indigo"
        track-color="indigo lighten-4"
        v-model="blur"
      ></v-slider>
    </v-col>

    <v-col
      align-self="center"
      align='center'
    >
      <v-icon
        @click="decrementField('spread')"
      >
        mdi-minus
      </v-icon>
        {{spread}}px
      <v-icon
        @click="incrementField('spread')"
      >
        mdi-plus
      </v-icon>
       <v-slider
        hint="Spread"
        max="100"
        min="-100"
        color="indigo"
        track-color="indigo"
        thumb-label
        dense
        hide-details
        v-model="spread"
      ></v-slider>

    </v-col>

    <v-col
      align-self="center"
      align='center'
      style="max-width: 61px"
    >
      <input
        name="color"
        id="color"
        v-model="color"
        class="css.input.input" 
        type="color"
      />
    </v-col>

    <v-col
      align-self="center"
      align='center'
    >
      <v-icon
        @click="decrementField('opacity')"
      >
        mdi-minus
      </v-icon>
        {{opacity}}%
      <v-icon
        @click="incrementField('opacity')"
      >
        mdi-plus
      </v-icon>
      <v-slider
        hint="Opacity"
        max="100"
        min="0"
        thumb-label
        dense
        hide-details
        color="indigo"
        track-color="indigo lighten-4"
        v-model="opacity"
      ></v-slider>
    </v-col>



    <v-col
      align-self="center"
      align='center'
    >
      <v-btn
          color="primary"
          elevation="2"
          icon
          @click='duplicateShadow' 
        >
        <IconDuplicate
          class='fill-current text-indigo-600'
          style="height: 1em"
         /> 
      </v-btn>

      <v-btn
          color="primary"
          elevation="2"
          icon
          @click='deleteShadow' 
        >
        <IconTrashCan 
          class='fill-current text-red-600'
          style="height: 1em"
        />
      </v-btn>
    </v-col>

  </v-row>
  </v-card>
</v-container>
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

    incrementField(field) {
      this.$store.commit('builder/updateField', {shadow:this.shadow, value:this.shadow[field] + 1, field:field})
    },
    
    decrementField(field) {
      this.$store.commit('builder/updateField', {shadow:this.shadow, value:this.shadow[field] - 1, field:field})
    }
  },
  mounted() {
    
  },
}
</script>
<style scoped>

</style>
