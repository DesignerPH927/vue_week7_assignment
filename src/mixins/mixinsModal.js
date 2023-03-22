import Modal from 'bootstrap/js/dist/modal'

export default {
  methods: {
    show () {
      this.Modal.show()
    },
    hide () {
      this.Modal.hide()
    }
  },
  mounted () {
    this.Modal = new Modal(this.$refs.Modal)
  }
}
