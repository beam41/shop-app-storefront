<template>
  <div>
    <nav class="navbar is-white">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Shop-app</nuxt-link>
        <a
          :class="['navbar-burger', 'burger', isActive ? 'is-active' : null]"
          @click="
            () => {
              isActive = !isActive
            }
          "
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div :class="['navbar-menu', isActive ? 'is-active' : null]">
        <div class="navbar-start">
          <nuxt-link to="/" class="navbar-item">หน้าแรก</nuxt-link>
          <div class="navbar-item has-dropdown is-hoverable is-white">
            <a class="navbar-link">รายการสินค้า</a>
            <div class="navbar-dropdown">
              <nuxt-link
                v-for="type in types"
                :key="type.id"
                :to="`/product-list/${type.name}`"
                class="navbar-item"
              >
                กำไล
              </nuxt-link>
            </div>
          </div>
          <nuxt-link to="/promotion" class="navbar-item">โปรโมชั่น</nuxt-link>
        </div>

        <div class="navbar-end">
          <div v-if="!user" class="navbar-item py-0">
            <div class="buttons">
              <nuxt-link to="/register" class="button is-dark">
                สมัครสมาชิก
              </nuxt-link>
              <nuxt-link to="/login" class="button is-light">
                เข้าสู่ระบบ
              </nuxt-link>
            </div>
          </div>
          <template v-else>
            <nuxt-link to="/cart" class="navbar-item">
              <CartIcon /> ตะกร้าสินค้า
            </nuxt-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> <UserIcon /> {{ user.fullName }} </a>
              <div class="navbar-dropdown is-right">
                <nuxt-link to="/edit-info" class="navbar-item">
                  แก้ไขข้อมูลส่วนตัว
                </nuxt-link>
                <nuxt-link to="/order/history" class="navbar-item">
                  รายการสั่งซื้อ
                </nuxt-link>
                <hr class="navbar-divider" />
                <a class="has-text-danger navbar-item" @click="logout">
                  ออกจากระบบ
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { getAllType } from '@/api/type'
import { mapState } from 'vuex'
import CartIcon from '@/assets/images/shopping_cart-black-18dp.svg?inline'
import UserIcon from '@/assets/images/person_outline-black-18dp.svg?inline'

export default {
  components: {
    CartIcon,
    UserIcon,
  },
  data: () => ({
    isActive: false,
    types: [],
  }),
  computed: {
    ...mapState({
      user: (state) => state.user.data,
    }),
  },
  mounted() {
    getAllType().then((res) => {
      this.types = res.data
    })
  },
  methods: {
    logout() {
      this.$store.commit('user/logout')
    },
  },
}
</script>
