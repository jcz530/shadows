<template>
  <div 
    class="container px-0 mx-auto mb-10"
  >
    <div class='prose'>
      <h1 class='h1 text-center mb-8 blue-grey--text text--darken-4' style="font-size: 3rem;">CSS Box-Shadow Generator</h1>
      <p class='text-h4 blue-grey--text text--darken-3'>The key to a good box-shadow is <strong>opacity</strong> and <strong>layers</strong></p>
      <p class='text-body-1'>I built this to be a better box-shadow generator. One that allows you to visualize how you'll use the shadow in your UI. This is why there are lots of settings and presets to help you.</p>
      <!-- <p class='text-subtitle-1'>page background • card color • card shapes • view a grid or variety of shapes</p> -->
      <p class='text-body-1'>This CSS generator allows you to specify multiple shadows and customize your viewing options. Customize the page background, the preview card colors, and view a grid of cards or a variety of 3 sizes.</p>
      <p class='text-body-2'>This project is open-source. Please submit issues through GitHub.</p>
      <v-divider class="mb-4 mt-8"></v-divider>
      <p class="overline text-center">Preview your box shadow</p>
    </div>

    <ShadowPreview />
    <BuilderCard />
    <!-- <CSSValueCard /> -->
    <a id="presets"></a>
    <ExampleShadows />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { hexToRgba } from '../utils/colors'

export default {
  head() {
    return {
      title: "Shadows - CSS Box Shadow Generator ",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ],
      script: [{ type: 'application/ld+json', json: this.structuredData }]
    }
  },
  data() {
    return {
      description: "It\'s a better CSS Box-Shadow Generator. Generate multi-layered CSS box shadows. It has presets for Material Design and TailwindCSS shadows.",
      structuredData: {
          "@context": "https://schema.org/",
          "@type": "WebSite",
          "url": "https://shadows.joeczubiak.com/",
          "image": {
              "@type": "ImageObject",
              "url": "https://shadows.joeczubiak.com/shadows-social-image.png",
              "width": 1000,
              "height": 523
          },
          "publisher": {
              "@type": "Organization",
              "name": "Joe Czubiak",
              "logo": {
                  "@type": "ImageObject",
                  "url": "https://joeczubiak.com/images/joe-czubiak-logo.png",
                  "width": 60,
                  "height": 60
              }
          },
          "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://shadows.joeczubiak.com"
          },
          "sameAs": [
            "https://github.com/jcz530/shadows"
          ],
          "description": this.description,
      }
    }
  },
  computed: {
    ...mapGetters({
      cssShadow: 'builder/cssShadow',
    }),

    bgColor() {
      return `background: ${hexToRgba(this.$store.state.settings.bg.color, this.$store.state.settings.bg.opacity)}`
    },
  },
  methods: {
  },
  mounted() {

  },
}
</script>

<style>
.prose {
  max-width: 65vw;
  margin: auto;
}
@media (max-width: 600px) {
    .prose {
      max-width: 85vw;
      margin: auto;
    }
  }
.mdc-elevation--z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mdc-elevation--z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mdc-elevation--z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mdc-elevation--z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mdc-elevation--z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-elevation--z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mdc-elevation--z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mdc-elevation--z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mdc-elevation--z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-elevation--z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mdc-elevation--z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mdc-elevation--z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mdc-elevation--z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mdc-elevation--z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mdc-elevation--z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mdc-elevation--z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mdc-elevation--z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mdc-elevation--z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mdc-elevation--z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mdc-elevation--z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mdc-elevation--z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mdc-elevation--z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mdc-elevation--z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mdc-elevation--z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mdc-elevation--z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}
</style>
