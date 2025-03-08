  <template>
  <div>
    <van-chat>
      <van-chat-item
        v-for="(message, index) in messages"
        :key="index"
        :content="message.content"
        :type="message.type === 'sent' ? 'send' : 'received'"
      />
    </van-chat>
    <van-field
      v-model="inputMessage"
      placeholder="请输入消息"
      @keydown.enter="sendMessage"
    />
    <van-field
      v-model="receiverId"
      placeholder="请输入接收者 ID"
    />
    <van-button @click="sendMessage">发送</van-button>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import {  } from 'vant';

const inputMessage = ref('');
const receiverId = ref('');
const messages = ref(['nih','hhhh','ddd']);

const socket = new WebSocket('ws://localhost:8080/chat');

socket.onopen = () => {
  console.log('WebSocket连接已打开');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.receiverId === '当前用户 ID') { // 这里需要替换为实际的当前用户 ID
    messages.value.push({ content: data.content, type: 'received' });
  }
};

socket.onclose = () => {
  console.log('WebSocket连接已关闭');
};

const sendMessage = () => {
  if (inputMessage.value && receiverId.value) {
    const messageData = {
      content: inputMessage.value,
      senderId: '当前用户 ID', // 这里需要替换为实际的当前用户 ID
      receiverId: receiverId.value
    };
    socket.send(JSON.stringify(messageData));
    messages.value.push({ content: inputMessage.value, type: 'sent' });
    inputMessage.value = '';
    receiverId.value = '';
  }
};

onBeforeUnmount(() => {
  socket.close();
});
</script>

<style scoped>
/* 可以添加一些样式 */
</style>