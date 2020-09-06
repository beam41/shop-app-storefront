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
          <div class="navbar-item has-dropdown is-hoverable">
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
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link to="/register" class="button is-dark">
                สมัครสมาชิก
              </nuxt-link>
              <nuxt-link to="/login" class="button is-light">
                เข้าสู่ระบบ
              </nuxt-link>
            </div>
          </div>
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
export default {
  data: () => ({
    isActive: false,
    types: [],
  }),
  mounted() {
    getAllType().then((res) => {
      this.types = res.data
    })
  },
}
</script>
