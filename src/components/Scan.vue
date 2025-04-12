<script>
import videoComponent from '../components/videoComments/videoUplode.vue';
import pictureComponent from '../components/videoComments/pictureUpload.vue'
 
export default {
  components: {
    'video-Component': videoComponent ,
    'picture-Component':pictureComponent
  },

  setup() {
    const onClickLeft = () => history.back();

    return {
      onClickLeft,
    };
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

<template>
  <div class="container1">

    <van-nav-bar
  title="发布视频"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
   <!--上传视频组件 -->
   <div class="upload">
    <video-Component @upload-success="handleUploadSuccess">
        
    </video-Component >
  </div>

       <!-- <p>上传后的 URL: {{ uploadedVideoUrl }}</p> -->

        <!-- <picture-Component @upload-success="handleUploadSuccess">

        </picture-Component>
        <p>图片上传后的 URL: {{ uploadedVideoUrl }}</p> -->


  </div>
  
</template>
 
<style scoped>
  .container1{
    margin: 0 auto;
      
    height: 610px;
    background: #e9e9e963;
  }
  .upload{
    margin-top: 30px;
    
  }
</style>
