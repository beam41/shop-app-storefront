<template>
  <div v-if="product" class="container content-container">
    <ProductDetail :product="product" />
  </div>
  <div v-else class="container">
    <Loader style="min-height: calc(100vh - 3.25rem)" />
  </div>
</template>

<script>
import { getProductById } from '@/api/product'
export default {
  data: () => ({
    product: null,
  }),
  computed: {
    currId() {
      return this.$route.params.id
    },
  },
  mounted() {
    if (!isNaN(+this.currId)) {
      getProductById(+this.currId)
        .then((res) => {
          this.product = res.data
        })
        .catch((err) => {
          if (err.response.status === 404) this.$router.push('/')
        })
    } else {
      this.$router.push('/')
    }
  },
  head() {
    if (this.product === null) {
      return {
        title: `สินค้าเลขที่ ${this.currId}`,
      }
    }
    return {
      title: this.product.name,
    }
  },
}
</script>
