<template>
  <div>
    <div class="price">
      ราคาที่ประเมินได้: {{ stringPrice(order.fullPrice) }} บาท
      <br />
      ราคามัดจำ:
      {{ stringPrice(order.depositPrice) }} บาท
    </div>
  </div>
</template>

<script>
import { stringPrice } from '@/utils/string-price'
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    stringPrice,
  },
}
</script>

<style lang="scss" scoped>
.proof-image {
  max-height: 500px;
}
</style>
