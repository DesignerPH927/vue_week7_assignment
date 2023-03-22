<template>
<div class="container">
  <nav class="navbar navbar-expand bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/articles">
        <small class="text-decoration-underline text-primary">部落格列表</small>
        <small> / {{article.title}}</small>
        </router-link>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h2>{{ article.title }}</h2>
      <p>
        <small class="text-muted">{{$filters.date(article.create_at)}}-</small>
        <small class="text-muted">作者：{{article.author}}</small>
      </p>
      <img :src="article.imageUrl" alt="">
      <p>{{article.description}}</p>
    </div>
  </div>
</div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      article: {},
      id: '' // 存取id
    }
  },
  methods: {
    getArticle () {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/article/${this.id}`)
        .then((res) => {
          // console.log(res.data.article)
          this.article = res.data.article
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.id = this.$route.params.articleId
    // console.log(this.id)
    this.getArticle()
  }
}
</script>
