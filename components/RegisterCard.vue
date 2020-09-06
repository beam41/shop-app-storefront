<template>
  <div class="box regis-card">
    <form @submit.prevent>
      <div class="field">
        <h1
          class="has-text-grey-darker is-size-4 has-text-centered has-text-weight-medium"
        >
          สมัครสมาชิก
        </h1>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_Username">ชื่อผู้ใช้งาน</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                id="regisCard_Username"
                v-model="username"
                class="input"
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_Password">รหัสผ่าน</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                id="regisCard_Password"
                v-model="password"
                class="input"
                type="password"
                placeholder="รหัสผ่าน"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <h2 class="pt-3 has-text-centered has-text-weight-medium">
          ข้อมูลที่อยู่
        </h2>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_FullName">ชื่อ-นามสกุล</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                id="regisCard_FullName"
                v-model="fullName"
                class="input"
                type="text"
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_Address">ที่อยู่</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                id="regisCard_Address"
                v-model="address"
                class="textarea has-fixed-size"
                type="text"
                placeholder="ที่อยู่"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_Province">จังหวัด</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select">
                <select id="regisCard_Province" v-model="province">
                  <option>เชียงใหม่</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_District">เขต/อำเภอ</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select">
                <select id="regisCard_District" v-model="district">
                  <option>เมืองเชียงใหม่</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_SubDistrict">แขวง/ตำบล</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select">
                <select id="regisCard_SubDistrict" v-model="subDistrict">
                  <option>สุเทพ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_PostalCode">รหัสไปรษณีย์</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                id="regisCard_PostalCode"
                v-model="postalCode"
                class="input"
                type="text"
                placeholder="รหัสไปรษณีย์"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="regisCard_Phone">เบอร์โทรศัพท์</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                id="regisCard_Phone"
                v-model="phone"
                class="input"
                type="tel"
                placeholder="เบอร์โทรศัพท์"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field flex flex-space-between">
        <nuxt-link class="button is-light" to="/">กลับ</nuxt-link>
        <button class="button is-dark" type="submit">สมัครสมาชิก</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
    fullName: '',
    address: '',
    province: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    phone: '',
  }),
}
</script>

<style lang="scss" scoped>
.regis-card {
  width: 600px;

  .select {
    width: 50%;

    select {
      width: 100%;
    }
  }
}
</style>
