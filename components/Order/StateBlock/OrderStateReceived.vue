<template>
  <div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey">ข้อความที่แนบถึงผู้ขาย:</h3>
      <p>{{ stateData.message }}</p>
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
        ({ state }) => state === OrderState.RECEIVED
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
