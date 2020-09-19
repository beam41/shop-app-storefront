<template>
  <div class="inner-pad">
    <h1
      class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
    >
      คำสั่งซื้อที่ {{ order.id }}
    </h1>
    <div class="cancel-wrapper">
      <a class="has-text-danger">ยกเลิกคำสั่งซื้อ</a>
    </div>
    <div
      v-for="state in order.orderStates"
      :key="state.id"
      class="state-block flex"
    >
      <div class="state-strip"></div>
      <div class="state-data">
        <time
          :datetime="state.createdAt.toString()"
          class="has-text-grey is-size-7"
          >{{ state.createdAt.format('D/M/BB H:mm') }}</time
        >
        <h2 class="has-text-grey-darker has-text-weight-medium">
          {{ headerTextMap(state.state) }}
        </h2>
        <div class="state-data-wrapper">
          <LazyOrderStateCreated />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const headerText = {
  CREATED: 'วางคำสั่งซื้อแล้ว',
}
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    headerTextMap(state) {
      return headerText[state]
    },
  },
}
</script>

<style lang="scss" scoped>
.cancel-wrapper {
  text-align: right;
}

.state-data-wrapper {
  margin: 8px 32px;
}
</style>
