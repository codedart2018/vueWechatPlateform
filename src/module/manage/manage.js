import Vue from 'vue'
import App from './App'
import IView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 IVIEW CSS
import './assets/style/common/common.less' // 定制公共 less
import Toast from '../../libs/toast/' // 定制吐司
import Util from '../../libs/util' // 工具
import '../../libs/filter' //过滤器

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
