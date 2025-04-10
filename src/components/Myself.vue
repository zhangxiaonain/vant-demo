<template  >
   <div>
     

     <!-- 最上层topBar -->
           <div   id ="vid" @scroll="handleScroll"  class="parentBox">
            <!-- 存放top user -->
              <div class="bgimg"> 
              <div id ="topbar" class="topBar">
                <van-icon class="arrow_left_iocn"  name="arrow-left" color="black" v-if="isShow"/>
                 <span v-if="isAddFriend" class="addFriends">添加好友</span>
                 <span  v-if="isNewInterview" class="addFriends">新访客</span>
                 <span>
                  <span id ="topIcon" class = "icon"><van-icon   name="search" /></span>
                  <span id ="topIcon1" @click="getMorePopup" class = "icon"><van-icon   name="ellipsis" /></span>
                 
                 </span>
                 <!-- <TopBar :isScrolled="isScrolled"/> -->
                 
              </div>
             
           
           <!-- 搜索图标 -->
 
                      
<!-- 用户信息 -->
             <!-- 更换头像popup -->
              <van-popup class="updatePicPopup" v-model:show="showUploadComponent" position = "bottom"> 

                <div class = "updataPic">
                     <!-- 关闭图标 -->
                   <van-icon class  = "closePic" name="cross"  @click="isShowUploadComponent" />
                   <img :src="uploadedPicUrl"/>
                   
                </div>
                <!--更换组件 -->
                <div class = "updataContent">
                      <van-cell title="更换头像" > 
                        <picture-Component class = "uploadCompoent" @upload-success="handleUploadSuccess">                
                         
                      </picture-Component>
                      </van-cell>
                </div>

               
 
               
             </van-popup>
             <!-- 获取更多的pupop -->
             <van-popup  class="getMoreContent" v-model:show="showMoreContent" position="right" :overlay="true">
                   <div class="box1">
                    <van-cell title="我的订单" size="large"  icon="cart-o"  is-link />
                    <van-cell title="我的钱包"  size="large" icon="balance-o" is-link  />
                    <van-cell title="观看历史" size="large" icon="underway-o" is-link  />
                    <van-cell title="我的客服" size="large" icon="service-o" is-link /> 
                    <van-cell title="我的二维码" size="large" icon="qr" is-link />
                    <van-cell title="账号与安全" @click="gotoLoginPage" size="large" icon="user-circle-o" is-link />                  
                   </div>
                   <div class="box2"></div>
                   
             </van-popup>
              <div  class="parent" >
              <div  class="userBox" >
                  <div class="userPic">
                   
                     <!-- 用户头像 -->
                    <img :src="uploadedPicUrl"  @click="isShowUploadComponent"/>
                  </div>
                    <div class="userName">
                        张小年<br>
                        <span class="userAccount">账号：123456789</span>
                    </div>
                 
                  
              </div>

             </div>   <!-- 存放top user -->

               <!-- 存放视频的盒子 -->
             
              <div  class="video">
                <div class="userData">
                    <span>21<br>
                    <li>获赞</li>    </span>
                    <span>61<br>
                       <li>朋友</li> </span>
                    <span>91<br>
                       <li>关注</li></span>
                    <span>13W<br>
                       <li>粉丝</li></span>
                    <span class="editInformation">编辑资料</span>
                </div>
                <!-- 切换bar -->
                <div>
                  <van-tabs 
                  v-model="active" swipeable line-height=2 color = red @change="onTabChange">
                   <van-tab title="作品">
                     <div class="parent-content">
                             
                        <div class="child" v-for="(item,index) in works" :key="index" >
                           
                            <img :src="item.imgUrl">
                            <div class="icon-box">
                              <van-icon name="like-o" />
                              {{ item.like }}
                              
                            </div>
                            
                        </div>

                         
                       </div>
                   </van-tab>
                     <van-tab title="私密">
                      <div class="parent-content">
                             
                             <div class="child" v-for="(pwork,index) in privateWork" :key="index" >
                                
                                 <img :src="pwork.imgUrl">
                                 <div class="icon-box">
                                   <van-icon name="like-o" />
                                   {{ pwork.like }}
                                   
                                 </div>
                                 
                             </div>
     
                              
                            </div>
                      
                     </van-tab>
                     <van-tab title="收藏">
                      <div class="parent-content">
                             
                             <div class="child" v-for="(collection,index) in collections" :key="index" >
                                
                                 <img :src="collection.imgUrl">
                                 <div class="icon-box">
                                   <van-icon name="like-o" />
                                   {{collection.like }}
                                   
                                 </div>
                                 
                             </div>
     
                              
                            </div>


                     </van-tab>
                     <van-tab title="喜欢">
                      <div class="parent-content">
                             
                             <div class="child" v-for="(likework,index) in likes" :key="index" >
                                
                                 <img :src="likework.imgUrl">
                                 <div class="icon-box">
                                   <van-icon name="like-o" />
                                   {{likework.like }}
                                   
                                 </div>
                                 
                             </div>
     
                              
                            </div>
                     </van-tab>
                 </van-tabs>
                
                 
                </div>
                

              </div>

                 <!-- parent -->
              </div> 
            
  


      
   </div>
 
<!-- Bgimg -->
 </div>
    
 <van-toast v-model:show = "showToast" message="登录成功" position="top" />
   
 
</template>



<!-- 样式 -->
<style scoped>
/* 获取更多 */
.getMoreContent{
  width: 80%;
  height: 100%;
  background-color: #faf6f6;

}
.box1{
  margin-top: 30px;
  background-color: #000;
  border-radius: 15px;
   margin-left: 10px;
   margin-right: 10px;
  height: auto;
  width: auto;
}
.box2{
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
  height: 300px;
  background-color: #ffffff;
}
.parentBox{
        
        width: 100%;
        /* height:100%; */
        height: 600px;
        /* padding-top: 50px; */
       
        overflow-y: scroll;
        /* background-color: #aa9697; */
     
    }
  .bgimg{
  
     padding-top: 50px;
     width: 100%;
     height: 120px;
      background-image: url("https://img0.baidu.com/it/u=3018816266,243009670&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800");
     background-size: cover; 
     /* background-color: #aa9697; */
     background-repeat: no-repeat;
     border-radius: 0 0 20px 20px ;
           
         
  
  }
     .topBar{
      
       position: fixed;
        display: flex;
       width: 100%;
       height: 50px;
       /* background-color: rgb(163, 200, 231);  */
       justify-content: space-between;
       align-items: center;
       /* background-color: #6d6d6d; */
       /* background-color: black;*/
        z-index: 3; 
        top: 0;
        left: 0;
        color: rgb(240, 239, 239);
        transition: background-color 0.3s ease;
       
       /* padding: 10px 20px; */
     }
     .addFriends{
        display: inline-block;
        width: 90px;
        height: 28px;
        text-align: center;
        margin-left: 10px;
        padding-top:5px;
        font-size: 14px;
        border-radius: 20px;
        background-color: #7d7c7c;
        opacity: 0.4;
     }
        /* 图标 */
      .icon{
        width:28px;
        height: 33px;
        border-radius: 50%;
        margin-right: 10px;
        padding-left:3px;
        font-size: 24px;
        font:130;
        color: white;
        align-content: center;
        background-color: #a8a8a8;
        opacity: 0.7;
      }
      .arrow_left_iocn{
            margin-left: 20px;
            size: 50px;
         
            
      }

     .parent{
       /* margin-top: 30px; */
       
     }
     .userBox{
        display: flex;
        height: 120px;
        width: 100%;
/*       
        background-color: rgb(209, 235, 183); */

     }
     /* 存放作品的盒子 */
     .video{
         height: 100%;
         width: 100%;
         border-radius:  20px 20px 0px 0px;
         /* background-color: rgb(250, 248, 248);
         */
     }
     /* 用户头像的盒子 */
    .userPic{
        
        width: 120px;
        height: 110px;
        margin-top:5px;
        margin-left: 10px;
        /* background-color: #c3a7a7; */
      
    }
    /* 更新头像popup */
    .updatePicPopup{
      width: 100%;
      height: 100%;
      background-color: #000;

    }
    /* popup中的头像 */
    .updataPic img{
      margin-top: 10px;
      width: 100%;
      height: 360px;
    }
    /* 用户头像 */
    .userPic img{
          border-radius:50%;
          
          width:100px;
          height: 100px;
          border: solid;
          border-color: rgb(255, 255, 255);
    }
    /* 关闭图标 */
    .closePic{
      margin-top: 5px;
      margin-left: 5px;
      color: #eeecec;
      font-size: 25px;
    }
    /* 更新组件位置 */
    .uploadCompoent{

      font-size: 30px;
      /* margin-right: 20px; */
    }
    /* 存放更新组件的盒子 */
    .updataContent{
      color: #9e9e9e;
      width: 90%;
      height: 180px;
      margin-top: 10%;
      margin-left: 5%;
      background-color: #232323;
    }
    .userName{
        display: inline-block;
        width: 300px;
        height: 50px;
        font-size: 22px;
        margin-left: 25px;
        margin-top: 30px;
        font-weight: bold;
        color: white;    

    }
    /* 用户数据展示 */
    .userData{
        width: 100%;
        height: 70px;
        justify-content: space-between;
        align-items: center;
        /* background-color:rgb(207, 201, 201); */
        display: flex;
        font:18px;
        text-align: center;
        color: #000;


    }
    .userData li{
      list-style: none;
      font-size: 14px;
      color: #b9b8b8;
    }
    .userData span{
         font-weight: bold;
         margin-left: 15px;
         display: inline-block;

    }
    .editInformation{
        display: inline-block;
        margin-right:20px;
        margin-top: 1px;
        padding-top: 8px;
        text-align: center;
        width: 100px;
        height: 30px;
        border-radius:2px;
        background-color: rgb(237, 238, 239);
    }
    /* 账号 */
    .userAccount{
        display: inline-block;
        width: 150px;
        height: 25px;
        font-size: 14px;
        /* background-color: aqua; */
        color:#aa9697;
    }

    /* 作品展示 */
    .parent-content{
      /* width: 200px; */
      display: flex;
      flex-wrap: wrap;
      padding: 2px;
      gap:2px;
      /* background: #e2c6c6; */
    }
    .child{
      width:121px;
      height: 180px;
      position: relative;
      /* flex:1; */
      background: #d49393;
    }
    .child img{
      width: 100%;
      height: 100%;
      background: #000;
    }
    .child .icon-box{
      position: absolute;
      padding: 6px;
      margin-top: -35px;
      width: 100%;
      height: 30px;
     
      z-index: 3;
      font-size: 17px;
   
      color: rgb(255, 255, 255);
    }
    </style>


<script >
 
  import TopBar from '../components/mySelf_Comments/topBar.vue';
  import pictureComponent from '../components/videoComments/pictureUpload.vue'
  import { Popup } from 'vant';
  import { showToast } from 'vant';
  import {ref,} from 'vue'


export default {
   components: {
      TopBar,
     [Popup.name]: Popup,
   'picture-Component':pictureComponent
  },
  //页面挂载前
   created() {
    //清除本地登录状态存储
    // localStorage.clear();
      //判断是否已经登录
     if (localStorage.getItem('isLoggedIn')) {
        // 用户已登录，执行相应操作
      //   showToast({
      //   message: '已登录',
      //   duration: 3000, // 显示时长，单位为毫秒，这里设置为 3 秒
      //   icon: 'success', // 显示成功图标
      //  });

      // this.showToast = true;

      } else {
        // 用户未登录，提示登录
        showToast({
        message: '用户未登录，请先登录',
        duration: 3000, // 显示时长，单位为毫秒，这里设置为 3 秒
        icon: 'fail', // 显示成功图标
       });
        
        this.$router.push('/Login');
      }
      
     
    // 在这个钩子函数中执行需要在页面挂载前运行的代码
    console.log('created: 页面挂载前执行的代码');
   
  },
   //方法
  methods: {
    
     handleUploadSuccess(url) {
     //获取视频上传成功后的url便于写入数据库
      this.uploadedPicUrl = url;
     
    },
    //是否更改头像
    isShowUploadComponent(){
       
      this.showUploadComponent = !this.showUploadComponent;
     
    },
      //点击上方图标弹出popup

    getMorePopup(){
      console.log('获取更多')
         this.showMoreContent = !this.showMoreContent;
    },
   
  // 下滑盒子改变topBar状态
       handleScroll(){
         
         const scroll = document.getElementById('vid');
       
         const topBarIcon = document.getElementById('topIcon');
         const topBarIcon1 = document.getElementById('topIcon1');
         
         const topbar = document.getElementById('topbar');
         console.log("this" +scroll.scrollTop)
      if (scroll.scrollTop>106) {
        topBarIcon.style.color='black';
        topBarIcon.style.backgroundColor ='#fff';

        topBarIcon1.style.color='black';
        topBarIcon1.style.backgroundColor ='#fff';
       
        topbar.style.backgroundColor = '#fff';
        this.isNewInterview = false,
        this.isAddFriend = false,
            this.isShow = true;
      } else {
         this.isShow = false;
         this.isNewInterview = true;
         this.isAddFriend = true;
          topBarIcon.style.color='';
          topBarIcon.style.backgroundColor ='';

          topBarIcon1.style.color='';
          topBarIcon1.style.backgroundColor =''; 
          topbar.style.backgroundColor = '';
      }
    },
    //点击账号与安全
   gotoLoginPage(){
         this.$router.push('/login');
   },
   // 初始化激活的标签索引
   
        //点击上方的bar切换路由
   
    
  },   

  //数据
  data() {
  return {
    //是否显示返回图标
   isShow: false,
    //是否显示添加好友
   isAddFriend:true,
   isNewInterview:true,
   isScrolled:false,
   //头像url
   uploadedPicUrl: 'https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg',
   showUploadComponent: false, // 控制图片上传组件的显示与隐藏
   //显示登录成功
   showToast:false,
   //获取更多的pupop
   showMoreContent:false,
   
  
  };
},

//vue3
setup(){
// 初始化激活的标签索引
const active = ref(0);
const  onTabChange=(index) => {
      active.value = index;
      console.log('接收到的标签索引:', index);
      console.log('接收到:', active.value);
      //定义变量
      // var routePath;
      // console.log(index);
      // switch (index) {
      //   case 0:
      //     routePath = "/";
      //     break;
      //   case 1:
      //     routePath = "/follow";
      //     break;
      //   case 2:
      //     routePath = "/cityWide";
      //     break;
      //   case 3:
      //     routePath = "/fineFood";
      //     break;
      // } //switch

      // this.$router.push(routePath);
     
    }
   
    //作品
    const works = ref([
      {imgUrl:'https://picsum.photos/181/199 ',
       like:'123'
      },
      {
        imgUrl:'https://picsum.photos/181/200 ',
        like:'465'
      },
      {
        imgUrl:'https://picsum.photos/181/201',
        like:'789'
      },
      {
        imgUrl:'https://picsum.photos/181/202',
        like:'63'
      },
      {
        imgUrl:'https://picsum.photos/181/203',
        like:'893'
      },
      {
        imgUrl:'https://picsum.photos/181/204',
        like:'523'
      },
      {
        imgUrl:'https://picsum.photos/181/205',
        like:'965'
      },
      {
        imgUrl:'https://picsum.photos/181/206',
        like:'5623'
      },
      {
        imgUrl:'https://picsum.photos/181/207',
        like:'33'
      },
      {
        imgUrl:'https://picsum.photos/181/208',
        like:'45'
      },
      {
        imgUrl:'https://picsum.photos/181/2010',
        like:'568'
      },

    ])
    //私密
    const privateWork = ref([
      {imgUrl:'https://picsum.photos/560 ',
       like:'156'
      },
      {
        imgUrl:'https://pic1.zhimg.com/v2-82aa7168e634225370b6e6d39393d91a_r.jpg?source=2c26e567',
        like:'5625'
      },
      {
        imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fb2440567-537d-4f81-954b-ac47cc6ffbe8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1746880390&t=5340ec5205ae6a486a857ef5cda0bb11',
        like:'789'
      },
      {
        imgUrl:'https://img2.baidu.com/it/u=4277715605,140932347&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',
        like:'523'
      },
      {
        imgUrl:'https://picsum.photos/100',
        like:'756'
      },
        

    ])
    //收藏collect
    const collections = ref([
      {imgUrl:'https://jg-app.obs.cn-north-4.myhuaweicloud.com/prod/upload/0/jpeg/8F1DB896B7DD779702CBEB66C72BC81E.jpeg',
       like:'156'
      },
      {
        imgUrl:'https://inews.gtimg.com/om_bt/OI-Puir4yj3FZCdWFshc8fdQw-KrFROMimrbGKa5SaVBQAA/641',
        like:'5625'
      },
      {
        imgUrl:'http://img2.baidu.com/it/u=1461757661,3632831914&fm=253&app=138&f=JPEG?w=800&h=1200 ',
        like:'789'
      },
      {
        imgUrl:'http://img0.baidu.com/it/u=130245427,4226318965&fm=253&app=138&f=JPEG?w=800&h=1120',
        like:'523'
      },

       {
        imgUrl:'http://img2.baidu.com/it/u=358407797,2124858982&fm=253&app=138&f=JPEG?w=800&h=1200',
        like:'56万'
      },
        {
        imgUrl:'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0529%2F5811168bj00se8hw2005nd000rs013oc.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
        like:'523'
      
      },
      {
        imgUrl:'https://images6.com/video/6e61a91a5fa5722bf4383d160a833143.jpg',
        like:'13万'
      },
        {
        imgUrl:'https://img2.baidu.com/it/u=3101519302,989451046&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1120',
        like:'523'
      
      },
     

    ])
    //喜欢
    const likes = ref([
      {imgUrl:'https://picsum.photos/1710',
       like:'156'
      },
      {
        imgUrl:'https://picsum.photos/178',
        like:'5625'
      },
      {
        imgUrl:'https://picsum.photos/153',
        like:'789'
      },
      {
        imgUrl:'https://picsum.photos/164',
        like:'5563'
      },
      {
        imgUrl:'https://n.sinaimg.cn/spider20240728/135/w1284h2051/20240728/3521-e02ea61b7a334b90833d9ed05a746854.jpg',
        like:'5万'
      },
      {
        imgUrl:'https://picsum.photos/184',
        like:'9653'
      },
      {
        imgUrl:'https://picsum.photos/185',
        like:'53'
      },
      {
        imgUrl:'https://img0.baidu.com/it/u=1756315936,2205320796&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1250',
        like:'68万'
      
      }

    ])



 return{
      active,
      onTabChange,
      //作品
      works,
     //私密
      privateWork,
     //收藏
      collections,
      //喜欢
      likes,

    }
  
   
}
    
}

    
</script>