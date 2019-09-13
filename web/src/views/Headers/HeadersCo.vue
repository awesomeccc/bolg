<template>
  <div class="header"> 
  <div class="cc">cc</div>
  <ul class="header-bar">
    <li v-for = "item of list" :key="item.key"> 
      <a :href="item.path">
        <i class="iconfont" v-html="item.icon"></i>
        {{item.name}}
      </a>
    </li>
  </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[
        {
          key: '01',
          name: '首页',
          icon: '&#xe678;',
           path: '/'
        },
         {
          key: '02',
          name: '音乐',
          icon: '&#xe61b;',
          path: '/music'
        },
        //  {
        //   key: '03',
        //   name: '友情链接',
        //   icon: '&#xe69b;'
        // },
        //  {
        //   key: '04',
        //   name: '主题',
        //   icon: '&#xe678;'
        // },
         {
          key: '05',
          name: '关于我',
          icon: '&#xe613;',
          path: '/about'
        },
            {
          key: '03',
          name: '小程序',
          icon: '&#xe69b;',
           path: '/minip'
        },
         {
          key: '04',
          name: '后台管理',
          icon: '&#xe678;',
          path: 'http://49.235.152.59:443'
        },
      ]
    }
  }
}

</script>
<style>
@font-face {
  font-family: 'iconfont';  /* project id 1264274 */
  src: url('//at.alicdn.com/t/font_1264274_lpipprhwa0h.eot');
  src: url('//at.alicdn.com/t/font_1264274_lpipprhwa0h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1264274_lpipprhwa0h.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1264274_lpipprhwa0h.woff') format('woff'),
  url('//at.alicdn.com/t/font_1264274_lpipprhwa0h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1264274_lpipprhwa0h.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:24px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
 .header{
   float: left;
   width: 100%;
   border-bottom:1px solid rgb(233, 224, 224);
   margin-top: 3px;
   padding-bottom: 3px;
 }
 .cc {
   float: left;
   margin-left: 30px;
   margin-right: 30px;
   font-size: 35px;
 }
.header ul {
  list-style: none;
}   
  .header-bar>li{
    float: left;
    text-align: center;
    line-height: 50px;
    height: 42px;
    background-color: hsla(0,0%,100%,0);
  }
  .header-bar>li>a{
    color: #222;
    height: 100%;
    display: block;
    padding: 0 11px;
    cursor: pointer;
    text-decoration:none;
    font-size: 16px;
  }
</style>
