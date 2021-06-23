export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isMiniPlayer (state) {
    return state.isMiniPlayer
  },
  isListPlayer (state) {
    return state.isListPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  songs (state) {
    return state.songs
  },
  currentSong (state) {
    const obj = {
      id: 0,
      name: '',
      singer: '',
      picUrl: null
    }
    return state.songs[state.currentIndex] || obj
  },
  currentLyric (state) {
    return state.currentLyric
  },
  currentIndex (state) {
    return state.currentIndex
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
