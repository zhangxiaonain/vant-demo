
<template>
  <!-- 视频作品的信息展示组件 根据workId查询 作品标题 点赞，评论，转发，收藏数据 以及发布作品用户的用户名-->

     <div  class = "parent" >
      <!-- 用户头像 -->
       <div class = "userNameShow">
        <!-- 首页作者信息    @click="handlePopupClick" 阻止事件向视频组件冒泡-->
      <div id="authorImformation"  @click="handlePopupClick" >
        <span id="authorNameId" v-modle="userNameArr">@{{ userNameArr[this.workId]}}</span>
        <van-text-ellipsis 
          v-model:show="isShowAuthor"
         
          class="van-theme-light"
          rows="2"
          :content="textArr[this.workId]"
          @click="showAuthorPopup"
          expand-text="展开"
          collapse-text="收起"
        > {{textDescribe }}</van-text-ellipsis>
             
      </div>
         
       </div>
       <!-- 右侧图标 -->
       <div class = "userIcon"  @click="handlePopupClick"  v-if="showRightIcons">    

           <div class = "workIcon">
               <!-- 作品用户头像 https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg -->
            <img  class="rightPic"  
             src="https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg"/>
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
            :color="activeColor"
            @click="changeColor"
            v-model="Likes"
          />
          <span>1528</span>

        </div> 
        <!-- 评论 -->
         <div class = "workIcon" >
            <van-icon
            name="chat"
            size="35"
            @click.stop="showComments"
           
            color="#ffffff"
            v-model="value2"
          />
          <span>20.1万</span>

        </div> 
        <!-- 收藏 -->
         <div class = "workIcon">
           <van-icon
            name="star"
            size="35"
            :color="activeColorStar"
            @click="changeColorStar"
            v-model="Stars"
          />
          <span>456</span>

        </div> 
         <!--转发 -->
         <div class = "workIcon">
            <van-icon
            name="share"
            size="35"
            color="#ffffff"
            id="chat"
            v-model="value"
            @click="showShare = true"
          />
          <span>123</span>

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
          <van-swipe-item> <a href="https://store.dji.com/cn/product/osmo-pocket-3-vlog-combo?vid=163851">{{hostList[this.workId]}}</a></van-swipe-item>
         
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
     
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
    >  
    <!-- 评论组件 -->
       <workcomment/>
      </van-popup>

       
      </div>
</template>

<style scoped>
.parent {
   
}
.userNameShow{
    display: inline-block;
   
    width: 75%;
    height: 80px;
    margin-top: 500px;
    color: #ffffff;
    z-index: 2;
    /* background-color: rgb(93, 202, 5); */
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

<script>
import { ref } from "vue";
import axios from "axios";
import workComment from "../commentComponents/comment.vue"

import { mapMutations,mapState } from 'vuex';


export default{
  props: {
    workId: {
      type: [Number, String], // 作品id可以是数字类型或者字符串类型，根据实际情况确定，这里兼容两种常见情况
      required: true // 如果该组件必须依赖这个id来进行后续逻辑，可设为必需的
    },
  },
  // 组件
    components: {
    workcomment: workComment
  },


   mounted() {
    if (!this.workId) {
    console.error('Work ID is missing');
    return;
    }else{
         console.error('Work ID is' +this.workId);
    };
    
  },

  //计算
  computed: {
    //修改公共的状态值
    ...mapState(['showRightIcons','isShowCommentArea']) 
  },
  
methods:{
  //改变视频的大小并上移
     ...mapMutations(['changeVideoSize','setIsTransformed','toggleRightIcons','showCommentArea']),
  //隐藏图标
  // ...mapMutations(['toggleRightIcons']),
     //点击评论图标
   showComments(){
          console.log('hhhhhhhhhhh我点了批评了' +this.isShowCommentArea)
          //点击评论按钮后改变视频播放的宽高
          // 触发事件，传递改变后的宽高
           // 调用 mutation 修改视频宽高
          //显示评论区
           this.showCommentArea(true);
           // 调用 mutation 设置 isTransformed 为 true
           this.setIsTransformed(true); 
           //隐藏图标
           this.toggleRightIcons(false);
           console.log('点击后' +this.isShowCommentArea)
           // this.isShowComment = true;
    },
    showSubmit(){
        console.log("showSubmit")
    },
    handlePopupClick(event){
              event.stopPropagation();// 阻止事件冒泡
    },
    handleTouchStart(event) {
      // 处理滑动开始事件，这里只处理popup内的逻辑
      event.stopPropagation();// 阻止事件冒泡
    },
    handleTouchMove(event) {
      // 处理滑动中事件
      event.stopPropagation();
    },
    handleTouchEnd(event) {
      // 处理滑动结束事件
      event.stopPropagation();
    }

},

data(){
  return{
    //作品标题及描述
    textArr : ['#上课突然有趣了 看着这个小熊好可爱 #动画品 😂 突然想到了小时候 #童年啊 不想上班','头怎么尖尖的  #大疆pocket3 #好好考试 东风快递','就借着月光 #国风合伙人','#草原 做一个自由的人😄😄😄 '],
    userNameArr :['张三','李四','王五','张小年'],
    userName:'',
    //hostBang
    hostList :['动画榜Top3 * 倒霉熊第三季', '热销榜Top2 * 大疆pocket3大卖9999+', '种草榜Top5 * 骆驼冲锋衣200万人搜索过', '出行榜Top4 * 呼伦贝尔大草原3000人去过'],
    isShowComment :false,
  
  };
}

}

</script>