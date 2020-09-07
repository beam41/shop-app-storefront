<template>
  <div>
    <div class="image-box">
      <div class="img-cover">
        <figure
          v-for="(img, index) in product.imageUrls"
          v-show="index === currImageIndex"
          :key="img.id"
          class="image is-1by1"
        >
          <img :src="img.imageUrl" :alt="product.description" />
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
    currImageIndex: 0,
  }),
  methods: {
    changeImage(index) {
      this.currImageIndex = index
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
