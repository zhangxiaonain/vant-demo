import { createMemoryHistory, createRouter } from 'vue-router'


import Main from '../components/Main.vue'
import ShoppingCars from '../components/ShoppingCars.vue'
import News from '../components/News.vue'
import Myself from '../components/Myself.vue'
//朋友
import Friends from '../components/friends.vue'
//登录
import Login from '../components/Login.vue'
//注册
import Register from '../components/Register.vue'
//二维码登录


import Scan from '../components/Scan.vue'
// import { search } from 'core-js/fn/symbol'
//topbar
import topRouter from './topbar'
//sreach
import searchRouter from './searchs'
//userChar
import userChat  from './userChat'

// 优化后的video播放
import optimizeVideo from '../components/optimizeVideoPlay/index.vue'


const routes = [
  { path: '/', component: Main},
  { path: '/friends', component:  Friends},
  { path: '/scan', component:  Scan},
  { path: '/news', component:  News},
  { path: '/myself', component:  Myself},
  { path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/optimizeVideo/:userId',  name: 'peoplePage',component: optimizeVideo},
 
  //topbar的路由
  ...topRouter,
  //serach
  ...searchRouter,
  //userChar
  ...userChat,
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router