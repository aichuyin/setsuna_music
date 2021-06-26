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
export const getArtistsSongs = (data) => { return Network.get('artists', data) }
// export const getHotArtists = () => { return Network.get('top/artists?offset=0&limit=5') }
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=3&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=3&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=1&area=8&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=2&area=8&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=3&area=8&initial=${letter}`)
    ])
      .then(function (result) {
        // console.log(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        // console.log(result)
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
