<template>
  <div class="box regis-card">
    <UserRegisterForm
      :loading="loading"
      header-text="สมัครสมาชิก"
      submit-text="สมัครสมาชิก"
      @submit="register"
    />
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  data: () => ({
    loading: false,
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
          if (err.message) {
            this.errMessage = err.message
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
0
