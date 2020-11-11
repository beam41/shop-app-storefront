<template>
  <div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey">เหตุผล:</h3>
      <p>{{ order.cancelledReason }}</p>
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
