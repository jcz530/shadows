<template>
    <v-container class="flexx mx-16x">

      <v-card>
      <v-tabs
        v-model="tab"
        align-with-title
        background-color="indigo"
        dark
        style="margin-bottom: 2em"
      >
        <v-tabs-slider color="indigo lighten-4"></v-tabs-slider>

        <v-tab
          v-for="item in tabs"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    
    
    <v-tabs-items v-model="tab">
      <v-tab-item
      class="mx-4 mb-4"
      >
      <div>
        <v-row
          no-gutters
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
          >
            Add Shadow
          </v-btn>
          <v-btn 
            color="red"
            elevation="1"
            @click="clear"
            dark
          >
            Clear
          </v-btn>
        </div>
      </v-tab-item>
      <v-tab-item>
        <PageSettings />
      </v-tab-item>
    </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      tab: null,
      tabs: ['Shadows', 'Settings'],
    }
  },
  computed: {
    ...mapGetters({
      cssToShadow: 'presets/cssToShadow',
      shadows: 'builder/shadows',
    }),
  },
  methods: {
    ...mapMutations({
      addNew: 'builder/addShadow',
      clear: 'builder/clearShadows',
    }),
  },
}
</script>