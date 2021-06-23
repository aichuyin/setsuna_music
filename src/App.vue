<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Tabbar from './components/Tabbar.vue'
// 这个Player不知道为什么不能加.vue后缀，vetur会报错
import Player from './views/Player'

export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>
<style scoped lang="scss">
@import './assets/css/variable.scss';

.theme {
  position: fixed;
  left: 0;
  bottom: 0;
  button {
  width: 100px;
  height: 100px;
  &:nth-of-type(1) {
    background: $background-color-theme;
  }
  &:nth-of-type(2) {
    background: $background-color-theme2;
  }
  &:nth-of-type(3) {
    background: $background-color-theme3;
  }
}

}

</style>
