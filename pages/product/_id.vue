<template>
  <div v-if="product" class="container content-container">
    <ProductDetail :product="product" />
  </div>
  <div v-else class="container">
    <Loader style="min-height: calc(100vh - 41.5rem)" />
  </div>
</template>

<script>
const string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '
export default {
  data: () => ({
    product: {
      id: 1,
      name: 'กำไล',
      description: Array(1250)
        .fill(null)
        .map((_) => string[Math.trunc(Math.random() * string.length)])
        .join(''),
      price: 114,
      newPrice: 123,
      activePromotion: {
        id: 1,
        name: 'ลดครั้งใหญ่',
        description: 'ลดสินค้าที่ร่วมรายการหลายบาท',
      },
    },
  }),
}
</script>

<style></style>
