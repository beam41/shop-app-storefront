<template>
  <div class="box regis-card">
    <UserRegisterForm
      :loading="loading"
      header-text="สมัครสมาชิก"
      submit-text="สมัครสมาชิก"
      :error-message="errMessage"
      @submit="register"
    />
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  data: () => ({
    loading: false,
    errMessage: '',
  }),
  methods: {
    register(e) {
      register({ ...e })
        .then((res) => {
          this.loading = false
          this.$store.commit('user/login', res.data)
          this.$router.push('/')
        })
        .catch((err) => {
          this.loading = false
          if (err.response.status) {
            this.errMessage = `เกิดปัญหาขึ้น (รหัสปัญหา ${err.response.status}) โปรดลองใหม่อีกครั้ง`
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.regis-card {
  width: 600px;
}
</style>
