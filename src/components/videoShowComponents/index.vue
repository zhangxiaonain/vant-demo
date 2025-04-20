<!--相关推荐-->
<script>

import {ref} from 'vue'
import { useRouter } from 'vue-router';

export default {
  setup(){
    const user = ref({
      id: 1
    });
    const router = useRouter();
    const gotoVideoPlayPage = ()=> {

      router.push({ name: 'peoplePage', params: { userId: user.value.id} });
    };


  const relativeVideos = ref([
    {
      imgUrl:'https://picsum.photos/181/139 ',
      userName:'萤火之歌',
      title:'hhhhh',
      userPic:'https://img2.baidu.com/it/u=326994319,3807516276&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      like:3467,
    },
    {
      imgUrl:'https://picsum.photos/181/129',
      userName:'念雪归尘',
      title:'hhhhh',
      userPic:'https://q4.itc.cn/q_70/images03/20240819/7448d51812d147a1b6a29e738466da4d.jpeg ',
      like:2356,
    },
    {
      imgUrl:'https://picsum.photos/161/114',
      userName:'凉栀°',
      title:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      userPic:'https://img0.baidu.com/it/u=3366098735,2840405048&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380 ',
      like:1220,
    },
    {
      imgUrl:'https://picsum.photos/181/144',
      title:'hhhhh',
      userName:'暗夜行者之光',
      userPic:'https://img2.baidu.com/it/u=3802859213,1629250874&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      like:453,
    },
    {
      imgUrl:'https://picsum.photos/189/210',
      title:'你好',
      userName:'沉蒾那修饰の媄',
      userPic:'https://img2.baidu.com/it/u=1328581174,2485085526&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=608',
      like:786,
    },
    {
      imgUrl:'https://picsum.photos/161/166',
      title:'hhhhh',
      userName:'遗忘彼岸',
      userPic:'https://img2.baidu.com/it/u=764799295,4182729913&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
      like:1434,
    },  {
      imgUrl:'https://picsum.photos/186/241',
      title:'hhhhh',
      userName:'↑⑤的阳光',
      userPic:'https://picsum.photos/185/240',
      like:2304,
    },
  ])

  return{
    relativeVideos,
    gotoVideoPlayPage
  }
  },
};


</script>
<template>
    <div class="parent-content">
         <div class="video-content">
          <h4>相关推荐</h4>
           <div class="parent">
          <div class="child" v-for="(relativeVideo,index) in relativeVideos" :key="index" >
                                
                      <img class="VideoImg" :src="relativeVideo.imgUrl" @click="gotoVideoPlayPage">
                      <div class="title">
                           {{ relativeVideo.title }}
                      </div>
                      <div class="icon-box">
                           <div class="box1">
                            <img class="userImg" :src="relativeVideo.userPic"/>
                             <div class="userName-box">{{ relativeVideo.userName }}</div>
                           </div>
                            <div class="box2">
                            
                              <van-icon name="like-o" />
                              {{relativeVideo.like }}
                           
                          </div>
                                        
                      </div>  
                     
                                
                    </div>
                 </div>
                    <!--视频  -->
          </div>
         
        
    </div>
</template>

<style scoped>
.parent-content{
 
  width: 100%;
  margin-top:10px;
  
  margin: 0 auto;
}
.video-content{
 
  /* top: 12px; */
}
.video-content h4{
  margin-left: 5px;
}
.parent{
 
  display: flex;
  gap:3px;
  flex-wrap: wrap;
  font-size: 14px;
  
}
.child{
  border-radius: 10px;
  width:185px;
  margin-bottom: 5px;
  /* background: #e6e6e6; */
  box-shadow: 3px 3px 3px rgba(26, 26, 26, 0.212);
  position: relative;

}
/* 让子元素错落显示 */
.child:nth-child(even) {
    top: 10px;
}

.child:nth-child(odd) {
    top: -10px;
}
.icon-box{
  margin-bottom: 6px;
}
    
.title{
   font-size: 16px;
   font-weight: 500;
   color: #000000;
   padding: 10px;
   white-space: nowrap;/* 让文本不换行 */
   overflow: hidden; /* 隐藏溢出的文本 */
   word-break: break-all; /* 允许在单词内换行 */
   text-overflow: ellipsis; /* 超出部分显示为省略号 */
   max-width: 50ch; /* ch 是字符宽度单位，25ch 约为 25 个字符的宽度 */

}
.userName-box{
  white-space: nowrap;/* 让文本不换行 */
   overflow: hidden; /* 隐藏溢出的文本 */
   word-break: break-all; /* 允许在单词内换行 */
   text-overflow: ellipsis; /* 超出部分显示为省略号 */
   max-width: 10ch; /* ch 是字符宽度单位，25ch 约为 25 个字符的宽度 */
}
.box1{
  display: flex;
  gap: 8px;
  margin-left: 3px;
  justify-content: center;
  align-items: center;
}
.box2{
  gap: 8px;
  margin-right: 3px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  /* //background: #fc7a7a; */
}


.VideoImg{
  border-radius: 10px 10px 0px 0px;
  width: 185px;
  height: 240px;
}
.userImg{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dab0b0;
}
.icon-box{
  display: flex;
  justify-content: space-between;
}

</style>