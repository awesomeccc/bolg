
<template>
  <div id="lyric">
    <div v-for="(v,index) in lines" :key="index" ref="lyricLine" class="text">
      <p class="lyric-item" :class="{'current': currentLineNum ===index}">{{v.txt?v.txt:'数据加载中'}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import Base64 from '../utils/base64'
import { mapGetters } from "vuex";
import lyricParser from "../../api/music/common/lyricParser.js";
import { setTimeout } from "timers";

export default {
  props: ["currentTime", "songid"],
  data() {
    return {
      // lyric: null
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
      lines: []
    };
  },
  components: {},
  methods: {
    getLyric() {
      this.currentLyric = new lyricParser(this.lyric, this.handleLyric);
      this.lines =   this.currentLyric .lines
      // console.log(2, this.currentLyric);
     // console.log(this.playing);
      if (this.playing) {
        this.currentLyric.play();
      }
    },
    handleLyric({ lineNum, txt }) {
      //console.log(lineNum);
      this.currentLineNum = lineNum;
      this.playingLyric = txt;
    }
  },
  computed: {
    ...mapGetters({
      lyric: "music/currentLyric",
      currentIndex: "music/isCurrentIndex",
      playing: "music/playing"
    })
  },
  watch: {
    currentIndex(newlyric) {
      // console.log(newlyric)
      //  console.log(newlyric)
     // console.log( this.currentLyric)
      if (newlyric && this.currentLyric && this.lyric.length !==0) {
        this.currentLyric.stop();
        this.getLyric();
        this.currentLineNum = 0;
      }else{
        setTimeout(() => {
          this.getLyric()
        }, 2000);
        
      }

      //console.log(this.currentLineNum);
    },
    playing(playing) {
      if (this.playing) {
        this.currentLyric.togglePlay();
        //  console.log("play");
      } else {
        this.currentLyric.togglePlay();
        //   console.log("stop");
      }
    }
  },
  created(){
    this.getLyric()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#lyric {
  /* display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  flex-grow: 1; */
}
.lyric-item {
  text-align: center;
  height: 30px;
  opacity: 0.7;
}
.lyric-item:first-child {
  font-size: 14px;
  color: #4d4d4d;
}
.lyric-item:last-child {
  font-size: 14px;
  color: #4d4d4d;
}
.text {
  color: red;
}
.current {
  color: #4d4d4d;
  background-color: skyblue;
  opacity: 1;
}
</style>