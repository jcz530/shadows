export const state = () => ({
    counter: 5,
    bg: {
        color: "#33ffff",
        opacity: 100,
    }
  })
  
  export const mutations = {
    setBackground(state, color) {
      state.bg.color = color;
    }
  }