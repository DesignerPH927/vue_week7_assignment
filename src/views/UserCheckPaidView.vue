<template>
  <VueLoading
      :active="isLoading"
      :color="color"
      :loader="loader"
      ></VueLoading>
  <div class="mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <table class="table align-middle mb-3">
        <thead>
          <tr>
            <th>品名</th>
            <th width="150">數量</th>
            <th width="150">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="oItem in order.products" :key="oItem.id">
            <td>{{oItem.product.title}}</td>
            <td>{{oItem.qty}} / {{oItem.product.unit}}</td>
            <td class="text-end">{{oItem.total}}</td>
          </tr>
          <tr>
            <td
              colspan="2"
              class="text-end">總計</td>
            <td
              colspan="2"
              class="text-end">
              {{order.total}}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table align-middle">
        <tbody>
          <tr>
            <th width="150">Email</th>
            <td>{{order.user.email}}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{order.user.name}}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{order.user.tel}}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{order.user.address}}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="order.is_paid"
                class="text-success">已付款</span>
              <span v-else
                class="text-danger">未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!order.is_paid" class="mb-3 text-end">
        <button class="btn btn-danger"
        type="button"
        @click.prevent="confirmPay">確認付款去</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
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
      order: {
        user: {}
      },
      id: ''
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    getOrder () {
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/order/${this.id}`)
        .then((res) => {
          // console.log(res.data)
          status.isLoading = false
          this.order = res.data.order
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    confirmPay () {
      status.isLoading = true
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${this.id}`)
        .then((res) => {
          // console.log(res)
          status.isLoading = false
          this.getOrder()
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.id = this.$route.params.checkPaidId
    this.getOrder()
  }
}
</script>
