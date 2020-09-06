<template>
  <div class="display-card inner-pad">
    <component
      :is="headerTag"
      class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
    >
      {{ header }}
    </component>
    <p v-if="desc" class="has-text-centered my-3">{{ desc }}</p>
    <div class="columns is-multiline is-variable is-0-mobile is-4-tablet">
      <div
        v-for="item in itemsList"
        :key="item.id"
        class="column is-one-quarter-desktop is-half-tablet is-full-mobile"
      >
        <nuxt-link class="card" :to="`/product/${item.id}`">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="item.image" :alt="item.name" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content has-text-centered">
              <h3 class="is-size-5">{{ item.name }}</h3>
              <p v-if="item.newPrice" class="text-price promotion">
                <span v-if="item.price" class="old-price"
                  >{{ item.price }} บาท</span
                >
                {{ item.newPrice }} บาท
              </p>
              <p v-else class="text-price">{{ item.price }} บาท</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-if="showMorePath" class="has-text-right my-3">
      <nuxt-link :to="showMorePath">
        ดูเพิ่มเติม<ChevronRight class="svg-as-font" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ChevronRight from '~/assets/images/chevron_right-black-18dp.svg?inline'
export default {
  components: {
    ChevronRight,
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    headerTag: {
      type: String,
      default: 'h2',
    },
    desc: {
      type: String,
      default: null,
    },
    itemsList: {
      type: Array,
      required: true,
    },
    showMorePath: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.display-card {
  .card {
    border-radius: 4px;
    overflow: hidden;
    display: block;
    img {
      object-fit: cover;
    }

    .text-price {
      color: rgba(74, 74, 74, 0.8);

      &.promotion {
        color: rgba(183, 28, 28, 0.8);

        .old-price {
          text-decoration-line: line-through;
          color: rgba(74, 74, 74, 0.5);
        }
      }
    }
  }
}
</style>
