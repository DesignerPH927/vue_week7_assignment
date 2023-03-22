<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item"
        :class="{'disabled' : !this.pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="updatePage(this.pages.current_page - 1 )">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        v-for="page in this.pages.total_pages"
        :key="page"
        :class="{'active' : page === this.pages.current_page}">
        <a class="page-link" href="#"
          @click.prevent="updatePage(page)">{{page}}</a>
      </li>
      <li class="page-item"
      :class="{'disabled' : !this.pages.has_next}">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="updatePage(this.pages.current_page + 1 )">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emitPages', page)
    }
  }
}
</script>
