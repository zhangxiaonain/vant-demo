<template>
  <div>
  <van-uploader
      :after-read="afterRead"
      :before-read="beforeRead"
      :max-count="1"
      accept="image/*"
      multiple
      :disabled="isUploading"
    >
     <van-icon 
      name="photograph" />
     <!-- <van-button type="primary" 
      
      icon="plus"   size="large"
      loading-text="上传中..."
      :loading="isUpload"
      >上传头像</van-button> -->
    </van-uploader>
   <!-- 上传成功提示 -->
    <van-toast  v-model:show = "showToast" message="上传成功" position="top" />
    <van-toast  v-model:show = "showToastFalse" message="上传失败" position="top" />
         
    
    
    
  </div>
</template>
<style scoped>

</style>
<script>
import { Uploader, Button,Toast,Loading  } from 'vant';
import { ref } from 'vue';

import axios from 'axios';

export default {
  components: {
    'van-uploader': Uploader,
    'van-button': Button,
  },
  data() {
    return {
      fileList: [],
         
    };
  },
 setup(props, { emit }) {
    const isUploading = ref(false);
    const showToast = ref(false);
    const showToastFalse = ref(false);
    const isLoading = ref(false);
     const isUpload = ref(false);
    const PictureUrl = ref("");
 

    // 在读取文件之前的验证
    const beforeRead = (file) => {
      const isPicture = file.type.startsWith('image/');
      if (!isPicture) {
        console.log('请选择图片文件')
    
        return false;
      }
      return true;
    };

    // 在读取文件之后的操作
  
    const afterRead = (file) => {
      const formData = new FormData();
      formData.append('picture', file.file);
      // picture 为后端接受的参数
      isUpload.value = true;
      isUploading.value = true;
      isLoading.value = true;
      // 发送 POST 请求，这里需要替换为你的后端接口地址
      axios.post('http://localhost:8085/api/upload/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
     .then(response => {
        //不显示上传中。。。
        isUpload.value = false;
        isUploading.value = false;
        isLoading.value = false;
        showToast.value = true;
        
        PictureUrl.value = response.data
        emit('upload-success',PictureUrl.value );
        // console.log("this is a video upload" + VideoUrl.value )
        setTimeout(() => {
          showToast.value = false;
        }, 2000);
        console.log("this is picurl:->>>> "+response.data);
      })
     .catch(error => {
        isUploading.value = false;
        isLoading.value = false;
        showToastFalse.value = true;
         setTimeout(() => {
          showToastFalse.value  = false;
        }, 2000);
      
        console.error('上传错误:', error);
      });
    };

    return {
      isUploading,
      isUpload,
      showToast,
      showToastFalse,
      isLoading,
      beforeRead,
      afterRead,
      PictureUrl,
    
    };
  }
};
</script>
<style scoped>
</style>
