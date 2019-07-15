<template>
  <div>
    <el-card class="box-card" ref = "song"  shadow="never">
      <div slot="header" class="clearfix">
        <h3>{{title}}</h3>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        <!-- <span>{{desc}}</span> -->
      </div>
      <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <li v-for="(o, index) in songList" :key="index" class="text item"
        @click="selectItem(index)">
          {{ index+1+':'+o.name }} -----
          {{ o.singer }}-----
          {{ format(o.duration) }}
        </li>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </ul>
    </el-card>
    <hr>
  </div>
</template>

<script>
import { getSongList } from "../../api/music/recommend.js";
import { createSong } from "../../api/music/common/createSong.js";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      songList: [],
      count: 10,
      countAll: 0,
      loading: false
    };
  },
  created() {
    this._getSongList();
  },
  methods: {
    // _getSongList(k) {
    //   getSongList(k).then(res => {
    //     const data = res.cdlist[0];
    //     this.title = data.dissname;
    //     this.desc = data.desc;
    //     this.logoUrl = data.logo;
    //     this.songList = data.songlist;
    //     this.duration = data.interval;
    //     this.setPlayList(1);
    //     // console.log(res);
    //     console.log(createSong(data.songlist));
    //   });
    // },
    selectItem(index){
      this.setIndex(index)
  
  },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.songList.push({
          name:'无限加载模拟数据'
        })
        this.loading = false;
      }, 1000);
    },
    _getSongList() {
     // console.log(this.disc);
      if (!this.disc.dissid) {
        this.$router.push("/music");
        return;
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === 0) {
          this.songList = this._normalizeSongs(res.cdlist[0].songlist);
          this.countAll = this.songList.length
          this.$refs.song.$el.style.height = window.innerHeight -30 + 'px'
          console.log(this.songList);
          this.setPlayList(this.songList)
          // console.log(this.countAll)
          // console.log(this.$refs.song)
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
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
      setPlayList: "music/SET_PLAYLIST",
      setIndex: 'music/SET_CURRENT_INDEX'
    })
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      disc: "music/isDisc"
    }),
    title() {
      return this.disc.dissname;
    },
    noMore() {
      return this.count >= this.countAll+5;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    // songHeight() {
    //   return this.$refs.innerHeight
    // console.log(this.$refs.innerHeight)  
    // }
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
  overflow: auto;
  width: 100%;
  margin: 1px;
  display: inline-block;
}
</style>