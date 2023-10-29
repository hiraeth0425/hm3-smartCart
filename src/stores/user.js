import { defineStore } from 'pinia'

export const useSearchStore = defineStore('SearchStoreHm', {
  state() {
    return {
      history: []
    }
  },
  getters: {},
  actions: {
    // 設置歷史紀錄
    setHistory(arr) {
      this.history = arr
    },
    // 取出歷史紀錄
    getHistory() {
      return this.history
    }
  },
  persist: true
})

export const useUserStore = defineStore('userStoreHm', {
  state() {
    return {
      // token相關
      token: '',
      userId: ''
    }
  },
  actions: {
    // 設置token
    setUserInfo(token, userId) {
      this.token = token
      this.userId = userId
    }
  },
  persist: true
})
