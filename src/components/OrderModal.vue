<template>
  <!-- Modal -->
  <div class="modal fade"
    id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="Modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h1 class="modal-title fs-5 text-warning" id="exampleModalLabel">訂單細節</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h2>用戶資料</h2>
              <!-- 猜測 prop傳入的物件資料僅能讀取物件的第一層，
              第二層必須使用 v-if 或 v-for才讀取到 -->
              <table class="table align-middle">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th width="120">姓名</th>
                    <td>{{tempOrder.user.name}}</td>
                  </tr>
                  <tr>
                    <th width="120">Email</th>
                    <td>{{tempOrder.user.email}}</td>
                  </tr>
                  <tr>
                    <th width="120">電話</th>
                    <td>{{tempOrder.user.tel}}</td>
                  </tr>
                  <tr>
                    <th width="120">地址</th>
                    <td>{{tempOrder.user.address}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h2>訂單細節</h2>
              <table class="table align-middle mb-3">
                <tbody>
                  <tr>
                    <th width="120">訂單編號</th>
                    <td>{{tempOrder.id}}</td>
                  </tr>
                  <tr>
                    <th width="120">下單時間</th>
                    <td>{{$filters.date(tempOrder.create_at)}}</td>
                  </tr>
                  <tr>
                    <th width="120">付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{$filters.date(tempOrder.paid_date)}}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th width="120">付款狀態</th>
                    <td class="fw-bold">
                      <span v-if="tempOrder.is_paid" class="text-success">已付清</span>
                      <span v-else class="text-danger">未付清</span>
                    </td>
                  </tr>
                  <tr>
                    <th width="120">總金額</th>
                    <td>{{ $filters.currency(tempOrder.total)}}</td>
                  </tr>
                </tbody>
              </table>
              <h2>選購商品</h2>
              <table class="table align-middle">
                <tbody>
                  <tr v-for="pItem in tempOrder.products" :key="pItem.id">
                    <th>{{pItem.product.title}}</th>
                    <td>{{pItem.qty}}/{{pItem.product.unit}}</td>
                    <td>{{pItem.total}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="form-check d-flex justify-content-end">
                  <input
                    type="checkbox"
                    class="form-check-input me-1"
                    id="paid"
                    v-model="tempOrder.is_paid">
                  <label for="paid" class="form-check-label fw-bold">
                    <span v-if="tempOrder.is_paid"
                      class="text-success">已付款</span>
                    <span v-else
                      class="text-danger">未付款</span>
                  </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
            data-bs-dismiss="modal">取消</button>
          <button type="button"
            class="btn btn-primary"
            @click.prevent="$emit('confirm', tempOrder)">修改付款狀態</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinsModal from '@/mixins/mixinsModal.js'

export default {
  props: ['orderItem'],
  inject: ['emitter'],
  watch: {
    orderItem () {
      this.tempOrder = this.orderItem
    }
  },
  data () {
    return {
      Modal: {},
      tempOrder: {}
    }
  },
  mixins: [MixinsModal]
}
</script>
