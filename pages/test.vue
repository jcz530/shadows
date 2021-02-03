<template>
  <div>
    <h1>Test Page</h1>


  <h2 class="text-3xl">{{count}}</h2>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    count() {
      
      return this.$store.state.settings.counter;

    },
  },
  methods: {
    calculateXandY() {
      
    },
    

  },
  mounted() {
    // this.pop()
    // this.$store.commit('settings/pop')
    // this.calculateXandY();
    
  },



}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
