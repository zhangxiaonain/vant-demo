<template>
  <!-- 搜索组件 -->
  <div class="serach_parent">
   
    <form  class = "form" action="/">
     <span class="toMainPage" @click="goToMainPage"><van-icon name="arrow-left" /></span>
      
      <van-search
        v-model="searchValue"        
        placeholder="请输入搜索关键词"
             
        @search="onSearch"
       
        
      > 
       <!-- 使用插槽添加叉号图标 -->
      <template #input-right>
        <van-icon
          v-if="searchValue"
          name="clear"
          @click="clearSearch"
        />
      </template></van-search>
      <span class="search"   @click="onSearch">搜索</span>
    </form>
     
     <!-- 历史记录 -->
     <div class="historyContainer" v-if ="searchHistory.length!==0">
        <div class="history-title">
          <span class="span1">历史记录  </span>
          <span  class="span2"><van-icon 
           name ="delete" 
            @click="isClearAllHistory"
           v-if="searchHistory.length!==0"
         /></span> 
           <!--搜索历史的数据展示 -->
      
       <van-list>
       <!-- :max-length="2" -->
       <div  v-for="(item, index) in searchHistory" :key="index" class="ellipsis-with-icon"
         @click="searchAgain(item)"
       
         :class="{ 'show-delete-icon': showDeleteIndex === index }">
          <van-text-ellipsis
            :content="item " 
            @touchstart.stop="startLongPress(index)"
            @touchend.stop="endLongPress(index)"   
          >  
               
          </van-text-ellipsis>
           <van-icon
            v-if="showDeleteIndex === index"
            @click.stop="deleteHistoryItem(index)"
            name="cross" />
        
       </div>
             
    
      </van-list>
      

       </div>
     
    </div>
        
 
    <!-- 历史记录 -->

    <!-- 热搜榜单 -->
    <div class="hotSreach">
      <span class="hotText">热搜榜</span>

       <!--热榜数据 -->
      <van-list
 
 
      >  
       <div class="hotCellShow" v-for="(item, index) in HotListData" :key="index"  >
       <span :class="getIndexClass(index)">{{index+1}}   </span>
        <van-text-ellipsis
           class = "hotCellShow-span2"
            :content="item.title" 
            
          >  
               
          </van-text-ellipsis>
         
          <span :class="getStatusClass(item.status)">{{item.status}}</span>
         <span class = "hotCellShow-span3">{{ item.playCount }}</span>
     
       </div>
       </van-list>
    </div>
    
  </div>

 
</template>
<script setup>
import { ref ,onBeforeUnmount} from 'vue';
import { showToast ,  showNotify ,showLoadingToast,  showDialog} from 'vant';
// 搜索历史记录
const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory')) || []);
import { useRouter } from 'vue-router';
// 获取路由实例
const router = useRouter();

// 定义搜索框的值
const searchValue= ref('');
const tempValue = ref('');

// 记录长按开始时间
const longPressStartTime = ref(null);
// const  endPressTimer = ref(null);

// 记录当前显示删除图标的索引
const showDeleteIndex = ref(-2);

// 热榜数据
const HotListData = ref([
   {
    workId: 1,
    title: '湖人终结掘金9连胜',
    playCount: '1007.1万',
    status: '热'
  },
  {
    workId: 2,
    title: '我国成功发射中星10R卫星',
    playCount: '1000.1万',
    status: ''
  },
   {
    workId: 3,
    title: '哪吒2总票房超135亿',
    playCount: '1207.1万',
    status: '新'
  },
  {
    workId: 4,
    title: '乌民众拒接接受美俄谈判',
    playCount: '900.3万'
  },
   {
    workId: 5,
    title: '考研人查分状态',
    playCount: '917.1万',
    status: '热'
  },
  {
    workId: 6,
    title: '当小孩哥误入魔术舞台是什么状态',
    playCount: '810.1万',
    status : '首发'
    
  },
   {
    workId: 7,
    title: '挑战李曦城进行曲',
    playCount: '707.6万',
    status : '挑战'
    
  },
  {
    workId: 8,
    title: '春天的第一次野餐',
    playCount: '680.1万',
    status: ''
  },
  {
    workId: 9,
    title: '白敬亭扶灯反手把灯拆了',
    playCount: '700.1万',
    status: '热'
  },
   {
    workId: 10,
    title: '话剧哗变首场谢幕',
    playCount: '620.5万',
    status: ''
  },
  {
    workId: 11,
    title: '开春穿帅点',
    playCount: '500.1万',
    status: ''
  },{
    workId: 11,
    title: '开春穿帅点',
    playCount: '500.1万',
    status: ''
  },{
    workId: 11,
    title: '开春穿帅点',
    playCount: '500.1万',
    status: ''
  },{
    workId: 11,
    title: '开春穿帅点',
    playCount: '500.1万',
    status: ''
  },
  
  
  
  

]);


// 搜索事件处理函数
const onSearch = () => {
  if(!searchValue.value.trim()){
    
     showNotify({ type: 'danger', message: '搜索内容不能为空' });
    return;
  }
   const keyword = searchValue.value.trim();
  if (keyword) {
    if (!searchHistory.value.includes(keyword)) {
      searchHistory.value.unshift(keyword);
      // 最多保留 10 条历史记录
      if (searchHistory.value.length > 6) {
        searchHistory.value.pop();
      }
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
    }
    // 这里可以添加实际的搜索逻辑
    console.log(`搜索关键词: ${keyword}`);
   
    console.log('搜索历史： '+searchHistory.value )
    searchValue.value = '';
  }
  console.log('执行搜索，搜索内容为:', searchValue.value);
};

// 取消事件处理函数
const onCancel = () => {
  console.log('取消搜索');
};

// 清空搜索框内容的函数
const clearSearch = () => {
  searchValue.value = '';
};


// 再次搜索历史记录中的关键词
const searchAgain = (keyword) => {
  searchValue.value = keyword;
   onSearch 
  console.log('再次搜索'+ searchValue.value)
};


// 显示删除图标
const showDeleteIcon = (index) => {
  showDeleteIndex.value = index;
  showDeleteIndex.value = -1;
};
//是否确认删除
const isClearAllHistory = () =>{
  console.log('确认全部删除吗')
  
showDialog({
  title: '清空搜索历史',
  message: '清空后无法恢复请确认',
  closeOnClickOverlay: true,
  // showCancelButton:true,
  theme: 'round-button',
}).then(() => {
  //调用全部删除函数
  clearAllHistory();
 
  console.log("已删除")
});

}

// 自定义长按指令

// 响应式定时器引用
const pressTimer = ref(null)

// 长按触发逻辑
const startLongPress = (e,index) => {
  // 阻止默认行为（如移动端触摸滚动）
   //e.stopPropagation()
  console.log("长按开始。。。")
  longPressStartTime.value = Date.now();
  // 清除已有定时器
  if (pressTimer.value) clearTimeout(pressTimer.value)

 
}

// 结束长按处理
const endLongPress = (index) => {

  const currentTime = Date.now();
  const pressDuration = currentTime - longPressStartTime.value;
  console.log("长按事件"+pressDuration+'毫秒ddddd')

   if (pressTimer.value) {
    
    clearTimeout(pressTimer.value)
    pressTimer.value = null
  }
   if (pressDuration >= 300) {
     showDeleteIndex.value = index;
    
     console.log("需要删除的id"+index)

  } else {
    showDeleteIndex.value = -1;
  }
//超过三秒不删除,自动取消删除
   setTimeout(() => {
    console.log("hhhhhh->>>>>>>")
    showDeleteIndex.value = -1;
    
  }, 3000);
  longPressStartTime.value = null;
//   console.log("hhhhhh->>>>>>>"+pressTimer.value)
//   if (pressTimer.value) clearTimeout(pressTimer.value)
//  console.log("jjjj->>>>>>>" +pressTimer.value)
//     pressTimer.value = null
  
}

// 实际长按处理函数
const handleLongPress = (e,index) => {
  console.log('长按事件触发....', index)
  //  showDeleteIndex.value = -1;
  // 在这里添加你的业务逻辑
  // 例如：打开菜单、显示操作选项等
}

// 组件卸载前清除定时器
onBeforeUnmount(() => {
   console.log('卸载serach')
  
})






// 删除单条历史记录
const deleteHistoryItem = (index) => {
  console.log('deleteHistoryItem 单次删除'+index)
  searchHistory.value.splice(index, 1);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
   showDeleteIndex.value = -1;
};

// 清空所有历史记录
const clearAllHistory = () => {
  searchHistory.value = [];
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
};
//返回
const goToMainPage = () => {
 router.push('/');
}


//热榜状态函数
const getStatusClass = (status) => {
  switch (status) {
    case '新':
      console.log("新")
      return 'new-status';
    case '首发':
       console.log("首发")
      return 'first-release-status';
    case '挑战':
       console.log("挑战")
      return 'deny-rumor-status';
    case '热':
       console.log("热")
      return 'hot-status';
    default:
      return 'hotCellShow-spanStatus';
  }
}
//前三条数据样式
const getIndexClass = (index) => {
   switch (index) {
    case 0:
      console.log("第一")
      return 'hotCellShow-span1-gold';
    case 1:
       console.log("第二")
      return 'hotCellShow-span1-sliver';
    case 2:
       console.log("第三")
      return 'hotCellShow-span1-copper';
  
    default:
      return 'hotCellShow-span1';
  }

}



</script>

<style scoped>
.serach_parent{
  width: auto;
  height: auto;
  /* background-color: #f10a0a; */
}
.form{
  display: flex;
  /* background-color: aqua; */
}
.toMainPage{
  display: inline-block;
  text-align: center;
  
  padding-top:15px;
  margin-left: 10px;
  font-size: 25px;
}

.van-search{
  width: 80%;
  
}
.search{
  display: inline-block;
  text-align: center;
  font-weight: 550;
  font-size: 18px;
  margin-top: 5px;
  height: 30px;
  width: 60px;
  padding-top: 10px;
  /* background-color: #afa3a3; */
  color: #f10a0a;
}
/* 可以根据需要调整叉号图标的样式 */
.van-icon {
  cursor: pointer;
  margin-right: 10px;
}

/* 历史记录 */
.historyContainer{
  width: 100%;
  height: auto;
  position: relative;;
  /* background-color: #e5e2e2 */
}
.van-list{
  width: 100%;
  height: 110px;
  /*background-color: #f10a0a; */
}
.ellipsis-with-icon{
    /* opacity: 1; */
   position: relative;
   float: left;

  width: 45%;
  height: 30px;
  margin-left: 10px;
  margin-top: 2px;
  padding: 2px; 
  font-size: 16px;
  font-weight: 600;
  color: #030303;
  touch-action: manipulation; /* 优化移动端触摸行为 */
  /* background-color: #663c3c */
}
.van-text-ellipsis{

   width: 80%;
   height: 30px;
   /* background-color: #f10a0a; */

}

.ellipsis-with-icon .van-icon {
  display: inline-block;
  width: 20px;;
  height: 20px;
  /* z-index: 3; */
  position: absolute;
  /* background-color: #f10a0a; */
  top: 8px;
  right: 1px; /* 可根据需要调整图标和文本之间的间距 */
}
.history-title {
  color: #cac9c9;
  font-size: 16px;
  margin-top: 2px;
}
/* 搜索历史的图标和文字 */
.span1{
  display: inline-block;
  margin-left: 10px;
}
.span2{
  display: inline-block;
  position:absolute;
  font-size: 18px;
  right: 10px;
  
  
}
/* 长按样式 */
.show-delete-icon {
  /* 可以添加一些样式来突出显示正在长按的项 */
  background-color: #f7eeee;
  border-radius: 5px;
}
/* 热搜盒子 */
.hotSreach{
  width: 100%;
  height: auto;
  margin-top: 10px;
  /* background-color: #686666 */
}

.hotCellShow{
  margin-top: 2px;
  margin-left: 5px;
  width: 97%;
  height:28px;
  padding: 2px;
  border-radius: 5px 5px;
  border: 1px solid rgb(245, 234, 234);
 
  /* background-color: #f9e4e4; */
}
.hotText{
  display: inline-block;
  font-size: 19px;
  margin-left: 10px;
  color: #f40808;
  font-weight: 600;
}
.hotCellShow-span1{
  width: 22px;
  height: 22px;
  display: inline-block;
   font-style:italic;
   font-weight: 550;
   text-align: center;
  /* font-family:'Times New Roman', Times, serif; */
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  color: #cccaca;
  /* background-color: #f3c407; */
  padding: 1px;
  
      
}
/* 金牌 */
.hotCellShow-span1-gold{
  width: 20px;
  height: 23.10px;
  display: inline-block;
   font-style:italic;
   font-weight: 550;
   text-align: center;
  /* font-family:'Times New Roman', Times, serif; */
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  color: #ff0808;
  /* background-color: #ffcc00; */
  background: linear-gradient(45deg, #FFD700, #FFBC52, #FFD700);
  padding: 1px;
  
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

}
/* 银牌 */
.hotCellShow-span1-sliver{
  width: 20px;
  height: 23.10px;
  display: inline-block;
   font-style:italic;
   font-weight: 550;
   text-align: center;
  /* font-family:'Times New Roman', Times, serif; */
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  color: #ffffff;
  background: linear-gradient(45deg, #C0C0C0, #D3D3D3, #C0C0C0);
  padding: 1px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

}
/* 铜牌 */
.hotCellShow-span1-copper{
   width: 20px;
  height: 23.10px;
  display: inline-block;
   font-style:italic;
   font-weight: 550;
   text-align: center;
  /* font-family:'Times New Roman', Times, serif; */
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  color: #ffffff;
  background: linear-gradient(45deg, #CD7F32, #B87333, #CD7F32);
  padding: 1px;
  z-index: 1;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);


}
   
.hotCellShow-span2{
  display: inline-block;
  margin-left: 10px;
  font-size: 17px;
  font-weight: 550;
  color: #030303;

  /* background-color: #f10a0a; */
  width: 60%;
}
.hotCellShow-span3{
  position: absolute;
  right: 10px;
  display: inline-block;
  margin-left: 5px;
  color: #bcbbbb;
  font-size: 16px;
}
.hotCellShow-spanStatus{
  font-size: 13px;
  font-weight: 700;
  margin-left: 5px;
  /* padding: 2px; */
  color: white;
  display: inline-block;
  width: auto;
  height: auto;
  border-radius:3px;
  background-color: rgb(255, 47, 6);
 
}
/* 新 */
.new-status {
  display: inline-block;
  width: auto;
  height: auto;
  border-radius:3px;
   font-size: 13px;
  font-weight: 700;
  margin-left: 5px;
  background: linear-gradient(45deg, rgb(184, 146, 245), rgb(106, 4, 230));
  color: #ffffff;
  padding:2px;
}
/* 首发 */
.first-release-status {
  display: inline-block;
  width: auto;
  height: auto;
  border-radius:3px;
   font-size: 13px;
  font-weight: 700;
  margin-left: 5px;
  background: linear-gradient(45deg, rgb(68, 216, 186), rgb(169, 14, 187));
  color: #ffffff;
  padding:2px;

}
/* 挑战 */
.deny-rumor-status {
  display: inline-block;
  width: auto;
  height: auto;
  border-radius:3px;
   font-size: 13px;
  font-weight: 700;
  margin-left: 5px;
  background-color: rgb(60, 248, 13);
  color: #ffffff;
   padding:2px;

}
.hot-status{
  display: inline-block;
  width: auto;
  height: auto;
  border-radius:3px;
   font-size: 13px;
  font-weight: 700;
   margin-left: 5px;
   background-color: red;
  padding: 2px;
   color: #ffffff;

}
</style>