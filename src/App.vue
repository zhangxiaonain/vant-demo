<template>
        <div id = "app1">
   

          <router-view />

         <van-tabbar class="buttomRoute" route placeholder="true">
         <van-tabbar-item replace to="/" icon="home-o">推荐</van-tabbar-item>
         <van-tabbar-item replace to="/friends" icon="friends-o" badge="5">朋友</van-tabbar-item>
         <van-tabbar-item replace to="/scan" icon="video-o" >发一发</van-tabbar-item>
         <van-tabbar-item replace to="/news" icon="chat-o" badge="99+">消息</van-tabbar-item>
         
         <van-tabbar-item replace to="/myself" icon="user-o" badge="20">我</van-tabbar-item>
       
         </van-tabbar>
        
        </div>
      
</template>

<script>



</script>

<style>
#app1 {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #31de87; */
  /* margin-top: 6px; */
}
.buttomRoute{
  z-index: 6;
}

</style>
