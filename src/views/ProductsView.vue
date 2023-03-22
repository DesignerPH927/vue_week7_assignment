<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
  ></VueLoading>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="text-end m-3">
        <button class="btn btn-primary"
        type="button"
        @click="openModal('new')">新增產品</button>
      </div>
      <!-- 產品modal -->
      <productModal
        ref="productModal"
        :product="tempProduct"
        :isNew = "isNew"
        @update-product="updateProduct"
        ></productModal>
        <!-- 刪除modal -->
        <deleteProductModal
          ref="deleteProductModal"
          :product="tempProduct"
          @del-item="removeProduct"
          ></deleteProductModal>
      <!-- 產品列表 -->
      <table class="table align-middle text-center">
        <thead>
          <tr>
            <th width="150">圖片</th>
            <th width="130">分類</th>
            <th width="130">產品名稱</th>
            <th width="100">原價</th>
            <th width="100">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products"
          :key="item.id">
            <td>
              <div
                style="height: 150px;
                background-size: cover;
                background-position: center;"
                :style="{'backgroundImage' : `url(${item.imageUrl})`}">
                </div>
            </td>
            <th>{{item.category}}</th>
            <td>{{item.title}}</td>
            <td>{{$filters.currency(item.origin_price)}}</td>
            <td>{{$filters.currency(item.price)}}</td>
            <td>
              <span v-if="item.is_enabled"
              class="text-success">啟用</span>
              <span v-else
              class="text-muted">未啟用</span>
            </td>
            <td>
              <div class="fs-3">
                <i class="fa-solid fa-file-pen
                text-warning"
                style="cursor:pointer;"
                @click="openModal('edit', item)"></i>
                <i class="fa-solid fa-xmark ms-2
                text-danger"
                style="cursor:pointer;"
                @click="openModal('delete', item)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <pagination :pages="page"
      :get-products="getProducts"
      @change-page="getProducts"></pagination> -->
      <!-- pagination -->
      <pagination
        :pages="page"
        :get-products="getProducts"
        @emit-pages="getProducts"
        ></pagination>
    </div>
  </div>
</template>

<script>
import productModal from '@/components/ProductModal.vue'
import deleteProductModal from '@/components/DeleteModal.vue'
import pagination from '@/components/PaginationComponent.vue'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore.js'

const { VITE_URL, VITE_PATH } = import.meta.env
const status = statusStore()
export default {
  inject: ['emitter'],
  data () {
    return {
      // isLoading: false,
      color: 'purple',
      loader: 'dots',
      products: [], // 遠端資料
      isNew: false, // 判別新、舊資料
      tempProduct: { // 編輯新、舊資料
        imagesUrl: []
      },
      page: {} // 建立分頁資料
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  components: {
    productModal,
    deleteProductModal,
    pagination
  },
  methods: {
    // 登入驗證成功就可取得產品列表
    getProducts (page = 1) { // pages = 1 為預設參數
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          status.isLoading = false
          // console.log(res)
          this.products = res.data.products
          // 必須把分頁資料存入設定的pages中
          this.page = res.data.pagination
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    // 由於modal新舊資料共用，故必須判斷才可個別開啟
    openModal (isNew, item) {
      // console.log(isNew,item);
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModal.show()
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item }
        this.isNew = false
        this.$refs.productModal.show()
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item }
        this.$refs.deleteProductModal.show()
      }
    },
    // 新增、編輯資料
    updateProduct (item) {
      // console.log(item)
      this.tempProduct = item
      // 宣告新增資料的API，由於url會變動故使用let做宣告
      // 宣告 this.$http用的方法，由於http也是會變動故使用let做宣告
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      let http = 'post'
      // 判斷是否新增或編輯
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        http = 'put'
      }
      status.isLoading = true
      this.$http[http](url, { data: this.tempProduct })
        .then((response) => {
          status.pushMessage({ title: '更新成功' })
          status.isLoading = false
          this.$refs.productModal.hide()
          this.getProducts()
          // this.emitter.emit('push-message', {
          //   style: 'success',
          //   title: '更新成功'
          // })
        })
        .catch((err) => {
          status.isLoading = false
          this.$refs.productModal.hide()
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: err.response.data.message.join('、')
          })
        })
    },
    removeProduct (item) {
      this.tempProduct = item
      // 宣告移除的API，由於此API是固定的，故可用const宣告
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url)
        .then((res) => {
          this.$swal({
            title: '產品已經刪除囉!!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          this.$refs.deleteProductModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    // 產品頁面必須取出token並存入headers中，才可正確取得產品列表
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)zack0313\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    this.getProducts()
  }
}
</script>
