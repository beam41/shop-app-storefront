<template>
  <div>
    <div class="proof-of-payment">
      <h3>จัดส่งทาง: {{ order.distributionMethod.name }}</h3>
      <p>เลขติดตามพัสดุ: {{ order.trackingNumber }}</p>
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
