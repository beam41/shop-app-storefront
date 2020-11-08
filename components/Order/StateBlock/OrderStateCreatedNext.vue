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
        <form class="mt-4" @submit.prevent="submit">
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
            <p class="help is-danger">
              เมื่อชำระเงินแล้วจะไม่สามารถยกเลิกคำสั่งซื้อได้
            </p>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import { getPaymentMethods } from '@/api/payment'
import { addProofOfPaymentFull } from '@/api/order'
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    paymentMethods: null,
    image: null,
    loading: false,
  }),
  computed: {
    imageName() {
      return this.image ? this.image.name : 'กรุณาเลือกไฟล์'
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
      addProofOfPaymentFull(this.order.id, form).then((res) => {
        this.$emit('reload')
      })
    },
  },
}
</script>

<style></style>
