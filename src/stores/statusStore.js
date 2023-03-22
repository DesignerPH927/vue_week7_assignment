import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  state: () => {
    return {
      isLoading: false,
      messages: []
    }
  },
  actions: {
    pushMessage (data) {
      const { title, content, style = 'success' } = data
      this.messages.push({ style, title, content })
    }
  }
})
