<template>
  <div>
    <template v-if="items.length > 0">
      <nuxt-link
        v-for="i in items"
        :key="i.id"
        :to="`/order/${i.id}`"
        class="card orders"
      >
        <div class="card-content">
          <div class="flex flex-align-baseline pb-4">
            <h2 class="flex-1 is-size-5 has-text-grey-darker">
              คำสั่งซื้อที่ {{ i.id }}: {{ i.productsName.join(', ') }}
            </h2>
            <p class="is-size-7 has-text-grey">
              อัพเดทเมื่อ:
              <time :datetime="i.updatedDate.toString()">{{
                i.updatedDate.format('D/M/BB H:mm')
              }}</time>
            </p>
          </div>
          <div class="flex flex-align-baseline">
            <p>ราคารวม: {{ stringPrice(i.totalPrice) }} บาท</p>
            <p class="flex-1 has-text-right">
              สถานะ:
              {{
                i.state === OrderState.CREATED
                  ? statusMap[i.state][i.purchaseMethod]
                  : statusMap[i.state]
              }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </template>
    <div v-else class="box">
      <Empty text="ไม่มีประวัติการสั่งซื้อ" />
    </div>
  </div>
</template>

<script>
import { stringPrice } from '@/utils/string-price'
import OrderState from '@/constant/order-state'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    statusMap() {
      return {
        CREATED: {
          BANK: 'วางคำสั่งซื้อแล้ว',
          ON_DELIVERY: 'รอการจัดส่ง',
        },
        ADDED_PROOF_OF_PAYMENT_FULL: 'รอการตรวจสอบสลิปธนาคาร',
        APPROVED_PROOF_OF_PAYMENT_FULL: 'รอการจัดส่ง',
        SENT: 'จัดส่งสินค้าแล้ว',
        RECEIVED: 'ได้รับแล้ว',
        CANCELLED: 'ยกเลิกแล้ว',
      }
    },
    OrderState: () => OrderState,
  },
  methods: {
    stringPrice,
  },
}
</script>

<style lang="scss" scoped>
.orders {
  border-radius: 4px;
  overflow: hidden;
  display: block;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}
</style>
