<template>
  <div>
    <div class="product-list mb-2">
      <h3 class="has-text-grey">รายการสินค้า</h3>
      <div class="flex flex-space-between flex-col flex-1">
        <table class="table is-fullwidth is-hoverable has-text-grey-dark mb-0">
          <tbody>
            <tr
              v-for="item in order.products"
              :key="item.id"
              class="table-item"
            >
              <td class="pl-0">{{ item.name }}</td>
              <td>{{ stringPrice(nullish(item.newPrice, item.price)) }} บาท</td>
              <td>× {{ item.amount }}</td>
              <td class="pr-0 has-text-right">
                {{
                  stringPrice(nullish(item.newPrice, item.price) * item.amount)
                }}
                บาท
              </td>
            </tr>
            <tr class="table-item">
              <td colspan="3" class="pl-0">
                วิธีการจัดส่ง: {{ order.distributionMethod.name }}
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
    </div>
    <div class="address">
      <h3 class="has-text-grey">ที่อยู่สำหรับการจัดส่ง</h3>
      <p>
        {{ addressData.address }}
        <br />
        {{ subDistTxt }} {{ addressData.subDistrict }} {{ distTxt }}
        {{ addressData.district }}
        <br />
        จังหวัด {{ addressData.province }}
        <br />
        {{ addressData.postalCode }}
      </p>
    </div>
  </div>
</template>

<script>
import { nullish } from '@/utils/nullish'
import { stringPrice } from '@/utils/string-price'
import PurchaseMethod from '@/constant/purchase-method'
import OrderState from '@/constant/order-state'
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    summation() {
      return (
        this.order.products.reduce(
          (prev, curr) => prev + (curr.newPrice ?? curr.price) * curr.amount,
          0
        ) + this.order.distributionMethod.price
      )
    },
    addressData() {
      return this.order.orderStates.find(
        ({ state }) => state === OrderState.CREATED
      ).stateDataJson
    },
    isBangkok() {
      return this.addressData.province === 'กรุงเทพมหานคร'
    },
    subDistTxt() {
      return this.isBangkok ? 'แขวง' : 'ตำบล'
    },
    distTxt() {
      return this.isBangkok ? 'เขต' : 'อำเภอ'
    },
    PurchaseMethod: () => PurchaseMethod,
  },
  methods: {
    stringPrice,
    nullish,
  },
}
</script>

<style></style>
