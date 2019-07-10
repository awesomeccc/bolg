<template>
  <div class='player'>
    <aplayer 
  :music="music"
  :mini = "mini"
  :float = "float"
  :autoplay = "autoplay"
/>
  </div>
</template>
<script>
import Aplayer from 'vue-aplayer'
export default {
  data() {
    return {

      music: {
        title: 'Clara [Sister]',
        artist: 'Elyon',
        src: 'http://music.163.com/song/media/outer/url?id=16846091.mp3',
        pic: 'http://p1.music.126.net/x-LVbj4tX6oEDH3qkqJP2g==/663005511556827.jpg?param=130y130'
      },
      mini: false,
      float: true,
      autoplay: false
    }
  },
   components: {
     Aplayer
    }
}
  
</script>
<style lang="scss" scoped>
.player {
  position: absolute;
  right: 0;
  z-index: 999;
   & .aplayer {
    // border-radius: 50%
  }
}
</style>
