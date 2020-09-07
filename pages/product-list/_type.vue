<template>
  <div v-if="productList" class="container content-container">
    <ProductDisplay :header="typeName" :items-list="productList" />
  </div>
  <div v-else class="container">
    <Loader style="min-height: calc(100vh - 3.5rem)" />
  </div>
</template>

<script>
import { getAllProductsByType } from '@/api/product'
export default {
  data: () => ({
    productList: null,
  }),
  computed: {
    typeName() {
      return this.$route.params.type
    },
  },
  mounted() {
    getAllProductsByType(this.typeName)
      .then((res) => {
        this.productList = res.data
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.$router.push('/')
        }
      })
  },
}
</script>
