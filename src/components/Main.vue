<template>
  <div class="yd">
    <!-- <van-button type="info" style="height: 2.5rem" id = "onSearch" @click="onSearch" -->
    <!-- 搜索框 -->
    <!-- <van-search
      v-model="ydsearchvalue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <van-button
          type="info"
          style="height: 2.5rem"
          id="onSearch"
          @click="onSearch"
          >搜索</van-button
        >
      </template>
    </van-search> -->
    <!-- 列表 -->
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="ydloading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in ydnoticeinfoList"
          :key="item.id"
          :title="item.cotTitle"
        />
      </van-list>
    </van-pull-refresh> -->

    <!-- <van-tabs @change="onTabChange">
      <van-tab title="推荐"> -->
        <!-- <div id="tuijian">jjj</div> -->
      <!-- </van-tab>
      <van-tab title="关注"></van-tab>
      <van-tab title="同城"></van-tab>
      <van-tab title="美食"></van-tab>
    </van-tabs> -->
     <div>
        <div class="recommend-page" ref="scrollContainer">
    <!-- 循环展示 news-vue 视频组件 -->
   
     <!-- <video-paly 
        
      v-for="video in recommendVideos"
      :key="video.id"
      :workIds="video.id"
      :videoUrls="video.url"
     /> -->
      <videoPaly :rcomVideos="recommendVideos" :userId="userId"/>
      
    
  </div>
     
    </div>
    

     
  </div>
</template>
<style scoped>


</style>
       
 

<script>
// import VideoPaly from '../components/VideoPaly.vue';
 //视频组件
import  vpaly from '../components/ShoppingCars.vue'; // 确保路径正确
import axios from 'axios';
export default {
  name: 'App',
  components: {
    videoPaly  :vpaly 
  },


   mounted() {
     console.log('请求推荐视频数据');
      this.queryVideoDataByUserId(); // 在组件挂载时就发起查询请求
  
  
  },
  beforeDestroy() {
    console.log('beforeDestroy - 移除滚动事件监听器');
  
  },
  

  data(){
    return{
      
      userId:1,
      //推荐视频集合
      recommendVideos: [
        { index: 1,workId: 1023, url: 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/286f40d9-8083-4e99-acd5-30cbe5b19309.mp4' },
        { index: 2,workId: 2152, url: 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/716ee973-8157-41c4-a6a1-26aec282e513.mp4' },
        { index: 3,workId: 312,  url:'https://sky-zwx.oss-cn-beijing.aliyuncs.com/d53bb647-7db5-43f1-ab68-712546bd707c.mp4'},
      ]
     
  };
    
  },




  methods: {
    //点击上方的bar切换路由
    onTabChange(index) {
      //定义变量
      var routePath;
      console.log(index);
      switch (index) {
        case 0:
          routePath = "/";
          break;
        case 1:
          routePath = "/follow";
          break;
        case 2:
          routePath = "/cityWide";
          break;
        case 3:
          routePath = "/fineFood";
          break;
      } //switch

      this.$router.push(routePath);
    }, //onTabChange

    //当挂载界面时请求推荐数据
     queryVideoDataByUserId() {
    axios.get() //  `/api/videos?userId=${this.userId}` 这里的 /api/videos 是假设的后端接口地址，根据实际情况替换，通过查询参数传递用户 Id
     .then(response => {
        this.videoArray = response.data; // 将后端返回的数据赋值给 videoArray，假设后端返回的数据格式符合预期，是包含对象的数组
      })
     .catch(error => {
        console.error('查询视频数据出错：', error);
      });
  

 },



  

};







</script>