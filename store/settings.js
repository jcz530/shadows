export const state = () => ({

    bg: {
        color: "#ffffff",
        opacity: 100,
    },
    box: {
        borderRadius: 0.75,
    }
  })
  
  export const mutations = {
    setBackground(state, color) {
      state.bg.color = color;
    },
    
    updateBorderRadius(state, value) {
        state.box.borderRadius = value;
    },
  }