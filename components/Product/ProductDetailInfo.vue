<template>
  <div>
    <div>
      <a @click="back()">
        <ChevronLeft class="svg-as-font" />กลับหน้าก่อนหน้า
      </a>
    </div>
    <h1 class="has-text-grey-darker mb-5.5 is-size-2 has-text-weight-medium">
      {{ product.name }}
    </h1>
    <p v-if="product.newPrice" class="has-text-grey-darker is-size-4">
      <span class="old-price">{{ product.price }}</span>
      {{ stringPrice(product.newPrice) }}
      บาท
    </p>
    <p v-else class="has-text-grey-darker is-size-4 mb-5">
      {{ stringPrice(product.price) }}
      บาท
    </p>
    <p v-if="product.promotion" class="has-text-danger is-size-7 mb-5">
      โปรโมชั่น {{ product.promotion.name }}:
      {{ product.promotion.description }}
    </p>
    <div class="section-input">
      <div class="field has-addons mr-3 mb-5">
        <div class="control">
          <button
            v-longclick="removeAmount"
            class="button"
            @click="removeAmount"
          >
            <span class="icon"><RemoveIcon /></span>
          </button>
        </div>
        <div class="control">
          <input v-model="amount" class="input" type="text" />
        </div>
        <div class="control">
          <button v-longclick="addAmount" class="button" @click="addAmount">
            <span class="icon"><AddIcon /></span>
          </button>
        </div>
      </div>
      <div class="field has-addons mb-5">
        <div class="control">
          <nuxt-link
            v-if="!$store.state.user.data"
            to="/login"
            class="button is-light"
          >
            กรุณาเข้าสู่ระบบ
          </nuxt-link>
          <button v-else class="button is-dark" @click="addToCart">
            เพิ่มลงรถเข็น
          </button>
        </div>
      </div>
    </div>
    <!-- prettier-ignore -->
    <p v-for="(desc, index) in descArray" :key="index" class="desc pre-wrap">{{
      desc
    }}</p>
  </div>
</template>

<script>
import ChevronLeft from '@/assets/images/chevron_left-black-18dp.svg?inline'
import AddIcon from '@/assets/images/add-black-18dp.svg?inline'
import RemoveIcon from '@/assets/images/remove-black-18dp.svg?inline'
import { longClickDirective } from 'vue-long-click'
import { stringPrice } from '@/utils/string-price'

export default {
  components: {
    ChevronLeft,
    AddIcon,
    RemoveIcon,
  },
  directives: {
    longclick: longClickDirective({ delay: 400, interval: 50 }),
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    amount: 1,
  }),
  computed: {
    descArray() {
      return this.product.description.split('\n')
    },
  },
  watch: {
    amount(to) {
      if (to < 0) this.amount = 0
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    addAmount() {
      ++this.amount
    },
    removeAmount() {
      let a = this.amount
      if (--a < 1) {
        a = 1
      }
      this.amount = a
    },
    addToCart() {
      this.$store.commit('cart/add', {
        product: this.product,
        amount: +this.amount,
      })
    },
    stringPrice,
  },
}
</script>

<style lang="scss" scoped>
.section-input {
  display: flex;

  input {
    width: 7rem;
  }
}
</style>
