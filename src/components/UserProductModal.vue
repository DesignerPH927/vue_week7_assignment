<template>
  <div class="modal fade" ref="Modal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h1 class="modal-title fs-5 text-white"
            id="exampleModalLabel">
            {{tempProduct.category}}</h1>
          <button type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <img :src="tempProduct.imageUrl"
              alt="" class="img-fluid">
            </div>
            <div class="col-md-6">
              <div class="mt-5">
                <p>商品描述：{{tempProduct.description}}</p>
                <p>商品內容：{{tempProduct.content}}</p>
              </div>
              <div class="mb-3">
                <div v-if="tempProduct.origin_price ===
                  tempProduct.price" class="h5 fw-bold"
                  >原價{{tempProduct.origin_price}}元</div>
                <div v-else>
                  <del class="h6 text-muted">
                    原價{{tempProduct.origin_price}}元
                  </del>
                  <div class="h5 text-danger fw-bold">
                    現在只要{{tempProduct.price}}元
                  </div>
                </div>
              </div>
              <div class="input-group input-group-sm">
                <select id="" class="form-select"
                v-model="qty">
                  <option :value="i"
                  v-for="i in 20" :key="i">{{i}}</option>
                </select>
                <button class="btn btn-success"
                type="button"
                @click="addToCarts(tempProduct, qty)"
                >加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinsModal from '@/mixins/mixinsModal.js'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['id', 'openModal', 'addToCarts'], // 監聽id且當id有變動時，做想做的事情
  data () {
    return {
      Modal: '',
      tempProduct: {},
      qty: 1
    }
  },
  mixins: [MixinsModal],
  watch: {
    id () {
      if (this.id) {
        this.$http.get(`${VITE_URL}/api/${VITE_PATH}/product/${this.id}`)
          .then((res) => {
            // console.log('取得單一產品：', res.data.product);
            this.tempProduct = res.data.product
            this.Modal.show()
          })
          .catch((err) => {
            alert(err.response.data.message)
          })
      }
    }
  },
  mounted () {
    this.$refs.Modal.addEventListener('hidden.bs.modal', event => {
      this.openModal('')
    })
  }
}
</script>
