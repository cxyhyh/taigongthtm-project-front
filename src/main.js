import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TableColumn from 'element-ui'
import dataV from '@jiaminghi/data-view'

import {
  Button
} from 'ant-design-vue'
import moment from 'moment'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(dataV)

Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://121.43.158.100:8088'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

