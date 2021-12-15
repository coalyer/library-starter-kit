import Vue from 'vue'
import App from './App.vue'
// import less from 'less'
// ! less使用:https://www.cnblogs.com/qdwds/p/11516181.html
// ! less不用引入
// ! less使用报错:this.getOptions is not a function :https://blog.csdn.net/wjf1997/article/details/113791581
// import axios from 'axios'
// ! axios使用：https://blog.csdn.net/qq_30631063/article/details/107099336
Vue.config.productionTip = false
// 全局挂载axios
// Vue.prototype.$axios = axios

// Vue.use(
// less, // 引入less
// axios,
// )

new Vue({
  render: h => h(App),
}).$mount('#app')
