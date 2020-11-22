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
              <td v-if="item.newPrice" class="text-left">
                <span class="old-price">{{ item.price }}</span>
                {{ item.newPrice }} บาท
              </td>
              <td v-else class="text-left">{{ item.price }} บาท</td>
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
        {{ order.fullName }}
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
        เบอร์ติดต่อ: {{ order.phoneNumber }}
      </p>
    </div>
  </div>
</template>

<script>
import { nullish } from '@/utils/nullish'
import { stringPrice } from '@/utils/string-price'
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
    isBangkok() {
      return this.order.province === 'กรุงเทพมหานคร'
    },
    subDistTxt() {
      return this.isBangkok ? 'แขวง' : 'ตำบล'
    },
    distTxt() {
      return this.isBangkok ? 'เขต' : 'อำเภอ'
    },
  },
  methods: {
    stringPrice,
    nullish,
  },
}
</script>

<style></style>
