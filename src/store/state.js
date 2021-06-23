import modeType from './mode_type'

export default {
  isFullScreen: false,
  isMiniPlayer: false,
  isListPlayer: false,
  isPlaying: false,
  modeType: modeType.loop,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  curTime: 0,
  favoriteList: [],
  historyList: []
}
