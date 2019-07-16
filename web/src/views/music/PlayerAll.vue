<template>
  <div class="headers">
    <div class="left">
      <song-list></song-list>
    </div>

    <div class="main">
      <player></player>
    </div>

    <dir class="right"></dir>
  </div>
</template>
<script>
import SongList from "../../components/music/songList.vue";
import Player from "../../components/music/Player.vue";

export default {
  name: "PlayerAll",
  data() {
    return {};
  },
  methods: {},
  components: {
    SongList,
    Player
  }
};
</script>
<style lang="scss">
.headers {
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 25px
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  background-color: black;
  color: #fff;
}
.main {
  height: 1000px;
  margin: 0px 35%;
  background-color: green;
}
.right {
  position: absolute;
  width: 25%;
  height: 1000px;
  right: 0;
  top: 0;
  background-color: blue;
}
</style>