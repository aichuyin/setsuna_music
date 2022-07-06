import Vue from 'vue'
import VueRouter from 'vue-router'
// 通过import xxx from xxx 的方式加载组件，无论组件是否被使用，都会被加载进来
// import Recommend from '../views/Recommend.vue'
// import Singer from '../views/Singer.vue'
// import Rank from '../views/Rank.vue'
// import Search from '../views/Search.vue'

// 实现Vue组件的按需加载
// 下面这种方式是vue官方文档写的，但其实它内部应该还是按更下面的方式再处理一次的
// const Recommend = () => {
//   return import('../views/Recommend.vue')
// }
// 我猜这个resolve可以出现在这里的原因应该是vue内部又给这个函数外围包裹了new Promise
const Recommend = (resolve) => {
  import('../views/Recommend.vue').then((module) => {
    // console.log(module)
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail.vue').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer.vue').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank.vue').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search.vue').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account.vue').then((module) => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/search', component: Search },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
