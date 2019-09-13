<template>
  <div>
    <el-card class="box-card" ref="song" shadow="never">
      <div slot="header" class="clearfix">
        <h3>{{title}}</h3>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        <!-- <span>{{desc}}</span> -->
      </div>
      <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <el-divider></el-divider>
        <li
          v-for="(o, index) in songList"
          :key="index"
          class="text item"
          @click="selectItem(o,index)"
        >
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
import {
  getSongList,
  getplaysongvkey,
  getLyric
} from "../../api/music/recommend.js";
import { createSong } from "../../api/music/common/createSong.js";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { Base64 } from "js-base64";

export default {
  data() {
    return {
      songList: [],
      count: 10,
      countAll: 0,
      loading: false,
      currentIndex: 0,
      lyric: '',
      mid: "",
      firstLoad: 6
    };
  },
  created() {
    this._getSongList();
    //this.getData()
  },
  mounted(){
    // this.selectItem(this.songlist[this.firstLoad],this.firstLoad)
        // console.log(this.songList)
        // this.getData()
  },
  methods: {
    // getData(){
    // console.log(this.songList)
    // },
 getLyric(mid) {

      return new Promise((resolve, reject) => {
        if(mid){
               getLyric(mid).then(res => {
          if (res.retcode === 0) {
            this.lyric = Base64.decode(res.lyric);
            resolve(this.lyric);
          } else {
            reject("no lyric");
          }
        })
        }else{
            getLyric(this.mid).then(res => {
          if (res.retcode === 0) {
            this.lyric = Base64.decode(res.lyric);
            resolve(this.lyric);
          } else {
            reject("no lyric");
          }
        });
        }
      });
    },
    async selectItem(item, index) {
   
    //   if (index !== this.currentIndex && this.currentLyric.lines == null) {
    //     this.setIndex(index);
    //     this.currentIndex = index;
    //     this.mid = item.mid;
    //  let vkey =   await  getplaysongvkey(item.mid)
    //  let  url = `http://dl.stream.qqmusic.qq.com/${vkey}`;
    //  let lyric = await  this.getLyric()
    //     this.setPlayUrl({
    //       index,
    //       url,
    //       lyric
    //     });
    //    //e this.setIndex(index);
    //     this.setPlayingState(false);
    //   } else {
    //     return;
    //   }
    this.setIndex(index);
     this.setPlayingState(false);
    },
     async loadAll(item, index) {
        this.mid = item.mid;
     let vkey =   await  getplaysongvkey(item.mid)
     let  url = `http://dl.stream.qqmusic.qq.com/${vkey}`;
     let lyric = await  this.getLyric(item.mid)
        this.setPlayUrl({
          index,
          url,
          lyric
        });
       //e this.setIndex(index);
       // this.setPlayingState(false);
      } ,
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.songList.push({
          name: "无限加载模拟数据"
        });
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
      return new Promise((resolve)=>{
          if (res.code === 0) {
          this.songList = this._normalizeSongs(res.cdlist[0].songlist);
          // console.log(this.songList)
          this.countAll = this.songList.length;
          this.$refs.song.$el.style.height = window.innerHeight - 120 + "px";
          //console.log(this.songList);
          this.setPlayList(this.songList);
        
         
          // console.log(this.countAll)
          // console.log(this.$refs.song)
        }
        resolve(this.songList)
      })
      }).then(res=>{
        res.forEach((item,index)=>{
          this.loadAll(item,index)
        })
       
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
      setIndex: "music/SET_CURRENT_INDEX",
      setPlayUrl: "music/SET_PLAYLIST_URL",
      setPlayingState: "music/SET_PLAYING_STATE"
    })
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      disc: "music/isDisc",
      currentLyric: "music/currentLyric",
    }),
    title() {
      return this.disc.dissname;
    },
    noMore() {
      return this.count >= this.countAll + 2;
    },
    disabled() {
      return this.loading || this.noMore;
    }
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
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item {
  margin-bottom: 18px;
  cursor: pointer;
}
.item:hover {
    background: #ffffff;
    border-color: #aaaaaa;
    color: blueviolet;
    position: relative;
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