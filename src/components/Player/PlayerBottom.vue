<template>
  <div class="player-bottom">
      <div class="bottom-progress">
          <span ref="eleCurrentTime">00:00</span>
          <div class="progress-bar" @click="progressClick" ref="progressBar">
              <div class="progress-line" ref="progressLine">
                  <div class="progress-dot"></div>
              </div>
          </div>
          <span ref="eleTotalTime">00:00</span>
      </div>
      <div class="bottom-control">
          <div class="mode loop" @click="mode" ref="mode"></div>
          <div class="prev" @click="prev"></div>
          <div class="play" @click="play" ref="play"></div>
          <div class="next" @click="next"></div>
          <div class="favorite" @click="favorite" :class="{'active': isFavorite(currentSong)}"></div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/mode_type'
import { formartTime } from '../../tools/tools'

export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        // console.log(111)
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        // console.log(222)
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        // console.log(333)
        this.setModeType(modeType.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      const result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    },
    progressClick (ev) {
      // 1、计算并更改进度条的位置
      // const beginLeft = ev.target.offsetLeft
      // ev.target拿到的是进度条的前景，点击当前进度的左边会有bug
      const beginLeft = this.$refs.progressBar.offsetLeft
      const clickLeft = ev.pageX
      const clickWidth = clickLeft - beginLeft
      // const progressWidth = ev.target.offsetWidth
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = clickWidth / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'

      // 2、计算并更改播放时间
      const currentTime = this.totalTime * value
      // console.log(currentTime)
      this.setCurTime(currentTime)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      const time = formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 1、格式化当前播放时间
      const time = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2、根据当前播放时间计算比例
      const value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
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

.player-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .bottom-progress {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            @include font_size($font_samll);
            @include font_color();
        }
        .progress-bar {
            width: 100%;
            margin: 0 10px;
            height: 10px;
            background: #fff;
            .progress-line {
                width: 0%;
                height: 100%;
                background: #ccc;
                position: relative;
                .progress-dot {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .bottom-control {
        width: 80%;
        margin: 0 auto;
        padding: 50px 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            width: 84px;
            height: 84px;
        }
        .mode {
            &.loop {
                @include bg_img('../../assets/images/loop');
            }
            &.one {
                @include bg_img('../../assets/images/one');
            }
            &.random {
                @include bg_img('../../assets/images/shuffle');
            }
        }
        .prev {
            @include bg_img('../../assets/images/prev');
        }
        .play {
            @include bg_img('../../assets/images/play');
            &.active {
                @include bg_img('../../assets/images/pause');
            }
        }
        .next {
            @include bg_img('../../assets/images/next');
        }
        .favorite {
            @include bg_img('../../assets/images/un_favorite');
            &.active {
              @include bg_img('../../assets/images/favorite');
            }
        }
    }
}
</style>
