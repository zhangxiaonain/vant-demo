<template>
  <div>
   <!--上传视频组件 -->
    <video-Component @upload-success="handleUploadSuccess">
        
    </video-Component >

       <p>上传后的 URL: {{ uploadedVideoUrl }}</p>

        <picture-Component @upload-success="handleUploadSuccess">

        </picture-Component>
        <p>图片上传后的 URL: {{ uploadedVideoUrl }}</p>


  </div>
</template>
 
<script>
import videoComponent from '../components/videoComments/videoUplode.vue';
import pictureComponent from '../components/videoComments/pictureUpload.vue'



 
export default {
  components: {
    'video-Component': videoComponent ,
    'picture-Component':pictureComponent
  },
   data() {
    return {
      uploadedVideoUrl: ''
    };
  },
  methods: {
    handleUploadSuccess(url) {
     //获取视频上传成功后的url便于写入数据库
      this.uploadedVideoUrl = url;
    }
  }
};

  
</script>