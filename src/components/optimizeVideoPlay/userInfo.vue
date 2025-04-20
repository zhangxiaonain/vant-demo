
<template>
  <!-- 视频作品的信息展示组件 根据workId查询 作品标题 点赞，评论，转发，收藏数据 以及发布作品用户的用户名-->

  <div  class = "parent" >
    <!-- 用户头像 -->
    <div class = "userNameShow" :model="userInfo">
      <!-- 首页作者信息    @click="handlePopupClick" 阻止事件向视频组件冒泡-->
      <div id="authorImformation"  @click="handlePopupClick" >
        <span id="authorNameId" v-modle="userInfo.userName">@</span>
        <van-text-ellipsis
            v-model:show="isShowAuthor"

            class="van-theme-light"
            rows="2"
            :content="userInfo.userName"
            @click="showAuthorPopup"
            expand-text="展开"
            collapse-text="收起"
        > {{userInfo.title }}</van-text-ellipsis>

      </div>

    </div>
    <!-- 右侧图标 -->
    <div class = "userIcon"  @click="handlePopupClick"  >

      <div class = "workIcon">
        <!-- 作品用户头像 https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg -->
        <img  class="rightPic"
              :src="userInfo.userIcon"/>
        <!-- 关注加号  v-if="followAuthor" -->

        <span class = "iconPic" id="clickPlus" @click="hideSpan">
                   <van-icon   size="15" name="plus" />

          </span>


      </div>

      <!-- 点赞 -->
      <div class = "workIcon">
        <van-icon
            name="like"
            size="35"


        />
        <span>{{userInfo.like}}</span>

      </div>
      <!-- 评论 -->
      <div class = "workIcon" >
        <van-icon
            name="chat"
            size="35"
            @click.stop="showComments"

            color="#ffffff"

        />
        <span>{{userInfo.comment}}</span>

      </div>
      <!-- 收藏 -->
      <div class = "workIcon">
        <van-icon
            name="star"
            size="35"

        />
        <span>{{userInfo.collection}}</span>

      </div>
      <!--转发 -->
      <div class = "workIcon">
        <van-icon
            name="share"
            size="35"
            color="#ffffff"
            id="chat"
            @click="showShare = true"
        />
        <span>{{userInfo.share}}</span>

      </div>
      <!-- 唱片 -->
      <div class = "workIcon">
        <img  class = "discPic" src="https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg">

      </div>

    </div>
    <!--下层盒子 -->
    <div  class="downBox">
      <!-- 相关推荐 -->
      <van-notice-bar
          left-icon="fire-o"
          :scrollable="false"
          id = 'fier'
          background="black"
      >
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :touchable="false"
            :show-indicators="false"
        >
          <van-swipe-item> <a href="https://store.dji.com/cn/product/osmo-pocket-3-vlog-combo?vid=163851">{{userInfo.serach}}</a></van-swipe-item>

        </van-swipe>
      </van-notice-bar>
    </div>
    <!--以上相关推荐 -->

    <!-- 点击评论图标  closeable -->
    <van-popup   @click="handlePopupClick" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
                 class="commentPup"
                 v-model:show ="isShowCommentArea"
                 position="bottom"
                 :overlay="false"
                 :style="{ height: '65%' }"

    >
      <!-- 评论组件 -->
<!--      <workcomment/>-->
    </van-popup>


  </div>
</template>

<style scoped>
.parent {
  height: 100%;
  background: #f68383;
}
.userNameShow{
  display: inline-block;

  width: 75%;
  //height: 80px;
  margin-top: 500px;
  color: #ffffff;
  z-index: 2;
   background-color: rgb(93, 202, 5);
}
.userIcon{

  display: inline-block;
  position:absolute;
  width: 18%;
  height: 390px;
  margin-top:52%;
  margin-left: 23px;
  text-align:center;
  color: #ffffff;
  z-index: 3;
  /* background-color: antiquewhite; */
}
/* 下面盒子，热度推荐 */
.downBox{

  width: 100%;
  height: 28px;
  display: inline-block;
  z-index: 3;
  background: #053ae7;

}
/* 用户头像 */
.rightPic{

  width: 48px;
  height:48px;
  text-align: center;
  border-radius:50%;
  margin-bottom: 3px;
  border: 2px solid white;
  margin-left: 1px;
}
/* 关注图标 */
.iconPic {
  position:absolute;
  font: 180;
  margin-top: 39px;
  margin-left: -34px;
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background-color: #eb0707;
}

/*右侧图标 */
.workIcon{
  z-index: 3;
  display: inline-block;

  margin-top:5px;
  width: 53px;
  height: 60px;
  text-align: center;
  font-size: 15px;
  font:bold;
  color: #ffffff;


  /* background-color:red */

}

.discPic{
  width: 48px;
  height: 48px;
  text-align: center;
  border-radius: 50%;
  /* background-color: rgb(168, 73, 73); */
  /* 使用transform属性进行旋转，这里以旋转45度为例 */
  animation: rotate 6s linear infinite;
}
/* 定义旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


/*唱片 */
#blackCard{
  position: absolute;
  /*据分享图标3px*/
  width: 50px;
  height: 50px;
  text-align: center;

  border-radius: 50%;

  background-color: rgb(168, 73, 73);
  animation: rotate 5s linear infinite;
}
/*作者名字体 */
#authorNameId {
  /**字体较粗 */
  font-weight: bold;
  display: inline-block;
  font-size: 18px;
  color: #ffffff;
}
/*改变 展开 的默认颜色*/
.van-theme-light {
  --van-text-ellipsis-action-color: rgb(255, 255, 255);
}
.commentPup{
  z-index: 30;
  background-color: #ffffff;
}

/* 小火苗 */
#fier{

  font-size: 16px;
  color:rgb(255, 49, 3);


}

#fier a{
  color: #fbc709;
}
</style>
<script setup>
import {ref} from 'vue'

const  isShowComment = ref(false);

const userInfo = ref({
  userName:'张三',
  userIcon:'https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg',
  title:'hhhhh',
  like:123,
  comment:14523,
  share:1258,
  collection:145,
  serach:'热销榜Top2 * 大疆pocket3大卖9999+'
},
)

const  showComments =()=>{
       isShowComment.value =true;
}
const isShowAuthor = ref(false)
const handlePopupClick=(event)=>{
  event.stopPropagation();// 阻止事件冒泡
}
const handleTouchStart=(event) =>{
  // 处理滑动开始事件，这里只处理popup内的逻辑
  event.stopPropagation();// 阻止事件冒泡
}
const  handleTouchMove=(event)=> {
  // 处理滑动中事件
  event.stopPropagation();
}
const handleTouchEnd=(event)=> {
  // 处理滑动结束事件
  event.stopPropagation();
}

const hideSpan =()=>{
  console.log('点击了隐藏按钮')
}

const   isShowCommentArea = ref(false);

const showAuthorPopup = ()=> {
  isShowAuthor.value = true
}
const showShare = ref(false)
// import workcomment from "@/components/commentComponents/comment.vue";
</script>