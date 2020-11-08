<template>
  <div class="container content-container">
    <div class="inner-pad">
      <h1
        class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
      >
        ประวัติการสั่งซื้อ
      </h1>
      <OrderHistoryList v-if="orders" :items="orders" />
      <Loader v-else style="min-height: calc(100vh - 10.25rem - 32px)" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getOrders } from '@/api/order'

export default {
  data: () => ({
    orders: null,
  }),
  mounted() {
    getOrders().then((res) => {
      this.orders = res.data.map((dat) => ({
        ...dat,
        updatedDate: dayjs(dat.updatedDate),
      }))
    })
  },
}
</script>
