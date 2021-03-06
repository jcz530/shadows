import { hexToRgba } from '../utils/colors'
import { xAndYFromAngleDistance } from '../utils/trig'

export const state = () => ({
  nextId: 2,
  defaultShadow: {
    id: 1,
    visible: true,
    angle: 90,
    distance: 8,

    x: 0,
    y: 0,
    blur: 6,
    spread: 3,
    color: '#000000',
    opacity: 20,
  },

  shadows: [
    {
      id: 1,
      visible: true,
      angle: 90,
      distance: 8,

      x: 0,
      y: 0,
      blur: 6,
      spread: 3,
      color: '#000000',
      opacity: 20,
    },
  ],

  bg: {
    color: "#ffffff",
    opacity: 100,
  },

  cssShadow: "",


})

export const getters = {
  shadows(state) {
    return state.shadows
  },

  getShadowById: (state) => (id) => {
    return state.shadows.find(shadow => shadow.id === id)
  },

  cssShadow(state) {
    let css = ""
    if (state.shadows.length > 0)
      css += "box-shadow: "
    // console.log(state.shadows)
    state.shadows.filter(shadow => shadow.visible === true).forEach(shadow => {
      const xy = xAndYFromAngleDistance(shadow.angle, shadow.distance)
      css += `${xy.x}px ${xy.y}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`;
      css += `,`;
    });
    // remove trailing comma
    if (css.substr(css.length - 1, css.length) == ",") {
      css = css.substr(0, css.length - 1);
    }
    css = css + ";"
    css = css + "\n"
    let regCSS = css
    css = css + `-webkit-${regCSS}`
    css = css + `-moz-${regCSS}`

    return css;
  }
}

export const mutations = {

  addShadow(state) {
    let newShadow = Object.assign({}, state.defaultShadow)
    newShadow.id = state.nextId++

    state.shadows.push(newShadow)
  },

  duplicateShadow(state, shadow) {
    let duplicatedShadow = Object.assign({}, shadow);
    duplicatedShadow.id = state.nextId++

    state.shadows.push(duplicatedShadow)
  },

  usePreset(state, shadows) {
    shadows.map(shadow => {
      shadow.id = state.nextId++
      return shadow
    }
    );
    state.shadows = shadows
  },

  clearShadows(state) {
    state.shadows = []
  },

  deleteShadow(state, shadow) {
    state.shadows = state.shadows.filter(s => s.id !== shadow.id)
  },

  setBackground(state, color) {
    state.bg.color = color;
  },

  toggleShadowVisibility(state, shadow) {
    let fshadow = state.shadows.find(s => s.id == shadow.id)
    fshadow.visible = !fshadow.visible
  },

  updateField(state, payload) {
    const shadow = payload.shadow
    const value = payload.value
    const field = payload.field

    let fshadow = state.shadows.find(s => s.id == shadow.id)

    fshadow[field] = value
  },


}
