<template>
  <div class="modal fade" id="exampleModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true" ref="Modal">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger">
            <h1 class="modal-title fs-5"
            id="exampleModalLabel">刪除產品</h1>
            <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong
            class="text-danger">
            {{item.title}}</strong>
            (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn
            btn-outline-secondary"
            data-bs-dismiss="modal">取消</button>
            <button type="button"
            class="btn btn-primary"
            @click.prevent="$emit('del-item',
            item)">確定</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import MixinsModal from '@/mixins/mixinsModal.js'

export default {
  props: ['product'],
  watch: {
    product () {
      this.item = this.product
    }
  },
  data () {
    return {
      Modal: {},
      item: {}
    }
  },
  mixins: [MixinsModal]
}
</script>
