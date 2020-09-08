import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'shop-app-storefront',
    paths: ['user'],
  })(store)
}
