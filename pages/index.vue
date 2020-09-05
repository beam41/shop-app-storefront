<template>
  <div class="home">
    <div class="jumbotron flex flex-align-center flex-justify-end">
      <div class="jumbotron-title">
        <h1 class="m-0 is-size-1 has-text-weight-medium">
          ร้านเครื่องเงิน Growth Silver
        </h1>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac
          sapien sit amet ex tincidunt pellentesque at ac turpis. Nulla mollis
          mollis eros, et egestas justo imperdiet dictum
        </p>
      </div>
    </div>
    <div class="container content-container">
      <ProductDisplay header="สินค้าแนะนำ" :items-list="recommend" />
      <ProductDisplay
        header="กำไล"
        :items-list="recommend"
        show-more-path="/product-list/กำไล"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    recommend: [
      {
        id: 1,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        price: 500,
      },
      {
        id: 2,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        oldPrice: 700,
        price: 500,
      },
      {
        id: 3,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        price: 500,
      },
      {
        id: 4,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        price: 500,
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.home {
  .jumbotron {
    background: #ffffff;
    height: 37.5rem;
    padding-right: 180px;
    box-shadow: 0px 4px 4px rgba(10, 10, 10, 0.03);

    .jumbotron-title {
      width: 37rem;

      h1 {
        white-space: nowrap;
      }
    }
  }
}
</style>
