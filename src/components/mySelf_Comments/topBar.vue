<template>
  <div class="topbar" :style="{ backgroundColor: isScrolled ? '#ff6347' : '#4caf50' }">
    <h1>{{ isScrolled ? 'Scrolled' : 'Top' }}</h1>
  </div>
</template>

<script>
export default {
  props: ['isScrolled'],
};
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px;
  transition: background-color 0.3s ease;
}
</style>
