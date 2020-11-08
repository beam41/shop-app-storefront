<template>
  <div>
    <div :class="['box flex flex-col', isCheckout ? 'is-checkout' : null]">
      <h2 class="has-text-weight-medium is-size-5 has-text-grey-darker mb-4">
        สรุปคำสั่งซื้อ
      </h2>
      <div class="flex flex-space-between flex-col flex-1">
        <table class="table is-fullwidth is-hoverable has-text-grey-dark mb-0">
          <tbody>
            <tr
              v-for="item in cartNonZero"
              :key="item.product.id"
              class="table-item"
            >
              <td class="pl-0">{{ item.product.name }}</td>
              <td>× {{ item.amount }}</td>
              <td class="pr-0 has-text-right">
                {{
                  stringPrice(
                    nullish(item.product.newPrice, item.product.price) *
                      item.amount
                  )
                }}
                บาท
              </td>
            </tr>
          </tbody>
        </table>
        <div class="sum-footer flex flex-space-between">
          <td class="pl-0">รวม</td>
          <td></td>
          <td class="pr-0 has-text-right">{{ stringPrice(summation) }} บาท</td>
        </div>
      </div>
    </div>
    <button
      v-if="!isCheckout"
      class="button is-dark is-fullwidth"
      @click="$emit('check-out')"
    >
      ชำระเงิน
    </button>
  </div>
</template>

<script>
import { nullish } from '@/utils/nullish'
import { stringPrice } from '@/utils/string-price'

export default {
  props: {
    isCheckout: Boolean,
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cartNonZero() {
      return this.cart.filter((item) => item.amount > 0)
    },
    summation() {
      return this.cartNonZero.reduce(
        (prev, curr) =>
          prev + (curr.product.newPrice ?? curr.product.price) * curr.amount,
        0
      )
    },
  },
  methods: {
    nullish,
    stringPrice
  },
}
</script>

<style lang="scss" scoped>
.box {
  height: calc(100% - 4rem);
  &.is-checkout {
    height: 100%;
  }
}

.table-item td {
  border: 0;
}

.sum-footer {
  padding-top: 0.5em;
}
</style>
