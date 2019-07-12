<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h1>{{title}}</h1>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      <span>{{desc}}</span>
    </div>
    <div v-for="(o, index) in songList" :key="index" class="text item">
      {{ o.songname }} -----{{index}}
      {{ getName(index) }}-----
      {{ format(o.interval) }}
    </div>
  </el-card>
</template>

<script>
import { getSongList } from "../../api/music/recommend.js";
import { createSong} from "../../api/music/common/createSong.js"
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      songList: [],
      title: "",
      desc: "",
      logoUrl: "",
      duration: 0
    };
  },
  created() {
    this._getSongList(7084670132);
  },
  methods: {
    _getSongList(k) {
      getSongList(k).then(res => {
        const data = res.cdlist[0];
        this.title = data.dissname;
        this.desc = data.desc;
        this.logoUrl = data.logo;
        this.songList = data.songlist;
        this.duration = data.interval;
        this.setPlayList(1)
        // console.log(res);
        console.log(createSong(data.songlist));
      });
    },
    getName(index) {
      return this.songList[index].singer[0].name;
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    ...mapMutations({
      setPlayList: 'music/SET_PLAYLIST'
    })
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>