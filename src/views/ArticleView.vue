// 製作訂單頁面
// Step: √ (「取得、加入」的文字都必須串接API)
// 1.切板 √
// 2.取得遠端產品列表(VITE_URL、VITE_PATH) √
// 3.顯示遠端列表內容 √
// 4.製作Modal並使用Modal取得單一產品 √
// 5.顯示Modal單一產品 √
// 6.製作刪除Modal √
// 7.顯示刪除Modal √
// 8.執行刪除Modal功能 √

<template>
  <VueLoading
    :active="isLoading"
    :color="color"
    :loader="loader"
  ></VueLoading>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="m-3 text-end">
        <button class="btn btn-primary"
        type="button"
        @click="openModal('new')">建立新頁面</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th width="160">標題</th>
            <th width="160">作者</th>
            <th >描述</th>
            <th width="150">建立時間</th>
            <th width="150">是否公開</th>
            <th width="160">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aItem in articles" :key="aItem.id">
            <td>{{aItem.title}}</td>
            <td>{{aItem.author}}</td>
            <td>{{aItem.description}}</td>
            <td>{{$filters.date(aItem.create_at)}}</td>
            <td>
              <span v-if="aItem.isPublic"
                class="text-success">已上架</span>
              <span v-else
                class="text-danger">未上架</span>
            </td>
            <td>
              <div class="fs-3">
                <i class="fa-solid fa-file-pen
                text-warning"
                style="cursor:pointer;"
                @click="openModal('edit', aItem)"></i>
                <i class="fa-solid fa-xmark ms-2
                text-danger"
                style="cursor:pointer;"
                @click="openModal('delete', aItem)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- articleModal -->
  <articleModal
    ref="articleModal"
    :is-new="isNew"
    :article="tempArticle"
    @update-article="updateArticle"
    ></articleModal>
    <!-- deleteModal -->
    <deleteModal
      ref="deleteModal"
      :product="tempArticle"
      @del-item="delArticle"
    ></deleteModal>
</template>

<script>
import articleModal from '@/components/ArticleModal.vue'
import deleteModal from '@/components/DeleteModal.vue'
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
      isNew: false,
      articles: [],
      tempArticle: {
        tag: []
      }
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  components: {
    articleModal,
    deleteModal
  },
  methods: {
    getArticles () {
      status.isLoading = true
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/articles`)
        .then((res) => {
          status.isLoading = false
          // console.log(res.data.articles)
          this.articles = res.data.articles
          // 必須把分頁資料存入設定的pages中
          // this.page = res.data.pagination
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    openModal (isNew, item) {
      // console.log(isNew, item)
      if (isNew === 'new') {
        this.tempArticle = {
          // 為什麼要除以1000，原是因為JS時間都是以毫秒為單位，故需除以1000
          create_at: new Date().getTime() / 1000
        }
        this.isNew = true
        this.$refs.articleModal.show()
      } else if (isNew === 'edit') {
        this.tempArticle = { ...item }
        this.isNew = false
        this.$refs.articleModal.show()
      } else if (isNew === 'delete') {
        this.tempArticle = { ...item }
        this.$refs.deleteModal.show()
      }
    },
    updateArticle (item) {
      // console.log(item)
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      let http = 'post'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${item.id}`
        http = 'put'
      }
      this.$http[http](url, { data: item })
        .then((res) => {
          // console.log(res)
          this.$refs.articleModal.hide()
          this.getArticles()
        })
        .catch((err) => {
          status.isLoading = false
          alert(err.response.data.message)
        })
    },
    delArticle (item) {
      // console.log(item)
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/article/${item.id}`)
        .then((res) => {
          if (res.data.success) {
            this.$swal({
              title: '產品已經刪除囉!!',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            this.$refs.deleteModal.hide()
            this.getArticles()
          }
        })
        .catch((err) => {
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
