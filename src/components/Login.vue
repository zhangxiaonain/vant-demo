<template>
  <div class="login-container">
      
      <!-- 头像 -->
      <div class="userImg">
            <img :src="avatarUrl" >
      </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="userName"
       @blur="fetchUserAvatar"
        name="用户名"
        placeholder="请输入您的用户名"
        :rules="[{ required: true, message: '请填写用户名', trigger: 'blur' }]"
      />
      <!-- label="密码"  :rules="[{ required: true, message: '请填写密码' }]" -->
      <van-field
        v-model="passWord"
        type="password"
        name="密码"
        
        placeholder="请输入您的密码"

      />
      
      <van-checkbox v-model="checked" checked-color="#057df5">已阅读并同意<a href="https://www.jd.com">用户协议</a>和<a href="www.jd.com">隐私政策</a></van-checkbox>
      <div style="margin: 16px;">
        <!-- round block type="info"  -->
        <van-button native-type="submit" :loading="isLoading"  loading-text="登录中...">登录</van-button>
      </div>
    </van-form>
    <div class="register-link">
      <span @click="goToRegister">立即注册</span>
      <span @click="goToRegister">忘记密码</span>
    </div>
    
    </div>
    
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { showToast,Checkbox,Loading  , Toast } from 'vant';
import { setWithTimer } from '../tools';
import {userLogin} from "@/api/user";


export default {
  
  data() {
    return {
      userName: '',
      password: '',
      avatarUrl:'https://img1.baidu.com/it/u=728383910,3448060628&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      checked: false,
     
      isLoading:false,
     
     
    };
  },
  methods: {

     // 当输入框失去焦点时触发该方法
    async fetchUserAvatar() {
      if (this.userName) {
        try {
          // 发送请求获取用户头像
          // const response = await axios.get(`/api/getUserAvatar?account=${this.account}`);

          console.log("获取用户头像。。。。")
          // 将获取到的头像 URL 赋值给 avatarUrl
          //this.avatarUrl = response.data.avatarUrl;
          this.avatarUrl = "https://sky-zwx.oss-cn-beijing.aliyuncs.com/3eaec2e0-2999-4212-9f15-89b1fa99cdc3.jpg"
        } catch (error) {
          console.error('获取用户头像失败:', error);
        }
      }
    },

    //登录
  async  onSubmit(values) {
      
      this.isLoading = true;

      console.log('submit', values);

      //设置登录过期时间
      //localStorage.clear() isLoggedIn

  try {
    
      if(!this.checked){
        showToast({
        message: '请您阅读并同意',
        duration: 3000, // 显示时长，单位为毫秒，这里设置为 3 秒
        icon: 'fail', // 显示成功图标
       });
       return;
      }
        // 模拟登录请求，实际开发中替换为真实接口请求
         await new Promise((resolve) => setTimeout(

             resolve, 2000));
        // 登录成功，关闭提示并添加后续处理逻辑
        // this.$toast.clear();
       const  res = await   userLogin(this.userName, this.password);
         console.log('ggg', res);




    console.log( '登录成功用户id:'+ localStorage.getItem('user_id'));
      this.isLoading = false;


        
      } catch (error) {
        // 登录失败，关闭提示并显示错误信息
        console.log("失败")
       
      } finally {
        // 无论登录成功还是失败，都关闭按钮的加载状态
        this.isLoading = false;
      }

//跳转至我的页面
    this.$router.push('/myself');
       //this.isLoggedIn = false;

    },
    goToRegister() {
    
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: aliceblue;
  height: 616px;
  text-align: center;
  /* padding: 20px; */
}
/*用户头像 */
.userImg{
  position: relative;
  display: inline-block;
  margin-top: 20%;
  width: 120px;
  height: 120px;
  /* background-color: rgb(77, 151, 215); */
}
.userImg img{
  width: 110px;
  height: 110px;
  margin-top: 4px;
  border-radius: 50%;
   /* background-color: rgb(10, 126, 227); */
}
.register-link {
  width: 100%;
  height: 30px;
 
  /* text-align: center; */
  margin-top: 20px;
  color: #209ef3;
  /* background-color: #dd6e6e; */
 }
.register-link span{
 margin: 0 20px; /* 设置左右外边距来控制间距 */
  text-align: center;
  display: inline-block;
  width: 100px;
  height: 30px;
  /* background-color: #057df5; */
 

}
.van-field{
  width: 80%;
  position: relative;
  display: inline-block;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #ffffff;
}
/*单选框*/
.van-checkbox{
  margin-top: 5%;
  margin-left: 10%;
}
.van-button{
  width: 88%;
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  background-color: #057df5;
}
.van-button--loading::after {
  content: attr(data-text);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>