<template>
  <div v-if="promotions" class="container content-container">
    <ProductDisplay
      v-for="promo in promotions"
      :key="promo.id"
      :header="promo.name"
      :items-list="promo.productList"
      :desc="promo.description"
    />
  </div>
  <div v-else class="container">
    <Loader style="min-height: calc(100vh - 3.5rem)" />
  </div>
</template>

<script>
import { getAllPromotionAndProduct } from '@/api/product'

export default {
  data: () => ({
    promotions: null,
  }),
  mounted() {
    getAllPromotionAndProduct().then((res) => {
      this.promotions = res.data
    })
  },
}
</script>
