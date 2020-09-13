<template>
  <div class="inner-pad">
    <h1
      class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
    >
      ตะกร้าสินค้า
    </h1>
    <div
      class="columns is-desktop is-variable is-0-until-desktop is-4-widescreen is-multiline"
    >
      <CartItems
        v-if="!checkout"
        class="column is-full-desktop is-two-thirds-widescreen"
      />
      <CartSummary class="column" @check-out="setCheckout(true)" />
      <CartCheckoutForm
        v-if="checkout"
        class="column is-full-desktop is-two-thirds-widescreen"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    checkout: false,
  }),
  methods: {
    setCheckout(state) {
      this.checkout = state
    },
  },
}
</script>

<style></style>
