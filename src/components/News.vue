<template>
   <div>
    <!--引入聊天组件 -->
    <userChat/>


   </div>
</template>

<script>
//聊天组件
import  detailChat from '../components/chatCommments/detailChat.vue'; // 确保路径正确

export default {

  components: {
    userChat:detailChat,
  },

  data() {
    return {
      show: false,
      index: 0,
      images: [
        'https://img.yzcdn.cn/1.jpg',
        'https://img.yzcdn.cn/2.jpg'
      ]
    };
  },

  methods: {
    onChange(index) {
      this.index = index;
    }
  }
};
</script>
