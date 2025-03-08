import { createMemoryHistory, createRouter } from 'vue-router'


import Main from '../components/Main.vue'
import ShoppingCars from '../components/ShoppingCars.vue'
import News from '../components/News.vue'
import Myself from '../components/Myself.vue'
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



const routes = [
  { path: '/', component: Main},
  { path: '/shoppingCars', component:  ShoppingCars},
  { path: '/scan', component:  Scan},
  { path: '/news', component:  News},
  { path: '/myself', component:  Myself},
  { path: '/login', component: Login},
  {path: '/register', component: Register},
 
  //topbar的路由
  ...topRouter,
  //serach
  ...searchRouter,
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router