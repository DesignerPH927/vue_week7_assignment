<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
    ></VueLoading>
  <div class="container">
      <div class="my-5">
        <div class="row">
          <div class="col-md-7">
            <!-- userProductModal -->
            <!-- <user-Product-Modal
              :id="productId"
              :open-modal="openModal"
              :add-to-carts="addToCarts"
              ref="Modal"
            ></user-Product-Modal> -->
            <!-- 產品列表 -->
            <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pItem in products"
            :key="pItem.id">
              <td style="width:200px;">
                <div
                  style="height: 150px;
                    background-size: cover;
                    background-position:center;
                  "
                  :style="{'backgroundImage' :
                  `url(${pItem.imageUrl})`}"
                ></div>
              </td>
              <td>{{pItem.category}}</td>
              <td>
                <div v-if="pItem.origin_price ===
                pItem.price"
                class="h5 fw-bold"
                >原價{{pItem.origin_price}}元</div>
                <div v-else>
                  <del class="h6 text-muted">
                    原價{{pItem.origin_price}}元
                  </del>
                  <div class="h5 text-danger fw-bold">
                    現在只要{{pItem.price}}元
                  </div>
                </div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <router-link
                    :to="`/user/product/${pItem.id}`"
                    type="button"
                    class="btn btn-outline-primary">
                    <i v-if="pItem.id === loadingItem"
                    class="fa-solid fa-camera-rotate fa-flip"></i>
                    <span v-else>查看更多</span>
                  </router-link>
                  <button type="button"
                    class="btn btn-outline-danger"
                    @click="addToCarts(pItem, qty)"
                    >
                    <i i v-if="pItem.id === loadingItem"
                    class="fa-solid fa-circle-plus fa-beat"></i>
                    <span v-else>加入購物車</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
            </table>
          </div>

          <div class="col-md-5">
            <div class="input-group mb-3">
              <input
                id="coupon"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
                min="0"
                v-model="coupon_code">
              <button class="btn btn-secondary"
              type="button"
              @click.prevent="addCouponCode">套用優惠碼</button>
            </div>
            <!-- 購物車列表 -->
            <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th>數量/單位</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cItem in cart.carts" :key="cItem.id">
              <td>
                <button class="btn
                btn-outline-danger"
                type="button"
                @click="deleteCartItem(cItem)"
                :disabled="cItem.id === loadingItem">
                <i v-if="cItem.id ===
                  loadingItem"
                  class="fa-solid
                  fa-triangle-exclamation
                  fa-fade"></i>
                <span v-else>X</span>
                </button>
              </td>
              <td>
                {{cItem.product.category}}
              </td>
              <td style="width: 150px;">
                <div class="input-group">
                  <select name="" id="" class="form-select"
                  v-model="cItem.qty"
                  @change="setCartQty(cItem)"
                  :disabled="cItem.id === loadingItem">
                    <option :value="i" v-for="i in 20"
                    :key="i">{{i}}</option>
                  </select>
                  <div class="input-group-text">
                    {{cItem.product.unit}}</div>
                </div>
              </td>
              <td class="text-end">
                {{cItem.product.price}}
              </td>
              <td class="text-end">
                {{cItem.total}}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4"
              class="text-end fw-bold">總價</td>
              <td
              class="text-end">{{cart.total}}</td>
            </tr>
            <tr>
              <td colspan="4"
              class="text-end fw-bold
              text-success">折扣價</td>
              <td
              class="text-end
              text-success">{{cart.final_total}}</td>
            </tr>
          </tfoot>
            </table>
            <!-- 刪除全部購物車按紐 -->
            <div class="text-end">
              <button class="btn btn-outline-danger"
              type="button"
              @click="deleteCartsItem"
              >刪除全購物車列表</button>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <!-- 表單驗證 -->
      <div class="row justify-content-center">
        <div class="col-md-4">
          <VueForm v-slot="{ errors }" @submit="onSubmit"
            ref="form">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <VueField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email" rules="email|required"
                v-model="form.user.email"
              ></VueField>
              <error-message name="email"
              class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件者姓名</label>
              <VueField
                id="name"
                name="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['name'] }"
                placeholder="請輸入 name" rules="required"
                v-model="form.user.name"
              ></VueField>
              <error-message name="name"
              class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件者電話</label>
              <VueField
                id="tel"
                name="telephone"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['telephone'] }"
                placeholder="請輸入 telephone"
                :rules="isPhone"
                v-model="form.user.tel"
              ></VueField>
              <error-message name="telephone"
              class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件者地址</label>
              <VueField
                id="address"
                name="address"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['address'] }"
                placeholder="請輸入 address" rules="required"
                v-model="form.user.address"
              ></VueField>
              <error-message name="address"
              class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <VueField
                id="message"
                name="message"
                class="form-control"
                v-model="form.message"
                rows="5"
                as="textarea"
              ></VueField>
            </div>

            <div class="mb-3 text-end">
              <button class="btn btn-danger"
              type="submit">送出表單</button>
            </div>
          </VueForm>
        </div>
      </div>

    </div>
</template>

<script>
// import userProductModal from '@/components/UserProductModal.vue'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore.js'

const status = statusStore()
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      // isLoading: false,
      color: 'purple',
      loader: 'dots',
      products: [],
      productId: '',
      cart: [],
      loadingItem: '',
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      id: ''
    }
  },
  // components: {
  //   userProductModal
  // },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    getProducts () {
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          // console.log('遠端產品資料：', res.data)
          status.isLoading = false
          this.products = res.data.products
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    // openModal (pItem) {
    //   this.loadingItem = pItem.id
    //   // console.log('產品的Id', pItem.id);
    //   this.productId = pItem.id
    // },
    addToCarts (pItem, qty = 1) {
      // console.log(pItem);
      // this.loadingItem = pItem.id
      // status.isLoading = true
      const data = {
        product_id: pItem.id,
        qty
      }
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then((res) => {
          // status.isLoading = false
          this.$swal({
            icon: 'success',
            title: '成功加入購物車'
          })
          // alert(res.data.message)
          // this.$refs.Modal.hide()
          this.getCarts()
          // this.loadingItem = ''
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    addCouponCode  () {
      const data = {
        code: this.coupon_code
      }
      status.isLoading = true
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/coupon`, { data })
        .then(() => {
          // console.log(res)
          status.isLoading = false
          this.coupon_code = ''
          this.getCarts()
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    getCarts () {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          // console.log('取得購物車:', res.data.data);
          this.cart = res.data.data
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    setCartQty (cItem) {
      // console.log(cItem);
      this.loadingItem = cItem.id
      const data = {
        product_id: cItem.product_id,
        qty: cItem.qty
      }
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/cart/${cItem.id}`, { data })
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteCartItem (cItem) {
      this.loadingItem = cItem.id
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${cItem.id}`)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteCartsItem () {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      const data = this.form
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data })
        .then((res) => {
          // console.log(res.data)
          // alert(res.data.message)
          this.$refs.form.resetForm()
          this.id = res.data.orderId
          this.$router.push(`/user/checkPaid/${this.id}`)
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getCarts()
  }
}
</script>

<style lang="scss">
  .img-fluid {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
</style>
