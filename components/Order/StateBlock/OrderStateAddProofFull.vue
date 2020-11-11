<template>
  <div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey mb-1">หลักฐานการชำระเงิน</h3>
      <img
        class="proof-image"
        :src="order.proofOfPaymentFullImage"
        alt="หลักฐานการชำระเงิน"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.proof-image {
  max-height: 500px;
}
</style>
