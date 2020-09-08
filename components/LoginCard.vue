<template>
  <div class="box login-card">
    <form @submit.prevent="login">
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
            :disabled="loading"
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
            :disabled="loading"
          />
        </div>
      </div>
      <p class="has-text-danger mb-3 has-text-centered">
        {{ errMessage || '&#8203;' }}
      </p>
      <div class="field">
        <button
          :class="['button is-fullwidth is-dark', loading ? 'is-loading' : '']"
          type="submit"
        >
          เข้าสู่ระบบ
        </button>
      </div>
      <div class="field">
        <nuxt-link class="button is-fullwidth" :disabled="loading" to="/">
          กลับ
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data: () => ({
    username: '',
    password: '',
    errMessage: null,
    loading: false,
  }),
  methods: {
    login() {
      if (this.username.length < 6 || this.password.length < 6) {
        this.errMessage = 'ชื่อผู้ใช้งานหรือรหัสผ่านสั้นเกินไป'
        return
      }
      this.errMessage = ''
      this.loading = true
      login(this.username, this.password)
        .then((res) => {
          this.loading = false
          this.$store.commit('user/login', res.data)
          this.$router.push('/')
        })
        .catch((err) => {
          this.loading = false
          if (err.response.data.message) {
            this.errMessage = err.response.data.message
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
}
</style>
