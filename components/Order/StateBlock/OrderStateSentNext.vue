<template>
  <div>
    <div class="proof-of-payment">
      <form @submit.prevent="showConfirm = true">
        <div class="field">
          <label for="msg_to" class="label">ข้อความถึงผู้ขาย</label>
          <div class="control">
            <input
              id="msg_to"
              v-model="message"
              class="input"
              type="text"
              placeholder="ข้อความถึงผู้ขาย"
              :disabled="loading"
            />
          </div>
        </div>
        <div class="field">
          <button
            :class="['button is-dark', loading ? 'is-loading' : '']"
            :disabled="image === null"
            type="submit"
          >
            รับสินค้าแล้ว
          </button>
        </div>
      </form>
    </div>
    <div v-if="showConfirm" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ยืนยันการรับสินค้า</p>
          <button
            class="delete"
            aria-label="close"
            :disabled="loading"
            @click="showConfirm = false"
          ></button>
        </header>
        <section class="modal-card-body">ขอบคุณที่ซื้อสินค้ากับเรา</section>
        <footer class="modal-card-foot field flex">
          <button
            class="button"
            :disabled="loading"
            @click="showConfirm = false"
          >
            ยกเลิก
          </button>
          <button
            :class="['button is-dark', loading ? 'is-loading' : '']"
            @click="submit"
          >
            ยืนยัน
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { received as orderReceived } from '@/api/order'
import { received as buildOrderReceived } from '@/api/build-order'

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
    loading: Boolean,
    buildOrder: Boolean,
  },
  data: () => ({
    message: '',
    showConfirm: false,
  }),
  methods: {
    submit() {
      this.$emit('loadState', true)
      const f = this.buildOrder ? buildOrderReceived : orderReceived
      f(this.order.id, { message: this.message }).then((res) => {
        this.$emit('loadState', false)
        this.$emit('reload')
      })
    },
  },
}
</script>
