<template>
  <div class="home">
    <div class="jumbotron flex flex-align-center flex-justify-end">
      <div class="jumbotron-title">
        <h1 class="has-text-grey-darker is-size-1 has-text-weight-medium">
          ร้านเครื่องเงิน Growth Silver
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac
          sapien sit amet ex tincidunt pellentesque at ac turpis. Nulla mollis
          mollis eros, et egestas justo imperdiet dictum
        </p>
      </div>
    </div>
    <div
      v-if="recommend !== null && typeAndProduct !== null"
      class="container content-container"
    >
      <ProductDisplay header="สินค้าแนะนำ" :items-list="recommend" />
      <div>
        <ProductDisplay
          v-for="tp in typeAndProduct"
          :key="tp.id"
          :header="tp.name"
          :items-list="tp.productList"
          :show-more-path="`/product-list/${tp.name}`"
        />
      </div>
    </div>
    <div v-else class="container">
      <Loader style="min-height: calc(100vh - 41.5rem)" />
    </div>
  </div>
</template>

<script>
import { getRecommends, getAllTypesAndProducts } from '@/api/product'
export default {
  data: () => ({
    recommend: null,
    typeAndProduct: null,
  }),
  mounted() {
    this.getRecommends()
    this.getAllTypesAndProducts()
  },
  methods: {
    getRecommends() {
      getRecommends(4).then((res) => {
        this.recommend = res.data
      })
    },
    getAllTypesAndProducts() {
      getAllTypesAndProducts(4).then((res) => {
        this.typeAndProduct = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.jumbotron {
  background: #ffffff;
  height: 37.5rem;
  padding-right: 180px;
  box-shadow: 0px 4px 4px rgba(10, 10, 10, 0.03);
}

.jumbotron-title {
  width: 37rem;

  h1 {
    white-space: nowrap;
  }
}
</style>
