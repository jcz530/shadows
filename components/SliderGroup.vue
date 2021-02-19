<template>
  <v-col align-self="center" align="center">
    <v-icon @click="decrementField()"> mdi-minus </v-icon>
    <span class="slider-value">{{ fieldValue }}{{ units }}</span>
    <v-icon @click="incrementField()"> mdi-plus </v-icon>
    <v-slider
      :hint="title"
      :max="max"
      :min="min"
      color="indigo"
      track-color="indigo"
      thumb-label
      dense
      :vertical="isMobile"
      hide-details
      v-model="fieldValue"
    ></v-slider>
  </v-col>
</template>
<script>
export default {
  props: {
    field: String,
    title: String,
    shadow: Object,
    units: String,
    min: Number,
    max: Number,
  },

  data() {
    return {}
  },
  computed: {
    fieldValue: {
      get() {
        return this.shadow[this.field]
      },
      set(value) {
        this.$store.commit('builder/updateField', {
          shadow: this.shadow,
          value: value,
          field: this.field,
        })
      },
    },

    isMobile() {
      return screen.width <= 768
    },
  },
  methods: {
    incrementField() {
      this.$store.commit('builder/updateField', {
        shadow: this.shadow,
        value: this.shadow[this.field] + 1,
        field: this.field,
      })
    },

    decrementField() {
      this.$store.commit('builder/updateField', {
        shadow: this.shadow,
        value: this.shadow[this.field] - 1,
        field: this.field,
      })
    },
  },
}
</script>
<style scoped>
.slider-value {
  min-width: 3em;
  display: inline-block;
}
</style>
