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
              <nuxt-link to="/product-list/กำไล" class="navbar-item">
                กำไล
              </nuxt-link>
              <nuxt-link to="/product-list/สร้อยคอ" class="navbar-item">
                สร้อยคอ
              </nuxt-link>
              <nuxt-link to="/product-list/ต่างหู" class="navbar-item">
                ต่างหู
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
export default {
  data: () => ({
    isActive: false,
  }),
}
</script>
