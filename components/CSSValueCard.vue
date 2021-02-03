<template>
    <div class="flex justify-center mb-10">
      <div :style="cssShadow" class="bg-white w-50 h-50 border border-solid border-red-300X rounded p-10 mt-16">
        <div class="mb-3 pt-0">
          <p>{{cssShadow}}</p>
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
    }),
  },
  methods: {
    ...mapMutations({
      addShadow: 'builder/addShadow'
    }),
    
  },
  mounted() {
    
  },
}
</script>