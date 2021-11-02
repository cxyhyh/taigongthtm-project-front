<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
  
}
</script>
<style>
body::-webkit-scrollbar {display: none;}
html,
body {
	background-size: cover;
	background-attachment: fixed;/* 不设置的话页面滑动时，背景会不铺满*/
  background-color: #000a2d;
  
} 
</style>
