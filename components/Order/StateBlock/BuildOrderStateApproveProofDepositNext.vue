<template>
  <div>
    <div class="price">
      วันที่คาดว่าจะแล้วเสร็จ:
      {{ dayjs(order.expectedCompleteDate).format('D MMMM BBBB') }}
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dayjs,
  },
}
</script>

<style lang="scss" scoped>
.proof-image {
  max-height: 500px;
}
</style>
