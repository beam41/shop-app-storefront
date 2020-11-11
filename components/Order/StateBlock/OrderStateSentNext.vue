<template>
  <div>
    <div class="proof-of-payment">
      <form @submit.prevent="submit">
        <div class="field">
          <label for="msg_to" class="label">ข้อความถึงผู้ขาย</label>
          <div class="control">
            <input
              id="msg_to"
              v-model="message"
              class="input"
              type="text"
              placeholder="ข้อความถึงผู้ขาย"
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
  </div>
</template>

<script>
import { received } from '@/api/order'

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    message: '',
    loading: false,
  }),
  methods: {
    submit() {
      this.loading = true
      received(this.order.id, { message: this.message }).then((res) => {
        this.loading = false
        this.$emit('reload')
      })
    },
  },
}
</script>
