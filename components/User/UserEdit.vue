<template>
  <div class="container content-container">
    <div class="inner-pad">
      <UserRegisterForm
        :loading="loading"
        header-text="แก้ไขข้อมูลส่วนตัว"
        submit-text="บันทึก"
        :initial-value="user"
        edit-mode
        :error-message="errMessage"
        @submit="save"
      />
    </div>
  </div>
</template>

<script>
import { editUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data: () => ({
    loading: false,
    errMessage: '',
  }),
  computed: {
    ...mapState({
      user: (state) => state.user.data,
    }),
  },
  methods: {
    save(e) {
      this.loading = true
      editUser(this.user.id, { ...e })
        .then((res) => {
          this.loading = false
          this.$store.commit('user/editData', {
            ...e,
            password: undefined,
            newPassword: undefined,
          })
          this.$router.push('/')
        })
        .catch((err) => {
          this.loading = false
          if (err.response.status === 403) {
            this.errMessage = `กรุณากรอกรหัสผ่านเก่าให้ถูกต้อง`
          } else {
            this.errMessage = `เกิดปัญหาขึ้น (รหัสปัญหา ${err.response.status}) โปรดลองใหม่อีกครั้ง`
          }
        })
    },
  },
}
</script>
