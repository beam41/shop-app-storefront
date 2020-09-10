<template>
  <form @submit.prevent="errorCheck">
    <div class="field">
      <h1
        class="has-text-grey-darker is-size-4 has-text-centered has-text-weight-medium"
      >
        {{ headerText }}
      </h1>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label" for="regisCard_Username">ชื่อผู้ใช้งาน</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div :class="['control', usnChecking ? 'is-loading' : null]">
            <input
              id="regisCard_Username"
              v-model="field.username"
              :class="[
                'input',
                errListInclude('username') || usnExist ? 'is-danger' : null,
              ]"
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
              autocomplete="username"
              :disabled="loading || editMode"
            />
          </div>
          <p class="help has-text-grey">
            ความยาวอย่างน้อย 6 ตัวอักษร
            <span v-if="usnExist" class="has-text-danger"
              >มีชื่อผู้ใช้งานนี้แล้ว</span
            >
            <span
              v-else-if="
                field.username.length >= 6 && !usnChecking && !editMode
              "
              class="has-text-success"
              >สามารถใช้งานชื่อผู้ใช้นี้ได้</span
            >
          </p>
        </div>
      </div>
    </div>
    <div v-if="editMode" class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label" for="regisCard_NewPassword">รหัสผ่านใหม่</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              id="regisCard_NewPassword"
              v-model="newPassword"
              :class="[
                'input',
                errListInclude('newPassword') ? 'is-danger' : null,
              ]"
              type="password"
              placeholder="รหัสผ่านใหม่"
              autocomplete="new-password"
              :disabled="loading"
            />
          </div>
          <p class="help has-text-grey">
            ความยาวอย่างน้อย 6 ตัวอักษร เว้นว่างหากไม่ต้องการเปลี่ยน
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="editMode ? newPassword.length > 0 : true"
      class="field is-horizontal"
    >
      <div class="field-label is-normal">
        <label class="label" for="regisCard_Password">{{
          editMode ? 'กรอกรหัสผ่านเก่า' : 'รหัสผ่าน'
        }}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              id="regisCard_Password"
              v-model="field.password"
              :class="[
                'input',
                errListInclude('password') ? 'is-danger' : null,
              ]"
              type="password"
              placeholder="รหัสผ่าน"
              :autocomplete="editMode ? 'current-password' : 'new-password'"
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
              v-model="field.fullName"
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
              v-model="field.address"
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
                v-model="field.province"
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
                v-model="field.district"
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
                v-model="field.subDistrict"
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
              v-model="field.postalCode"
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
              v-model="field.phoneNumber"
              :class="[
                'input',
                errListInclude('phoneNumber') ? 'is-danger' : null,
              ]"
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
    <div class="field flex">
      <nuxt-link
        v-if="!editMode"
        class="button is-light"
        to="/"
        :disabled="loading"
      >
        กลับ
      </nuxt-link>
      <button
        :class="['button is-dark', loading ? 'is-loading' : '']"
        type="submit"
      >
        {{ submitText }}
      </button>
    </div>
  </form>
</template>

<script>
import {
  getProvinceList,
  getDistrictList,
  getSubDistrictList,
  getZipcode,
} from '@/util/address'
import { checkUserExist } from '@/api/user'

export default {
  props: {
    loading: Boolean,
    headerText: {
      type: String,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
    initialValue: {
      type: Object,
      default: null,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    field: {
      username: '',
      password: '',
      fullName: '',
      address: '',
      province: '',
      district: '',
      subDistrict: '',
      postalCode: '',
      phoneNumber: '',
    },
    newPassword: '',
    provinceList: [],
    districtList: [],
    subDistrictList: [],
    errorList: [],
    errMessage: '',
    usnExist: false,
    usnChecking: false,
  }),
  watch: {
    'field.province'(to) {
      this.districtList = getDistrictList(to)
    },
    'field.district'(to) {
      this.subDistrictList = getSubDistrictList(this.field.province, to)
    },
    'field.subDistrict'(to) {
      this.field.postalCode = getZipcode(
        this.field.province,
        this.field.district,
        to
      )
    },
    'field.username'(to) {
      if (!this.editMode) this.checkExist(to)
    },
  },
  mounted() {
    this.provinceList = getProvinceList()
    if (this.initialValue !== null) {
      this.districtList = getDistrictList(this.initialValue.province)
      this.subDistrictList = getSubDistrictList(
        this.initialValue.province,
        this.initialValue.district
      )
      this.postalCode = getZipcode(
        this.initialValue.province,
        this.initialValue.district,
        this.initialValue.subDistrict
      )
      this.field = {
        ...this.field,
        ...this.initialValue,
      }
    }
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
    errorCheck() {
      let errorList = []
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
        'phoneNumber',
      ]

      // check field constraint
      fieldList.forEach((field) => {
        if (!this.field[field]) {
          errorList.push(field)
        } else if (
          (field === 'username' || field === 'password') &&
          this.field[field].length < 6
        ) {
          errorList.push(field)
        }
      })

      // if editmode check new password too
      let newPassword = false
      if (this.editMode) {
        // if length != 0 mean user dont want new pass and shouldn't check for password
        if (this.newPassword.length > 0) {
          newPassword = true
        } else {
          errorList = errorList.filter((v) => v !== 'password')
        }
        // simple constraint
        if (this.newPassword.length > 0 && this.newPassword.length < 6) {
          errorList.push('newPassword')
        }
      }

      this.errMessage = 'กรุณากรอกค่าให้ถูกต้อง'
      this.errorList = errorList
      if (errorList.length < 1) {
        this.$emit('submit', {
          ...this.field,
          newPassword:
            // if not edit mode, use undef
            this.editMode && newPassword ? this.newPassword : undefined,
          password:
            // if edit mode but not want new password use undef
            this.editMode && !newPassword ? undefined : this.field.password,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  width: 50%;

  select {
    width: 100%;
  }
}

.field button {
  margin-left: auto;
}
</style>
