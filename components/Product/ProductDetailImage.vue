<template>
  <div>
    <div class="image-box">
      <div class="img-cover">
        <figure class="image is-1by1">
          <img :src="currImage" :alt="product.description" />
        </figure>
      </div>
      <div class="buttons">
        <button
          v-for="(img, index) in product.imageUrls"
          :key="img.id"
          class="button image-select"
          @click="changeImage(index)"
        >
          <figure class="image is-1by1">
            <img :src="img.imageUrl" :alt="img.imageUrl" />
          </figure>
        </button>
      </div>
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
  data: () => ({
    currImage: null,
  }),
  mounted() {
    this.changeImage(0)
  },
  methods: {
    changeImage(index) {
      this.currImage = this.product.imageUrls[index]?.imageUrl
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  border-radius: 4px;
}

.img-cover {
  padding-bottom: 1rem;
}

.image-select {
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;

  .image {
    width: 100%;
  }
}

.image-box {
  position: sticky;
  top: 32px;
}
</style>
