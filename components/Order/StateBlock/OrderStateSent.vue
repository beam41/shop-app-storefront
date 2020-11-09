<template>
  <div>
    <div class="proof-of-payment">
      <h3>จัดส่งทาง: {{ order.distributionMethod.name }}</h3>
      <p>เลขติดตามพัสดุ: {{ stateData.trackingNumber }}</p>
    </div>
  </div>
</template>

<script>
import OrderState from '@/constant/order-state'

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    stateData() {
      return this.order.orderStates.find(
        ({ state }) => state === OrderState.SENT
      ).stateDataJson
    },
  },
}
</script>

<style lang="scss" scoped>
.proof-image {
  max-height: 500px;
}
</style>
