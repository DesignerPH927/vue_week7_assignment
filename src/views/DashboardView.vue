<template>
  <Navbar></Navbar>
  <div class="container-fluid position-relative mt-3">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/NavbarComponent.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

const { VITE_URL } = import.meta.env

export default {
  components: {
    Navbar,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)zack0313\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    this.$http.post(`${VITE_URL}/api/user/check`)
      .then((res) => {
        if (res.data.success) {
          this.$swal({
            icon: 'success',
            title: '驗證成功',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
      .catch((err) => {
        // console.log(err.response.data.success)
        if (!err.response.data.success) {
          this.$swal({
            icon: 'error',
            title: '驗證失敗'
          })
          this.$router.push('/')
        }
      })
  }
}
</script>
