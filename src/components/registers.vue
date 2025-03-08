<template>
  <div>
    <!-- <div id="video">
      <video id="myVideo" @click="isPlays" width="100%" height="490px" controls>
        <source src="../assets/video/share_example3.mp4" type="video/mp4" />
      </video>
    </div>
    <span>
      <van-icon
        class="iconfont2"
        class-prefix="icon"
        color="red"
        name="tupianshangchuan"
        size="30"
      />
    </span> -->

  <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>
<style scoped>
</style>

<script>
import { ref } from 'vue';
import axios from "axios";
export default {

   setup() {
    const username = ref('');
    const password = ref('');
    const onSubmit  = () => {
      //发送后端请求
       try {
    axios.post('http://localhost:8085/api/user/userLogin', 
     {
        userName: username.value,
        passWord: password.value
    },
    {
        params: {
            userName: username.value,
            passWord: password.value
        }
    },).then((response) => {
     
      if(response.data.id){
        console.log("登录成功")
      }else{
           console.log("登录失败")
      }
    
      
    });
  
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }

    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>