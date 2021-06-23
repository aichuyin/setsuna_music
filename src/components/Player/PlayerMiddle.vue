<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
        <div class="cd-wrapper" ref="cdWrapper">
            <img :src="currentSong.picUrl" alt="">
        </div>
        <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(value, key) in currentLyric" :key="key"
          :class="{'active': currentLineNum === key || value === '本歌词不支持自动滚动'}">
          {{value}}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// 这里有个坑，不要用最新的swiper6和更旧的swiper4，都会报错且无法正确加载
import { swiper, swiperSlide, directive } from 'vue-awesome-swiper'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'
import ScrollView from '../ScrollView.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        // Some Swiper option/callback...
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  directives: {
    swiper: directive
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      /*
      // 1、高亮歌词的同步
      // console.log(newValue)
      const lineNum = Math.ceil(newValue + 1) + ''
      const result = this.currentLyric[lineNum]
      // 最后一句歌词是广告，默认就不高亮，还以为是自己代码问题，调试了好一会儿
      // console.log(result)
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 2、歌词滚动的同步
        const currentLyricTop = document.querySelector('li.active').offsetTop
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        // console.log(lyricHeight)
        if (currentLyricTop > lyricHeight / 2) {
        // console.log('滚动')
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        }
      }
      */
      // 1、高亮歌词的同步
      const lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 2、歌词滚动的同步
      // console.log(this.currentLyric)
      const currentLyricTop = document.querySelector('li.active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      // console.log(lyricHeight)
      if (currentLyricTop > lyricHeight / 2) {
        // console.log('滚动')
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  methods: {
    getFirstLyric () {
      // if (this.currentLyric)
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}

</script>
<style scoped lang='scss'>
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';

.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-wrapper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_color();
      @include font_size($font_medium);
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        // padding-bottom: 100px;
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
      }
    }
  }

}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import '../../assets/css/mixin.scss';

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
