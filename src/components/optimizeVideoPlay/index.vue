<script setup>
import { ref, onMounted } from 'vue';



import userInfo from "@/components/optimizeVideoPlay/userInfo.vue";



const videoList = ref([
 
  {id:1, userName:'张三', src: 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/d53bb647-7db5-43f1-ab68-712546bd707c.mp4' },
  {id:2, userName:'李四',src: 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/286f40d9-8083-4e99-acd5-30cbe5b19309.mp4' },
  {id:3,userName:'王五',src: 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/716ee973-8157-41c4-a6a1-26aec282e513.mp4'}
]);

const videoRefs = ref([]);
const currentIndex = ref(0);
// 播放状态
const playStates = ref({});

// 是否显示用户info
const  showUserInfo = ref(true);
// 触摸事件
const   touchTimers= ref({});

// 用于标记 userInfo 是否是因为触摸被隐藏的
const wasHiddenByTouch = ref({});
const onSwipeChange = (index) => {
  showUserInfo.value = true;
  // 暂停上一个视频
  if (videoRefs.value[currentIndex.value]) {
    videoRefs.value[currentIndex.value].pause();
  }
  currentIndex.value = index;
  // 播放当前视频
  if (videoRefs.value[index]) {
    videoRefs.value[index].play();
  }
};


const onVideoCanPlay = (index) => {
  if (index === currentIndex.value) {
    videoRefs.value[index].play().catch((error) => {
      console.error('视频播放失败:', error);
    });
  }
  playStates.value = true;
  showUserInfo.value = true;
  wasHiddenByTouch.value = false;
};
// 暂停播放
const togglePlayPause = (index) => {
  const video = videoRefs.value[index];
  if (video) {
    if (playStates.value) {
      video.pause();
      playStates.value = false;
    } else {
      video.play().catch((error) => {
        console.error('视频播放失败:', error);
      });
      playStates.value = true;
    }
  }
};

const onTouchStart = () => {

  touchTimers.value = setTimeout(() => {

    wasHiddenByTouch.value = true;
    showUserInfo.value = false;
  }, 200);
};

const onTouchEnd = () => {
  if (touchTimers.value) {
    clearTimeout(touchTimers.value);
    touchTimers.value = null;
  }
  if (wasHiddenByTouch.value) {
    showUserInfo.value = true;
    wasHiddenByTouch.value = false;
  }
};
onMounted(() => {
  // 自动播放第一个视频
  if (videoRefs.value[0]) {
    videoRefs.value[0].play();

  }


});


</script>

<template>
<div class="container-box">
  <van-swipe
      :touchable="true"

      @change="onSwipeChange"
      class="van-swipe-box"
      :duration="260"
      :show-indicators='false'
      vertical>
    <van-swipe-item
        class="van-swipe-item"
        v-for="(video, index) in videoList" :key="index"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
      <!--  controls  autoplay
          loop      ref="videoRefs[index]"-->
        <video
          :ref="el => videoRefs[index] = el"
          :src="video.src"
          loop
          @canplay="onVideoCanPlay(index)"
          width="100%"
          height="100%"
          @click="togglePlayPause(index)">{{ playStates[index] ? '暂停' : '播放' }}
        >

        </video>
      <div class="userInfo" v-if="showUserInfo " >
<!--           {{video.userName}}-->
<!--        <userInfo/>-->
      </div>

      </van-swipe-item>
  </van-swipe>
</div>
</template>

<style scoped  >

.container-box{
 
  background: rgb(244, 174, 174);
}
:deep(.van-swipe-box){

  height: 100vh;
  background: rgb(158, 158, 158);
}
:deep(.van-swipe-item) {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #000000;


}
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index:0;
  //object-fit: cover;
}
.userInfo{
  width:100% ;
  //background: #000;
  z-index: 2;
  position: absolute;
  color: #e05050;
  font-size: 16px;
}

</style>