<template>
  <div>
    <van-nav-bar
      title="同城"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 数据展示 -->
    <van-cell v-for="item in list" :key="item" :title="item" />
    <!-- 回到顶部 -->
    <van-back-top right="10vw" bottom="20vh" />
  </div>
</template>
 
<style scoped>
</style>

<script>


export default {
  setup() {
    const onClickLeft = () => history.back();

     const list = [...Array(50).keys()];
    return {
      onClickLeft,
      list,
    };
  },
};
</script>