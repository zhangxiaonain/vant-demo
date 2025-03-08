import Vue from 'vue'
import Vuex from 'vuex'
 
// 在vue中，使用插件得使用use，才能使用插件
// Vue.use(Vuex)
 
// 创建仓库
const store = new Vuex.Store(
    {
        state: {
          videoWidth: '100%',  // 初始视频宽度为 100%
          videoHeight: 'auto' , // 初始视频高度自适应
          isTransformed: false, // 标记视频是否已经被转换

          // 用于存储右侧图标是否显示的状态
          showRightIcons: true ,
          //是否显示评论区
          isShowCommentArea: false,
          },
          mutations: {
            changeVideoSize(state, { width, height }) {

              console.log('修改视频宽高为：', width, height);
              state.videoWidth = width;
              state.videoHeight = height;
            },
            //设置视频是否需要转换状态
            setIsTransformed(state, value) {
              state.isTransformed = value;
            },
            
             // 修改右侧图标显示状态的 mutation
              toggleRightIcons(state, value) { 
              state.showRightIcons = value;
            },
            //是否显示评论区
            showCommentArea(state, value) {
              state.isShowCommentArea = value;
            }

          }
    }
)
 
// 导出给main.js使用
export default store