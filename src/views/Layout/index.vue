<script>
import { ref } from 'vue'

export default {
  setup() {
    const active = ref(0)
    return { active }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <router-view></router-view>
  <van-tabbar v-model="active" route fixed>
    <van-tabbar-item to="/home" icon="home-o">首頁</van-tabbar-item>
    <van-tabbar-item to="/category" icon="search">分類</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="friends-o">購物車</van-tabbar-item>
    <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
