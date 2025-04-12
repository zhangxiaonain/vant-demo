<template>
<!-- 视频播放组件 根据推荐界面传递的workId -->
<!-- autoplay -->
<div id ="app1" class="outbox" > 
  <div class="video-player" @click="stopVideo" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <!-- 新增覆盖层 -->
    
     <div class="video-overlay">
      <!-- 用户信息展示-->
            <userInfo-shows id = "user-info" :workId="workId"  />
    </div> 
      <!-- topbar -->
      <div class = "topBar"   @click="handleTopBarClick" >
        <van-tabs v-if = "!isTransformed"
         class = "vanTabs"
         v-model="active"  
         swipeable line-height=3
         title-active-color = "white"
         title-inactive-color = "#f0dada"
         color = "white"
         background = "transparent"
        >
            <van-tab  title="推荐"></van-tab>
             <van-tab title="关注"></van-tab>
             <van-tab title="同城"></van-tab>
             <van-tab title="商城"></van-tab>
         
        </van-tabs>
        <!-- 搜索图标 -->
        <div class="searchIconBox"  @click="handleTopBarClick" >
          <van-icon @click="handleSearchIconClick" calss = "searchIcon" color = "white" size = 23px name="search" />
       </div>
      </div>
      
      <!-- 第二个topbar点击评论图标后出现 -->
    
      <!-- 暂停图标 -->
      <div class="stopIcon"  v-if="isPaused" >
        <van-icon name="play-circle-o" />
      </div>
    <!-- autoplay  autoplay loop  -->
     <video    ref="video" :class="{ 'transformed': isTransformed }" :width="videoWidth" :height="videoHeight" :src="currentVideoSrc" @canplaythrough="handleCanPlayThrough">

    </video>
     
  </div>
 
  
</div>
</template>

<script>
import  userWorkShow from '../components/userComponents/userWorkShow.vue'; // 确保路径正确
import { mapMutations, mapState } from 'vuex';

export default {
  props: {
    rcomVideos: {
      type: Array,
      required: true
    },
    userId:{
      type: [String, Number],
      required: true
    }
  },
  
  // 引入用户信息展示组件
   components: {
   
   'userInfo-shows':userWorkShow
  },
   //计算属性
 
  
  data() {
    return {
      videos: [
      
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://sky-zwx.oss-cn-beijing.aliyuncs.com/d53bb647-7db5-43f1-ab68-712546bd707c.mp4',
        'https://sky-zwx.oss-cn-beijing.aliyuncs.com/286f40d9-8083-4e99-acd5-30cbe5b19309.mp4',
        'https://sky-zwx.oss-cn-beijing.aliyuncs.com/716ee973-8157-41c4-a6a1-26aec282e513.mp4'
        // 添加更多视频链接
      ],
      currentIndex: 0,
      startY: 0,
      threshold: 30,
      isAnimating: false, // 用于控制动画状态
      isPlaying: false,
      isPaused :false,   //用于控制暂停图标是否显示
      touchMoveDistance: 0, // 记录滑动距离
      // topbar
      active: 3,
      //作品iD 需要传给用户信息展示组件，以便展示数据
      workId: 0,
      //视频的宽高
      
    };
  },
  // 计算视频的URl
  computed: {
    ...mapState(['videoWidth', 'videoHeight','isTransformed']),
    currentVideoSrc() {
      return this.videos[this.currentIndex];
    },
    
  },
   mounted() {
    
    // 在这里可以对接收的 videos 数据进行处理，例如加载视频等操作
    console.log(this.rcomVideos);
    console.log(this.userId)

    //改变视频宽高
     // 监听事件
   
  },

 

  methods: {
      // 暂停还是播放视频
    stopVideo(){
        if(this.isPlaying==false){
          //暂停
            console.warn("Stop video")
            this.$refs.video.pause();
            this.isPaused = true;
            this.isPlaying = true;
        }else{
          ///再次点击播放
          console.warn("Play video")
            this.$refs.video.play();
            this.isPlaying = false;
            this.isPaused = false;
        }
      
      
  },
  
     handleCanPlayThrough() {
    // this.$refs.video.play();
  },
  //  触摸开始
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
       this.touchMoveDistance = 0; // 重置滑动距离
    },
    //手指移动
    handleTouchMove(event) {

      // 可以在这里处理滑动效果，如显示滑动条等
    
    },
    handleTouchEnd(event) {
    const endY = event.changedTouches[0].clientY;
     const distance = endY - this.startY;

     console.log("this distance :"+distance)
      if (Math.abs(distance)  > this.threshold) {
        
        if (distance < 0) {
          //下滑
          console.log("shuju"+this.touchMoveDistance)
           setTimeout(() => {
                   this.nextVideo();
                   this.startY = 0;
                   console.log("startY == " + this.touchMoveDistance);
                   console.log("thisis llll:" + this.videos.length)
                    if( this.workId!=this.videos.length-1) {
                             this.workId++;
                   }
                   
    }, 500); // 500毫秒的延迟 
                
          
        } else {
            setTimeout(() => {
                   this.prevVideo();
                   this.startY = 0;
                   //更新作品id
                   if( this.workId!=0) {
                           this.workId--;
                   }
                    
                   
    }, 500)
        //  this.prevVideo();    
          
        //    this.startY = 0;
         
        }
      } else {
        this.resetPosition();
      }



      
     
    },
    
    nextVideo() {
      if (this.currentIndex < this.videos.length - 1) {
        this.currentIndex++;
        this.isPaused = false;
        this.updateVideo();
      }
    },
    // 上一个视频
    prevVideo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.isPaused = false;
        this.updateVideo();
      }
    },
    updateVideo() {
      const videoElement = this.$refs.video;
      videoElement.load(); // 重新加载视频
       this.isPaused = false;
      videoElement.play()  .then(() => {
          // 视频播放成功时的逻辑（可选）
         console.log("开始新的内容")
        })
      .catch((error) => {
         
          console.error('播放视频时出错:', error);
          // 可以在这里添加更复杂的错误处理逻辑，例如：
          // 1. 显示错误提示给用户
          // 2. 尝试重新播放视频（可能需要设置一定的重试次数和延迟）
          // 3. 检查网络状态，根据情况调整播放策略
        });// 自动播放视频
    },
    resetPosition() {
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 4000); // 动画持续时间为300ms
    },
    //保存currentIndex

     handleTopBarClick(event){
      console.log("点击了topbar")
         event.stopPropagation();// 阻止事件冒泡
    },

    // 搜索图标路由跳转 /search
    handleSearchIconClick(){
          console.log("点击了search")
          this.$router.push('/search');
    },
   
   
   
  },

};
</script>


<style scoped>
/* 最底层盒子 */
.outbox{

  background-color: rgb(0, 0, 0);
}
/* 用于存用户数据 */
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 92%;
 /* background-color: rgba(193, 38, 38, 0.3); /*覆盖层的背景颜色，可根据需求调整*/
 /* pointer-events: none; /* 允许事件穿透
  z-index: 2; /* 确保覆盖层在视频上方，可根据实际布局调整 z-index 值 */
  /*z-index: 2; 为2会影响下方的路由切换*/
  z-index: 2;
}
.video-player {
  width: 100%;
  height: 89vh; /* 全屏高度 */
  display: flex;
  

  /* justify-content: center; 
   align-items: center; */
 
  /* background-color: rgb(182, 100, 100); */
  transition: transform 0.9s ease-out; /* 添加平滑过渡效果 */
}
.video-player.animating {
  transform: translateY(0); /* 恢复到原位置 */
}
video {
  z-index: 0;
  transition: all 0.3s ease; /* 添加过渡效果，让变化更平滑 */
     width: 100%;
     height: 100%;
     object-fit: contain;
     /* max-width: 100%;
     max-height: 100%;
     object-fit: contain; */

}
/* 点击后应用的样式 */
video.transformed {
  width: 100%; /* 点击后设置新的宽度 */
  height: 45%; /* 点击后设置新的高度 */
  /* background-color: aqua; */
  margin-top: 10px; /* 点击后改变视频的位置，这里通过添加顶部外边距 */
 /* margin-left: 20px; /* 点击后改变视频的位置，这里通过添加左边外边距 */
}

.topBar{
  position: absolute;
  /*display: flex;*/
  align-items: center; /* 垂直居中对齐 */
  /*justify-content: space-between; /* 让 vant-tabs 和 van-icon 分别在左右两端 */
  top: 0;
  left: 0;
  width: 100%;
  height: 35px;
  z-index: 8;
  /* background-color: aqua; */
}
.searchIconBox{
  
  /* background-color:salmon; */
  position: absolute;
  right:10px;
  top: 1px;
  text-align: center;
  padding-top: 10px;
  width: 70px;
  height: 31px;
  /* background-color: rgb(0, 0, 0); */
}
/* 覆盖 van-tabs 的背景颜色 */
/* 使用后代选择器选中 van-tabs 内部的导航栏 */

.searchIcon{
   

}
.vanTabs{
  display: inline-block;
  width: 320px;
  height: 45px;

}

/* 暂停图标 */
.stopIcon{
  position: absolute;
  width: 40%;
  height: 40px;
  top: 45%;
  left:30%;
  text-align: center;
  font-size: 45px;
  z-index: 1;
  color: #e9dbdb;
  /* background-color: aqua; */
}
</style>
