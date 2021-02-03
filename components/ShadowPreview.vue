<template>
  <div class="flex justify-center items-center mt-16">
    <div class=" w-1/3 mx-16">
      <div :style="cssShadow" class="bg-white w-16 h-8 rounded p-10x  mx-16">
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </div>
    <div class=" w-1/3 mx-16">
      <div :style="cssShadow" class="bg-white w-40 h-40 rounded mx-16">
        <div class="mb-3 pt-0">
          
        </div>
      </div>
    </div>
    <div class=" w-1/3 mx-16">
      <div :style="cssShadow" class="bg-white w-64 h-64 rounded mx-16">
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
    cssShadow() {
      return this.$store.state.builder.cssShadow;
    },
    ...mapGetters({
      cssShadow: 'builder/cssShadow',
    }),
  },
  methods: {
    
  },
  mounted() {
    
  },
}
</script>
