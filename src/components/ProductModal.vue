<template>
  <div class="modal fade" id="exampleModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true" ref="Modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark">
          <h1 class="modal-title fs-5
          fw-bold" id="exampleModalLabel">
            <span v-if="isNew"
            class="text-info">新增產品</span>
            <span v-else
            class="text-warning">編輯產品</span>
          </h1>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="photo"
                class="form-label fs-5">輸入圖片網址</label>
                <input type="text" class="form-control"
                id="photo"
                v-model="tempProduct.imageUrl">
                <img :src="tempProduct.imageUrl"
                alt="" class="img-fluid">
              </div>
              <!-- <div class="fs-5 mb-2">
                或 上傳圖片
              </div>
              <div class="input-group mb-3">
                <button class="btn btn-secondary"
                  type="button"
                  id="button-addon1">上傳圖片</button>
                <input type="text" class="form-control"
                  placeholder="未選擇任何檔案"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1">
              </div> -->
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片</label>
                <i class="fa-solid fa-camera-rotate fa-flip"></i>
                <input
                  id="customFile"
                  type="file"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile">
              </div>
              <h2 class="fw-bold mb-3">多圖新增</h2>
              <!-- 多一個判斷式判別tempProduct內的imagesUrl是否真的為陣列 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-1"
                v-for="(images,key) in tempProduct.imagesUrl"
                :key="'images' + key ">
                  <input type="text" class="form-control"
                  v-model="tempProduct.imagesUrl[key]">
                  <img :src="tempProduct.imagesUrl[key]"
                  alt="" class="img-fluid mb-2">
                </div>
                <div v-if="!tempProduct.imagesUrl.length ||
                  tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                  <button type="button" class="
                  btn btn-outline-primary btn-sm
                  w-100"
                  @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                </div>
                <div v-else>
                  <button type="button" class="
                  btn btn-outline-danger btn-sm
                  w-100"
                  @click="tempProduct.imagesUrl.pop()">刪除圖片</button>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="mb-3">
                <label for="title" class="form-label">
                  標題
                </label>
                <input type="text" class="form-control"
                placeholder="必填標題" id="title"
                v-model="tempProduct.title">
              </div>
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control"
                  id="category" placeholder="必填分類"
                  v-model="tempProduct.category">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="unit" class="form-label">單位</label>
                  <input type="text" class="form-control"
                  id="unit" placeholder="必填單位"
                  v-model="tempProduct.unit">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control"
                  id="origin_price" placeholder="必填原價"
                  v-model.number="tempProduct.origin_price">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control"
                  id="price" placeholder="必填售價"
                  v-model.number="tempProduct.price">
                </div>
              </div>
              <div class="mb-3">
                <hr>
              </div>
              <div class="mb-3">
                <label for="description"
                class="form-label">產品描述</label>
                <textarea id="description" cols="2"
                class="form-control"
                v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content"
                class="form-label">產品內容</label>
                <textarea id="content" cols="2"
                class="form-control"
                v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input"
                  id="enable"
                  v-model="tempProduct.is_enabled"
                  :true-value="1"
                  :false-value="0">
                  <label for="enable" class="form-check-label">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn
          btn-outline-secondary"
          data-bs-dismiss="modal">取消</button>
          <button type="button"
          class="btn btn-primary"
          @click="$emit('update-product',
          tempProduct)">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinsModal from '@/mixins/mixinsModal.js'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  // 老師影音課程教的方法props
  // props: {
  //   product: {
  //     type: Object,
  //     default () { return {} }
  //   },
  //   isNew: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  props: ['product', 'isNew'],
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  data () {
    return {
      Modal: {},
      tempProduct: {}
    }
  },
  mixins: [MixinsModal],
  methods: {
    uploadFile () {
      const uploadFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
        .then((res) => {
          // console.log(res.data)
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
          }
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
