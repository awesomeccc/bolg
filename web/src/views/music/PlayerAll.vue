<template>
  <div class="headers">
    <div class="left">
      <song-list></song-list>
    </div>

    <div class="main">
      <player></player>
    </div>

    <div class="right"> <lyric></lyric></div>
   
  </div>
</template>
<script>
import SongList from "../../components/music/songList.vue";
import Player from "../../components/music/Player.vue";
import Lyric from "../../components/music/Lyric.vue";

export default {
  name: "PlayerAll",
  data() {
    return {};
  },
  methods: {},
  components: {
    SongList,
    Player,
    Lyric
  }
};
</script>
<style lang="scss">
.headers {
  // width: 100%;
  // height: 100%;
  position: relative;


}
.left {
  position: absolute;
  left: 0;
  top: 0;
  // background-color: black;
  color: #fff;
}
.main {

  // height: 880PX;
  height: 780px;
  margin: 0px 35%;
  // padding-top: 65px;
  background-color: green;
  padding-bottom: 15px;
}
.right {
  position: absolute;
  width: 28%;
  height: 780px;
  right: 0;
  top: 0;
  background-color: skyblue;
  overflow: auto ;
  margin-top: 5px;
}
</style>