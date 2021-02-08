export const state = () => ({

    bg: {
      color: "#ffffff",
      opacity: 100,
    },
    type: 'varied', //varied || uniform
    grid: {
      items: 3,
    },
    box: {
      height: 5,
      width: 5,
      borderRadius: 0.75,
      bg: {
        color: "#ffffff",
      }
    },
  })
  
  export const mutations = {
    setBackground(state, color) {
      state.bg.color = color;
    },
    
    updateBorderRadius(state, value) {
        state.box.borderRadius = value;
    },
    
    setBoxBackground(state, color) {
      state.box.bg.color = color;
    },

    updateBoxField(state, payload) {
      const value = payload.value
      const field = payload.field

      state.box[field] = value
    },
    updateBoxHeight(state, value) {
      state.box.height = value
    },
    updateBoxWidth(state, value) {
      state.box.width = value
    },

    updateGridItems(state, value) {
      state.grid.items = value
    },

    setType(state, value) {
      state.type = value
    },

  }