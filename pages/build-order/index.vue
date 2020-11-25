<template>
  <div class="container content-container">
    <div class="inner-pad">
      <h1
        class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
      >
        ประวัติการสั่งทำ
      </h1>
      <OrderHistoryList v-if="buildOrders" :items="buildOrders" build-order />
      <Loader v-else style="min-height: calc(100vh - 10.25rem - 32px)" />
    </div>
  </div>
</template>

<script>
import { getBuildOrders } from '@/api/build-order'

export default {
  data: () => ({
    buildOrders: null,
  }),
  mounted() {
    getBuildOrders().then((res) => {
      this.buildOrders = res.data
    })
  },
  head: () => ({
    title: 'รายการสั่งทำ',
  }),
}
</script>
