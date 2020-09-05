<template>
  <div class="box login-card">
    <form @submit.prevent>
      <div class="field">
        <img src="@/assets/images/placeholder.jpg" alt="logo" />
      </div>
      <div class="field">
        <label class="label" for="loginCard_Username">ชื่อผู้ใช้งาน</label>
        <div class="control">
          <input
            id="loginCard_Username"
            v-model="username"
            class="input"
            type="text"
            placeholder="ชื่อผู้ใช้งาน"
          />
        </div>
      </div>
      <div class="field">
        <label class="label" for="loginCard_Password">รหัสผ่าน</label>
        <div class="control">
          <input
            id="loginCard_Password"
            v-model="password"
            class="input"
            type="password"
            placeholder="รหัสผ่าน"
          />
        </div>
      </div>
      <div class="field">
        <button class="button is-fullwidth is-dark" type="submit">
          เข้าสู่ระบบ
        </button>
      </div>
      <div class="field">
        <nuxt-link class="button is-fullwidth" to="/">กลับ</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
  }),
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
}
</style>
