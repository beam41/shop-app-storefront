<template>
  <div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey mb-1">หลักฐานการชำระเงิน</h3>
      <img
        class="proof-image"
        :src="stateData.fileName"
        alt="หลักฐานการชำระเงิน"
      />
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
        ({ state }) => state === OrderState.ADDED_PROOF_OF_PAYMENT_FULL
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
