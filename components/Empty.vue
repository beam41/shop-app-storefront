<template>
  <div
    class="empty flex flex-align-center flex-justify-center flex-col has-text-grey"
  >
    <NotInterestedIcon />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import NotInterestedIcon from '~/assets/images/not_interested-black-18dp.svg?inline'
export default {
  components: {
    NotInterestedIcon,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.empty {
  height: 100%;

  svg {
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
  }
}
</style>
