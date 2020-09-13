<template>
  <div>
    <div class="box">
      <div class="cart-item has-text-right delete-all">
        <a class="is-size-7"
          >ลบทั้งหมด <DeleteIcon class="svg-as-font del"
        /></a>
      </div>
      <div
        v-for="item in cart"
        :key="item.product.id"
        class="cart-item flex py-2"
      >
        <div>
          <div class="image-wrapper mr-2">
            <figure class="image is-1by1">
              <img
                :src="
                  item.product.imageUrls[0]
                    ? item.product.imageUrls[0].imageUrl
                    : null
                "
                :alt="item.product.name"
              />
            </figure>
          </div>
        </div>
        <div class="flex flex-space-between flex-col desc">
          <h3 class="has-text-weight-medium is-size-5 has-text-grey-darker">
            {{ item.product.name }}
          </h3>
          <h4 v-if="item.product.newPrice !== null">
            <span class="old-price">{{ item.product.price }}</span>
            {{ item.product.newPrice }} บาท
          </h4>
          <h3 v-else>{{ item.product.price }} บาท</h3>
        </div>
        <div class="flex flex-space-between flex-col amount">
          <div class="field has-addons mb-0">
            <div class="control">
              <button
                v-longclick="() => removeAmount(item.product.id, item.amount)"
                class="button"
                @click="() => removeAmount(item.product.id, item.amount)"
              >
                <span class="icon"><RemoveIcon /></span>
              </button>
            </div>
            <div class="control">
              <input
                :value="item.amount"
                class="input amount-input"
                type="text"
                @change="(e) => changeAmount(item.product.id, e)"
              />
            </div>
            <div class="control">
              <button
                v-longclick="() => addAmount(item.product.id, item.amount)"
                class="button"
                @click="() => addAmount(item.product.id, item.amount)"
              >
                <span class="icon"><AddIcon /></span>
              </button>
            </div>
          </div>
          <div class="price">
            <span>ราคารวม</span>
            <span class="sum"
              >{{
                nullish(item.product.newPrice, item.product.price) * item.amount
              }}
              บาท</span
            >
          </div>
        </div>
        <div class="flex has-text-right delete-wrapper ml-2">
          <a><DeleteIcon class="svg-as-font del" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DeleteIcon from '@/assets/images/delete-black-18dp.svg?inline'
import AddIcon from '@/assets/images/add-black-18dp.svg?inline'
import RemoveIcon from '@/assets/images/remove-black-18dp.svg?inline'
import { longClickDirective } from 'vue-long-click'
import { nullish } from '@/utils/nullish'

export default {
  components: {
    DeleteIcon,
    AddIcon,
    RemoveIcon,
  },
  directives: {
    longclick: longClickDirective({ delay: 400, interval: 50 }),
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.items,
    }),
  },
  methods: {
    addAmount(id, currAmount) {
      this.$store.commit('cart/editAmount', { id, newAmount: currAmount + 1 })
    },
    removeAmount(id, currAmount) {
      this.$store.commit('cart/editAmount', { id, newAmount: currAmount - 1 })
    },
    changeAmount(id, e) {
      this.$store.commit('cart/editAmount', { id, newAmount: e.target.value })
    },
    nullish,
  },
}
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variable';
.box {
  height: 100%;
}

.cart-item {
  &.delete-all {
    border-width: 0 0 2px !important;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
  }

  &:last-child {
    padding-bottom: 0 !important;
  }

  a {
    color: #4a4a4a;
  }

  a:hover {
    &,
    & .del {
      color: #363636;
    }
  }

  .del {
    color: #d32f2f;
  }

  .image-wrapper {
    width: 6rem;
    height: 6rem;

    img {
      border-radius: 4px;
    }
  }

  .desc {
    flex: 2;
  }

  .amount {
    align-items: flex-end;
    flex: 1;
  }

  .delete-wrapper {
    align-items: flex-end;
  }

  .amount-input {
    width: 100%;
  }

  .sum {
    color: variable.$sum-green;
  }

  .price {
    width: 100%;
    display: flex;

    .sum {
      margin-left: auto;
    }
  }
}
</style>
