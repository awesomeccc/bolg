<template>
  <div class="headers">
    <swiper></swiper>
    <h1>歌单推荐</h1>
    <hr>
    <recommend></recommend>
   
    <div class="search">
    </div>
  </div>
</template>
<script>
import Swiper from "../../components/music/Swiper.vue";
import Recommend from "../../components/music/Recommend.vue";

export default {
  name: "HeadersAll",
  data(){
    return {
      keywordData: ''
    }
  },
  methods: {
    
  },
  components: {
   Recommend,
   Swiper
  }
};
</script>
<style lang="scss">
.headers {
  display: block;
  height: 50px;

}
</style>
