<template>
  <swiper :options="swiperOptions" class="banner" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// 这里有个坑，不要用最新的swiper6和更旧的swiper4，都会报错且无法正确加载
import { swiper, swiperSlide, directive } from 'vue-awesome-swiper'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
  name: 'Banner',
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  directives: {
    swiper: directive
  }
}

</script>
<style scoped lang='scss'>
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }

}
</style>
<style lang='scss'>
@import '../../assets/css/mixin.scss';

// 若想覆盖swiper的样式则style不能是scoped的
.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
