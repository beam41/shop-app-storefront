<template>
  <div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey">ข้อความที่แนบถึงผู้ขาย:</h3>
      <p>{{ order.receivedMessage }}</p>
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
