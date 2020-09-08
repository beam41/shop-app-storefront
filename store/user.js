export const state = () => ({
  data: null,
})

export const mutations = {
  login(state, data) {
    state.data = data
  },
}
