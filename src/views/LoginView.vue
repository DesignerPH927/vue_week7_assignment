<template>
  <VueLoading :active="isLoading">
    <img src="@/assets/img/logo-rgb.png" alt=""
      class="logo animate__animated animate__flip">
  </VueLoading>
  <div class="container">
    <div class="row justify-content-center">
      <VueForm class="col-md-4"
        v-slot="{ errors }" @submit="login" >
        <div class="mb-3 mt-5">
          <div class="fs-3 fw-bold">請先登入</div>
        </div>
        <div class="mb-3">
          <div class="form-floating">
            <VueField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="user.username">
            </VueField>
            <error-message name="email" class="invalid-feedback"></error-message>
            <label for="email" class="form-label">Email address</label>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-floating">
            <VueField
              id="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['password'] }"
              placeholder="請輸入 password"
              rules="required"
              v-model="user.password">
            </VueField>
            <error-message name="password" class="invalid-feedback"></error-message>
            <label for="password" class="form-label">Email Password</label>
          </div>
        </div>
        <div class="mb-3 text-end">
          <button class="btn btn-primary btn-lg"
          type="submit">登入</button>
        </div>
      </VueForm>
    </div>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.isLoading = true
      this.$http.post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res)
          if (res.data.success) {
            const { token, expired } = res.data
            // console.log(token, expired)
            document.cookie = `zack0313=${token}; expires=${new Date(expired)};`
            this.isLoading = false
            this.$router.push('/admin/products')
          }
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push('/')
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss">
  .logo {
    width: 350px;
    object-fit: cover;
  }
</style>
