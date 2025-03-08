<template>
  <div>
  <van-uploader
      :after-read="afterRead"
      :before-read="beforeRead"
      :max-count="1"
      accept="video/*"
      multiple
      :disabled="isUploading"
    >
   
     <van-button type="primary" 
      loading-text="上传中..."
      :loading="isUpload"
      icon="plus" size="large"
      >上传作品</van-button>
    </van-uploader>
   <!-- 上传成功提示 -->
    <van-toast v-model:show = "showToast" message="上传成功" position="top" />
    <van-toast v-model:show = "showToastFailed" message="上传失败" position="top" />
    <van-cell-group>
    <van-cell  v-model="VideoUrl" />
                    <p>this is video url：：{{ VideoUrl }}</p>
    </van-cell-group>
   
   
   
    <!-- <van-loading v-model:show = "isLoading" size="24px" /> -->
    
    
    
    
  </div>
</template>

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
    const isLoading = ref(false);
     const isUpload = ref(false);
    const VideoUrl = ref("");
    const showToastFailed = ref(false);
 

    // 在读取文件之前的验证
    const beforeRead = (file) => {
      const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        Toast('请选择视频文件');
        return false;
      }
      return true;
    };

    // 在读取文件之后的操作
  
    const afterRead = (file) => {
      const formData = new FormData();
      formData.append('video', file.file);
      // video 为后端接受的参数
      isUpload.value = true;
      isUploading.value = true;
      isLoading.value = true;
      // 发送 POST 请求，这里需要替换为你的后端接口地址
      axios.post('http://localhost:8085/api/upload/video', formData, {
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
        
        VideoUrl.value = response.data
        emit('upload-success', VideoUrl.value );
        // console.log("this is a video upload" + VideoUrl.value )
        setTimeout(() => {
          showToast.value = false;
        }, 3000);
        console.log("this is url:->>>> "+response.data);
      })
     .catch(error => {
        isUploading.value = false;
        isLoading.value = false;
        isUpload.value = false;

        showToastFailed.value =true;
          setTimeout(() => {
           showToastFailed.value = false;
        }, 3000);
        
        console.error('上传错误:', error);
      });
    };

    return {
      isUploading,
      isUpload,
      showToast,
      isLoading,
      beforeRead,
      afterRead,
      VideoUrl,
      showToastFailed,
    
    };
  }
};
</script>
<style scoped>
</style>
