export const state = () => ({
  items: [],
})

export const mutations = {
  add(state, data) {
    state.items.push(data)
  },
  remove(state, index) {
    state.items.splice(index, 1)
  },
}
