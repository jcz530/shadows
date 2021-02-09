<template>
  <v-container>
    <v-card
      elevation="0"
    >
      <v-row
      >
        <v-col
          align-self="center"
          align='center'
          style="max-width: 61px"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              elevation="2"
              icon
              @click='toggleShadowVisibility' 
              v-bind="attrs"
              v-on="on"
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
            </template>
            <span>Toggle shadow visibility</span>
          </v-tooltip>
        </v-col>

        <SliderGroup 
          title="Angle"
          field="angle"
          units="°"
          :min="0"
          :max="360"
          :shadow="shadow"
        />

        <SliderGroup 
          title="Distance"
          field="distance"
          units="px"
          :min="-100"
          :max="100"
          :shadow="shadow"
        />

        <SliderGroup 
          title="Blur"
          field="blur"
          units="px"
          :min="0"
          :max="100"
          :shadow="shadow"
        />

        <SliderGroup 
          title="Spread"
          field="spread"
          units="px"
          :min="-100"
          :max="100"
          :shadow="shadow"
        />

        <v-col
          align-self="center"
          align='center'
          style="max-width: 61px"
        >
          <input
            name="color"
            id="color"
            v-model="color"
            type="color"
          />
        </v-col>
      
        <SliderGroup 
          title="Opacity"
          field="opacity"
          units="%"
          :min="0"
          :max="100"
          :shadow="shadow"
        />


        <v-col
          align-self="center"
          align='center'
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                elevation="2"
                icon
                @click='duplicateShadow' 
                v-bind="attrs"
                v-on="on"
              >
              <IconDuplicate
                class='fill-current indigo--text'
                style="height: 1em"
              /> 
            </v-btn>
            </template>
            <span>Duplicate</span>
          </v-tooltip>
          
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                elevation="2"
                icon
                @click='deleteShadow' 
                v-bind="attrs"
                v-on="on"
              >
              <IconTrashCan 
                class='fill-current red--text text--lighten-1'
                style="height: 1em"
              />
            </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
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
    }
  },
  computed: {
    visibilityIconClass() {
      if (this.shadow.visible)
        return "indigo--text";
      else 
        return "indigo--text text--lighten-2"
    },

    color: {
      get () {
        return this.shadow.color
      },
      set (value) {
        this.$store.commit('builder/updateField', {shadow:this.shadow, value:value, field:'color'})
      }
    },
  },
  methods: {
    ...mapMutations({
      addShadow: 'builder/addShadow',
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

    addNew() {
      this.addShadow()
    },

  },
  mounted() {
    
  },
}
</script>
