<template>
  <div class="home">
    <div class="jumbotron flex flex-align-center flex-justify-end">
      <div class="jumbotron-title has-text-white">
        <h1 class="has-text-white is-size-1 has-text-weight-medium">
          ร้านเครื่องเงิน Growthsilver
        </h1>
        <p>
          เครื่องเงินแท้ 92.5% made to order
          <br />
          สินค้า Handmade ทุกชิ้น
          <br />
          ติดต่อได้ที่ Fanpage:
          <a
            href="https://web.facebook.com/growthsilverwear/"
            class="has-text-white link"
            target="_blank"
            rel="noreferrer noopener"
            >Growthsilver</a
          >
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
      <Loader style="min-height: calc(100vh - 40.75rem)" />
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
  head: () => ({
    title: 'หน้าแรก',
  }),
}
</script>

<style lang="scss" scoped>
.jumbotron {
  background: linear-gradient(
      to right,
      #0000 (37.5rem - (37.5rem / 3)),
      #000 37.5rem
    ),
    url(~assets/images/R0015.png) no-repeat left/auto 37.5rem;
  height: 37.5rem;
  padding-right: 180px;
  box-shadow: 0px 4px 4px rgba(10, 10, 10, 0.03);
}

.jumbotron-title {
  max-width: 37rem;
  text-shadow: 0 0 2px black, 0 0 3px black, 0 0 5px black, 0 0 10px black;

  h1 {
    white-space: nowrap;
  }
}

@media screen and (max-width: 1024px) {
  .jumbotron {
    padding: 0.5rem;
    justify-content: center;
  }

  .jumbotron-title {
    text-align: center;
    h1 {
      white-space: normal;
    }
  }
}

.link {
  text-decoration: underline;
}
</style>
