<template>
  <div class="inner-pad">
    <h1
      class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
    >
      รหัสสั่ง{{ buildOrder ? 'ทำ' : 'ซื้อ' }}ที่ {{ order.id }}
    </h1>
    <div v-if="lastOrderState === OrderState.CREATED" class="cancel-wrapper">
      <a
        class="has-text-danger"
        :disabled="loading"
        @click="showConfirmDelete = true"
      >
        ยกเลิกคำสั่ง{{ buildOrder ? 'ทำ' : 'ซื้อ' }}
      </a>
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
              :datetime="state.createdDate.toString()"
              class="has-text-grey is-size-7"
              >{{ dayjs(state.createdDate).format('D MMM BB H:mm') }}</time
            >
            <h2 class="has-text-grey-darker has-text-weight-medium">
              {{ headerTextMap(state.state) }}
            </h2>
            <div class="state-data-wrapper">
              <template v-if="state.state === OrderState.CREATED">
                <LazyBuildOrderStateCreated v-if="buildOrder" :order="order" />
                <LazyOrderStateCreated v-else :order="order" />
              </template>
              <template v-else-if="state.state === OrderState.IS_ABLE_TO_BUILT">
                <LazyBuildOrderStateIsAbleToBuilt :order="order" />
              </template>
              <template
                v-else-if="
                  state.state === OrderState.ADDED_PROOF_OF_PAYMENT_DEPOSIT
                "
              >
                <LazyOrderStateAddProof
                  :proof="order.proofOfPaymentDepositImage"
                />
              </template>
              <template
                v-else-if="
                  state.state === OrderState.ADDED_PROOF_OF_PAYMENT_FULL
                "
              >
                <LazyBuildOrderStateAddProof v-if="buildOrder" :order="order" />
                <LazyOrderStateAddProof
                  v-else
                  :proof="order.proofOfPaymentFullImage"
                />
              </template>
              <template v-else-if="state.state === OrderState.SENT">
                <LazyOrderStateSent :order="order" />
              </template>
              <template v-else-if="state.state === OrderState.RECEIVED">
                <LazyOrderStateReceived :order="order" />
              </template>
              <template
                v-else-if="
                  (state.state === OrderState.CANCELLED &&
                    order.cancelledByAdmin) ||
                  state.state === OrderState.IS_UNABLE_TO_BUILT
                "
              >
                <LazyOrderStateCancelled :order="order" />
              </template>
            </div>
          </div>
        </div>
        <div
          v-if="
            state.state !== OrderState.CANCELLED &&
            state.state !== OrderState.RECEIVED &&
            state.state !== OrderState.IS_UNABLE_TO_BUILT &&
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
              :datetime="state.createdDate.toString()"
              class="has-text-grey is-size-7"
              >{{ dayjs(state.createdDate).format('D MMM BB H:mm') }}</time
            >
            <h2 class="has-text-grey-darker has-text-weight-medium">
              {{ headerTextNextMap(state.state) }}
            </h2>
            <div class="state-data-wrapper">
              <template
                v-if="
                  !buildOrder &&
                  state.state === OrderState.CREATED &&
                  order.purchaseMethod !== PurchaseMethod.ON_DELIVERY
                "
              >
                <LazyOrderStateCreatedNext
                  :order="order"
                  :loading="loading"
                  @loadState="setLoading"
                  @reload="$emit('reload')"
                />
              </template>
              <template v-else-if="state.state === OrderState.IS_ABLE_TO_BUILT">
                <LazyOrderStateCreatedNext
                  :order="order"
                  :loading="loading"
                  build-order
                  @loadState="setLoading"
                  @reload="$emit('reload')"
                  @cancel="showConfirmDelete = true"
                />
              </template>
              <template
                v-else-if="
                  state.state === OrderState.APPROVED_PROOF_OF_PAYMENT_DEPOSIT
                "
              >
                <LazyBuildOrderStateApproveProofDepositNext :order="order" />
              </template>
              <template v-else-if="state.state === OrderState.BUILT_COMPLETE">
                <LazyBuildOrderStateBuiltCompleteNext
                  :order="order"
                  :loading="loading"
                  @loadState="setLoading"
                  @reload="$emit('reload')"
                />
              </template>
              <template v-else-if="state.state === OrderState.SENT">
                <LazyOrderStateSentNext
                  :order="order"
                  :loading="loading"
                  :build-order="buildOrder"
                  @loadState="setLoading"
                  @reload="$emit('reload')"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="showConfirmDelete" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            ยืนยันการยกเลิกคำสั่ง{{ buildOrder ? 'ทำ' : 'ซื้อ' }}
          </p>
          <button
            class="delete"
            aria-label="close"
            :disabled="loading"
            @click="showConfirmDelete = false"
          ></button>
        </header>
        <section class="modal-card-body">
          ยืนยันการยกเลิกคำสั่ง{{ buildOrder ? 'ทำ' : 'ซื้อ' }} ?
          เมื่อตกลงแล้วจะไม่สามารถเปลี่ยนแปลงได้
        </section>
        <footer class="modal-card-foot field flex">
          <button
            class="button"
            :disabled="loading"
            @click="showConfirmDelete = false"
          >
            ไม่
          </button>
          <button
            :class="['button is-dark', loading ? 'is-loading' : '']"
            @click="cancelOrder"
          >
            ใช่
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import OrderState from '@/constants/order-state'
import PurchaseMethod from '@/constants/purchase-method'
import { cancelled as cancelledOrder } from '@/api/order'
import { cancelled as cancelledBuildOrder } from '@/api/build-order'
import dayjs from 'dayjs'

const headerText = {
  CREATED: ({ buildOrder }) => `วางคำสั่ง${buildOrder ? 'ทำ' : 'ซื้อ'}แล้ว`,
  IS_ABLE_TO_BUILT: () => 'สามารถทำได้',
  IS_UNABLE_TO_BUILT: () => 'ไม่สามารถทำได้',
  ADDED_PROOF_OF_PAYMENT_DEPOSIT: () => 'เพิ่มสลิปธนาคารแล้ว (มัดจำ)',
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: () => 'ตรวจสอบสลิปธนาคารแล้ว (มัดจำ)',
  BUILT_COMPLETE: () => 'ทำเครื่องเงินเรียบร้อยแล้ว',
  ADDED_PROOF_OF_PAYMENT_FULL: ({ buildOrder }) =>
    `เพิ่มสลิปธนาคารแล้ว${buildOrder ? ' (ส่วนที่เหลือ)' : ''}`,
  APPROVED_PROOF_OF_PAYMENT_FULL: ({ buildOrder }) =>
    `ตรวจสอบสลิปธนาคารแล้ว${buildOrder ? ' (ส่วนที่เหลือ)' : ''}`,
  SENT: () => 'จัดส่งสินค้าแล้ว',
  RECEIVED: () => 'ได้รับแล้ว',
  CANCELLED: ({ byAdmin }) => (byAdmin ? 'ถูกยกเลิกโดยผู้ขาย' : 'ยกเลิกแล้ว'),
}

const headerTextNext = {
  CREATED: ({ buildOrder, purchaseMethod }) =>
    buildOrder
      ? 'รอการตอบกลับจากผู้ขาย'
      : purchaseMethod === PurchaseMethod.ON_DELIVERY
      ? 'รอการจัดส่ง'
      : 'รอการชำระเงิน',
  IS_ABLE_TO_BUILT: () => 'ยืนยันการสั่งทำและโอนเงินมัดจำ',
  ADDED_PROOF_OF_PAYMENT_DEPOSIT: () => 'รอการตรวจสอบสลิปธนาคาร',
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: () => 'กำลังทำเครื่องเงิน',
  BUILT_COMPLETE: () => 'รอการชำระเงินส่วนที่เหลือ',
  ADDED_PROOF_OF_PAYMENT_FULL: () => 'รอการตรวจสอบสลิปธนาคาร',
  APPROVED_PROOF_OF_PAYMENT_FULL: () => 'รอการจัดส่ง',
  SENT: () => 'ยืนยันการรับสินค้า',
}

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
    buildOrder: Boolean,
  },
  data: () => ({
    showConfirmDelete: false,
    loading: false,
  }),
  computed: {
    lastOrderState() {
      return this.order.orderStates[this.order.orderStates.length - 1].state
    },
    OrderState: () => OrderState,
    PurchaseMethod: () => PurchaseMethod,
  },
  methods: {
    headerTextMap(state) {
      return headerText[state]({
        buildOrder: this.buildOrder,
        byAdmin: this.order.cancelledByAdmin,
      })
    },
    headerTextNextMap(state) {
      return headerTextNext[state]({
        buildOrder: this.buildOrder,
        purchaseMethod: this.order.purchaseMethod,
      })
    },
    cancelOrder() {
      this.loading = true
      const cancelled = this.buildOrder ? cancelledBuildOrder : cancelledOrder
      cancelled(this.order.id)
        .then((res) => {
          this.$router.push('/')
          this.loading = false
        })
        .catch((err) => {
          if (err) this.loading = false
        })
    },
    setLoading(e) {
      this.loading = e
    },
    dayjs,
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
