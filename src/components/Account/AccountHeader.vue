<template>
  <div class="header" @click="changeTheme">
      <div class="header-left" @click.stop="back"></div>
      <ul class="header-title">
        <li :class="{'active': switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
        <li :class="{'active': switchNum === 1}" @click.stop="switchItem(1)">最近播放</li>
      </ul>
      <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'AccountHeader',
  data () {
    return {
      themes: ['theme', 'theme2', 'theme3'],
      index: 0,
      switchNum: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    back () {
      window.history.back()
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    }
  }
}

</script>
<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';

.header {
    width: 100%;
    height: 100px;
    // background: green;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    position: relative;
    // z-index: 955;
    .header-left, .header-right {
        width: 84px;
        height: 84px;
        // background: #000;
        margin-top: 8px;
    }
    .header-left {
      @include bg_img('../../assets/images/back');
    }
    .header-right {
      @include bg_img('../../assets/images/more');
    }
    .header-title {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: bold;
      border: 1px solid #fff;
      border-radius: 10px;
      @include font_size($font_medium);
      @include no-wrap();
      height: 60px;
      margin-top: 20px;
      li {
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        &:nth-of-type(1) {
          border-right: 1px solid #fff;
        }
        &.active {
          background: rgba(255,255,255, 0.3);
        }
      }
    }
}
</style>
