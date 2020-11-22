<template>
  <div>
    <div class="address mb-2">
      <h3 class="has-text-grey">ที่อยู่สำหรับการจัดส่ง</h3>
      <p>
        {{ order.addressFullName }}
        <br />
        {{ order.address }}
        <br />
        {{ subDistTxt }} {{ order.subDistrict }} {{ distTxt }}
        {{ order.district }}
        <br />
        จังหวัด {{ order.province }}
        <br />
        {{ order.postalCode }}
        <br />
        เบอร์ติดต่อ: {{ order.addressPhoneNumber }}
      </p>
    </div>
    <div class="address mb-2">
      <h3 class="has-text-grey">ราคารวม</h3>
      <table class="table is-fullwidth is-hoverable has-text-grey-dark mb-0">
        <tbody>
          <tr class="table-item">
            <td colspan="3" class="pl-0">ราคาที่ประเมินได้</td>
            <td class="pr-0 has-text-right">
              {{ stringPrice(order.fullPrice) }}
              บาท
            </td>
          </tr>
          <tr class="table-item">
            <td colspan="3" class="pl-0">หักราคามัดจำ</td>
            <td class="pr-0 has-text-right">
              -{{ stringPrice(order.depositPrice) }}
              บาท
            </td>
          </tr>
          <tr class="table-item">
            <td colspan="3" class="pl-0">
              วิธีการจัดส่ง:
              {{ order.distributionMethod.name }}
            </td>
            <td class="pr-0 has-text-right">
              {{ stringPrice(order.distributionMethod.price) }}
              บาท
            </td>
          </tr>
          <tr class="table-item">
            <td colspan="3" class="pl-0">รวม</td>
            <td class="pr-0 has-text-right">
              {{ stringPrice(summation) }} บาท
            </td>
          </tr>
        </tbody>
      </table>
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
import { stringPrice } from '@/utils/string-price'
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isBangkok() {
      return this.order.province === 'กรุงเทพมหานคร'
    },
    subDistTxt() {
      return this.isBangkok ? 'แขวง' : 'ตำบล'
    },
    distTxt() {
      return this.isBangkok ? 'เขต' : 'อำเภอ'
    },
    summation() {
      return (
        this.order.fullPrice -
        this.order.depositPrice +
        this.order.distributionMethod.price
      )
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
