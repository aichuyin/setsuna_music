<template>
  <!-- <div class="header" @click="changeTheme">
      <div class="header-left"></div>
      <p class="header-title">雪菜音乐</p>
      <div class="header-right" @click.stop="accountClick"></div>
  </div> -->
  <div class="header" @click="changeTheme">
    <!-- 不能直接设置插槽的样式，要用div包裹插槽设置div的样式 -->
    <div class="left">
      <slot name='left'>左边</slot>
    </div>
    <slot name='center'>中间</slot>
    <div class="right">
      <slot name='right'>右边</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme2', 'theme3'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}

</script>
<style scoped lang="scss">
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';

.header {
    width: 100%;
    height: 100px;
    // background: green;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    position: relative;
    // z-index: 955;
    .left, .right {
        width: 84px;
        height: 84px;
        // background: #000;
        margin-top: 8px;
        * {
          width: 100%;
          height: 100%;
        }
    }
}
</style>
