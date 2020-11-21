<template>
  <div>
    <div class="payment-method">
      <h3 class="mb-2">กรุณาโอนมายัง</h3>
      <Loader v-if="paymentMethods === null" style="min-height: 100px" />
      <template v-else>
        <ul>
          <li v-for="method in paymentMethods" :key="method.id" class="mb-2">
            <p class="has-text-weight-medium">ธนาคาร: {{ method.bank }}</p>
            <p>
              บัญชี: {{ method.accountNumber }} (ชื่อบัญชี:
              {{ method.accountName }})
            </p>
          </li>
        </ul>
        <form class="mt-4" @submit.prevent="showConfirm = true">
          <div class="field">
            <div class="file is-light has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  :disabled="loading"
                  accept="image/*"
                  @change="imageUpload"
                />
                <span class="file-cta">
                  <span class="file-label">อัพโหลดหลักฐานการชำระเงิน</span>
                </span>
                <span class="file-name">
                  {{ imageName }}
                </span>
              </label>
            </div>
          </div>
          <div class="field">
            <button
              :class="['button is-dark', loading ? 'is-loading' : '']"
              :disabled="image === null"
              type="submit"
            >
              ยืนยันการชำระเงิน
            </button>
            <p class="help is-danger">เมื่อชำระเงินแล้วจะไม่สามารถยกเลิกได้</p>
          </div>
          <div v-if="buildOrder" class="field">
            <button
              :class="['button is-light', loading ? 'is-loading' : '']"
              @click.prevent="$emit('cancel')"
            >
              ยกเลิกคำสั่งทำ
            </button>
          </div>
        </form>
      </template>
    </div>
    <div v-if="showConfirm" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ยืนยันการชำระเงิน</p>
          <button
            class="delete"
            aria-label="close"
            :disabled="loading"
            @click="showConfirm = false"
          ></button>
        </header>
        <section class="modal-card-body">
          ยืนยันการชำระเงิน ?
          <br />
          เมื่อชำระเงินแล้วจะไม่สามารถยกเลิกได้
          <figure class="image is-1by1 mt-4">
            <img :src="url" alt="รูปหลักฐานการชำระเงิน" class="contain" />
          </figure>
        </section>
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
import { getPaymentMethods } from '@/api/payment'
import { addProofOfPaymentFull } from '@/api/order'
import { addProofOfPaymentDeposit } from '@/api/build-order'
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
    paymentMethods: null,
    image: null,
    showConfirm: false,
    url: null,
  }),
  computed: {
    imageName() {
      return this.image ? this.image.name : 'กรุณาเลือกไฟล์'
    },
  },
  watch: {
    image(to) {
      if (this.url) {
        URL.revokeObjectURL(this.url)
      }
      this.url = URL.createObjectURL(to)
    },
  },
  mounted() {
    getPaymentMethods().then((res) => {
      this.paymentMethods = res.data
    })
  },
  methods: {
    imageUpload(e) {
      this.image = e.target.files?.[0]
    },
    submit() {
      const form = new FormData()
      form.append('image', this.image)
      this.$emit('loadState', true)
      const f = this.buildOrder
        ? addProofOfPaymentDeposit
        : addProofOfPaymentFull
      f(this.order.id, form).then((res) => {
        this.$emit('loadState', false)
        this.showConfirm = false
        this.$emit('reload')
      })
    },
  },
}
</script>

<style></style>
