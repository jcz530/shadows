<template>
  <div class="flex justify-center items-center mt-16">
    <div class=" w-1/3 mx-16">
      <div 
        :style="styles"
        class="bg-white w-16 h-8 p-10x  mx-16"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </div>
    <div class=" w-1/3 mx-16">
      <div 
        :style="styles" 
        class="bg-white w-40 h-40 mx-16"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </div>
    <div class=" w-1/3 mx-16">
      <div 
        :style="styles"
        class="bg-white w-64 h-64 mx-16"
      >
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
     
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
    styles() {
      return `${this.cssShadow};border-radius:${this.box.borderRadius}rem`
    },
  },
  methods: {
    
  },
  mounted() {
    
  },
}
</script>
