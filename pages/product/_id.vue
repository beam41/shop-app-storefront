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
  mounted() {
    if (!isNaN(+this.$route.params.id)) {
      getProductById(+this.$route.params.id).then((res) => {
        this.product = res.data
      })
    }
  },
}
</script>

<style></style>
