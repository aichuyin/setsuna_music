<template>
  <div class="detail">
      <SubHeader :title="playlist.name"></SubHeader>
      <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <ScrollView ref="scrollView">
          <DetailBottom :playlist="playlist.tracks"></DetailBottom>
        </ScrollView>
      </div>
  </div>
</template>

<script>
import SubHeader from '../components/Detail/DetailHeader.vue'
import DetailTop from '../components/Detail/DetailTop.vue'
import DetailBottom from '../components/Detail/DetailBottom.vue'
import ScrollView from '../components/ScrollView.vue'
import { getPlayList, getAlbum, getArtistsSongs, getTopList } from '../api/index'

export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
        // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.coverImgUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    // console.log(defaultHeight)
    this.$refs.scrollView.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // 高斯模糊效果非常消耗性能，最好不要在移动端使用
        // const scale = 20 * Math.abs(offsetY) / defaultHeight
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
      } else {
        const scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}

</script>
<style scoped lang='scss'>
@import '../assets/css/mixin.scss';

.detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background: #000;
    // z-index: 965;
    @include bg_sub_color();
    .bottom {
      position: fixed;
      top: 500px;
      bottom: 0;
      left: 0;
      right: 0;
    }
}
</style>
