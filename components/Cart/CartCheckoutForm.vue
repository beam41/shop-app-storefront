<template>
  <div>
    <div class="box">
      <form @submit.prevent="submit">
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
                    'select half',
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
                    'select half',
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
                    'select half',
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
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label" for="regisCard_Phone">วิธีการชำระเงิน</label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div
                :class="[
                  'control',
                  errListInclude('payment') ? 'has-text-danger' : null,
                ]"
              >
                <label class="radio">
                  <input
                    type="radio"
                    :checked="field.payment === 'BANK'"
                    :disabled="loading"
                    @click="setPayment('BANK')"
                  />
                  โอนผ่านธนาคาร
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    :checked="field.payment === 'ON_DELIVERY'"
                    :disabled="loading"
                    @click="setPayment('ON_DELIVERY')"
                  />
                  ชำระเงินปลายทาง
                </label>
              </div>
            </div>
          </div>
        </div>
        <p class="has-text-danger mb-3 has-text-centered">
          {{ errMessage || '&#8203;' }}
        </p>
        <div class="field flex">
          <button class="button is-light" :disabled="loading" @click="back">
            กลับ
          </button>
          <button
            :class="['button is-dark', loading ? 'is-loading' : '']"
            type="submit"
          >
            ชำระเงิน
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  getProvinceList,
  getDistrictList,
  getSubDistrictList,
  getZipcode,
} from '@/utils/address'

import { createOrder } from '@/api/order'

export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    field: {
      fullName: '',
      address: '',
      province: '',
      district: '',
      subDistrict: '',
      postalCode: '',
      phoneNumber: '',
      payment: '',
    },
    errMessage: '',
    errorList: [],
    provinceList: [],
    districtList: [],
    subDistrictList: [],
    init: true,
    loading: false,
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
      if (this.init) {
        this.field.postalCode = this.$store.state.user.data.postalCode
        this.init = false
      }
    },
  },
  mounted() {
    this.provinceList = getProvinceList()
    this.field = {
      ...this.field,
      ...this.$store.state.user.data,
      token: undefined,
      username: undefined,
    }
    this.init = false
  },
  methods: {
    errListInclude(name) {
      return this.errorList.includes(name)
    },
    back() {
      this.$emit('back')
    },
    setPayment(method) {
      this.field.payment = method
    },
    submit() {
      this.errMessage = ''
      const errorList = []
      if (this.usnExist) {
        errorList.push('username')
        this.errorList = errorList
        return
      }
      this.errorList = []
      const fieldList = [
        'fullName',
        'address',
        'province',
        'district',
        'subDistrict',
        'postalCode',
        'phoneNumber',
        'payment',
      ]

      // check field constraint
      fieldList.forEach((field) => {
        if (!this.field[field]) {
          errorList.push(field)
        }
      })

      this.errorList = errorList
      if (errorList.length < 1) {
        this.checkout()
      } else {
        this.errMessage = 'กรุณากรอกค่าให้ถูกต้อง'
      }
    },
    checkout() {
      const payload = {
        products: this.cart.map((item) => ({
          productId: item.product.id,
          amount: item.amount,
        })),
        addressJson: {
          ...this.field,
          payment: undefined,
        },
        purchaseMethod: this.field.payment,
      }
      this.loading = true
      createOrder(payload)
        .then((res) => {
          this.loading = false
          this.$router.push('/')
          this.$store.commit('cart/clear')
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

<style></style>
