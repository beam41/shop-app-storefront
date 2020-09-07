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
    <p
      v-if="product.newPrice !== null"
      class="has-text-grey-darker is-size-4 mb-5"
    >
      <span class="old-price">{{ product.price }}</span>
      {{ product.newPrice }} บาท
    </p>
    <p v-else>{{ product.price }} บาท</p>
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
          <nuxt-link to="/login" class="button is-light">
            กรุณาเข้าสู่ระบบ
          </nuxt-link>
        </div>
      </div>
    </div>
    <p v-for="(desc, index) in descArray" :key="index" class="desc">
      {{ desc }}
    </p>
  </div>
</template>

<script>
import ChevronLeft from '@/assets/images/chevron_left-black-18dp.svg?inline'
import AddIcon from '@/assets/images/add-black-18dp.svg?inline'
import RemoveIcon from '@/assets/images/remove-black-18dp.svg?inline'

export default {
  components: {
    ChevronLeft,
    AddIcon,
    RemoveIcon,
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
  },
}
</script>

<style lang="scss" scoped>
.old-price {
  text-decoration-line: line-through;
  color: rgba(#363636, 0.5);
}

.section-input {
  display: flex;

  input {
    width: 7rem;
  }
}

.desc {
  overflow-wrap: break-word;
  text-align: justify;
}
</style>
