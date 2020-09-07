<template>
  <div class="product-detail inner-pad">
    <div class="columns is-tablet is-variable is-0-until-tablet is-8-desktop">
      <ProductDetailImage class="column" />
      <ProductDetailInfo :product="product" class="column is-two-thirds" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
