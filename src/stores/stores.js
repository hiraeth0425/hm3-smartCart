import { defineStore } from 'pinia'

export const useSearchStore = defineStore('SearchStoreHm', {
  state() {
    return {
      history: []
    }
  },
  getters: {},
  actions: {},
  persist: true
})

export const useUserStore = defineStore('userStoreHm', {
  state() {
    return {}
  },
  actions: {},
  persist: true
})
