<template>
  <div class="singer">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value, index) in list" :key="index" ref="listGroup">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul>
              <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
                <img v-lazy="obj.img1v1Url" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <!-- <li
        v-for="(key, index) in keys"
        :key="key"
        @click.stop="keyDown(index)"
        :class="{'active': currentIndex === index}">{{key}}</li> -->
        <li
        v-for="(key, index) in keys"
        :key="key"
        :data-index='index'
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :class="{'active': currentIndex === index}">{{key}}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
      <transition>
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
// import { getHotArtists } from '../api/index'
// import { getLetterArtists } from '../api/index'
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView.vue'

export default {
  name: 'Singer',
  created () {
    getAllArtists()
      .then((result) => {
        console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  components: {
    ScrollView
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      // console.log(y)
      this.scrollY = y
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间的区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const prevTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= prevTop && -y <= nextTop) {
          this.currentIndex = i

          // 1、下一组标题的偏移位 + 当前滚动出去的偏移位
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 判断计算结果是否是0~分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  methods: {
    _keyDown (index) {
      // console.log(index)
      this.currentIndex = index
      const offsetY = this.groupsTop[index]
      // console.log(offsetY)
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    touchstart (ev) {
      console.log(ev.target.dataset.index)
      const index = parseInt(ev.target.dataset.index)
      this._keyDown(index)

      this.beginOffsetY = ev.touches[0].pageY
    },
    touchmove (ev) {
      this.moveOffsetY = ev.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / ev.target.offsetHeight
      // console.log(offsetY)
      let index = parseInt(ev.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  watch: {
    list () {
      // console.log(this.$refs.listGroup)
      /* watch只能监听数据的变化，数据变化时不一定渲染完成，
      为了保证渲染完成后再获取，可以使用Vue的$nextTick方法，
      $nextTick的回调函数只有渲染完成后才会执行 */
      this.$nextTick(() => {
        // console.log(this.$refs.listGroup)
        this.$refs.listGroup.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
        console.log(this.groupsTop)
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  }

}

</script>
<style scoped lang='scss'>
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';

.singer {
  position: fixed;
  top: 184px;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper {
    // width: 100%;
    // height: 100%;
    .list-group {
      .group-title {
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
      }
      .group-item {
        display: flex;
        justify-content: flex-start;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p {
          @include font_size($font_medium);
          @include font_color();
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
      }
    }
  }
  .list-keys {
    position: fixed;
    right: 10px;
    top: 60%;
    transform: translateY(-50%);
    li {
      @include font_color();
      @include font_size($font_medium_s);
      padding: 3px 0;
      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }
  .fix-title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    @include font_size($font_medium);
    color: #fff;
    @include bg_color();
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
