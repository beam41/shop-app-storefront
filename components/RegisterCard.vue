<template>
  <div class="box regis-card">
    <form @submit.prevent="register">
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
                :class="[
                  'input',
                  errListInclude('username') ? 'is-danger' : null,
                  usnChecking ? 'is-loading' : null,
                ]"
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
                autocomplete="username"
                :disabled="loading"
              />
            </div>
            <p class="help has-text-grey">
              ความยาวอย่างน้อย 6 ตัวอักษร
              <span v-if="usnExist" class="has-text-danger"
                >มีชื่อผู้ใช้งานนี้แล้ว</span
              >
            </p>
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
                :class="[
                  'input',
                  errListInclude('password') ? 'is-danger' : null,
                ]"
                type="password"
                placeholder="รหัสผ่าน"
                autocomplete="new-password"
                :disabled="loading"
              />
            </div>
            <p class="help has-text-grey">ความยาวอย่างน้อย 6 ตัวอักษร</p>
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
                :class="[
                  'input',
                  errListInclude('fullName') ? 'is-danger' : null,
                ]"
                type="text"
                placeholder="ชื่อ-นามสกุล"
                autocomplete="name"
                :disabled="loading"
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
                :class="[
                  'textarea has-fixed-size',
                  errListInclude('address') ? 'is-danger' : null,
                ]"
                type="text"
                placeholder="ที่อยู่"
                autocomplete="street-address"
                :disabled="loading"
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
              <div
                :class="[
                  'select',
                  errListInclude('province') ? 'is-danger' : null,
                ]"
              >
                <select
                  id="regisCard_Province"
                  v-model="province"
                  :disabled="loading"
                >
                  <option v-for="province in provinceList" :key="province">
                    {{ province }}
                  </option>
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
              <div
                :class="[
                  'select',
                  errListInclude('district') ? 'is-danger' : null,
                ]"
              >
                <select
                  id="regisCard_District"
                  v-model="district"
                  :disabled="loading"
                >
                  <template v-if="districtList.length > 0">
                    <option v-for="district in districtList" :key="district">
                      {{ district }}
                    </option>
                  </template>
                  <template v-else>
                    <option disabled>เลือก จังหวัด ก่อน</option>
                  </template>
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
              <div
                :class="[
                  'select',
                  errListInclude('subDistrict') ? 'is-danger' : null,
                ]"
              >
                <select
                  id="regisCard_SubDistrict"
                  v-model="subDistrict"
                  :disabled="loading"
                >
                  <template v-if="subDistrictList.length > 0">
                    <option
                      v-for="subDistrict in subDistrictList"
                      :key="subDistrict"
                    >
                      {{ subDistrict }}
                    </option>
                  </template>
                  <template v-else>
                    <option disabled>เลือก เขต/อำเภอ ก่อน</option>
                  </template>
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
                :class="[
                  'input',
                  errListInclude('postalCode') ? 'is-danger' : null,
                ]"
                type="text"
                placeholder="รหัสไปรษณีย์"
                autocomplete="postal-code"
                :disabled="loading"
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
                :class="['input', errListInclude('phone') ? 'is-danger' : null]"
                type="tel"
                placeholder="เบอร์โทรศัพท์"
                autocomplete="tel"
                :disabled="loading"
              />
            </div>
          </div>
        </div>
      </div>
      <p class="has-text-danger mb-3 has-text-centered">
        {{ errorList.length > 0 ? errMessage || '&#8203;' : '&#8203;' }}
      </p>
      <div class="field flex flex-space-between">
        <nuxt-link class="button is-light" to="/" :disabled="loading">
          กลับ
        </nuxt-link>
        <button
          :class="['button is-dark', loading ? 'is-loading' : '']"
          type="submit"
        >
          สมัครสมาชิก
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { register, checkUserExist } from '@/api/user'
import {
  getProvinceList,
  getDistrictList,
  getSubDistrictList,
  getZipcode,
} from '@/util/address'

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
    provinceList: [],
    districtList: [],
    subDistrictList: [],
    errorList: [],
    errMessage: '',
    usnExist: false,
    loading: false,
    usnChecking: false,
  }),
  watch: {
    province(to) {
      this.districtList = getDistrictList(to)
    },
    district(to) {
      this.subDistrictList = getSubDistrictList(this.province, to)
    },
    subDistrict(to) {
      this.postalCode = getZipcode(this.province, this.district, to)
    },
    username(to) {
      this.checkExist(to)
    },
  },
  mounted() {
    this.provinceList = getProvinceList()
  },
  methods: {
    errListInclude(name) {
      return this.errorList.includes(name)
    },
    checkExist(usn) {
      this.usnExist = false
      if (usn.length >= 6) {
        this.usnChecking = true
        checkUserExist(usn)
          .then((res) => {
            this.usnExist = res.data.result
            this.usnChecking = false
          })
          .catch((err) => {
            this.usnChecking = false
            if (err) {
              // eslint-disable-next-line no-console
              console.error(err)
            }
          })
      }
    },
    register() {
      const errorList = []
      if (this.usnExist) {
        errorList.push('username')
        this.errorList = errorList
        return
      }
      this.errorList = []
      const fieldList = [
        'username',
        'password',
        'fullName',
        'address',
        'province',
        'district',
        'subDistrict',
        'postalCode',
        'phone',
      ]

      fieldList.forEach((field) => {
        if (!this.$data[field]) {
          errorList.push(field)
        } else if (
          (field === 'username' || field === 'password') &&
          this.$data[field].length < 6
        ) {
          errorList.push(field)
        }
      })

      this.errMessage = 'กรุณากรอกค่าให้ถูกต้อง'
      this.errorList = errorList
      if (errorList.length < 1) {
        const payload = {
          username: this.username,
          password: this.password,
          fullName: this.fullName,
          address: this.address,
          province: this.province,
          district: this.district,
          subDistrict: this.subDistrict,
          postalCode: this.postalCode,
          phoneNumber: this.phone,
        }
        register(payload)
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
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.regis-card {
  width: 600px;
}

.select {
  width: 50%;

  select {
    width: 100%;
  }
}
</style>
