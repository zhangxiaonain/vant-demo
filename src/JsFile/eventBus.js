
//仅支持vue2事件总线是一种简单的跨组件通信方式，它允许一个组件发布事件，其他组件可以监听这些事件。
import Vue from 'vue';
export const eventBus = new Vue();