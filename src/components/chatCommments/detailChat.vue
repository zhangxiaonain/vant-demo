  <template>
  <div>
    <!-- topBar -->
    <div class="topBar-detailChat">
      <span><van-icon name="arrow-left" size = "26px" /></span>
      <div class="receivedInfo">
        <img :src=receivedUser.userImg />
        <div>{{receivedUser.userName}}</div>
      </div>
      <span><van-icon name="ellipsis" size = "26px" /></span>
      
    
    </div>
    <div class="topBox"> </div>
    <!-- 聊天信息盒子 -->
     <div class="chatMessage"  >
       
        <div v-for="(message, index) in chatMessages" :key="index">

            <span class="chatMessage-time" v-if="message.time">{{message.time}}</span>
            <!-- 接收方 -->
            <div class="receiver" v-if = "message.type === 1 && message.Content">
                <img :src=receivedUser.userImg />
                <span>{{message.Content}}</span>
            </div>
            <!-- 发送方 -->
            <div class="sender" v-if = "message.type === 2 && message.Content">
             
                   <img src="https://img0.baidu.com/it/u=306649616,2230355986&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"  class="userImg"/> 
                   <span class="sender-content">{{message.Content}}</span>
            </div>
        </div>


     </div>
        <!-- 输入框 -->
        <div></div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount,onMounted } from 'vue';
import {  } from 'vant';
import { useRoute } from 'vue-router';

//定义接收者，发送者id 
const route = useRoute();
const senderId = ref(null);
const receiver = ref(null);
const receivedUser = ref({
  
  userName : '',
  receiverId:null,
  userImg:'',

}

)

// 聊天的消息
const chatMessages  = ref([
  {
    time:"12:46",
    UserImg:'',
    Content:'好可怜好可怜',
    type : 1,
     

  },
  {
    time:"12:53",
    UserImg:'',
    Content:'不是吧',
    type : 1, 
    },
    {
       time:"13:01",
       UserImg:'',
       Content:'对啊',
       type : 2, 

    }
    ,
    { 
       time:"13:05",
       UserImg:'',
       Content:'哈哈咖啡开始发货水电费',
       type : 1, 
    },
    {
    time:"",
    UserImg:'',
    Content:'圣诞快乐发都快放假快递费上课的附件康师傅尽快加上快递费上课了福建开放深刻的',
    type : 2, 
    }
])

const inputMessage = ref('');

const messages = ref(['nih','hhhh','ddd']);

const socket = new WebSocket('ws://localhost:8080/chat');

socket.onopen = () => {
  console.log('WebSocket连接已打开');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.receiverId === '当前用户 ID') { // 这里需要替换为实际的当前用户 ID
    messages.value.push({ content: data.content, type: 'received' });
  }
};

socket.onclose = () => {
  console.log('WebSocket连接已关闭');
};

const sendMessage = () => {
  if (inputMessage.value && receiverId.value) {
    const messageData = {
      content: inputMessage.value,
      senderId: '当前用户 ID', // 这里需要替换为实际的当前用户 ID
      receiverId: receiverId.value
    };
    socket.send(JSON.stringify(messageData));
    messages.value.push({ content: inputMessage.value, type: 'sent' });
    inputMessage.value = '';
    receiverId.value = '';
  }
};
// 挂载前获取id
onMounted(() => {
  //从query中获取sendUserId

  //获取receiveUserId
   senderId.value =  route.query.senderUserId;

  
   if(route.query.receivedUser){
     receiver.value = JSON.parse(route.query.receivedUser);
    
   }



  //转为对象 响应式数据 用。value
  receivedUser.value.userName = receiver.value.userName;
  receivedUser.value.receiverId = receiver.value.userId;
  receivedUser.value.userImg = receiver.value.url;






  
});



onBeforeUnmount(() => {
  socket.close();
});
</script>

<style scoped>
/* 可以添加一些样式 */
/* topbar */
.topBar-detailChat{
  height: 46px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 10;
  
}
/* 站位盒子 */
.topBox{
  height: 46px;
}
.receivedInfo{
  width: 78%;
  height: 100%;
  position: relative;
  float: left;
  /* background-color: rgb(253, 255, 240);*/
}  
.receivedInfo img{
  width: 40px;
  height: 40px;
  float: left;
  margin-left: 10px;
  margin-top: 3px;
  border-radius: 50%;
  /* background-color: rgb(240, 255, 242); */
}
.receivedInfo div{
   
  
  width:60%;
  height: 40px;
  float: left;
  /* background-color: rgb(172, 141, 141); */
  text-align: left;
  margin-left: 7px;
  padding-top: 10px;
  font-size: 18px;
  font-weight: 550;
  color: black;
}
.topBar-detailChat span{
  display: inline-block;

  text-align: center;
  padding-top: 7px;
  width: 40px;
  height: 40px;
  float:left;
  color: black;
  /* background-color: azure; */
}
.chatMessage{
  background-color: rgba(246, 245, 245, 0.882);
  height: 700px;
}
.chatMessage-time{
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 46%;
  color: rgb(148, 149, 150);
  font-size: 16px;
 
  height: 20px;
  /* background-color: aquamarine; */
}

/* 发送方 */
.sender{

  margin-top: 10px;
  float: right;
  width: 92%;
  /* height: 100px; */
  /* background-color: rgb(203, 238, 238); */

}
.sender-content{
  float:right;
   margin-right: 2px;
  display: inline-block;
  margin-top: 5px;
  border-radius: 8px;
  background-color: rgba(100, 244, 75, 0.919);
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 18px;
 
  padding-top: 5px;
  padding-bottom: 5px;
   padding-left: 10px;
  padding-right: 10px;
  text-align: left;
  justify-content:center;
   max-width: 78%; /* 限制消息内容的最大宽度 */
  word-wrap: break-word; /* 允许长单词换行 */
}
.userImg{
  
  float: right;
  margin-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background-color: bisque; */
}
/* 接收者 */
.receiver{
  margin-top: 8px;
  float:left;
  width: 92%;
  /* background-color: aquamarine; */

}
.receiver img{
  float: left;
  margin-right: 5px;
  margin-left: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background-color: bisque; */
}
.receiver span{
  margin-right: 2px;
  display: inline-block;
  margin-top: 5px;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 18px;
 
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
  justify-content:center;
  max-width: 78%; /* 限制消息内容的最大宽度 */
  word-wrap: break-word; /* 允许长单词换行 */
}
</style>