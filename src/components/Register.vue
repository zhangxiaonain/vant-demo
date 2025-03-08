<template>
  <div class="register-container">

    <div class="register-text"> <h2>欢迎注册</h2></div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phoneNumber"
       
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
       
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="confirmPassword"
        type="password"
      
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请再次输入密码' }]"
      />
       <van-checkbox v-model="checked" checked-color="#057df5">已阅读并同意<a href="https://www.jd.com">服务协议</a>和<a href="www.jd.com">隐私指导</a></van-checkbox>
      <div style="margin: 16px;">
        <van-button native-type="submit">欢迎注册</van-button>
      </div>
    </van-form>
    <div class="login-link">
      <span @click="goToLogin">已有账号？立即登录</span>
    </div>
  </div>
</template>

<script>


import { showToast } from 'vant';
export default {
  
  data() {
    return {
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      checked: false,
    };
  },
  methods: {
     //密码校验函数
    validatePassword(password) {
    var pattern = /^(?=.*[a-zA-Z])(?=.*\d).{7,11}$/;
    return pattern.test(password);
},
    //注册函数
    onSubmit(values) {
      
      if(this.validatePassword(this.password)===false) {
        showToast({
             message: '请输入6-12字符包含数字和字母',
             duration: 4000, // 显示时长，单位为毫秒，这里设置为 3 秒
             icon: 'fail', // 显示成功图标
      });
       return;   
      }
      if (this.password !== this.confirmPassword) {
       
  showToast({
    message: '两次输入密码不一致注册失败',
    duration: 3000, // 显示时长，单位为毫秒，这里设置为 3 秒
    icon: 'fail', // 显示成功图标
   });


        console.log('两次输入的密码不一致');
        return;
      }
       if(!this.checked){
        showToast({
        message: '请您阅读并同意',
        duration: 3000, // 显示时长，单位为毫秒，这里设置为 3 秒
        icon: 'fail', // 显示成功图标
       });
       return;
      }
      
      console.log('submit', values);
       showToast({
       message: '注册成功',
       duration: 3000, // 显示时长，单位为毫秒，这里设置为 3 秒
       icon: 'success', // 显示成功图标
  });
      // 这里可以添加注册逻辑
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
   background-color: aliceblue;
   /* background: linear-gradient(45deg, #66c0ee, #1ea1ed); */
  height: 616px;
  text-align: center;
}

.register-text{
  width: 80%;
  height: 16%;
  text-align: center;
  padding-top: 50px;
  display: inline-block;
  /* background-color: rgb(27, 128, 216); */
}
.login-link {
  text-align: center;
  margin-top: 20px;
  color: #209ef3;
  cursor: pointer;
}
.van-field{
  width: 80%;
  position: relative;
  display: inline-block;
  margin-top: 15px;
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
</style>