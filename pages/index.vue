<template>
  <div 
    class="container mx-auto mb-10"
    :style="bgColor"
  >
  <div class="css.input.container">
    <label
      class="css.input.label" 
      for="bg-color"
     
    >
      BG Color
    </label>
    <input
      name="bg-color"
      id="bg-color"
      v-model="bg.color"
      class="css.input.input" 
      type="color"
      @input="backgroundChange"
    />
  </div>
    <ShadowBuilder />
    <ShadowPreview />
    <CSSValueCard />
   
    <ExampleShadows />

  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { hexToRgba } from '../utils/colors'
export default {
  data() {
    return {
      bg: {
        color: "#ffffff",
        opacity: 100,
      },
      
      
    }
  },
  computed: {
    shadows() {
      return this.$store.state.builder.shadows;
    },

    ...mapGetters({
      cssShadow: 'builder/cssShadow',
    }),

    bgColor() {
      // return this.$store.state.settings.bg.color
      return `background: ${hexToRgba(this.$store.state.settings.bg.color, this.$store.state.settings.bg.opacity)}`
    },
    // cssShadow() {
    //   let css = ""
    //   // if (this.shadows.length > 0)
    //     // css += "box-shadow: "
      
    //   this.shadows.forEach(shadow => {
    //     const xy = this.calculateXandY(shadow.angle, shadow.distance)
    //     css += `${xy.x}px ${xy.y}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`;
    //     css += `,`;
    //   });
    //   if (css.substr(css.length -1, css.length) == ",") {
    //     css = css.substr(0, css.length - 1);
    //   }

    // return css;

    // },
    bgStyle() {
      return `background: ${hexToRgba(this.bg.color, this.bg.opacity)}`
    },
  },
  methods: {
    
    // setBackground(value) {
    //   return this.$store.state.settings.counter;
    // }
    backgroundChange(e) {
      console.log(e)
      this.setBackground(e.target.value)
    },
    ...mapMutations({
      setBackground: 'settings/setBackground'
    }),

  },
  mounted() {
    // this.calculateXandY();
    this.setBackground('#ff44ff')
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
