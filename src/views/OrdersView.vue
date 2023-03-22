// 製作訂單頁面
// Step: √ (「取得、加入」的文字都必須串接API)
// 1.切板 √
// 2.取得遠端產品列表(VITE_URL、VITE_PATH) √
// 3.顯示遠端列表內容 √
// 4.製作Modal並使用Modal取得單一產品 √
// 5.顯示Modal單一產品 √
// 6.製作刪除Modal √
// 7.顯示刪除Modal v
// 8.編輯Modal單一產品 √
// 9.調整 input-switch √
// 10.刪除全部list √
// 11.加入分頁 √

<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
    ></VueLoading>
  <div class="m-3">
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="text-end m-3">
        <button class="btn btn-danger"
        type="button"
        @click="removeAll()">刪除全部訂單</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th width="150">購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th width="120">應付金額</th>
            <th width="150">是否付款</th>
            <th width="150">編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(oItem, key) in orders" :key="key">
            <tr v-if="orders.length" :class="{'text-secondary' : !oItem.is_paid }">
              <td>{{$filters.date(oItem.create_at)}}</td>
              <td>
                <span v-text="oItem.user.email" v-if="oItem.user"></span>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in oItem.products" :key="i">
                    {{ product.product.title}}，數量：{{product.qty}}
                    {{product.product.unit}}
                  </li>
                </ul>
              </td>
              <td>{{$filters.currency(oItem.total)}}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    :id="`${oItem.id}`"
                    v-model="oItem.is_paid"
                    @change="updatePaid(oItem)">
                  <label
                    class="form-check-label"
                    :for="`${oItem.id}`">
                    <span v-if="oItem.is_paid"
                      class="text-success">已付款</span>
                    <span v-else
                      class="text-danger">未付款</span>
                  </label>
                </div>
              </td>
              <td>
                <div class="fs-3">
                  <i class="fa-solid fa-folder-open text-warning"
                  style="cursor:pointer;"
                  @click="openModal('edit', oItem)"></i>
                  <i class="fa-solid fa-xmark ms-2
                  text-danger"
                  style="cursor:pointer;"
                  @click="openModal('delete', oItem)"
                  ></i>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <pagination
        :pages="page"
        @emit-pages="getOrders"
        ></pagination>
    </div>
  </div>
</div>
<!-- orderModal -->
<orderModal
  ref="orderModal"
  :order-item="tempOrder"
  @confirm="updatePaid"
  ></orderModal>
<!-- deleteModal -->
<deleteModal
  ref="deleteModal"
  @del-item="delOrderItem"
  ></deleteModal>
</template>

<script>
import orderModal from '@/components/OrderModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
import pagination from '@/components/PaginationComponent.vue'
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
      orders: [],
      tempOrder: {},
      page: {}
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  components: {
    orderModal,
    deleteModal,
    pagination
  },
  methods: {
    getOrders (page = 1) {
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          // console.log(res.data)
          this.orders = res.data.orders
          this.page = res.data.pagination
          status.isLoading = false
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    openModal (string, oItem) {
      // console.log(string, oItem)
      status.isLoading = true
      if (string === 'edit') {
        this.tempOrder = { ...oItem }
        this.$refs.orderModal.show()
        status.isLoading = false
      } else {
        this.tempOrder = { ...oItem }
        this.$refs.deleteModal.show()
        status.isLoading = false
      }
    },
    updatePaid (item) {
      const paid = {
        is_paid: item.is_paid
      }
      // console.log(item, paid)
      status.isLoading = true
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`, { data: paid })
        .then((res) => {
          // console.log(res)
          status.isLoading = true
          this.$refs.orderModal.hide()
          this.getOrders()
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    delOrderItem (item) {
      // console.log(item)
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`)
        .then(() => {
          this.$swal({
            title: '產品已經刪除囉!!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          this.$refs.deleteModal.hide()
          this.getOrders()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    removeAll () {
      status.isLoading = true
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/orders/all`)
        .then(() => {
          // console.log(res)
          status.isLoading = false
          this.$swal({
            title: '產品已經刪除囉!!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          this.getOrders()
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
    this.getOrders()
  }
}
</script>
