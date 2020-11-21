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
        :cart="cart"
        :class="[
          'column',
          cart.length > 0 ? 'is-full-desktop is-two-thirds-widescreen' : null,
        ]"
      />
      <LazyCartSummary
        v-if="cart.length > 0"
        class="column"
        :is-checkout="checkout"
        :cart="cart"
        @check-out="setCheckout(true)"
      />
      <LazyCartCheckoutForm
        v-if="checkout"
        class="column is-full-desktop is-two-thirds-widescreen"
        :cart="cart"
        @back="setCheckout(false)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    checkout: false,
  }),
  computed: {
    ...mapState({
      cart: (state) => state.cart.items,
    }),
  },
  methods: {
    setCheckout(state) {
      this.checkout = state
    },
  },
}
</script>

<style></style>
