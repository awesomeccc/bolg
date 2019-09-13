<template>
  <div>
    <div class="block"></div>
    <footer class="footer-inner">
     
      <p>cc的个人网站 Copyright&copy;cc</p>
       {{ date |formatDateTime}}
      <!-- <p>
        <a href="http://49.235.152.59:80" target="_blank">{{formatDate(new Date(),'yyyy-MM-dd hh:mm')}}</a>
      </p> -->
    </footer>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
         date:new Date()
      }
    },
    mounted:function () {
      var _this = this;  //声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function(){
        _this.date = new Date();  //修改数据date
      },1000)
    },
    //实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
    beforeDestroy:function(){
      if(this.timer){
        clearInterval(this.timer);  //在Vue实例销毁前，清除我们的定时器
      }
    },
    methods: {
      
//在月份、日期、小时等小于10前面补0
 padDate (value) {
  return value <10 ? '0' + value:value;
},
 
 formatDateTime(value){
  var date = new Date(value);
  var year = date.getFullYear();
  var month = padDate(date.getMonth()+1);
  var day = padDate(date.getDate());
  var hours = padDate(date.getHours());
  var minutes = padDate(date.getMinutes());
  var seconds = padDate(date.getSeconds());
  // console.log(1111111111111111111111)
  return year + '-' + month + '-' + day + '-' + ' ' + hours + ':' + minutes + ':' + seconds;
}
    }
  }
</script>

<style lang="scss" scoped>

.footer-inner {
  position: fixed;
  width: 100%;
  bottom: 0;
  margin-top: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background: #262626;
  z-index: 3000;
}

.footer-inner a {
  color: #fff;
  text-decoration: none;
}
</style>