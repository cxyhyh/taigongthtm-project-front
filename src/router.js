import Vue from 'vue'
import VueRouter from 'vue-router'
import Button from 'ant-design-vue'
import index from './views/Home/index.vue'
import sdt from './views/echarts/sdt.vue'
import tab from './views/Home/tab.vue'
import but from './views/Home/but.vue'
Vue.use(Button);
Vue.use(VueRouter);
let router = new VueRouter({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: index,
        
        },
        {
            path: '/sdt',
            name: 'sdt',
            component: sdt,
        
        },
        {
            path: '/tab',
            name: 'tab',
            component: tab,
        
        },
        {
            path: '/but',
            name: 'but',
            component: but,
        
        },
    ]
})
export default router;