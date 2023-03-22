<template>
<VueLoading :active="isLoading">
  <img src="@/assets/img/帝爺公.png" alt="" class="logout animate__animated animate__lightSpeedOutLeft">
</VueLoading>
  <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fs-3 fw-bold" href="#">
        <i class="fa-solid fa-beat text-warning"
          style="--fa-beat-scale: 2.0;">鼓</i>
        之鄉
      </a>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link active">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link">優惠卷</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/article" class="nav-link">貼文</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
        <span class="navbar-nav">
          <router-link to="/user/articles" class="nav-link">Blog</router-link>
          <router-link to="/user/cart" class="nav-link">購物車</router-link>
        </span>
      </div>
    </div>
</nav>
</template>

<script>
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    logout () {
      this.isLoading = true
      this.$http.post(`${VITE_URL}/logout`)
        .then(() => {
          this.isLoading = false
          this.$router.push('/')
        })
    }
  }
}
</script>

<style lang="scss">
  .logout {
    width: 500px;
    object-fit: cover;
  }
</style>
