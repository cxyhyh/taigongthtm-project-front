import Vue from 'vue'
import VueRouter from 'vue-router'
import Button from 'ant-design-vue'
import index from './views/Home/index.vue'
import sdt from './views/echarts/sdt.vue'
import tab from './views/Home/tab.vue'
import but from './views/Home/but.vue'
import login from './views/login/login.vue'
import admin from './views/Home/admin.vue'
import sdt1 from './views/echarts/sdt1.vue'
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
        {
            path: '/login',
            name: 'login',
            component: login,
        
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
        
        },
        {
            path: '/sdt1',
            name: 'sdt1',
            component: sdt1,
        
        }

    ]
})
export default router;