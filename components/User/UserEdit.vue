<template>
  <div class="container content-container">
    <UserRegisterForm
      :loading="loading"
      header-text="แก้ไขข้อมูลส่วนตัว"
      submit-text="บันทึก"
      :initial-value="$store.state.user.data"
      edit-mode
      @submit="save"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    save(e) {
      const payload = { ...e }
      console.log(payload)
    },
  },
}
</script>
