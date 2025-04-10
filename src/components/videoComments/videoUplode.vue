<!-- 作品上传 -->
<script>
import { Uploader, Button,Toast,Loading  } from 'vant';
import { ref,reactive } from 'vue';

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
 setup (props, { emit }) {
  //form表单

  const form = ref({
        title:'',
        des:'',
        imgUrl:[{url:''}],
        videoUrl:'',
        classification:'',
        status:'',
        tag:'',


    })

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
        form.videoUrl = response.data;
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

    const result = ref('');
    const pickerValue = ref([]);
    const showPicker = ref(false);
    const columns = [
      { text: '搞笑', value: 'Hangzhou' },
      { text: '舞蹈', value: 'Ningbo' },
      { text: '音乐', value: 'Wenzhou' },
      { text: '美食', value: 'Shaoxing' },
      { text: '动画', value: 'Huzhou' },
      { text: '记录片', value: 'Huzhou' },
    ];

    const onConfirm = ({ selectedValues, selectedOptions }) => {
      result.value = selectedOptions[0]?.text;
      pickerValue.value = selectedValues;
      form.value.classification =  result.value 
      showPicker.value = false;
      console.log('ni')
    };
    //所有人可见
  
  
    //发布
    const submit = ()=>{
        console.log('form:'+form.value.status)
        console.log('form:'+form.value.classification)
        console.log('form:'+form.value.title)
        console.log('form:'+form.value.des)
        console.log('form:'+form.value.imgUrl.url)
        
    }

    return {
      //文件上传
      isUploading,
      isUpload,
      showToast,
      isLoading,
      beforeRead,
      afterRead,
      VideoUrl,
      showToastFailed,
      //分类
      onConfirm ,
      columns,
      result,
      //提交
      submit,
      pickerValue,
      showPicker,
      //form
      form,
    
    
    };
  }
};
</script>




<template>
  <div>
  <div class="container" >

  <van-form v-model="form" >
  <van-cell-group inset>
    <!-- 通过 pattern 进行正则校验 -->
    <van-field
      v-model="form.title"
      label="作品标题："
      name="pattern"
      placeholder="请输入作品标题"
      :rules="[{ pattern, message: '请输入正确内容' }]"
    />
    <!-- 分类-->
    <van-field
          v-model="form.classification"
          is-link
          readonly
          name="picker"
          label="作品分类："
          placeholder="点击选择分类"
          @click="showPicker = true"
        />
          <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
            <van-picker
              :columns="columns"
              :model-value="pickerValue"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>

     <!-- 作品描述 -->
     <van-field
    
      label="作品描述："
      v-model="form.des"
      placeholder="请输入作品描述"
      type="textarea"
      :rules="[{ message: '请输入正确内容' }]"
    />
      <!-- 作品描述 -->
      <van-field
    
    label="作品标签："
    v-model="form.tag"
    placeholder="请输入作品标签"
    
    :rules="[{ message: '请输入正确内容' }]"
  />
   
    <div class="upload-box">
      <p >上传视频:</p>
    <van-uploader
    
      class="upload-file"
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
  </div>

  <van-field name="uploader" label="选择封面：">
   
  <template #input>
    <van-uploader  max-count="1" v-model="form.imgUrl.url" />
  </template>
</van-field>

<van-field name="switch" label="所有人可见：">
  <template #input>
    <van-switch v-model="form.status" />
  </template>
</van-field>


   
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary"  @click="submit">
       发布
    </van-button>
  </div>

</van-form>





  
   <!-- 上传成功提示 -->
    <van-toast v-model:show = "showToast" message="上传成功" position="top" />
    <van-toast v-model:show = "showToastFailed" message="上传失败" position="top" />
    <!-- <van-cell-group>
    <van-cell  v-model="VideoUrl" />
                    <p>this is video url：：{{ VideoUrl }}</p>
    </van-cell-group>
    -->
   
   
    <!-- <van-loading v-model:show = "isLoading" size="24px" /> -->
    
    
    
    
  </div>

</div>
</template>

<style scoped >

.container{
  margin-top: 40px;
  width: 100%;
  margin: 0 auto;
  /* background: #ececec; */
  
}
.upload-box{
  
  display: flex;
  gap:20px
 
}
.upload-box p{
  font-size: 14px;
  margin-left: 15px;
}
.upload-file{
    width: 100px;
    height: 40px;
    margin-left: 10px;
    text-align: center;
    padding: 5px;
    /* background: #000; */

  }
</style>
