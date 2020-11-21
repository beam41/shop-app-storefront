<template>
  <div>
    <div class="address mb-2">
      <h3 class="has-text-grey">ที่อยู่สำหรับการจัดส่ง</h3>
      <p>
        {{ order.address }}
        <br />
        {{ subDistTxt }} {{ order.subDistrict }} {{ distTxt }}
        {{ order.district }}
        <br />
        จังหวัด {{ order.province }}
        <br />
        {{ order.postalCode }}
        <br />
        เบอร์ติดต่อ: {{ order.phoneNumber }}
      </p>
    </div>
    <div class="proof-of-payment">
      <h3 class="has-text-grey mb-1">หลักฐานการชำระเงิน</h3>
      <a :href="order.proofOfPaymentFullImage" target="_blank">
        <img
          class="proof-image"
          :src="order.proofOfPaymentFullImage"
          alt="หลักฐานการชำระเงิน"
        />
      </a>
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
