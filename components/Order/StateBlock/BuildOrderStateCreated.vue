<template>
  <div>
    <div class="detail mb-2">
      <h3 class="has-text-grey">ข้อมูลที่แนบ</h3>
      <p>
        ชื่อ-นามสกุล: {{ order.fullName }}
        <br />
        เบอร์โทรศัพท์: {{ order.phoneNumber }}
        <br />
        คำอธิบาย: {{ order.orderDescription }}
      </p>
    </div>
    <div v-if="order.descriptionImagesUrl.length > 0" class="desc-img">
      <h3 class="has-text-grey">รูปประกอบคำอธิบาย</h3>
      <div class="buttons">
        <a
          v-for="img in order.descriptionImagesUrl"
          :key="img.id"
          class="button image-select"
          href="img.imageUrl"
          target="_blank"
        >
          <figure class="image is-1by1">
            <img :src="img.imageUrl" :alt="img.imageUrl" />
          </figure>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.image-select {
  width: 7rem;
  height: 7rem;
  padding: 0.5rem;

  .image {
    width: 100%;
  }
}
</style>
