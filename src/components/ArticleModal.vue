<template>
<!-- Modal -->
  <div class="modal fade"
    id="exampleModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="Modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <span v-if="isNew"
              class="text-info">新增貼文</span>
            <span v-else
              class="text-warning">編輯貼文</span>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control"
                placeholder="必填標題" id="title"
                v-model="tempArticle.title">
              </div>
              <div class="mb-3">
                <label for="photo" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control"
                placeholder="請輸入圖片連結" id="photo"
                v-model="tempArticle.imageUrl">
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input type="text" class="form-control"
                placeholder="必填作者" id="author"
                v-model="tempArticle.author">
              </div>
              <div class="mb-3">
                <label for="articleDate" class="form-label">文章建立日期</label>
                <input type="date" class="form-control" id="articleDate"
                v-model="create_at">
              </div>
            </div>
            <div class="col-md-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row mb-3 gx-1">
                <div
                  class="col-md-2 mb-1"
                  v-for="(label, key) in tempArticle.tag"
                  :key="key">
                  <div class="input-group input-group-sm">
                    <input
                      id="tag"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標籤"
                      v-model="tempArticle.tag[key]">
                    <button class="btn btn-sm btn-outline-danger"
                    type="button"
                    @click="tempArticle.tag.shift()"
                    ><i class="fa-solid fa-xmark fa-flip"></i></button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="
                  tempArticle.tag[tempArticle.tag.length - 1] ||
                  !tempArticle.tag.length">
                  <button class="btn btn-outline-primary btn-sm
                  d-block w-100"
                  type="button"
                  @click="tempArticle.tag.push('')">新增標籤</button>
                </div>
              </div>
              <div class="mb-3">
                <label for="article" class="from-label">文章描述</label>
                <textarea
                  id="article"
                  rows="2"
                  placeholder="請輸入文章描述"
                  class="form-control"
                  v-model="tempArticle.description"></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                  ></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="enabled"
                  v-model="tempArticle.isPublic">
                  <label for="enabled" class="form-check-label">是否公開</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
          @click.prevent="$emit('update-article', tempArticle)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MixinsModal from '@/mixins/mixinsModal.js'
export default {
  props: ['article', 'isNew'],
  watch: {
    article () {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false
      };
      [this.create_at] = new Date(this.tempArticle.create_at * 1000)
        .toISOString() // 可修正時區，因地制宜
        .split('T') // 使用 T 將字串切割，如['a'T'b'T'c']
    },
    create_at () {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  data () {
    return {
      Modal: {},
      tempArticle: {
        tag: []
      },
      create_at: 0,
      editor: ClassicEditor,
      editorData: '<p></p>',
      editorConfig: {
        toolbar: [
          'heading', '|', 'bold', 'italic', 'link', 'numberedList'
        ],
        placeholder: '請輸入文章內容'
      }
    }
  },
  mixins: [MixinsModal]
}
</script>

<style>
/* 設定文字編輯器內容長度 */
.ck-editor__editable {
  min-height: 300px;
}
</style>
