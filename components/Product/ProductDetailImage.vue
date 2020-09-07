<template>
  <div>
    <div class="image-box">
      <div class="img-cover">
        <figure class="image is-1by1">
          <img src="@/assets/images/placeholder.jpg" alt="รูป" />
        </figure>
      </div>
      <div class="buttons">
        <button v-for="i in 7" :key="i" class="button image-select">
          <figure class="image is-1by1">
            <img src="@/assets/images/placeholder.jpg" alt="รูป" />
          </figure>
        </button>
      </div>
    </div>
  </div>
</template>

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
