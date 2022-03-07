import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import htmlToPdf from "@/assets/js/htmlToPdf";
import store from './vuex/store'
import {userToken} from "./vuex/mutations";
import { Base64 } from 'js-base64'

Vue.prototype.$echarts = echarts


Vue.prototype.axios = axios;

Vue.config.productionTip = false

Vue.prototype.axios = axios;
Vue.use(ElementUI)
Vue.use(htmlToPdf)
Vue.use(Base64)

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('userName')) {// 判断是否登录
        next()
        // alert(111)
    } else {// 没登录则跳转到登录界面
        next({

            to: '/',
        })
        // alert(222)
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
