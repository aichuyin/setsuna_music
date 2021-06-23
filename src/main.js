import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  // 通过配置loading来设置目标图片未加载完成时的占位图片
  // 这里有个坑，vue-lazyload官方并没有这个require，但没有它就无法正确显示占位图片
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
