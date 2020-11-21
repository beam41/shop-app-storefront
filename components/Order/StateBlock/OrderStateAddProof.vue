<template>
  <div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey mb-1">หลักฐานการชำระเงิน</h3>
      <a :href="proof" target="_blank">
        <img class="proof-image" :src="proof" alt="หลักฐานการชำระเงิน" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proof: {
      type: String,
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
