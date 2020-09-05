<template>
  <div class="container content-container">
    <ProductDisplay header="กำไล" :items-list="recommend" />
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
