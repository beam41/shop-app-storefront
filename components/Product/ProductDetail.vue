<template>
  <div class="product-detail inner-pad">
    <div class="columns is-tablet is-variable is-0-until-tablet is-8-desktop">
      <div class="column">
        <div class="img-cover">
          <figure class="image is-1by1">
            <img src="@/assets/images/placeholder.jpg" alt="รูป" />
          </figure>
        </div>
        <div class="buttons">
          <button v-for="i in 7" :key="i" class="button image-select">
            <figure class="image is-1by1">
              <img src="@/assets/images/placeholder.jpg" alt="รูป" />
            </figure>
          </button>
        </div>
      </div>
      <div class="column is-two-thirds">
        <div>
          <a @click="back()">
            <ChevronLeft class="svg-as-font" />กลับหน้าก่อนหน้า
          </a>
        </div>
        <h1
          class="has-text-grey-darker mb-5.5 is-size-2 has-text-weight-medium"
        >
          {{ product.name }}
        </h1>
        <p v-if="product.newPrice !== null" class="is-size-4 mb-5">
          <span class="old-price">{{ product.price }}</span>
          {{ product.newPrice }} บาท
        </p>
        <p v-else>{{ product.price }} บาท</p>
        <div class="section-input"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronLeft from '@/assets/images/chevron_left-black-18dp.svg?inline'
export default {
  components: {
    ChevronLeft,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variable';

.product-detail {
  img {
    border-radius: 4px;
  }

  .img-cover {
    padding-bottom: 1rem;
  }

  .image-select {
    width: 5rem;
    height: 5rem;
    padding: 0.5rem;

    .image {
      width: 100%;
    }
  }

  .old-price {
    text-decoration-line: line-through;
    color: rgba(#363636, 0.5);
  }
}
</style>
