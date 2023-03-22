// 製作訂單頁面
// Step: √ (「取得、加入」的文字都必須串接API)
// 1.切板 √
// 2.取得遠端產品列表(VITE_URL、VITE_PATH) √
// 3.顯示遠端列表內容 √
// 4.製作Modal並使用Modal取得單一產品 √
// 5.顯示Modal單一產品 √
// 6.製作刪除Modal √
// 7.顯示刪除Modal √
// 8.編輯Modal單一產品 √

<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
  ></VueLoading>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="m-3 text-end">
        <button class="btn btn-primary"
        type="button"
        @click.prevent="openModal('new')">建立新優惠卷</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th width="150">名稱</th>
            <th width="200">折扣百分比</th>
            <th width="150">到期日</th>
            <th width="150">是否啟用</th>
            <th width="150">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coItem in coupons" :key="coItem.id">
            <td>{{coItem.title}}</td>
            <td>{{coItem.percent}}%</td>
            <td>{{$filters.date(coItem.due_date)}}</td>
            <td>
              <span v-if="coItem.is_enabled"
                class="text-success">啟用</span>
              <span v-else
                class="text-danger">未啟用</span>
            </td>
            <td>
              <div class="fs-3">
                <i class="fa-solid fa-file-pen
                text-warning"
                style="cursor:pointer;"
                @click="openModal('edit', coItem)"></i>
                <i class="fa-solid fa-xmark ms-2
                text-danger"
                style="cursor:pointer;"
                @click="openModal('delete', coItem)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- couponModal -->
  <couponModal
    ref="couponModal"
    :coupon="tempCoupon"
    :is-new="isNew"
    @update-coupon="updateCoupon"
    ></couponModal>
    <!-- deleteModal -->
    <deleteModal
      ref="deleteModal"
      :product="tempCoupon"
      @del-item="delCouponItem"
    ></deleteModal>
</template>

<script>
import couponModal from '@/components/CouponModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
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
      isNew: false,
      coupons: {},
      tempCoupon: {}
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  components: {
    couponModal,
    deleteModal
  },
  methods: {
    getCoupons () {
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons`)
        .then((res) => {
          status.isLoading = false
          // console.log(res.data.coupons)
          this.coupons = res.data.coupons
          // 必須把分頁資料存入設定的pages中
          // this.page = res.data.pagination
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    openModal (isNew, item) {
      // console.log(isNew, item)
      if (isNew === 'new') {
        this.tempCoupon = {
          // 為什麼要除以1000，原是因為JS時間都是以毫秒為單位，故需除以1000
          due_date: new Date().getTime() / 1000
        }
        this.isNew = true
        this.$refs.couponModal.show()
      } else if (isNew === 'edit') {
        this.tempCoupon = { ...item }
        this.isNew = false
        this.$refs.couponModal.show()
      } else if (isNew === 'delete') {
        this.tempCoupon = { ...item }
        this.$refs.deleteModal.show()
      }
    },
    updateCoupon (item) {
      // console.log(item)
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`
      let http = 'post'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${item.id}`
        http = 'put'
      }
      status.isLoading = true
      this.$http[http](url, { data: item })
        .then(() => {
          // console.log(res)
          status.isLoading = false
          this.$refs.couponModal.hide()
          this.getCoupons()
        })
        .catch((err) => {
          status.isLoading = false
          this.$refs.couponModal.show()
          alert(err.response.data.message)
        })
    },
    delCouponItem (item) {
      // console.log(item)
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${item.id}`)
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
          this.getCoupons()
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
    this.getCoupons()
  }
}
</script>
