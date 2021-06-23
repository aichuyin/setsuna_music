// 这个js文件是专门用来管理请求各种接口地址的
import Network from './network'

// 箭头函数不加大括号会默认return，下面函数等于（）=> Network.get('banner?type=2')
export const getBanner = () => { return Network.get('banner?type=2') }
export const getPersonalized = () => { return Network.get('personalized?limit=6') }
export const getNewAlbum = () => { return Network.get('album/newest') }
export const getNewsong = () => { return Network.get('personalized/newsong') }
export const getPlayList = (data) => { return Network.get('playlist/detail', data) }
export const getAlbum = (data) => { return Network.get('album', data) }
export const getSongDetail = (data) => { return Network.get('song/detail', data) }
export const getSongLyric = (data) => { return Network.get('lyric', data) }
export const getSongUrl = (data) => { return Network.get('song/url', data) }
