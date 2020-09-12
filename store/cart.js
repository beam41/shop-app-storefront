import Vue from 'vue'

export const state = () => ({
  items: [],
})

export const mutations = {
  add(state, { product, amount }) {
    const productIndex = state.items.findIndex(
      (v) => v.product.id === product.id
    )
    if (productIndex < 0) {
      state.items.push({ product, amount })
    } else {
      const productObj = state.items[productIndex]
      productObj.amount += amount
      Vue.set(state.items, productIndex, productObj)
    }
  },
  remove(state, id) {
    state.items = state.items.filter((v) => v.product.id !== id)
  },
}
