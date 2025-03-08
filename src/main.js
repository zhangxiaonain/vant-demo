import { createApp } from 'vue'
import App from './App.vue'
import vant from 'vant'

import router from './router/index';
//vuex数据存储
import store from './store/index'



//引入vant的css
import 'vant/lib/index.css';
//引入自定义图标
import './assets/my_icon/iconfont.css';







const app = createApp(App)

app.use(store)
app.use(vant)
app.use(router)

app.mount('#app')
