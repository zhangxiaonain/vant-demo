function timeAgo(timeStr) {
    const now = new Date();
    const inputTime = new Date(timeStr);
    const diffInSeconds = Math.floor((now - inputTime) / 1000);
  
    if (diffInSeconds < 60) {
      return '刚刚';
    } else if (diffInSeconds < 3600) {
      return Math.floor(diffInSeconds / 60) + '分钟前';
    } else if (diffInSeconds < 86400) {
      return Math.floor(diffInSeconds / 3600) + '小时前';
    } else {
      return Math.floor(diffInSeconds / 86400) + '天前';
    }
  }
  //设置用户登录的过期时间
  function setWithTimer(key, value, ttl) {
    localStorage.setItem(key, JSON.stringify(value));
    // 设置定时器，到期后删除数据
    setTimeout(() => {
        localStorage.removeItem(key);
    }, ttl);
}

  export{
    timeAgo,
    setWithTimer
  }