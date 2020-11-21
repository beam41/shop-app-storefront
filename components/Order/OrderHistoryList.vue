<template>
  <div>
    <template v-if="items.length > 0">
      <nuxt-link
        v-for="i in items"
        :key="i.id"
        :to="`/${buildOrder ? 'build-order' : 'order'}/${i.id}`"
        class="card orders"
      >
        <div class="card-content">
          <div class="flex flex-align-baseline pb-4">
            <h2 class="flex-1 is-size-5 has-text-grey-darker title">
              <template v-if="buildOrder">
                คำสั่งทำที่ {{ i.id }}: {{ i.orderDescription }}
              </template>
              <template v-else>
                คำสั่งซื้อที่ {{ i.id }}: {{ i.productsName.join(', ') }}
              </template>
            </h2>
            <p class="is-size-7 has-text-grey">
              อัพเดทเมื่อ:
              <time :datetime="i.updatedDate.toString()">{{
                dayjs(i.updatedDate).format('D/M/BB H:mm')
              }}</time>
            </p>
          </div>
          <div class="flex flex-align-baseline">
            <p v-if="!buildOrder">
              ราคารวม: {{ stringPrice(i.totalPrice) }} บาท
            </p>
            <p class="flex-1 has-text-right">
              สถานะ:
              {{
                i.state === OrderState.CREATED
                  ? buildOrder
                    ? 'รอการตอบกลับจากผู้ขาย'
                    : statusMap[i.state][i.purchaseMethod]
                  : statusMap[i.state]
              }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </template>
    <div v-else class="box">
      <Empty :text="`ไม่มีประวัติการสั่ง${buildOrder ? 'ทำ' : 'ซื้อ'}`" />
    </div>
  </div>
</template>

<script>
import { stringPrice } from '@/utils/string-price'
import OrderState from '@/constant/order-state'
import dayjs from 'dayjs'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    buildOrder: Boolean,
  },
  computed: {
    statusMap() {
      return {
        CREATED: {
          BANK: 'วางคำสั่งซื้อแล้ว',
          ON_DELIVERY: 'รอการจัดส่ง',
        },
        ADDED_PROOF_OF_PAYMENT_FULL: this.buildOrder
          ? 'โอนค่าเครื่องเงินส่วนที่เหลือแล้ว รอการตรวจสอบสลิปธนาคาร'
          : 'รอการตรวจสอบสลิปธนาคาร',
        APPROVED_PROOF_OF_PAYMENT_FULL: 'รอการจัดส่ง',
        SENT: 'จัดส่งสินค้าแล้ว',
        RECEIVED: 'ได้รับแล้ว',
        CANCELLED: 'ยกเลิกแล้ว',
        IS_ABLE_TO_BUILT: 'สามารถทำได้ กรุณายืนยัน',
        IS_UNABLE_TO_BUILT: 'ไม่สามารถทำได้',
        ADDED_PROOF_OF_PAYMENT_DEPOSIT: 'โอนมัดจำแล้ว รอการตรวจสอบสลิปธนาคาร',
        APPROVED_PROOF_OF_PAYMENT_DEPOSIT: 'กำลังทำเครื่องเงิน',
        BUILT_COMPLETE:
          'ทำเครื่องเงินเรียบร้อยแล้ว กรุณาโอนค่าเครื่องเงินส่วนที่เหลือ',
      }
    },
    OrderState: () => OrderState,
  },
  methods: {
    stringPrice,
    dayjs,
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

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
