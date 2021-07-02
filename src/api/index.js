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
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '飙升榜', id: 0 },
        { name: '新歌榜', id: 1 },
        { name: '原创榜', id: 2 },
        { name: '热歌榜', id: 3 }
      ],
      recList: [
        { name: '黑胶VIP爱听榜', id: 4 },
        { name: '网络热歌榜', id: 5 }
      ],
      styleList: [
        { name: '云音乐说唱榜', id: 6 },
        { name: '云音乐古典榜', id: 7 },
        { name: '云音乐电音榜', id: 8 },
        { name: '云音乐ACG榜', id: 9 },
        { name: '云音乐韩语榜', id: 10 },
        { name: '云音乐国电榜', id: 11 },
        { name: '云音乐摇滚榜', id: 12 },
        { name: '云音乐古风榜', id: 13 },
        { name: '云音乐民谣榜', id: 14 }
      ],
      globalList: [
        { name: 'UK排行榜周榜', id: 15 },
        { name: '美国Billboard榜', id: 16 },
        { name: 'Beatport全球电子舞曲榜', id: 17 },
        { name: '日本Oricon榜', id: 18 },
        { name: '云音乐欧美热歌榜', id: 19 },
        { name: '云音乐欧美新歌榜', id: 20 },
        { name: '法国 NRJ Vos Hits 周榜', id: 21 },
        { name: '云音乐日语榜', id: 22 },
        { name: '俄语榜', id: 23 },
        { name: '越南语榜', id: 24 }
      ],
      otherList: [
        { name: '潜力爆款榜', id: 25 },
        { name: '听歌识曲榜', id: 26 },
        { name: 'KTV唛榜', id: 27 },
        { name: '云音乐ACG动画榜', id: 28 },
        { name: '云音乐ACG游戏榜', id: 29 },
        { name: '云音乐ACG VOCALOID榜', id: 30 },
        { name: '中国新乡村音乐排行榜', id: 31 }

      ],
      titles: { officialList: '官方榜', recList: '推荐榜', styleList: '曲风榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        // console.log(data.list.length)
        data.list.forEach(function (obj) {
          // console.log(obj.name)
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        // console.log(category)
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopList = (data) => { return Network.get('playlist/detail', data) }
export const getSearchList = (data) => { return Network.get('search?type=1', data) }
export const getSearchHot = () => { return Network.get('search/hot') }
