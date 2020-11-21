<template>
  <form @submit.prevent="showConfirm = true">
    <div class="mb-2">
      <h3>ที่อยู่สำหรับการจัดส่ง</h3>
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
                class="input"
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
                class="textarea has-fixed-size"
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
              <div class="select half">
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
              <div class="select half">
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
              <div class="select half">
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
                class="input"
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
                class="input"
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
        <div class="field-label is-normal">
          <label class="label" for="regisCard_Distribution">
            วิธีการจัดส่ง
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select half">
                <select
                  id="regisCard_Distribution"
                  v-model="field.distributionMethodId"
                  :disabled="loading"
                >
                  <option
                    v-for="dist in distributionMethods"
                    :key="dist.id"
                    :value="dist.id"
                  >
                    {{ dist.name }} &mdash; {{ stringPrice(dist.price) }} บาท
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay mb-2">
      <table class="table is-fullwidth is-hoverable has-text-grey-dark mb-0">
        <tbody>
          <tr class="table-item">
            <td colspan="3" class="pl-0">ราคาที่ประเมินได้</td>
            <td class="pr-0 has-text-right">
              {{ stringPrice(order.fullPrice) }}
              บาท
            </td>
          </tr>
          <tr class="table-item">
            <td colspan="3" class="pl-0">หักราคามัดจำ</td>
            <td class="pr-0 has-text-right">
              -{{ stringPrice(order.depositPrice) }}
              บาท
            </td>
          </tr>
          <tr class="table-item">
            <td colspan="3" class="pl-0">
              วิธีการจัดส่ง:
              {{
                field.distributionMethodId
                  ? distributionMethod.name
                  : 'กรุณาเลือก'
              }}
            </td>
            <td class="pr-0 has-text-right">
              {{
                stringPrice(
                  field.distributionMethodId ? distributionMethod.price : 0
                )
              }}
              บาท
            </td>
          </tr>
          <tr class="table-item">
            <td colspan="3" class="pl-0">รวม</td>
            <td class="pr-0 has-text-right">
              {{ stringPrice(summation) }} บาท
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="payment-method">
      <h3 class="mb-2">กรุณาโอนมายัง</h3>
      <Loader v-if="paymentMethods === null" style="min-height: 100px" />
      <template v-else>
        <ul>
          <li v-for="method in paymentMethods" :key="method.id" class="mb-2">
            <p class="has-text-weight-medium">ธนาคาร: {{ method.bank }}</p>
            <p>
              บัญชี: {{ method.accountNumber }} (ชื่อบัญชี:
              {{ method.accountName }})
            </p>
          </li>
        </ul>
        <div class="mt-4">
          <div class="field">
            <div class="file is-light has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  :disabled="loading"
                  accept="image/*"
                  @change="imageUpload"
                />
                <span class="file-cta">
                  <span class="file-label">อัพโหลดหลักฐานการชำระเงิน</span>
                </span>
                <span class="file-name">
                  {{ imageName }}
                </span>
              </label>
            </div>
          </div>
          <div class="field">
            <button
              :class="['button is-dark', loading ? 'is-loading' : '']"
              :disabled="!formFilled"
              type="submit"
            >
              ยืนยันการชำระเงิน
            </button>
            <p class="help is-danger">
              เมื่อชำระเงินแล้วจะไม่สามารถแก้ไขที่อยู่ได้
            </p>
          </div>
        </div>
      </template>
    </div>
    <div v-if="showConfirm" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ยืนยันการชำระเงิน</p>
          <button
            class="delete"
            aria-label="close"
            :disabled="loading"
            @click.prevent="showConfirm = false"
          ></button>
        </header>
        <section class="modal-card-body">
          ยืนยันการชำระเงิน ?
          <br />
          เมื่อชำระเงินแล้วจะไม่สามารถยกเลิกได้
          <figure class="image is-1by1 mt-4">
            <img :src="url" alt="รูปหลักฐานการชำระเงิน" class="contain" />
          </figure>
        </section>
        <footer class="modal-card-foot field flex">
          <button
            class="button"
            :disabled="loading"
            @click.prevent="showConfirm = false"
          >
            ยกเลิก
          </button>
          <button
            :class="['button is-dark', loading ? 'is-loading' : '']"
            @click.prevent="submit"
          >
            ยืนยัน
          </button>
        </footer>
      </div>
    </div>
  </form>
</template>

<script>
import { getPaymentMethods } from '@/api/payment'
import { addProofOfPaymentFull } from '@/api/build-order'
import {
  getProvinceList,
  getDistrictList,
  getSubDistrictList,
  getZipcode,
} from '@/utils/address'
import { getDistributionMethods } from '@/api/distribution'
import { stringPrice } from '@/utils/string-price'

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
    loading: Boolean,
  },
  data: () => ({
    paymentMethods: null,
    field: {
      fullName: '',
      address: '',
      province: '',
      district: '',
      subDistrict: '',
      postalCode: '',
      phoneNumber: '',
      distributionMethodId: '',
    },
    image: null,
    provinceList: [],
    districtList: [],
    subDistrictList: [],
    init: true,
    distributionMethods: [],
    showConfirm: false,
    url: null,
  }),
  computed: {
    imageName() {
      return this.image ? this.image.name : 'กรุณาเลือกไฟล์'
    },
    formFilled() {
      let filled = true
      for (const field in this.field) {
        if (!this.field[field]) {
          filled = false
        }
      }
      if (!this.image) {
        filled = false
      }
      return filled
    },
    summation() {
      return (
        this.order.fullPrice -
        this.order.depositPrice +
        (this.field.distributionMethodId ? this.distributionMethod.price : 0)
      )
    },
    distributionMethod() {
      return this.distributionMethods.find(
        ({ id }) => id === this.field.distributionMethodId
      )
    },
  },
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
    image(to) {
      if (this.url) {
        URL.revokeObjectURL(this.url)
      }
      this.url = URL.createObjectURL(to)
    },
  },
  mounted() {
    getPaymentMethods().then((res) => {
      this.paymentMethods = res.data
    })
    getDistributionMethods().then((res) => {
      this.distributionMethods = res.data
    })
    this.provinceList = getProvinceList()
    const userData = this.$store.state.user.data
    this.field = {
      fullName: userData.fullName,
      address: userData.address,
      province: userData.province,
      district: userData.district,
      subDistrict: userData.subDistrict,
      postalCode: userData.postalCode,
      phoneNumber: userData.phoneNumber,
    }
    this.init = false
  },
  methods: {
    imageUpload(e) {
      this.image = e.target.files?.[0]
    },
    submit() {
      const form = new FormData()
      form.append('image', this.image)
      for (const field in this.field) {
        form.append(field, this.field[field])
      }
      this.$emit('loadState', true)
      addProofOfPaymentFull(this.order.id, form).then((res) => {
        this.$emit('loadState', false)
        this.$emit('reload')
      })
    },
    stringPrice,
  },
}
</script>

<style></style>
