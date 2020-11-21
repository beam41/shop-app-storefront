<template>
  <div v-if="order" class="container content-container is-max-desktop">
    <OrderDetail :order="order" @reload="getOrderById" />
  </div>
  <div v-else class="container">
    <Loader style="min-height: calc(100vh - 3.25rem)" />
  </div>
</template>

<script>
import { getOrderById } from '@/api/order'
export default {
  data: () => ({
    order: null,
  }),
  mounted() {
    if (!isNaN(+this.$route.params.id)) {
      this.getOrderById()
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    getOrderById() {
      getOrderById(+this.$route.params.id)
        .then((res) => {
          this.order = res.data
        })
        .catch((err) => {
          if (err.response.status === 404) this.$router.push('/')
        })
    },
  },
}
</script>
