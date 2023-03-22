<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
    ></VueLoading>
  <div class="container">
    <nav class="navbar navbar-expand bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">
        <small class="text-decoration-underline text-primary">購物車</small>
        <small> / {{tempProduct.title}}</small>
        </router-link>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    </nav>
    <div class="row gx-5">
      <div class="col-md-6">
        <h2>{{tempProduct.title}}</h2>
        <p>
          <small>{{tempProduct.description}}</small>
        </p>
        <img :src="tempProduct.imageUrl"
          alt=""
          class="img-fluid">
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <div v-if="tempProduct.origin_price ===
          tempProduct.price"
          class="h5 fw-bold"
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
      tempProduct: {},
      qty: 1
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    getProduct () {
      status.isLoading = true
      this.id = this.$route.params.productId
      // console.log(this.id)
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/product/${this.id}`)
        .then((res) => {
          // console.log(res.data.product)
          status.isLoading = false
          this.tempProduct = res.data.product
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style lang="scss">
  .img-fluid {
    height: 600px;
    object-fit: cover;
  }
</style>
