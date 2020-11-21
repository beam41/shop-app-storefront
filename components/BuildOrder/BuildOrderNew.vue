<template>
  <div class="inner-pad">
    <h1
      class="has-text-grey-darker text-margin-half is-size-3 has-text-centered has-text-weight-medium"
    >
      สั่งทำเครื่องเงิน
    </h1>
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
            <div class="field-label is-normal">
              <label class="label" for="regisCard_Address">คำอธิบาย</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea
                    id="regisCard_OrderDescription"
                    v-model="field.orderDescription"
                    :class="[
                      'textarea has-fixed-size',
                      errListInclude('orderDescription') ? 'is-danger' : null,
                    ]"
                    type="text"
                    placeholder="คำอธิบาย"
                    :disabled="loading"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" for="regisCard_Img">
                รูปประกอบคำอธิบาย
              </label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="file is-light has-name">
                  <label class="file-label">
                    <input
                      id="regisCard_Img"
                      class="file-input"
                      type="file"
                      :disabled="loading"
                      accept="image/*"
                      multiple
                      @change="imageUpload"
                    />
                    <span class="file-cta">
                      <span class="file-label">อัพโหลด</span>
                    </span>
                    <span class="file-name">
                      {{ imagesName }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal"></div>
            <div class="field-body">
              <div class="buttons">
                <button
                  v-for="(img, index) in descriptionImagesUrl"
                  :key="img"
                  class="button image-select"
                  @click.prevent="deleteImage(index)"
                >
                  <figure class="image is-1by1">
                    <img :src="img" :alt="imagesNameArr[index]" />
                  </figure>
                </button>
              </div>
            </div>
          </div>

          <p class="has-text-danger mb-3 has-text-centered">
            {{ errMessage || '&#8203;' }}
          </p>
          <div class="has-text-centered">
            <button
              :class="['button is-dark', loading ? 'is-loading' : '']"
              type="submit"
            >
              สั่งทำ
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showConfirm" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ยืนยันการสั่งทำเครื่องเงิน</p>
          <button
            class="delete"
            aria-label="close"
            :disabled="loading"
            @click="showConfirm = false"
          ></button>
        </header>
        <section class="modal-card-body">
          ยืนยันการสั่งทำเครื่องเงิน ?
          <br />
          หากยืนยันจะมีผู้ดูแลร้านตอบกลับว่าสามารถทำได้หรือไม่
        </section>
        <footer class="modal-card-foot field flex">
          <button
            class="button"
            :disabled="loading"
            @click="showConfirm = false"
          >
            ยกเลิก
          </button>
          <button
            :class="['button is-dark', loading ? 'is-loading' : '']"
            @click="placeOrder"
          >
            ยืนยัน
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { placeBuildOrder } from '@/api/build-order'
export default {
  data: () => ({
    field: {
      fullName: '',
      orderDescription: '',
      phoneNumber: '',
      descriptionImages: [],
    },
    errMessage: '',
    errorList: [],
    showConfirm: false,
    loading: false,
  }),
  computed: {
    descriptionImagesUrl() {
      return this.field.descriptionImages.map((v) => URL.createObjectURL(v))
    },
    imagesNameArr() {
      return this.field.descriptionImages.map((v) => v.name)
    },
    imagesName() {
      return this.field.descriptionImages.length > 0
        ? this.imagesNameArr.join(', ')
        : 'ไม่มีรูป'
    },
  },
  destroyed() {
    this.revokeImgUrl()
  },
  methods: {
    imageUpload(e) {
      this.revokeImgUrl()
      this.field.descriptionImages = [...e.target.files]
    },
    revokeImgUrl() {
      this.descriptionImagesUrl.forEach((v) => {
        URL.revokeObjectURL(v)
      })
    },
    errListInclude(name) {
      return this.errorList.includes(name)
    },
    deleteImage(index) {
      this.field.descriptionImages = this.field.descriptionImages.filter(
        (_, i) => i !== index
      )
    },
    submit() {
      this.errMessage = ''
      const errorList = []
      this.errorList = []
      const fieldList = ['fullName', 'orderDescription', 'phoneNumber']

      // check field constraint
      fieldList.forEach((field) => {
        if (!this.field[field]) {
          errorList.push(field)
        }
      })

      this.errorList = errorList
      if (errorList.length < 1) {
        this.showConfirm = true
      } else {
        this.errMessage = 'กรุณากรอกให้ครบถ้วน'
      }
    },
    placeOrder() {
      const form = new FormData()
      form.append('fullName', this.field.fullName)
      form.append('orderDescription', this.field.orderDescription)
      form.append('phoneNumber', this.field.phoneNumber)
      this.field.descriptionImages.forEach((v) => {
        form.append('descriptionImages', v)
      })
      this.loading = true
      placeBuildOrder(form)
        .then((res) => {
          this.loading = false
          this.$router.push(`/build-order/${res.data.id}`)
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
.image-select {
  width: 7rem;
  height: 7rem;
  padding: 0.5rem;

  .image {
    width: 100%;
  }

  &:hover {
    .image {
      &::after {
        top: 0;
        left: 0;
        content: '';
        position: absolute;
        background: url('~assets/images/clear-white-18dp.svg'),
          rgba(0, 0, 0, 0.5);
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
