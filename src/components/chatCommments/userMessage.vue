<template>
<div class="parent-box">
    <!-- topbar -->
    <div class="tobBar">
<van-nav-bar
  title="消息"
  fixed=true
   left-arrow
   class="custom-navbar"
  @click-left="onClickLeft"
>
  <template #right>
    <van-icon  name="search" size="20" style="color: #000;" />
  </template>

</van-nav-bar> 
 </div> 
   <div class="fast-message" >  </div>
      <!-- 新关注我的 -->
      <div class="new-follow-me">
       
        <div class="follomImg"><img src="https://img1.baidu.com/it/u=1578350400,859864527&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500" class="new-follow-me-img" /></div> 
       
         <div class="new-follow-me-text">
             <span class="follow-text">新关注我的</span>
             <span class="latest-message-time">周六</span>
             <span class="follow-content">内容</span>
         </div>
      </div>

      <!-- 互动消息 -->
      <div class="new-follow-me" >
        <div class="follomImg"> <img src="https://img0.baidu.com/it/u=2705597246,2913057507&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"  class="new-follow-me-img"/></div>
       
        <div class="new-follow-me-text">
             <span class="follow-text">互动消息</span>
             <span class="latest-message-time">周六</span>
             <span class="follow-content">内容</span>
         </div>
      </div>
     <!-- 用户聊天对象 -->
     <div calss="user-chat">
  <van-swipe-cell  
   v-for="(message, index) in messages"
   :key="index"
    >
 <div class="new-follow-me" @click="clickUserMessage(message,sendUserId)" >
        <div class="follomImg">
             <img :src=message.url  class="new-follow-me-img"/>
    
             </div>
       
        <div class="new-follow-me-text">
             <span class="follow-text">{{message.userName}}</span>
             <span class="latest-message-time">{{message.lastTime}}</span>
             <span class="follow-content">{{message.content}}</span>
               <span class="unreadCount" v-if="message.unreadCount" >
      <van-badge :content="message.unreadCount">
      
      </van-badge>
      </span>
            
         </div>
      </div>
 
  <template #right>
    <van-button square type="danger" text="删除" />
    <van-button square type="primary" text="隐藏" />
  </template>


         
</van-swipe-cell>    
     </div>
     <!-- 没有更多了 -->
      <div class="no-more-available">
       
        <span>暂时没有更多了</span>
     </div>
</div>
<!-- 用户聊天界面 -->
    
   
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
  import { ref} from  'vue';

  //用户id
  const sendUserId  = ref(123);
  const receivedId =ref(null);
  // 定义存储消息的响应式数组
  const messages = ref([
    {id:1,
     url:'https://img0.baidu.com/it/u=3354087818,251408951&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
     userName:'不吃香菜',
     userId:5,
     content:"没有哇",
     lastTime:'2/13',
     unreadCount:0,
    },
 
    {id:3,
     url:'https://img0.baidu.com/it/u=3196617431,1263013381&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
     userName:'南梦',
     userId:4,
     content:"你在干嘛",
     lastTime:'周五',
     unreadCount:10,
    },
      {id:4,
     url:'https://img2.baidu.com/it/u=1843699844,2479772115&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
     userName:'周兵',
     userId:6,
     content:"完成了",
     lastTime:'周五',
     unreadCount:3,
    },
      {id:4,
     url:'https://img0.baidu.com/it/u=458707189,148537293&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
     userName:'岗',
     userId:9,
     content:"哈哈哈哈",
     lastTime:'周三',
     unreadCount:3,
    },  {id:4,
     url:'https://img1.baidu.com/it/u=58139210,3861359502&fm=253&fmt=auto&app=120&f=JPEG?w=510&h=500',
     userName:'明日香',
     userId:10,
     content:"我的相册",
     lastTime:'周五',
     unreadCount:3,
    },  {id:4,
     url:'https://img.rongyuejiaoyu.com/uploads/20240728/02511242750.jpeg',
     userName:'庚寅年',
     userId:18,
     content:"哈哈哈😃",
     lastTime:'周五',
     unreadCount:3,
    }
  ]);

// 定义未读消息数量
const unreadCount = ref(); // 这里可根据实际情况修改未读消息数量
  // 点击单元格的处理函数
const clickUserMessage = (message,senderUserId) => {
 
  console.log(senderUserId)
  // router.push(`/detailChat/${sendUserId.value}/${receivedId.value}`)
  router.push({
      path :'/detailChat',
      query : {
      senderUserId:senderUserId ,
      receivedUser: JSON.stringify(message),
    }
  }
  )
  
  message.unreadCount = 0;

};


</script>


<style scoped>
/* 可以添加一些样式 */
.parent-box{
    
    width: 100%;
    height: 500px;
    /* background-color: azure; */
    
}
/*tobar盒子 */
.tobBar{
    /* background-color: aquamarine; */
}
/**new-follow-me */

.fast-message{
    width: 100%;
    height: 50px;

}
/**未读数据 */
.unreadCount{
    display: inline-block;
    position:absolute;
    right: 28px;
    top: 35px;
    width: 20px;
    height: 20px;
    /* background-color: aqua; */

}
.new-follow-me{
   z-index: 10;
    margin-top: 1px;
    width: 100%;
    height:70px;
  
    /* background-color: antiquewhite; */
}
.follomImg{
    float: left;
    width: 72px;
   
    /* background-color: rgb(237, 142, 19); */

}
.new-follow-me-img{
    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-top: 2px;
    border-radius: 50%;
    /* background-color: aquamarine; */
}
.new-follow-me-text{
    position: absolute;
    float: left;
    width: 79%;
    height: 60px;
    margin-top: 3px;
    margin-left: 78px;
    border-bottom: 1px solid  rgb(216, 214, 214);
    /* margin-top: 100px; */
    /* background-color: rgb(160, 236, 236); */
} 
.follow-text{
    display: inline-block;
    /* position: absolute; */
    width:85%;
    height: 30px;
    text-align: left;;
    color: #000;
    font-size: 17px;
    font-weight: 560;
    /* background-color: #f34343; */

}
.latest-message-time{
    display: inline-block;
    
    width: 15%;
    height: 25px;
    font-size: 14px;
    /* background-color: aqua; */
    color: rgb(209, 207, 207);

}

/* 暂时没有更多 */
.no-more-available{
 
    position: relative;
    width: 100%;
    height: 120px;
    /* background-color: aqua; */
}
.no-more-available span{
    display: inline-block;
    position: absolute;
    width: 50%;
    height: 50px;
    margin-left: 28%;
    margin-top: 30px;
    text-align: center;
     /* background-color: aquamarine; */

     font-size: 15px;
     color: #c3c2c2;
}
/* 用户消息 */
.user-chat{
    height: 80px;
    width: 100px;
    background-color: rgb(115, 233, 233);
}

.custom-navbar ::v-deep .van-nav-bar__left .van-icon {
  color: #000000 !important; /* 修改箭头颜色 */
  font-size: 20px; /* 可选：修改图标大小 */
}


</style>