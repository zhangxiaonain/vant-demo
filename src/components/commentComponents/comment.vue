<template>
   <div class="commentContainer">
        <!-- 点击评论图标 -->
    
     <div id="recommentTopCell">
       
        <span class="weSearch">大家都在搜 :</span>
  
        <a href="http://jd.com" id="recommendRearch" >张正浩的小时候</a>
       
        <span> <van-icon name="search" value="..." size=17  class="search-icon" /></span>
        <span class="closeComment" @click="closeCommentArea"><van-icon name="cross" value="..." size=18  /></span>
      </div>
       <!-- 评论具体内容 -->
 
      <div class="commentContent">
       <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
          @load="onLoad"
>
  <van-cell
  class="cell"
    v-for="item in list"
    :key="item"
 
   >   
     <div class="userImg">
              <!-- 评论用户头像 -->
              <img src="https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg" id="commentAuthorPicture" />
     </div>
     <div class = "contentParent"> 
       <!--用户昵称 -->
            <span class = "commentAuthorName" >张三</span>
             <!-- 评论具体内容 -->
            <van-text-ellipsis
              id="commentDetiles"
              rows="2"
              :content="comment"
              expand-text="展开"
              collapse-text="收起"
            />

            <!-- 表情包 -->
            <img v-if="true" @click="showImgPopup"  src="https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg"/>

             <div id="commentBottom">
              <!--  {{ comment.createdAt }} * {{ comment.location }} -->
              <span id="commentTime">
                一天前 * 深圳</span
              >
              <span id="commentAnswer"  >回复</span>
              <!-- 评论区爱心 -->
              <!-- getHeartIconName(comment.id) -->
              <!--   :color="getHeartIconName(comment.id)" -->
              <van-icon
                :class="{ 'red-heart': 1 }"
                @click="changeCommentColor(1)"
                id="commentLikeIcon"
                name="like"
                >
                255
              </van-icon></div>
              <!-- 展开回复 -->
               <span
              id="isShowCommentAnswersArea"
              v-if="true"
              v-bind="childCount"
              @click="isShowAnswerAreaComment()"
              >— &nbsp;展开2300条回复
              <van-icon name="arrow-down" />
            </span>
             <!-- 回复 -->
            <div id="commentAnswers" v-if="expandedCommentId">
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
                    <span id="commentAuthorPictureChild" />
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

          </div>
    </van-cell>
  
</van-list>
       
  
      </div> 
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
             
   <!-- 以上是评论具体内容 -->

      <!-- 评论输入框 -->
    
<van-popup
  class = "isShowImg"
   v-model:show="isShowImgPup"
   overlay
   closeable
  position="bottom"
  
> <img src="https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg" /></van-popup>
   
</div>

    
</template>

<style scoped>

.commentContainer{
  
  width: 100%;
  height: 100%;
  z-index: 0;
  /* background-color:rgb(217, 217, 217); */
}


/* 存放评论的具体内容 */
.commentContent{
  
  position:absolute;
  width: 100%;
  top: 33px;
  height:83%;
  /* height: 30px; */
  overflow-y: auto;
  background-color:#dfdede;
  color: #000;
  z-index: 2;
  
}
/* 评论用户头像的父盒子 */
.userImg{
  float: left;
  width: 42px;
  /* background-color:#0256fe */
}
/* 评论内容的父盒子 */
.contentParent{
  /* margin-left: 3px; */
  float:right;
  text-align: left;
  display:block;
  width: 85%;
  /* background-color:#b1bed9 */
}

/* 评论区 */

#recommentTopCell {
  z-index:10;
  position: fixed;
  width: 100%;    
  height: 32px;
  background-color: #ffffff;
  color: #a0a0a0;
  font-size: 16px;
  
 
}
/* 关闭评论图标 */
.closeComment{
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 10;
}
/* 大家都在搜 */
.weSearch{
    font-size: 15px;
    font: bold;
    margin-top:10px;
    margin-left: 5px;
    height: 30px;
    text-align: center;
    z-index: 10;
}
.search-icon{
  color: #0256fe;
}
#recommendRearch {
 
  /* background-color: red; */
  display:inline-block;
  text-align: center;
  margin-top: 10px;
  margin-left: 4px;
  font-size: 15px;
  color: #0256fe;
  z-index: 10;
}

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
#commentAuthorPicture {
  position: relative;
  text-align: center;
  /* margin-top: 5px; */
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  
  /* background-color: rgb(219, 79, 79); */
}
/*评论作者名称 */
.commentAuthorName {
 
  height: 20px;
  display:block;
  text-align: left;
  margin-top: 3px;
  /* background-color: #0256fe; */
  /* color: #d2cccc; */
  font: 15px;
  /* background-color: #053ae7; */
}
/* 评论图片 */
.isShowImg{
  z-index: 100;
  height: 80%;
  background-color: rgb(0, 0, 0);
}
/* 放大后的图片 */
.isShowImg img{
  position:absolute;;
  top:40px;
  width: 100%;
  height: 70%;
}
/*回复 */
#commentAnswer {
  position:absolute;
  margin-top: 3px;
  margin-left: 110px;
  /* background-color: #929292; */
}

/*评论喜欢图标 */
#commentLikeIcon {
  position: absolute;
  font: 15px;
  text-align: center;
  margin-top: 6px;
  margin-left: 240px;
  /* background-color: #053ae7; */
}

/*放置评论的回复盒子 */
#commentAnswers {
  display: flex;
  margin-left: 30px;
  /* background-color: #999daa; */
  /* height: 100px; */
  width: 100%;
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
  font: 14px;
  /* margin-left: 1px; */
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
  margin-top: 10px;
  font-size: 15px;
  border: none;
  width: 95%;
  background-color: #f6f5f5;
  border-radius: 15px;
  height: 33px;
}

/*评论图片 */
.contentParent img {
  
  border-radius: 3px;
  /* width: 118px; */
  height: 100px;
  /* background-color: #053ae7; */
 
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
  height: 40px;
  margin-top: 3px;
  /* margin-left: 10px; */
  position: relative;
  display: flex;
  
  color: #afafaf;
  /* background-color: #e3e3e6; */
}

/*时间和位置 */
#commentTime {
  position: absolute;
  margin-top: 2px;
  /* margin-left: 40px; */
  /* background-color:#053ae7; */
}
/*commentDetiles" */
#commentDetiles {
  /* margin-left: 30px; */
  width: 80%;
  text-align: left;
  color: #000;
  font-weight: 540;
  margin-top: 2px;
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

</style>

<script>
import { TextEllipsis } from 'vant';


import { mapState,mapMutations } from 'vuex';

export default {
 components: {
    'van-text-ellipsis': TextEllipsis
  },
  //数据

   data() {
    return {
      list: [],
      loading: false,
      finished: false,
      show: true,
      images:"https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg",
      comment:"哈哈哈哈哈红红火火恍恍 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
      isShowImgPup :false,
    };
  },

  methods: {
    //点击关闭图标
     ...mapMutations(['toggleRightIcons','setIsTransformed','showCommentArea']),
    closeCommentArea(){
      this.toggleRightIcons(true)
      this.setIsTransformed(false);
      this.showCommentArea(false); 
      console.log("关闭了评论区")
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 9) {
          this.finished = true;
        }
      }, 10);
    },
    // 放大图片的pup
    showImgPopup(){
      this.isShowImgPup = !this.isShowImgPup;
      console.log("ids" +this.isShowImgPup)

    },
  }
  
}
</script>