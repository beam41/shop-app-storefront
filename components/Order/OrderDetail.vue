<template>
  <div class="inner-pad">
    <h1
      class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
    >
      คำสั่งซื้อที่ {{ order.id }}
    </h1>
    <div v-if="lastOrderState === OrderState.CREATED" class="cancel-wrapper">
      <a class="has-text-danger">ยกเลิกคำสั่งซื้อ</a>
    </div>
    <div class="state-block-wrapper">
      <template v-for="state in order.orderStates">
        <div :key="state.id" class="state-block flex">
          <div class="state-strip">
            <div class="line has-background-grey-darker"></div>
            <div class="dot has-background-grey-darker"></div>
          </div>
          <div class="state-data flex-1">
            <time
              :datetime="state.createdAt.toString()"
              class="has-text-grey is-size-7"
              >{{ state.createdAt.format('D/M/BB H:mm') }}</time
            >
            <h2 class="has-text-grey-darker has-text-weight-medium">
              {{ headerTextMap(state.state) }}
            </h2>
            <div class="state-data-wrapper">
              <template v-if="state.state === OrderState.CREATED">
                <LazyOrderStateCreated :order="order" />
              </template>
              <template
                v-else-if="
                  state.state === OrderState.ADDED_PROOF_OF_PAYMENT_FULL
                "
              >
                <LazyOrderStateAddProofFull :order="order" />
              </template>
              <template v-else-if="state.state === OrderState.SENT">
                <LazyOrderStateSent :order="order" />
              </template>
              <template v-else-if="state.state === OrderState.RECEIVED">
                <LazyOrderStateReceived :order="order" />
              </template>
            </div>
          </div>
        </div>
        <div
          v-if="
            state.state !== OrderState.RECEIVED &&
            lastOrderState === state.state
          "
          :key="'next' + state.id"
          class="state-block flex"
        >
          <div class="state-strip">
            <div class="line has-background-grey-darker"></div>
            <div class="dot has-background-grey-darker"></div>
          </div>
          <div class="state-data flex-1">
            <time
              :datetime="state.createdAt.toString()"
              class="has-text-grey is-size-7"
              >{{ state.createdAt.format('D/M/BB H:mm') }}</time
            >
            <h2 class="has-text-grey-darker has-text-weight-medium">
              {{ headerTextNextMap(state.state) }}
            </h2>
            <div class="state-data-wrapper">
              <template v-if="state.state === OrderState.CREATED">
                <LazyOrderStateCreatedNext
                  :order="order"
                  @reload="$emit('reload')"
                />
              </template>
              <template v-else-if="state.state === OrderState.SENT">
                <LazyOrderStateSentNext
                  :order="order"
                  @reload="$emit('reload')"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import OrderState from '@/constant/order-state'
const headerText = {
  CREATED: 'วางคำสั่งซื้อแล้ว',
  ADDED_PROOF_OF_PAYMENT_FULL: 'เพิ่มสลิปธนาคารแล้ว',
  APPROVED_PROOF_OF_PAYMENT_FULL: 'ตรวจสอบสลิปธนาคารแล้ว',
  SENT: 'จัดส่งสินค้าแล้ว',
  RECEIVED: 'ได้รับแล้ว',
  CANCELLED: 'ยกเลิกแล้ว',
}

const headerTextNext = {
  CREATED: 'รอการชำระเงิน',
  ADDED_PROOF_OF_PAYMENT_FULL: 'รอการตรวจสอบสลิปธนาคาร',
  APPROVED_PROOF_OF_PAYMENT_FULL: 'รอการจัดส่ง',
  SENT: 'ยืนยันการรับสินค้า',
}

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lastOrderState() {
      return this.order.orderStates[this.order.orderStates.length - 1].state
    },
    OrderState: () => OrderState,
  },
  methods: {
    headerTextMap(state) {
      return headerText[state]
    },
    headerTextNextMap(state) {
      return headerTextNext[state]
    },
  },
}
</script>

<style lang="scss" scoped>
.cancel-wrapper {
  text-align: right;
}

.state-block {
  .state-data-wrapper {
    margin: 8px 32px;
  }
  .state-strip {
    box-sizing: content-box;
    padding: 0 12px;
    width: 1px;
    position: relative;

    .line {
      height: 100%;
      width: 100%;
    }

    .dot {
      position: absolute;
      width: 9px;
      height: 9px;
      left: 8px;
      top: 9px;
      border-radius: 100px;
    }
  }

  &:first-child {
    .state-strip {
      padding-top: 12px;
    }
  }

  &:last-child {
    .state-strip {
      .line {
        height: 12px;
      }
    }
  }

  &:only-child {
    .state-strip {
      .line {
        height: 0;
      }
    }
  }
}
</style>
