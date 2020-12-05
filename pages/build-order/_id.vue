<template>
  <div v-if="buildOrder" class="container content-container is-max-desktop">
    <OrderDetail :order="buildOrder" build-order @reload="getBuildOrderById" />
  </div>
  <div v-else class="container">
    <Loader style="min-height: calc(100vh - 3.25rem)" />
  </div>
</template>

<script>
import { getBuildOrderById } from '@/api/build-order'
export default {
  data: () => ({
    buildOrder: null,
  }),
  computed: {
    currId() {
      return this.$route.params.id
    },
  },
  mounted() {
    if (this.currId) {
      this.getBuildOrderById()
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    getBuildOrderById() {
      getBuildOrderById(this.currId)
        .then((res) => {
          this.buildOrder = res.data
        })
        .catch((err) => {
          if (err.response.status === 404) this.$router.push('/')
        })
    },
  },
  head: (vm) => ({
    title: `รหัสสั่งทำที่ ${vm.currId}`,
  }),
}
</script>
