<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <keep-alive include='Singer, Search'>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import MainHeader from './components/MainHeader.vue'
import Tabbar from './components/Tabbar.vue'
// 这个Player不知道为什么不能加.vue后缀，vetur会报错
// 2022年1月8日又不知道为什么不报错了
import Player from './views/Player.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    Tabbar,
    Player
  }
}
</script>
<style scoped lang="scss">

</style>
