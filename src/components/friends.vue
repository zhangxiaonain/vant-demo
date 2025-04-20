<template>
  <div id="container">
    <!-- topbar -->
    <!-- <van-nav-bar title="推荐" left-text="" left-arrow>
      <template #right>
        <van-icon
          name="search"
          size="20"
          id="search"
          v-model="value"
          @click="onSearch"
        />
        <van-icon name="add-o" size="20" id="add" @click="onAdd" />
      </template>
    </van-nav-bar> -->

    <!-- <button @click="addPicture" class="btn btn-">点我发送Axios</button> -->
    <div id="containers">
      <!-- 视频 -->

      <div id="video"  >
        <!--  videoUrls 自动播放   :src="https://sky-zwx.oss-cn-beijing.aliyuncs.com/286f40d9-8083-4e99-acd5-30cbe5b19309.mp4" -->
        <video
          autoplay
          id="myVideo"
          @click="isPlayVideo"
          ref="videoPlayer"
          width="100%"
          height="500px"
          :src="work.workUrl"

        >
        
        
        </video>
     
            
      </div>
      
      <!-- 视频数据区 -->
      <div  class = "">
      <!-- 用户头像 /optimizeVideo -->
      <div id="rightPic" >
         <img  :src=" work.userPicture" @click="gotoPeoplePage" />
        <span id="right-text" v-if="followAuthor" @click="hideSpan">+</span>
      </div>
      <!-- 右侧放置五个图标 -->
      <div id="rightBar">
        <!-- 点赞 -->
        <span id="like">
          <van-icon
            name="like"
            size="35"
            :color="activeColor"
            @click="changeColor"
            v-model="Likes"
          />

          {{ work.likesCount }}
        </span>
        <!-- 评论 -->
        <span id="chat" @click="clickChat">
          <van-icon
            name="chat"
            size="35"
            @click="showComments = true"
            color="#ffffff"
            v-model="value2"
          />
          <br />
          {{ value2 }}
        </span>
        <!-- 收藏 -->
        <span id="satr">
          <van-icon
            name="star"
            size="35"
            :color="activeColorStar"
            @click="changeColorStar"
            v-model="Stars"
          />
          {{ work.collection }}
          <!-- 转发 -->
          <!-- aaffdd -->
        </span>
        <span id="share">
          <van-icon
            name="share"
            size="35"
            color="#ffffff"
            id="chat"
            v-model="value"
            @click="showShare = true"
          />{{work.share}}
        </span>

        <!--唱片 -->
        <div id="blackCard">
          <van-icon
            class="iconfont"
            class-prefix="icon"
            color="black"
            name="douyin"
            size="30"
          />
        </div>
      </div>

      <!-- 首页作者信息 -->
      <div id="authorImformation">
      
        <span id="authorNameId">@{{work.userName}}</span>
        <van-text-ellipsis
          v-model:show="isShowAuthor"
          class="van-theme-light"
          rows="2"
          :content="work.title"
          @click="showAuthorPopup"
          expand-text="展开"
          collapse-text="收起"
        />
      </div>

    </div>
     
</div>  
<!-- 视频数据区结束 -->
        <!-- 进度条 -->
        <div id="progress-container">
          <div
            id="progress-bar"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div> 

   <!-- 立即分享给好友的弹框 -->

    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    >
      <div slot="title" class="share-title">
        <!-- 这里可以插入自定义图标 -->
      </div>
    </van-share-sheet>

    <!-- 点击评论图标 -->
    <van-popup
      v-model:show="showComments"
      position="bottom"
      :style="{ height: '70%' }"
      closeable
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
    >
      <van-cell
        id="recommentCell"
        title="大家都在搜 :"
        is-link
        url="https://jd.com"
      >
        <span id="recommendRearch">张正浩的小时候</span>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="search" value="..." class="search-icon" />
        </template>
      </van-cell>
      <!-- 评论数据集合   @click="onLoad"  fetchComments(this.current, this.size, this.workId)-->
 
        <van-list
          v-model="commentAnswers"
         
          :finished="finished"
          :loading="loading"
          @load="fetchComments(this.current, this.size, this.workId) "
          finished-text="没有更多了"
        >
          <!--评论组件-->
          <van-cell v-for="comment in commentAnswers" :key="comment"
                    @mousedown="onMouseDown(comment.userId,comment.id)" @mouseup="onMouseUp(comment.userId,comment.id)" @mouseout="onMouseOut"
                    @touchstart="onTouchStart(comment.userId,comment.id)" @touchend="onTouchEnd(comment.userId,comment.id)" @touchcancel="onTouchCancel" >
            <div id="commentAuthor"  >
              <img id="commentAuthorPicture" :src="comment.userPicture" />

              <span id="commentAuthorName">{{ comment.userName }}</span>
            </div>
            <!-- 评论具体内容 @click="deleteComment(comment.userId,comment.id)" -->
            <van-text-ellipsis
              id="commentDetiles"
              rows="2"


              :content="comment.content"
              expand-text="展开"
              collapse-text="收起"
            />
            <!-- 表情包 -->
            <van-swipe-cell>
              <!-- 图标插槽 -->
              <van-cell :border="false" title="" value="" />

              <template #right>
                <button
                  scope
                  id="dislikeEmote"
                  @click="dislickEmote"
                  type="danger"
                >
                  太滑稽
                </button>
                <van-button
                  scope
                  id="colletcEmote"
                  type="primary"
                  @click="collectEmote"
                  text="收藏"
                />
              </template>
              <!-- 评论图片 -->
              <div id="commentPicture" v-show="comment.imgUrl">
                  <img :src="comment.imgUrl"/>
              </div>
            </van-swipe-cell>
            <div id="commentBottom">
              <span id="commentTime">
                {{ comment.createdAt }} * {{ comment.location }}</span
              >
              <span id="commentAnswer">回复</span>
              <!-- 评论区爱心 -->
              <!-- getHeartIconName(comment.id) -->
              <!--   :color="getHeartIconName(comment.id)" -->
              <van-icon
                :class="{ 'red-heart': likes[comment.id] }"
                @click="changeCommentColor(comment.id)"
                id="commentLikeIcon"
                name="like"
                >{{ comment.likesCount }}
              </van-icon>
            </div>
            <span
              id="isShowCommentAnswersArea"
              v-if="comment.childCommentCounts"
              v-bind="childCount"
              @click="isShowAnswerAreaComment(comment.id)"
              >—— 展开{{ comment.childCommentCounts }}条回复
              <van-icon name="arrow-down" />
            </span>
            <!-- 回复 -->
            <div id="commentAnswers" v-if="expandedCommentId === comment.id">
              <van-list
                v-model:loading="loadingChild"
                :finished="finishedChild"
                finished-text="没有更多了"
                @load="onLoad"
                id="childComment"
              >
                <!--  -->
                <!-- 存放子评论 -->
                <van-cell
                  v-if="isPackUp"
                  id="childComment"
                  v-for="item in childComments"
                  :key="item.id"
                >
                  <div id="commentAuthor">
                    <img id="commentAuthorPictureChild"  :src="item.userPicture"/>
                    <span id="commentAuthorName">{{ item.userName }}</span>
                  </div>
                  <!-- 评论回复具体内容 -->
                  <van-text-ellipsis
                    id="commentDetiles"
                    rows="2"
                    :content="item.content"
                    expand-text="展开"
                    collapse-text="收起"
                  />
                  <div id="commentBottom">
                    <span id="commentTime">
                      {{ item.createdAt }} . &nbsp;{{ item.location }}</span
                    >
                    <span id="commentAnswerChild">回复</span>
                    <van-icon
                      :class="{ 'red-heart': childLikes[item.id] }"
                      @click="changeChildCommentColor(item.id)"
                      id="commentLikeIconChild"
                      name="like"
                      >{{ item.likeCount }}
                    </van-icon>
                  </div>
                  <!-- 一个子评论的单元格 -->
                </van-cell>

                <span id="isPackUp" @click="isPackUpChildComment(comment.id)"
                  >___收起<van-icon name="arrow-up"
                /></span>
              </van-list>
            </div>
            <!-- 以上为回复 -->
          </van-cell>
        </van-list>

      <!-- 评论输入框 -->

      <van-tabbar v-model="active" placeholder="true">
        <div id="inputComment">
          <input
            type="text"
            @click="showSubmitCommentPopup"
            placeholder="善语结善缘，恶语伤人心"
          />
        </div>
      </van-tabbar>

      <!-- 发布评论的pup-->
      <van-popup
        v-model:show="showSubmit"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <div>
          <div id="submit-comment">
            <!-- 评论textarea -->
            <textarea
              id="commentTextArea"
              v-model="submitParensComment.content"
              placeholder="善语结善缘，恶语伤人心"
            ></textarea>
          </div>
          <!-- 发送盒子 -->
          <div id="SendButtonDiv">
            <span>
              <van-icon
                class="iconfont2"
                class-prefix="icon"
                color="red"
                name="tupianshangchuan"
                size="27"
              />
            </span>
            <span><van-icon name="guide-o" /></span>
            <span><van-icon name="smile" /></span>

            <button v-if="submitParensComment.content" id="submitButton" @click="submitComment">发送</button>
          </div>

          <!-- 其他代码 -->
        </div>
      </van-popup>
    </van-popup>

    <!-- 首页点击展开后的弹框 -->
    <van-popup
      v-model:show="showAuthor"
      close-icon="close"
      position="bottom"
      @close="showClose"
      show-close="false"
      :style="{ height: '70%' }"
    >
      <div id="authorFirstDiv">
        <img id="authorPic" :src="work.userPicture"/>
        <span id="authorName">{{work.userName}}</span>

        <button id="followAuthor" @click="hideSpan">{{ strfollow }}</button>
      </div>
      <!-- 用户发布的详细信息文本 -->
      <div class="custom-line-spacing">
        {{ work.title}}
      </div>
      <!-- 发布时间 -->
      <div class="publishTime">1天前</div>
           <!-- 相关推荐 -->
      <div class="relativeVideo">
           <relativeShows/>
      </div>
         
         
    </van-popup>

    <!-- <van-icon class="iconfont" class-prefix="icon" name="douyin"></van-icon> -->
  </div>
</template>


<style scoped>
/* 抖音图标 */
.relativeVideo{
  position: relative;
}
#video{

  height: 100%;
}

.publishTime{
  margin-top: 10px;
  margin-left: 10px;
  height: 20px;
 
}

#container {
  /* margin-top: 20px; */
  position: relative;
  width: 100%;
  height: 615px;
  background-color: rgb(0, 0, 0);
}

/* 用户信息的上层盒子 */
.userInformation{
  width: 100%;
  position: relative;
  z-index: 1;
  /* background-color: #acbdf6; */
  height: 610px;
}

/* 评论区 */

#commentAuthor {
  display: flex;
  position: relative;
  width: 90%;
  height: 45px;
  /* background-color: #94a7e7; */
}
#commentAuthor span {
  display: inline-block;
  font-size: 15px;
  color: #a2a2a2;
}
/*评论作者头像 */
#commentAuthorPicture{
  position: absolute;
  text-align: center;
  margin-top: 5px;
  margin-left: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background-image: url("../images/aa.png"); */
  /* background-color: rgb(219, 79, 79); */
}
/*评论作者名称 */
#commentAuthorName {
  position: absolute;
  text-align: center;
  margin-top: 15px;
  margin-left: 45px;
  /* background-color: #053ae7; */
}
/*回复 */
#commentAnswer {
  position: absolute;
  margin-top: 2px;
  margin-left: 200px;
}

/*放置评论的回复盒子 */
#commentAnswers {
  display: flex;
  margin-left: 30px;
  /* background-color: #999daa; */
  /* height: 100px; */
  width: 100%;
}
#commentAnswers img{
  /* width: 10px;
  height: 80px;
  border-radius: 8px;
  background: #000; */
}
/*是否喜欢该评论 */
.red-heart {
  color: #f60606;
}
/*子评论区 cell*/
#childComment {
  width: 100%;
  color: #000;
  font: 15px;
  text-align: left;
  /* background-color: #452323; */
}
/*是否展开回复评论 */
#isShowCommentAnswersArea {
  display: inline;
  position: relative;
  font: 15px;
  margin-right: 35px;
  /* background-color: #053ae7; */
}
/*是否收起子评论 */
#isPackUp {
  /* display: inline-block; */
  position: absolute;
  margin-top: 4px;
  font: bold;
  font-size: 15px;
  color: #929292;
  left: 50px;
  /* background-color: #7a7aeb; */
}
/*回复评论的作者头像 */
#commentAuthorPictureChild {
  position: absolute;
  text-align: center;
  margin-top: 5px;
  margin-left: 0px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background-image: url("../assets/狗头.png"); */
}
/*子评论回复文字位置 */
#commentAnswerChild {
  position: relative;
  margin-left: 160px;
  margin-top: 2px;
}
/*子评论点赞 */
#commentLikeIconChild {
  position: absolute;
  top: 5px;
  left: 210px;
}
/*输入评论的bar */
#inputComment {
  /* display: flex; */
  position: relative;
  width: 100%;
  /* background-color: #f6f6f6; */
}
/*评论输入框 */
#inputComment input {
  position: relative;
  margin-left: 10px;
  margin-top: 8px;
  font-size: 15px;
  border: none;
  width: 95%;
  background-color: #f6f5f5;
  border-radius: 15px;
  height: 35px;
}

/*评论图片 */
#commentPicture {
  position: relative;
  margin-left: 35px;
  border-radius: 8px;
  width: 118px;
  /* height: 120px; */

  /* background-color: #053ae7; */
  /* background-image: url("../assets/表情.png"); */
}
#commentPicture img{
  border-radius: 5px;
  width: 118px;
  height: 130px;

}

/*不喜欢图片 */
#dislikeEmote {
  position: relative;
  text-align: center;
  display: block;
  margin-top: 25px;
  width: 62px;
  height: 27px;
  color: #ffffff;
  font-size: 14px;
  border-radius: 3px;
  border: none;
  background-color: red;
}
/*收藏图片 */
#colletcEmote {
  position: absolute;
  display: block;
  margin-top: 25px;
  text-align: center;
  width: 62px;
  height: 27px;
}
/*评论喜欢图标 */
#commentLikeIcon {
  position: absolute;
  font: 15px;
  margin-top: 6px;
  margin-left: 250px;
  /* background-color: #053ae7; */
}

/*评论时间以及点赞量 */
#commentBottom {
  width: 100%;
  height: 30px;
  /* margin-top: 2px; */
  margin-left: 10px;
  position: relative;
  display: flex;
  color: #afafaf;
  /* background-color: #3232e5; */
}

/*时间和位置 */
#commentTime {
  position: absolute;
  margin-top: 2px;
  margin-left: 20px;
  /* background-color:#053ae7; */
}
/*commentDetiles" */
#commentDetiles {
  margin-left: 30px;
  width: 80%;
  text-align: left;
  color: #000;
  font-weight: 540;
  font-size: 16px;
  /* 展开 收启 的颜色一大小 */
  /*行高 */
  --van-text-ellipsis-line-height: 1.5;
  --van-text-ellipsis-action-color: #bbbaba;
  --van-text-ellipsis-action-font: 15px;
}

/*改变 展开 的默认颜色*/
.van-theme-light {
  --van-text-ellipsis-action-color: rgb(255, 255, 255);
}

/*作者 */
#authorImformation {
  z-index: 3;
  position: absolute;
  margin-top: 520px;
  color: #ffffff;
  width: 80%;
  height: 70px;
  /* background-color:#d14d4d */
}
/*作者名字体 */
#authorNameId {
  /**字体较粗 */
  font-weight: bold;
  display: inline-block;
  font-size: 18px;
  color: #ffffff;
}
/* 搜索图标 */
#search {
  position: relative;
  margin-right: 25px;
}
/* 点击展开后显示文本的样式*/
.custom-line-spacing {
  width: 94%;
  margin-top: 10px;
  margin-left: 10px;
  color: #000;
  font-size: 15px;
  /* font-weight:2 ; */
  line-height: 1.7; /* 根据需求设置行间距 */
}
#authorFirstDiv {
  position: sticky;
  margin-top: 0px;
  /* position: relative; */
  width: 100%;
  height: 60px;
  top: 0;
  z-index: 5;
  background-color: #ffffff;
}
/*展开后设置用户头像 */
#authorPic {
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
  display: inline-block;
  width: 50px;
  height: 50px;
  background-image: url("../images/aa.png");
  border-radius: 50%;
}
/*昵称 */
#authorName {
  position: absolute;
  font-weight: bold;
  display: inline-block;
  margin-top: 25px;
  margin-left: 10px;
  color: #000;
  width: 200px;
  height: 25px;
  text-align: left;
  /* background-color: #d2d4d7; */
}
/*关注按钮 */
#followAuthor {
  position: absolute;
  margin-top: 20px;
  margin-left: 230px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  border-radius: 10px;
  border: none;
  background-color: #f01515;
  display: inline-block;
}
/*发布时间 */
#publishTime {
  /* font-style: italic; */
  position: absolute;
  margin-left: 8px;
  font-size: 14px;
  color: #adacac;
}
/**视频内容 */
#video {
  position: absolute;
  /*盒内元素距离盒子顶部的高度 */
  /* padding-top: 70px; */
  text-align: center;
  /*改盒子距离盒子外的其他盒子的顶部距离 */
  /* margin-top: 1px; */
  width: 100%;
  height: 500px;
  z-index: 4;
  /* color: #ffde0a; */
  /* background-color: rgb(231, 35, 35); */
}

/*进度条 */
#progress-container {
  width: 100%;
  height: 4px;
  z-index: 3;
  background-color: #131313;
  position: absolute;
  margin-top: 609px;
}
#progress-bar {
  height: 100%;
  background-color: #d0cfcf;
  position: absolute;
  width: 0;
}
#video:first-child {
  z-index: 1;
  /* background-color: #f9f9f9; */
}

/*用户头像 */
#rightPic {
  z-index: 3;
  position: absolute;
  
  width: 50px;
  height: 50px;
  //background-image: url("../images/aa.png");
  border-radius: 50%;
  /* pointer-events: none; */
  /*上 右 下 左 */
  margin: 200px 300px 0px 314px;
  text-align: center;
}
#rightPic img{
  z-index: 1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  //background: #e0e0e0;
}
/*#rightPic:last-child {
  
  border-radius: 50%;
  pointer-events: none;
  /* background-color:red; 
 
}*/
/*右侧存放四个图标的容器 */
#rightBar {
  position: absolute;
  text-align: center;
  z-index: 3;
  /* color: #000; */
  width: 70px;
  height: 325px;
  /* margin: 240px 300px; */
   margin: 275px 300px 0px 305px;
  /* background-color: #c8b7b7; */
}

/**关注加号 */
#right-text {
  position: absolute;
  /*将span改为行内块元素 */
  display: inline-block;
  margin-left: -33px;
  margin-top: 41px;
  z-index: 10;
  font-size: 16px;
  width: 17px;
  height: 17px;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;
  background-color: #f90101;
}
/**设置存放图标的span 大小和位置 */
#rightBar span {
  position: relative;
  padding-top: 10px;
  font-size: 15px;
  color: #ffffff;
  display: inline-block;
  text-align: center;
  width: 75%;
  height: 55px;

  /* background-color: #d98888; */
}

/**评论区
 */
#recommentCell {
  width: 100%;
  height: 40px;
  /* background-color: #ffffff; */
  color: #020202;
  font-size: 16px;
}
#recommendRearch {
  font-size: 15px;
  color: #053ae7;
}

/*提交评论的pup */
#submit-comment {
  position: relative;
  display: flex;
}
#SendButtonDiv {
  position: relative;
  /* background-color: #a1b5f7; */
}
/*评论的textarea */
#commentTextArea {
  display: flex;
  margin-top: 5px;

  padding: 8px;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  /* background-color: #d36868; */
  border: 1px solid #a4a5a5;
}
/*添加图片的span */
#SendButtonDiv span {
  padding-top: 5px;
  display: inline-block;
  color: #ee2a2a;
  width: 40px;
  height: 40px;
  font-size: 27px;
  text-align: center;
  margin-left: 15px;
  margin-top: 5px;
  /* background-color: rgb(120, 205, 64); */
}
#commentTextArea {
  width: 100%;
  height: 40px;
  font-size: 15px;
  color: #000000;
  background-color: rgb(255, 255, 255);
}
/**发送评论按钮 */
#submitButton {
  display: inline-block;
  position: absolute;
  width: 60px;
  height: 30px;
  margin-top: 10px;
  margin-left: 145px;
  border: none;
  border-radius: 20px;
  background-color: red;
  color: #ffffff;
}

.search-icon {
  color: #1248fb;
  margin-right: 100px;
  font-size: 14px;
  line-height: inherit;
}

/*唱片 */
#blackCard {
  position: absolute;
  /*据分享图标3px*/
  margin-top: 6px;
  margin-left: 12px;

  height: 39px;
  width: 43px;

  padding-top: 5px;
  text-align: center;
  background-position: center;
  border-radius: 50%;
  /* background-image: ('../assets/douyinPic.png'); */
  background-color: rgb(245, 240, 240);
  animation: rotate 5s linear infinite;
}
/**自动旋转 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/**点击分享图标弹出*/
#shareCell{
  position: relative;
  width: 50px;
  height: 30px;
  text-align: center;
  background-color: #de4a4a;;
}
</style>

<script>
import { ref } from "vue";
import axios from "axios";

import { VanTextarea, showToast, showConfirmDialog,showSuccessToast  } from "vant";
import { timeAgo } from "../tools";
import  ShoppingCars from './ShoppingCars.vue';
import {deleteCommentById} from "@/api/user"; // 确保路径正确
import relativeShows from "./videoShowComponents/index.vue";

import {getWorkById} from "@/api/user";


export default {
  // components: {
   
  //  'relative-Shows':relativeShows
  // },

  components: {
    VanTextarea, // 注册van-textarea组件
    relativeShows,
    ShoppingCars
  },

   props: {
    workIds: {
      type: [Number, String], // 作品id可以是数字类型或者字符串类型，根据实际情况确定，这里兼容两种常见情况
      required: true // 如果该组件必须依赖这个id来进行后续逻辑，可设为必需的
    },
    videoUrls: {
      type: String,
      required: true // 同样，视频的url一般是必须要传入的，设为必需属性
    }
  },
  //数据
  data() {
    return {
      //存放评论数组
      commentAnswers: [],
      //存放子评论数组
      childComments: [],
      //每次请求的评论数据个数
      current: 0,
      userId:1,
      size: 3,
      workId: 1,
      loading: false,
      finished: false,
      isLoading :false,
      
    // 视频的url //作品i  workId: this.workIds, https://sky-zwx.oss-cn-beijing.aliyuncs.com/286f40d9-8083-4e99-acd5-30cbe5b19309.mp4
      work:{
        userId:'',
        workUrl:'',
        userPicture:'',
        userName:'',
        share:'',
        title:'',
        likesCount:'',
        commentCount:'',
        collection:'',

      },

      //存放喜欢评论状态的数组
      likes: [],

      //子评论
      childLikes:[],
      //提交评论对象
      submitParensComment: {
        content: "",
        userId: '',
        workId: 1,
        likesCount: 9999,
        location: "",
      },
      //是否收起发布评论的pup
      finshSubmintComment: true,
      //视频播放
      isPlay: false,
      //进度条
      progressPercentage: 0,

      //关注
      activefollow: false,
      strfollow: "关注",
      //点赞
      Likes: 1085,
      activeLike: false,
      activeColor: "#ffffff", // 初始颜色
      // inactiveColor: 'red', // 点击后的颜色
      //收藏
      activeSatr: false,
      followAuthor: true,
      Stars: 8995,
      activeColorStar: "#ffffff", // 初始颜色
      // inactiveColorStar: 'red' // 点击后的颜色
      activeCommentLike: false,
      activeCommentColor: "#a1a1a1", // 初始颜色

      //是否展开评论区
      isShowAnswerComment: false,
      value2: 0,
      childCount: 0,


      //activeLike
      //activeLike: null,
      //收起子评论
      isPackUp: -1,
      //子评论的Id
      expandedCommentId: null,

      //长按删除评论时间
      pressTimer: null,



    };
  },
  ///进度条
  mounted() {

    console.log('接收到的作品ID：', this.workIds);
    console.log('接收到的视频URL：', this.videoUrls);
    this.userId=  localStorage.getItem('user_id')

    console.log("json->>>>>>" + JSON.parse(localStorage.getItem('user_id')))

    setTimeout(() => {
      this.$refs.videoPlayer.addEventListener("timeupdate", this.updateProgress);
    })
    // this.loadComments();
    // this.onLoad();
    //获取作品
    this.work.workUrl = 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/716ee973-8157-41c4-a6a1-26aec282e513.mp4'
    this.getWork();

    //分页加载评论数据
    this.fetchComments(this.current, this.size, this.workId);

  },

  beforeDestroy() {
    this.$refs.videoPlayer.removeEventListener(
      "timeupdate",
      this.updateProgress
    );
  },
  //方法
  methods: {

    //跳转至 个人主页
    gotoPeoplePage(){

      this.$router.push({ name: 'peoplePage', params: { userId: this.work.userId } });
    },

    async getWork() {
      try {
        // 获取作品
        this.work   = await getWorkById(1);
        console.log(this.work)

      } catch (error) {
        console.error('获取作品信息时出错:', error);
      }
    },
    //播放视频 暂停
    isPlayVideo() {
      const video = this.$refs.videoPlayer;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    //更新进度条
    updateProgress() {
       //const video = this.$refs.videoPlayer;
      //this.progressPercentage = (video.currentTime / video.duration) * 100;
    },
    //点击加号后 加号不显示

    //展开
    clickAuthor() {
      console.log("hhhh");
      showToast("展开详细信息");
    },

    hideSpan() {
      // 点击后设置元素不显示
      this.activefollow = !this.activefollow;

      this.followAuthor = !this.followAuthor;
      this.strfollow = this.activefollow ? "取消关注" : "关注";
      console.log(this.followAuthor);

      showToast({
        message: this.strfollow,
        position: "top",
        color: "white",
      });
    },

    //收起子评论
    isPackUpChildComment(number) {
      if (this.expandedCommentId === number) {
        this.expandedCommentId = null;
      } else {
        this.expandedCommentId = number;
      }
    },
    //点击爱心后改变其颜色 '#ff5777'
    changeColor() {
      this.activeLike = !this.activeLike;
      this.activeColor = this.activeLike ? "red" : "#ffffff";

      if (this.activeLike) {
        this.work.likesCount++;
      } else {
        this.work.likesCount--;
      }

      //截取字符串

      if (this.Likes > 9999) {
        this.Likes = this.Likes / 10000 + "万";
      }
    },
    //评论区爱心
    changeCommentColor(number) {
      //number 为评论的id
      this.likes[number] = !this.likes[number];
      var i = 0;

      //点赞向后端发送新增喜欢评论请求
      if (this.likes[number]) {
        for (i = 0; i < this.commentAnswers.length; i++) {
          if (number == this.commentAnswers[i].id) {
            this.commentAnswers[i].likesCount++;
          }
        }

       const response =  axios.get(
          "http://localhost:8085/api/comment/updateLikeCount",
          {
            params: {
              commentId: number,
              userId: this.userId,
              workId: 1,
            },
          }
        
        );
       console.log(response.data  + '点赞评论' + this.userId);
          
        console.log("点赞");
        //取消点赞向后端发送删除喜欢评论请求
      } else {
        for (i = 0; i < this.commentAnswers.length; i++) {
          if (number == this.commentAnswers[i].id) {
            this.commentAnswers[i].likesCount--;
          }
        }
        
       const response =  axios.get(
          "http://localhost:8085/api/comment/cancelLikeComment",
          {
            params: {
              commentId: number,
              userId: this.userId,
          
            },
          }
        
        );
        console.log(response);
        console.log("取消点赞");
      }
      console.log(number);
    },


    //改变子评论爱心颜色
    changeChildCommentColor(id){

           this.childLikes[id] = ! this.childLikes[id];
           var i;
           console.log("+-----"+this.childLikes[id])
            //点赞向后端发送新增喜欢评论请求
      if (this.childLikes[id]) {
        for (i = 0; i < this.childComments.length; i++) {
          if (id == this.childComments[i].id) {

            this.childComments[i].likeCount++;
          }
        }
      }else{
         for (i = 0; i < this.childComments.length; i++) {
          if (id == this.childComments[i].id) {

            this.childComments[i].likeCount--;
          }
        }
      }

    },
  
    dislickEmote() {
      showToast("不喜欢该表情");
    },
    collectEmote() {
      showToast("已收藏该表情");
    },

    //请求评论的接口
    loadComments() {
      axios
        .get('http://localhost:8085/api/comment/selectByWorkId?workId=1')
        .then((response) => {
          // 假设后端返回的数据中评论数据存储在一个名为 data 的数组中

          //  const arr = []
          //  arr = response.data;
          console.log('请求评论：'+response.data);
          //存放用户喜欢评论状态的数组
          let arr = new Array(response.data.length).fill(false);

          //获取评论总数
          this.value2 = response.data.length;
          //将时间进行简化 便于用户识别
          for (var i = 0; i < this.value2; i++) {
            response.data[i].createdAt = timeAgo(response.data[i].createdAt);
            //找到用户喜欢的评论id
            if (response.data[i].isLike) {
              arr[response.data[i].id] = true;
            }
          }
          console.log(arr);
          this.likes = arr;
          this.commentAnswers = response.data;
           
          //加载完成
            // loading.value = true;
            this.finished = true;
            this.current = this.value2;
          
        })
        .catch((error) => {
          console.log(error);
        });
    },

   

    //分页查询评论数据的函数 page,size,workId v await
   async   fetchComments(page, size, workId) {
     try {
         // 检查是否正在加载，如果是，则直接返回 避免重复加载。。。
      if (this.isLoading) return;

      // 设置正在加载的标志
      this.isLoading = true;
          console.log("发送请求前curren的值"+ page);
           //发送异步请求
        const response =  await axios.get(
          "http://localhost:8085/api/comment/selectPageByWorkId",
          {
            params: {
              current: page,
              size: size,
              // 暂时写死
              workId:1,
            },
          }
        
        );
         //获取评论总个数
         this.value2 = response.data.total    
        
        // //存放用户喜欢评论状态的数组
        let arr = new Array(response.data.records.length).fill(false);
            
        
        this.likes = arr;
        
        //将时间进行简化 便于用户识别
        for (var i = 0; i <response.data.records.length; i++) {
           response.data.records[i].createdAt = timeAgo(
           response.data.records[i].createdAt
          );
         
        }
        
       //如果已经完成加载，则不再继续拼接
       if (this.finished) return;

       this.current+=3;
       //拼接数据
       this.commentAnswers = this.commentAnswers.concat(response.data.records);
        
      
      
        for(i=0;i<this.commentAnswers.length;i++) {
        
           //找到用户喜欢的评论id
          if (this.commentAnswers[i].isLike) {
            arr[this.commentAnswers[i].id] = true;
          }
        }
       // 如果没有更多数据，设置finished为true  
        if (response.data.records.length < this.size) {
        
          this.finished = true; 
          return;
        }
        // 重置正在加载的标志
        this.isLoading = false;

        // 处理响应数据
      } catch (error) {
        // 处理错误
        console.error(error);
      }
    },

     

    //点击收藏
    changeColorStar() {
      this.activeStar = !this.activeStar;

      this.activeColorStar = this.activeStar ? "#ffde0a" : "#ffffff";
      if (this.activeStar) {

        this.work.collection++;
      } else {
         this.work.collection--;
      }
    },
    /*搜索 */
    onSearch() {
      // 在这里编写你的显示函数逻辑
      this.$router.push("/search");
    },

    /*播放视频 */
    // isPlayVideo(){

    // },

    /*切换到搜索界面 */
    onAdd() {
      const routePath = "/scan";
      this.$router.push(routePath);
    },
    addPicture() {
      axios
        .get("http://localhost:8085/api/user/selectAllUsers")
        .then((response) => {
          // 处理成功的响应
          console.log("cccc");
        })
        .catch((error) => {
          console.log("服务器未启动");
          // 处理错误的响应
        });
    },

    //提交评论
    submitComment() {
      // 使用axios发送POST请求，传递评论对象
      this.submitParensComment.userId =  this.userId

      this.submitParensComment.location = JSON.parse(localStorage.getItem('user')).location
      axios
        .post(
          "http://localhost:8085/api/comment/addComment",
          this.submitParensComment
        )
        .then((response) => {

          //存在啊问题
          this.loadComments();
          this.fetchComments(this.current, this.size, this.workId);
       
          console.log("评论已成功提交：", response.data);
          //清空输入框的内容
          this.submitParensComment.content = '';
          //发布成功收起pup
          this.showSubmit = !this.showSubmit;
        })
        .catch((error) => {
          console.error("提交评论时出错：", error);
        });
    },

    //展开子评论区吗
    isShowAnswerAreaComment(number) {
      // this.isShowAnswerComment = !this.isShowAnswerComment;
      if (this.expandedCommentId === number) {
        this.expandedCommentId = null;
      } else {
        this.expandedCommentId = number;
      }
      //将输入的数字转为字符串 用于拼接到链接中用于后端请求
      let encodedNumber = encodeURIComponent(number.toString());
      console.log(encodedNumber);
      let url = `http://localhost:8085/api/childComment/selectChildComment/${encodedNumber}`;
      axios.get(url).then((response) => {
        console.log(response.data);
        this.childComments = response.data;

        this.childCount = response.data.length;
        //将时间进行简化 便于用户识别
        for (var i = 0; i < this.childCount; i++) {
          response.data[i].createdAt = timeAgo(response.data[i].createdAt);
        }

        this.childComments = response.data;
      });

      console.log(this.isShowAnswerComment);
    },
    //删除评论

    deleteComment(commentUserId,index){
      const appUserId =  localStorage.getItem('user_id')
      if(appUserId!=commentUserId){

        showConfirmDialog({
          title: '举报该评论',

        })
            .then(async () => {
              try {
                // 调用删除评论的函数
                // const result = await deleteCommentById(index);
                if (1) {
                  // 显示删除成功的提示
                  showSuccessToast('举报成功');
                  console.log('举报成功');

                }

              } catch (error) {
                console.error('举报评论时出错:', error);
              }
            })
            .catch(() => {
              // 用户点击取消时的处理逻辑，这里可以不做任何操作，或者显示提示信息
              console.log('用户取消了举报操作');
            });
        return
      }
      // 显示确认对话框
      showConfirmDialog({
        title: '删除该评论',

      })
          .then(async () => {
            try {
              // 调用删除评论的函数
              const result = await deleteCommentById(index);
              if (result) {
                // 显示删除成功的提示
                showSuccessToast('删除成功');
                // 调用加载评论的函数
                this.loadComments();
              }
              console.log('删除的id', result);
            } catch (error) {
              console.error('删除评论时出错:', error);
            }
          })
          .catch(() => {
            // 用户点击取消时的处理逻辑，这里可以不做任何操作，或者显示提示信息
            console.log('用户取消了删除操作');
          });


    },

    //删除的长按事件
    onMouseDown(e,userId,id) {
      if (e.button!== 0) {
        return;
      }
      this.startPress(userId,id);
    },
    onTouchStart(userId,id) {
      this.startPress(userId,id);
    },
    startPress(userId,id) {
      this.pressTimer = setTimeout(() => {
        this.deleteComment(userId,id);
      }, 500);
    },
    onMouseUp() {
      this.cancelPress();
    },
    onMouseOut() {
      this.cancelPress();
    },
    onTouchEnd() {
      this.cancelPress();
    },
    onTouchCancel() {
      this.cancelPress();
    },
    cancelPress() {
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
    },
    onLongPress() {
      console.log('长按事件触发');
    },

  },






  //setup
  setup() {

    //是否展开
    const showAuthor = ref(false);
    const showAuthorPopup = () => {
      showAuthor.value = true;
    };
    const closeAuthorPopup = () =>{
      showAuthor.value = false;
    };
    
    //首页作者信息
    const text =
      "vvvvv";

    //评论弹框

    const comments =
      "海：🤡迟早要上班哈哈哈哈哈哈哈哈哈哈哈红红火火恍恍惚惚 😢 😁";
    const textChildren =
      "🚗之前在南京排队买盒饭，前面有一个小姐姐在吃鸭头，看着特别香，然后问她在哪里买的，她只接拿一个大鸭头让我闻闻。。。😁";
    const showComments = ref(false);
    /*请求后端评论数据 */

    const onClickOverlay = () => {
      showToast("打开评论区");
    };
    const onClickCloseIcon = () => {
      showToast("关闭评论区");
    };

    /*发送评论输入框 */
    const showSubmit = ref(false);
    const showSubmitCommentPopup = () => {
      showSubmit.value = !showSubmit.value;
    };

    //分享弹框
    const showShare = ref(false);
    const options = [
      [
        { name: "微信", icon: "wechat" },
        { name: "朋友圈", icon: "wechat-moments" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" },
       
      ],
      [
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
        { name: "小程序码", icon: "weapp-qrcode" },
      ],
    ];

    const onSelect = (option) => {
      showToast(option.name);
      showShare.value = false;
    };

    //评论数据
    const list = ref([]);

    /*原本为false */
    const loadingChild = ref(false);
    const finishedChild = ref(false);

    const onLoad = () => {
      // 异步更新数据

      //       axios.get('http://localhost:8085/api/comment/selectByWorkId?workId=1')
      // .then(response => {
      //     // 假设后端返回的数据中评论数据存储在一个名为 data 的数组中

      //     //  const arr = []
      //     //  arr = response.data;
      //      console.log(response.data);
      //      list = response.data;
      //      loading.value = true;
      //      finished.value = true;
      //     //  const  commentArr = [];
      //     //  for(var i = 0; i < res.length; i++){
      //     //         commentArr.push(res[i]);
      //     //  }
      //     //  console.log(commentArr)
      //     //  list = commentArr;
      //     // list = arr;
      //      console.log(list)
      //   })
      // .catch(error => {
      //     console.log(error);
      //   });
      //    console.log('hhhhh')

      //  setTimeout 仅做示例，真实场景中一般为 ajax 请求

      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loadingChild.value = false;

        // 数据全部加载完成
        if (list.value.length >= 4) {
          finishedChild.value = true;
        }
      }, 1000);
    };

    // gotoDeleteComment

  

    return {
      // //视频
      // isPlayVideo,
      // isPlay,

      //作者信息
      text,
      //评论
      comments,
      textChildren,
      //展开
      showAuthorPopup,
      closeAuthorPopup,
      showAuthor,

      //评论
      showComments,
      onClickOverlay,
      onClickCloseIcon,

      //评论数据
      list,
      onLoad,
      loadingChild,
      finishedChild,

      //分享给好友
      options,
      onSelect,
      showShare,
      //是否弹出发布评论的pup
      showSubmitCommentPopup,
      showSubmit,
      //分页
      // current: 1,
      // size: 3,
      // workId: 1,
      // loading: false,
      // finished: false,

      //删除评论

    };
  },
};
</script>