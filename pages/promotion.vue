<template>
  <div class="container content-container">
    <ProductDisplay
      header="กำไล"
      :items-list="recommend"
      desc="ลดราคาสินค้าที่ร่วมรายการทุกชิ้น 25 บาท"
    />
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
        oldPrice: 700,
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
        oldPrice: 700,
        price: 500,
      },
      {
        id: 4,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        oldPrice: 700,
        price: 500,
      },
      {
        id: 5,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        oldPrice: 700,
        price: 500,
      },
      {
        id: 6,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        oldPrice: 700,
        price: 500,
      },
      {
        id: 7,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        oldPrice: 700,
        price: 500,
      },
      {
        id: 8,
        name: 'Lorem',
        image: require('@/assets/images/placeholder.jpg'),
        oldPrice: 700,
        price: 500,
      },
    ],
  }),
}
</script>
