// 製作訂單頁面
// Step: √ (「取得、加入」的文字都必須串接API)
// 1.切板 √
// 2.取得遠端產品列表(VITE_URL、VITE_PATH) √
// 3.顯示遠端列表內容 √
// 4.製作頁面切換 √

<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
    ></VueLoading>
  <div class="container">
    <div class="row">
      <template v-for="arItem in articles" :key="arItem.id">
        <div class="col-md-6" v-if="arItem.isPublic">
          <div class="card">
            <img :src="arItem.imageUrl" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{arItem.title}}</h5>
              <p class="card-text">{{arItem.description}}</p>
            </div>
            <div class="card-footer">
              <router-link
                :to="`/user/article/${arItem.id}`"
                v-if="arItem.isPublic"
                class="btn btn-outline-primary"
                >文章頁面</router-link>
            </div>
          </div>
        </div>
      </template>
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
      articles: []
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  methods: {
    getArticles () {
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/articles`)
        .then((res) => {
          // console.log(res.data)
          this.articles = res.data.articles
          status.isLoading = false
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    // 產品頁面必須取出token並存入headers中，才可正確取得產品列表
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)zack0313\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = token
    this.getArticles()
  }
}
</script>
