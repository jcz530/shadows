<template>
    <div class="flex justify-center mb-10">
      <div :style="cssShadow" class="bg-white w-4/5 h-50 border border-solid border-red-300X rounded p-10 mt-16">
        <div class="mb-3 pt-0">
          <p><span class="border-b-2 border-r-2 border-indigo-500 rounded pr-1 pl-1">Your CSS</span></p>
          <p class="my-4 " style="white-space: pre;">{{cssShadow}}</p>
          <button
            class="mt-8 mdc-elevation--z1 border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            @click="copyCSS"
          >
            Copy
          </button>
          
        </div>
      </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { copy } from "../utils/clipboard"

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

    copyCSS() {
      copy(this.cssShadow)
    },
  },
  mounted() {
    
  },
}
</script>