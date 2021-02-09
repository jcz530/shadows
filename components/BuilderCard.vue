<template>
  <v-container>
    <v-card color="indigo">
      <v-card-title
        class="white--text"
      >
        Shadow Builder
      </v-card-title>

      <v-tabs
        v-model="tab"
        align-with-title
        background-color="indigo darken-2"
        dark
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
          class="mx-4 mb-4 mt-4"
        >
          <ShadowBuilder />
        </v-tab-item>

        <v-tab-item class="mt-4">
          <PageSettings />
        </v-tab-item>
        
        <v-tab-item class="mb-4 mt-4">
          <CSS />
        </v-tab-item>

      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      tabs: ['Shadows', 'Settings', 'CSS'],
    }
  },
}
</script>