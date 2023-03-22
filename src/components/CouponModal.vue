<template>
  <!-- Modal -->
<div class="modal fade" id="exampleModal"
  tabindex="-1" aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="Modal">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
          <span v-if="isNew"
            class="text-info">新增優惠卷</span>
          <span v-else
            class="text-warning">編輯優惠卷</span>
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="title" class="form-label">標題</label>
          <input type="text" class="form-control"
          placeholder="請輸入標題" id="title"
          v-model="tempCoupon.title">
        </div>
        <div class="mb-3">
          <label for="coupon" class="form-label">優惠碼</label>
          <input type="text" class="form-control"
          placeholder="請輸入優惠碼" id="coupon"
          v-model="tempCoupon.code">
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">到期日</label>
          <input type="date" class="form-control" id="date"
          v-model="due_date">
        </div>
        <div class="mb-3">
          <label for="percent" class="form-label">折扣百分比</label>
          <input type="number" class="form-control" min="0"
          placeholder="請輸入折扣百分比" id="percent"
          v-model.number="tempCoupon.percent">
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input"
            id="enabled"
            v-model="tempCoupon.is_enabled"
            :true-value="1"
            :false-value="0">
            <label for="enabled" class="form-check-label">是否啟用</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-outline-primary"
        @click.prevent="$emit('update-coupon', tempCoupon)">
          <span v-if="isNew">新增優惠卷</span>
          <span v-else>編輯優惠碼</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MixinsModal from '@/mixins/mixinsModal.js'

export default {
  props: ['coupon', 'isNew'],
  data () {
    return {
      Modal: {},
      due_date: '',
      tempCoupon: {}
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mixins: [MixinsModal]
}
</script>
